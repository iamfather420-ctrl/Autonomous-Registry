export type GitHubTarget = {
  owner: string;
  repo: string;
  branch?: string;
  subpath?: string;
  file?: string;
};

const RESERVED = new Set([
  "settings",
  "orgs",
  "organizations",
  "features",
  "topics",
  "marketplace",
  "explore",
  "sponsors",
  "login",
  "signup",
  "about",
  "pricing",
  "apps",
  "new",
  "codespaces",
  "account",
]);

function decodePart(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function parseGitHubUrl(input: string): GitHubTarget | null {
  const trimmed = input.trim();
  if (!trimmed || trimmed.length > 300) return null;
  let text = trimmed;
  if (!/^https?:\/\//i.test(text)) {
    if (!text.includes("/")) return null;
    text = `https://github.com/${text.replace(/^\/+/, "")}`;
  }
  let url: URL;
  try {
    url = new URL(text);
  } catch {
    return null;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return null;
  const host = url.hostname.toLowerCase().replace(/^www\./, "");
  if (host !== "github.com") return null;
  const parts = url.pathname.split("/").filter(Boolean).map(decodePart);
  if (parts.length < 2) return null;
  const owner = parts[0] ?? "";
  const repo = (parts[1] ?? "").replace(/\.git$/, "");
  if (!/^[A-Za-z0-9_.-]+$/.test(owner) || !/^[A-Za-z0-9_.-]+$/.test(repo)) return null;
  if (RESERVED.has(owner.toLowerCase())) return null;
  const section = parts[2];
  if (!section) return { owner, repo };
  if (section !== "tree" && section !== "blob") return null;
  const branch = parts[3];
  if (!branch || !/^[A-Za-z0-9._/-]+$/.test(branch) || branch.includes("..")) return null;
  const tail = parts.slice(4).join("/");
  if (tail.includes("..")) return null;
  if (section === "blob" && tail) return { owner, repo, branch, file: tail };
  if (tail) return { owner, repo, branch, subpath: tail.replace(/\/$/, "") };
  return { owner, repo, branch };
}

export function repoWebUrl(owner: string, repo: string, branch?: string): string {
  const base = `https://github.com/${owner}/${repo}`;
  return branch ? `${base}/tree/${branch}` : base;
}
