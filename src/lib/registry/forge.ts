import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { composeRegistry, sealOf, type ItemOverride } from "@/lib/registry/compose";
import { parseGitHubUrl, repoWebUrl } from "@/lib/registry/github";
import { parseFile, rankPaths } from "@/lib/registry/parse";
import {
  ITEM_TYPES,
  type ForgeResponse,
  type ForgeStep,
  type ParsedFile,
  type RegistryItemType,
} from "@/lib/registry/types";

const MAX_FILES = 12;
const MAX_BYTES = 32_000;
const MAX_CHARS = 24_000;

const inputSchema = z.object({
  url: z.string().trim().min(3).max(300),
  useAi: z.boolean(),
});

const GH = {
  Accept: "application/vnd.github+json",
  "User-Agent": "kiln-registry-foundry",
  "X-GitHub-Api-Version": "2022-11-28",
};

type GhResult = { ok: true; status: number; text: string } | { ok: false; status: number; error: string };

async function gh(url: string, accept?: string): Promise<GhResult> {
  try {
    const response = await fetch(url, {
      headers: accept ? { ...GH, Accept: accept } : GH,
      signal: AbortSignal.timeout(12_000),
    });
    const text = await response.text();
    if (response.status === 403 || response.status === 429) {
      return {
        ok: false,
        status: response.status,
        error: "GitHub rate-limited this forge. Wait a minute and fire again. Unauthenticated requests share a small hourly budget.",
      };
    }
    if (!response.ok) {
      return { ok: false, status: response.status, error: `GitHub returned ${response.status}.` };
    }
    return { ok: true, status: response.status, text };
  } catch {
    return { ok: false, status: 0, error: "GitHub did not respond in time." };
  }
}

function fail(steps: ForgeStep[], error: string): ForgeResponse {
  return { ok: false, error, steps };
}

async function mapPool<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let cursor = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      out[index] = await fn(items[index] as T);
    }
  });
  await Promise.all(workers);
  return out;
}

const aiSchema = z.object({
  registryName: z.string().min(1).max(48),
  registryDescription: z.string().min(1).max(320),
  items: z
    .array(
      z.object({
        path: z.string(),
        name: z.string().min(1).max(48),
        title: z.string().min(1).max(80),
        description: z.string().min(1).max(320),
        type: z.string(),
        category: z.string().max(32).optional(),
      }),
    )
    .max(12),
});

function coerceType(value: string, fallback: RegistryItemType): RegistryItemType {
  return (ITEM_TYPES as readonly string[]).includes(value) ? (value as RegistryItemType) : fallback;
}

function readJson(text: string): unknown {
  const fenced = text.trim().match(/```(?:json)?\s*([\s\S]*?)```/);
  return JSON.parse(fenced ? (fenced[1] ?? "") : text);
}

async function refineWithGrok(
  files: ParsedFile[],
  label: string,
): Promise<{ name: string; summary: string; overrides: ItemOverride[] } | { error: string }> {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) return { error: "Grok is not available in this environment." };

  const manifest = files.map((file) => ({
    path: file.path,
    exports: file.exports,
    props: file.props.map((prop) => `${prop.name}${prop.optional ? "?" : ""}: ${prop.type}`),
    dependencies: file.dependencies,
    typeGuess: file.suggestedType,
    excerpt: file.source.slice(0, 1200),
  }));

  try {
    const response = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      signal: AbortSignal.timeout(25_000),
      body: JSON.stringify({
        model: "grok-4.5",
        temperature: 0.2,
        max_tokens: 1400,
        messages: [
          {
            role: "system",
            content:
              "You seal shadcn-compatible component registries. Return JSON only. Never invent files and never rewrite source.",
          },
          {
            role: "user",
            content: `Repository: ${label}\nFiles:\n${JSON.stringify(manifest)}\n\nReturn {"registryName":"kebab-name","registryDescription":"one sentence","items":[{"path":"exact input path","name":"kebab-name","title":"Short title","description":"one specific sentence about what the module does","type":"registry:ui|registry:component|registry:hook|registry:lib|registry:block","category":"one word"}]}. Drop tests, pages, app shells, and one-off screens. Keep at most 12 items. Every path must match an input path exactly.`,
          },
        ],
      }),
    });
    if (!response.ok) return { error: `Grok returned ${response.status}.` };
    const body = (await response.json()) as { choices?: { message?: { content?: string } }[] };
    const content = body.choices?.[0]?.message?.content ?? "";
    const parsed = aiSchema.parse(readJson(content));
    const known = new Map(files.map((file) => [file.path, file]));
    const overrides: ItemOverride[] = [];
    for (const item of parsed.items) {
      const file = known.get(item.path);
      if (!file) continue;
      overrides.push({
        path: item.path,
        name: item.name,
        title: item.title,
        description: item.description,
        type: coerceType(item.type, file.suggestedType),
        category: item.category,
      });
    }
    if (overrides.length === 0) return { error: "Grok did not return any of the fetched paths." };
    return { name: parsed.registryName, summary: parsed.registryDescription, overrides };
  } catch {
    return { error: "Grok's reply could not be read as registry JSON." };
  }
}

