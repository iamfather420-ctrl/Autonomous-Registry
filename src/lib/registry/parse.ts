import type { ParsedFile, ParsedProp, RegistryItemType } from "@/lib/registry/types";

const SKIP =
  /(^|\/)(node_modules|dist|build|\.next|coverage|storybook|__tests__|e2e|fixtures|vendor)\//i;
const TEST = /\.(test|spec|stories|story)\./i;
const MAX_SCORE_PATH = 400;

export function scorePath(path: string): number {
  const lower = path.toLowerCase();
  if (SKIP.test(lower) || TEST.test(lower) || lower.endsWith(".d.ts")) return -100;
  if (lower.includes(".gen.") || lower.endsWith("routetree.gen.ts")) return -100;
  let score = 0;
  if (lower.endsWith(".tsx")) score += 6;
  else if (lower.endsWith(".jsx")) score += 5;
  else if (lower.endsWith(".vue")) score += 5;
  else if (lower.endsWith(".svelte")) score += 5;
  else if (lower.endsWith(".ts")) score += 2;
  else if (lower.endsWith(".js")) score += 1;
  else return -100;
  if (/\/(components|ui|registry)\//.test(lower)) score += 6;
  if (/\/hooks?\//.test(lower) || /(^|\/)use-[^/]+\.(ts|tsx)$/.test(lower)) score += 3;
  if (/\/(pages|app|routes|screens)\//.test(lower)) score -= 4;
  if (/\/index\.(tsx|jsx|ts|js)$/.test(lower)) score -= 2;
  if (/(readme|changelog|license|vite\.config|tailwind\.config)/.test(lower)) score -= 8;
  return score;
}

export function safeName(input: string, fallback: string): string {
  const kebab = input
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return kebab || fallback;
}

export function titleFromName(name: string): string {
  return name
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function fileStem(path: string): string {
  const base = path.split("/").pop() ?? path;
  const stem = base.replace(/\.[^.]+$/, "");
  if (stem.toLowerCase() === "index") {
    const parent = path.split("/").slice(-2, -1)[0];
    return parent || stem;
  }
  return stem;
}

function frameworkOf(path: string): ParsedFile["framework"] {
  if (path.endsWith(".vue")) return "vue";
  if (path.endsWith(".svelte")) return "svelte";
  if (/\.(tsx|jsx|ts|js)$/.test(path)) return "react";
  return "unknown";
}

function suggestedType(path: string): RegistryItemType {
  const lower = path.toLowerCase();
  if (/\/hooks?\//.test(lower) || /(^|\/)use[A-Z-][^/]*\.(ts|tsx)$/.test(path) || /(^|\/)use-[^/]+\./.test(lower)) {
    return "registry:hook";
  }
  if (/\/(lib|utils)\//.test(lower) && !/\.(tsx|jsx)$/.test(lower)) return "registry:lib";
  if (/\/ui\//.test(lower)) return "registry:ui";
  if (/\.(tsx|jsx|vue|svelte)$/.test(lower)) return "registry:component";
  return "registry:lib";
}

function collectExports(source: string, fallback: string): string[] {
  const names = new Set<string>();
  const patterns = [
    /export\s+(?:async\s+)?function\s+([A-Za-z_][A-Za-z0-9_]*)/g,
    /export\s+const\s+([A-Za-z_][A-Za-z0-9_]*)\s*=/g,
    /export\s+default\s+function\s+([A-Za-z_][A-Za-z0-9_]*)/g,
    /export\s+class\s+([A-Za-z_][A-Za-z0-9_]*)/g,
  ];
  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) {
      if (match[1]) names.add(match[1]);
    }
  }
  if (names.size === 0 && /export\s+default\b/.test(source)) {
    const pascal = titleFromName(safeName(fallback, "item")).replace(/\s+/g, "");
    if (pascal) names.add(pascal);
  }
  return [...names].slice(0, 8);
}

function extractPropsBlock(source: string): string | null {
  const match = source.match(/(?:interface|type)\s+[A-Za-z0-9]+Props\b/);
  if (!match || match.index == null) return null;
  const brace = source.indexOf("{", match.index);
  if (brace < 0 || brace - match.index > 180) return null;
  let depth = 0;
  for (let i = brace; i < source.length && i < brace + 4000; i++) {
    if (source[i] === "{") depth += 1;
    else if (source[i] === "}") {
      depth -= 1;
      if (depth === 0) return source.slice(brace + 1, i);
    }
  }
  return null;
}

function parseProps(block: string): ParsedProp[] {
  const parts: string[] = [];
  let depth = 0;
  let current = "";
  for (const ch of block) {
    if (ch === "{" || ch === "(" || ch === "[") depth += 1;
    if ((ch === "}" || ch === ")" || ch === "]") && depth > 0) depth -= 1;
    if ((ch === "\n" || ch === ";") && depth === 0) {
      parts.push(current);
      current = "";
      continue;
    }
    current += ch;
  }
  if (current.trim()) parts.push(current);

  const props: ParsedProp[] = [];
  for (const part of parts) {
    const line = part.trim().replace(/,$/, "");
    if (!line || line.startsWith("//") || line.startsWith("*") || line.startsWith("/*")) continue;
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)(\?)?\s*:\s*([\s\S]+)$/);
    if (!match) continue;
    const type = match[3].replace(/\s+/g, " ").trim();
    if (!type || type.length > 96) continue;
    props.push({ name: match[1], type, optional: Boolean(match[2]) });
  }
  return props.slice(0, 12);
}

const IMPORT_RE = /import\s+(?:type\s+)?(?:[^"'`;]+?\s+from\s+)?["']([^"']+)["']/g;
const REQUIRE_RE = /require\(\s*["']([^"']+)["']\s*\)/g;
const SKIP_PACKAGES = new Set(["react", "react-dom", "react/jsx-runtime"]);

function packageName(specifier: string): string | null {
  if (!specifier || specifier.startsWith(".") || specifier.startsWith("@/") || specifier.startsWith("~/")) {
    return null;
  }
  if (specifier.startsWith("node:")) return null;
  const parts = specifier.split("/");
  const name = specifier.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0];
  if (!name || SKIP_PACKAGES.has(name) || SKIP_PACKAGES.has(specifier)) return null;
  return name;
}

function collectDependencies(source: string): string[] {
  const deps = new Set<string>();
  for (const pattern of [IMPORT_RE, REQUIRE_RE]) {
    for (const match of source.matchAll(pattern)) {
      const name = packageName(match[1] ?? "");
      if (name) deps.add(name);
    }
  }
  return [...deps].slice(0, 16);
}

export function isMinified(source: string): boolean {
  const lines = source.split("\n");
  if (lines.length < 4 && source.length > 600) return true;
  return source.length / Math.max(lines.length, 1) > 240;
}

export function parseFile(path: string, source: string): ParsedFile | null {
  if (!path || path.length > MAX_SCORE_PATH || source.length === 0 || isMinified(source)) return null;
  const framework = frameworkOf(path);
  const suggestedName = safeName(fileStem(path), "item");
  const exports = collectExports(source, suggestedName);
  if (framework === "react" && exports.length === 0) return null;
  if ((framework === "vue" || framework === "svelte") && !/<(template|script|style)\b/.test(source) && exports.length === 0) {
    return null;
  }
  const block = extractPropsBlock(source);
  return {
    path,
    source,
    exports,
    props: block ? parseProps(block) : [],
    dependencies: collectDependencies(source),
    framework,
    suggestedType: suggestedType(path),
    suggestedName,
  };
}

export function describeParsed(file: ParsedFile): string {
  const kind = file.suggestedType.replace("registry:", "");
  const exported = file.exports.slice(0, 3).join(", ");
  const propNames = file.props
    .slice(0, 4)
    .map((prop) => prop.name)
    .join(", ");
  const base = exported
    ? `${titleFromName(file.suggestedName)} is a ${kind} exporting ${exported}.`
    : `${titleFromName(file.suggestedName)} is a ${kind} from this repository.`;
  return propNames ? `${base} Props: ${propNames}.` : base;
}

export function rankPaths(files: { path: string; size?: number }[], limit: number, maxBytes: number): string[] {
  return files
    .filter((file) => !file.path.includes("..") && !file.path.startsWith("/") && !file.path.includes("\\"))
    .map((file) => ({
      path: file.path,
      size: file.size ?? 0,
      score: scorePath(file.path),
    }))
    .filter((file) => file.score > 0 && (file.size === 0 || file.size <= maxBytes))
    .sort((a, b) => b.score - a.score || a.path.localeCompare(b.path))
    .slice(0, limit)
    .map((file) => file.path);
}
