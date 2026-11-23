import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { ForgeReport } from "@/components/kiln/result";
import { shellInput, shellPrimary, shellQuiet } from "@/components/kiln/shell";
import { ASH } from "@/lib/registry/catalog";
import { composeRegistry, sealOf } from "@/lib/registry/compose";
import { forgeRepository } from "@/lib/registry/forge";
import { parseGitHubUrl } from "@/lib/registry/github";
import { parseFile } from "@/lib/registry/parse";
import { useShelf } from "@/lib/registry/store";
import type { ForgeSuccess } from "@/lib/registry/types";

export const Route = createFileRoute("/forge")({
  head: () => ({
    meta: [{ title: "Foundry — Kiln" }],
  }),
  component: ForgePage,
});

const PRESETS = ["pacocoursey/cmdk", "emilkowalski/sonner"];

function remember(result: ForgeSuccess, sourceLabel: string) {
  useShelf.getState().add({
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    sealedBy: result.sealedBy,
    seal: result.seal,
    summary: result.summary ?? "",
    sourceLabel,
    sourceUrl: result.source.url,
    steps: result.steps,
    registry: result.registry,
  });
}

function sealAsh(): ForgeSuccess {
  const files = ASH.flatMap((entry) => {
    const parsed = parseFile(`registry/ui/${entry.filename}`, entry.source);
    return parsed ? [parsed] : [];
  });
  const registry = composeRegistry({
    name: "ash",
    homepage: window.location.origin,
    files,
  });
  return {
    ok: true,
    steps: [
      {
        id: "read",
        label: "Read Ash source",
        detail: `${files.length} primitives parsed in the browser from the fired registry.`,
      },
      {
        id: "seal",
        label: "Sealed by the parser",
        detail: "Names and descriptions come from filenames and prop types, not the curated catalog copy.",
      },
    ],
    registry,
    sealedBy: "parser",
    seal: sealOf(registry),
    summary: "A parser seal of the Ash source that already ships with Kiln.",
    source: {
      owner: "kiln",
      repo: "ash",
      branch: "local",
      url: `${window.location.origin}/`,
    },
  };
}

function ForgePage() {
  const [url, setUrl] = useState("pacocoursey/cmdk");
  const [useAi, setUseAi] = useState(true);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ForgeSuccess | null>(null);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    if (!parseGitHubUrl(url)) {
      setError("Use a public github.com repository. owner/repo is enough.");
      return;
    }
    setPending(true);
    try {
      const response = await forgeRepository({ data: { url, useAi } });
      if (!response.ok) {
        setResult(null);
        setError(response.error);
        return;
      }
      setResult(response);
      remember(response, `${response.source.owner}/${response.source.repo}`);
      toast.success("Sealed onto your shelf");
    } catch {
      setError("The forge did not finish. Check the repository URL and try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      <p className="text-xs font-medium tracking-wider text-ember uppercase">Foundry</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl leading-none text-fg sm:text-6xl">
        Point it at a repository.
      </h1>
      <p className="mt-4 max-w-2xl text-base text-muted">
        Kiln resolves the repo, walks the git tree, keeps real components, and seals a shadcn-compatible
        registry. One fire, one optional Grok pass. Fetched source is never run.
      </p>

      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-3">
        <label htmlFor="repo-url" className="text-sm font-medium text-fg">
          Public GitHub repository
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            id="repo-url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://github.com/owner/repo"
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            className={shellInput}
          />
          <button type="submit" className={shellPrimary} disabled={pending}>
            {pending ? "Firing" : "Fire the kiln"}
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              className="h-9 rounded-full bg-bg-raised px-3 text-xs font-medium text-muted"
              onClick={() => setUrl(preset)}
            >
              {preset}
            </button>
          ))}
        </div>
        <label className="mt-1 flex items-start gap-3 text-sm text-muted">
          <input
            type="checkbox"
            checked={useAi}
            onChange={(event) => setUseAi(event.target.checked)}
            className="mt-1 size-4 accent-ember"
          />
          <span>
            Ask Grok to name items and drop non-components. One request per fire. If Grok is unavailable, the
            parser still seals the registry.
          </span>
        </label>
      </form>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          className={shellQuiet}
          onClick={() => {
            const sealed = sealAsh();
            setError(null);
            setResult(sealed);
            remember(sealed, "Ash source");
            toast.success("Ash re-sealed by the parser");
          }}
        >
          Seal Ash from its source
        </button>
        <Link to="/shelf" className="text-sm text-muted underline">
          Open the shelf
        </Link>
      </div>

      {pending ? (
        <div className="mt-8" role="status" aria-live="polite">
          <p className="text-sm font-medium text-fg">Firing</p>
          <p className="mt-1 text-sm text-muted">Resolving the repository, reading source, and sealing items.</p>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-line">
            <div className="kiln-heat h-full w-1/3 bg-ember" />
          </div>
        </div>
      ) : null}

      {error ? (
        <p role="alert" className="mt-6 max-w-2xl rounded-lg border border-line bg-bg-raised px-4 py-3 text-sm text-fg">
          {error}
        </p>
      ) : null}

      {result ? (
        <div className="mt-10">
          <ForgeReport
            registry={result.registry}
            steps={result.steps}
            sealedBy={result.sealedBy}
            seal={result.seal}
            summary={result.summary ?? ""}
            note={result.note}
            sourceLabel={`${result.source.owner}/${result.source.repo}`}
            sourceUrl={result.source.url}
          />
        </div>
      ) : null}
    </main>
  );
}