export const forgeRepository = createServerFn({ method: "POST" })
  .validator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }): Promise<ForgeResponse> => {
    const steps: ForgeStep[] = [];
    const target = parseGitHubUrl(data.url);
    if (!target) {
      return fail(steps, "Use a public github.com repository, like owner/repo or a /tree/branch link.");
    }

    const repoRes = await gh(`https://api.github.com/repos/${target.owner}/${target.repo}`);
    if (!repoRes.ok) {
      const missing = repoRes.status === 404;
      return fail(
        steps,
        missing
          ? "GitHub could not find that repository. Kiln only reads public repos."
          : repoRes.error,
      );
    }

    let repo: {
      default_branch?: string;
      description?: string | null;
      stargazers_count?: number;
      private?: boolean;
    };
    try {
      repo = JSON.parse(repoRes.text) as typeof repo;
    } catch {
      return fail(steps, "GitHub returned a repository record Kiln could not read.");
    }
    if (repo.private) {
      return fail(steps, "That repository is private. Kiln only forges public source.");
    }
    const branch = target.branch || repo.default_branch || "main";
    const stars = repo.stargazers_count ?? 0;
    steps.push({
      id: "resolve",
      label: "Resolved repository",
      detail: `${target.owner}/${target.repo} on ${branch}. ${stars.toLocaleString("en-US")} stars. Public.`,
    });

    const fetched: { path: string; source: string }[] = [];
    let walked = 0;
    let truncated = false;

    if (target.file) {
      const fileRes = await gh(
        `https://api.github.com/repos/${target.owner}/${target.repo}/contents/${target.file
          .split("/")
          .map(encodeURIComponent)
          .join("/")}?ref=${encodeURIComponent(branch)}`,
        "application/vnd.github.raw",
      );
      if (!fileRes.ok) return fail(steps, fileRes.error);
      if (fileRes.text.length > MAX_CHARS) {
        return fail(steps, "That file is too large to seal. Point Kiln at a component, not a bundle.");
      }
      fetched.push({ path: target.file, source: fileRes.text });
      steps.push({
        id: "walk",
        label: "Read one file",
        detail: target.file,
      });
    } else {
      const treeRes = await gh(
        `https://api.github.com/repos/${target.owner}/${target.repo}/git/trees/${encodeURIComponent(branch)}?recursive=1`,
      );
      if (!treeRes.ok) return fail(steps, treeRes.status === 404 ? `Branch ${branch} was not found.` : treeRes.error);
      let tree: { truncated?: boolean; tree?: { path?: string; type?: string; size?: number }[] };
      try {
        tree = JSON.parse(treeRes.text) as typeof tree;
      } catch {
        return fail(steps, "GitHub returned a tree Kiln could not read.");
      }
      truncated = Boolean(tree.truncated);
      const blobs = (tree.tree ?? []).filter((entry) => entry.type === "blob" && entry.path);
      const prefix = target.subpath ? `${target.subpath}/` : "";
      const scoped = blobs
        .map((entry) => ({ path: entry.path as string, size: entry.size }))
        .filter((entry) => (prefix ? entry.path.startsWith(prefix) : true));
      walked = scoped.length;
      const ranked = rankPaths(scoped, MAX_FILES, MAX_BYTES);
      steps.push({
        id: "walk",
        label: "Walked the tree",
        detail: `${walked.toLocaleString("en-US")} files considered${prefix ? ` under ${target.subpath}` : ""}${
          truncated ? ". GitHub truncated the tree, so this seal is partial." : "."
        } ${ranked.length} candidates queued.`,
      });
      if (ranked.length === 0) {
        return fail(steps, "No component files stood out. Try a /tree/branch/path that contains the UI.");
      }

      const downloads = await mapPool(ranked, 4, async (path) => {
        const url = `https://api.github.com/repos/${target.owner}/${target.repo}/contents/${path
          .split("/")
          .map(encodeURIComponent)
          .join("/")}?ref=${encodeURIComponent(branch)}`;
        const fileRes = await gh(url, "application/vnd.github.raw");
        if (!fileRes.ok || fileRes.text.length === 0 || fileRes.text.length > MAX_CHARS) return null;
        if (fileRes.text.trimStart().startsWith("{") && fileRes.text.includes('"message"')) return null;
        return { path, source: fileRes.text };
      });
      for (const file of downloads) {
        if (file) fetched.push(file);
      }
      steps.push({
        id: "fetch",
        label: "Fetched source",
        detail: `${fetched.length} of ${ranked.length} files came back under the size cap.`,
      });
    }

    const parsed = fetched.flatMap((file) => {
      const item = parseFile(file.path, file.source);
      return item ? [item] : [];
    });
    steps.push({
      id: "parse",
      label: "Extracted modules",
      detail:
        parsed.length === 0
          ? "Nothing exported a component, hook, or library Kiln could seal."
          : `${parsed.length} files kept, with exports, props, and dependencies.`,
    });
    if (parsed.length === 0) {
      return fail(steps, "Kiln could read the repo, but it did not find sealable source.");
    }

    let sealedBy: "parser" | "grok" = "parser";
    let overrides: ItemOverride[] | undefined;
    let registryName = target.repo;
    let summary = `${parsed.length} items sealed from ${target.owner}/${target.repo}@${branch}.`;
    let note: string | undefined;

    if (data.useAi) {
      const refined = await refineWithGrok(parsed, `${target.owner}/${target.repo}`);
      if ("error" in refined) {
        note = `${refined.error} The parser sealed the registry instead.`;
        steps.push({
          id: "ai",
          label: "Grok was skipped",
          detail: refined.error,
        });
      } else {
        sealedBy = "grok";
        overrides = refined.overrides;
        registryName = refined.name;
        summary = refined.summary;
        steps.push({
          id: "ai",
          label: "Grok sealed the catalog",
          detail: `${refined.overrides.length} items named and described. Source was not rewritten.`,
        });
      }
    } else {
      steps.push({
        id: "ai",
        label: "Parser sealed the catalog",
        detail: "Grok was left off. Names come from filenames and exports.",
      });
    }

    const registry = composeRegistry({
      name: registryName,
      homepage: repoWebUrl(target.owner, target.repo, branch),
      files: parsed,
      overrides,
    });
    if (registry.items.length === 0) {
      return fail(steps, "The sealer dropped every file. Fire again without Grok curation.");
    }
    steps.push({
      id: "seal",
      label: "Registry written",
      detail: `${registry.items.length} items in ${registry.name}. Download registry.json to host it.`,
    });

    return {
      ok: true,
      steps,
      registry,
      sealedBy,
      seal: sealOf(registry),
      summary,
      note,
      source: {
        owner: target.owner,
        repo: target.repo,
        branch,
        url: repoWebUrl(target.owner, target.repo, branch),
      },
    };
  });
