import { n as REGISTRY_ITEM_SCHEMA, r as REGISTRY_SCHEMA } from "./types-PF7nF_s_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/github-D2CriLbO.js
var SKIP = /(^|\/)(node_modules|dist|build|\.next|coverage|storybook|__tests__|e2e|fixtures|vendor)\//i;
var TEST = /\.(test|spec|stories|story)\./i;
var MAX_SCORE_PATH = 400;
function scorePath(path) {
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
function safeName(input, fallback) {
	return input.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48) || fallback;
}
function titleFromName(name) {
	return name.split("-").filter(Boolean).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}
function fileStem(path) {
	const stem = (path.split("/").pop() ?? path).replace(/\.[^.]+$/, "");
	if (stem.toLowerCase() === "index") return path.split("/").slice(-2, -1)[0] || stem;
	return stem;
}
function frameworkOf(path) {
	if (path.endsWith(".vue")) return "vue";
	if (path.endsWith(".svelte")) return "svelte";
	if (/\.(tsx|jsx|ts|js)$/.test(path)) return "react";
	return "unknown";
}
function suggestedType(path) {
	const lower = path.toLowerCase();
	if (/\/hooks?\//.test(lower) || /(^|\/)use[A-Z-][^/]*\.(ts|tsx)$/.test(path) || /(^|\/)use-[^/]+\./.test(lower)) return "registry:hook";
	if (/\/(lib|utils)\//.test(lower) && !/\.(tsx|jsx)$/.test(lower)) return "registry:lib";
	if (/\/ui\//.test(lower)) return "registry:ui";
	if (/\.(tsx|jsx|vue|svelte)$/.test(lower)) return "registry:component";
	return "registry:lib";
}
function collectExports(source, fallback) {
	const names = /* @__PURE__ */ new Set();
	for (const pattern of [
		/export\s+(?:async\s+)?function\s+([A-Za-z_][A-Za-z0-9_]*)/g,
		/export\s+const\s+([A-Za-z_][A-Za-z0-9_]*)\s*=/g,
		/export\s+default\s+function\s+([A-Za-z_][A-Za-z0-9_]*)/g,
		/export\s+class\s+([A-Za-z_][A-Za-z0-9_]*)/g
	]) for (const match of source.matchAll(pattern)) if (match[1]) names.add(match[1]);
	if (names.size === 0 && /export\s+default\b/.test(source)) {
		const pascal = titleFromName(safeName(fallback, "item")).replace(/\s+/g, "");
		if (pascal) names.add(pascal);
	}
	return [...names].slice(0, 8);
}
function extractPropsBlock(source) {
	const match = source.match(/(?:interface|type)\s+[A-Za-z0-9]+Props\b/);
	if (!match || match.index == null) return null;
	const brace = source.indexOf("{", match.index);
	if (brace < 0 || brace - match.index > 180) return null;
	let depth = 0;
	for (let i = brace; i < source.length && i < brace + 4e3; i++) if (source[i] === "{") depth += 1;
	else if (source[i] === "}") {
		depth -= 1;
		if (depth === 0) return source.slice(brace + 1, i);
	}
	return null;
}
function parseProps(block) {
	const parts = [];
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
	const props = [];
	for (const part of parts) {
		const line = part.trim().replace(/,$/, "");
		if (!line || line.startsWith("//") || line.startsWith("*") || line.startsWith("/*")) continue;
		const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)(\?)?\s*:\s*([\s\S]+)$/);
		if (!match) continue;
		const type = match[3].replace(/\s+/g, " ").trim();
		if (!type || type.length > 96) continue;
		props.push({
			name: match[1],
			type,
			optional: Boolean(match[2])
		});
	}
	return props.slice(0, 12);
}
var IMPORT_RE = /import\s+(?:type\s+)?(?:[^"'`;]+?\s+from\s+)?["']([^"']+)["']/g;
var REQUIRE_RE = /require\(\s*["']([^"']+)["']\s*\)/g;
var SKIP_PACKAGES = /* @__PURE__ */ new Set([
	"react",
	"react-dom",
	"react/jsx-runtime"
]);
function packageName(specifier) {
	if (!specifier || specifier.startsWith(".") || specifier.startsWith("@/") || specifier.startsWith("~/")) return null;
	if (specifier.startsWith("node:")) return null;
	const parts = specifier.split("/");
	const name = specifier.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0];
	if (!name || SKIP_PACKAGES.has(name) || SKIP_PACKAGES.has(specifier)) return null;
	return name;
}
function collectDependencies(source) {
	const deps = /* @__PURE__ */ new Set();
	for (const pattern of [IMPORT_RE, REQUIRE_RE]) for (const match of source.matchAll(pattern)) {
		const name = packageName(match[1] ?? "");
		if (name) deps.add(name);
	}
	return [...deps].slice(0, 16);
}
function isMinified(source) {
	const lines = source.split("\n");
	if (lines.length < 4 && source.length > 600) return true;
	return source.length / Math.max(lines.length, 1) > 240;
}
function parseFile(path, source) {
	if (!path || path.length > MAX_SCORE_PATH || source.length === 0 || isMinified(source)) return null;
	const framework = frameworkOf(path);
	const suggestedName = safeName(fileStem(path), "item");
	const exports = collectExports(source, suggestedName);
	if (framework === "react" && exports.length === 0) return null;
	if ((framework === "vue" || framework === "svelte") && !/<(template|script|style)\b/.test(source) && exports.length === 0) return null;
	const block = extractPropsBlock(source);
	return {
		path,
		source,
		exports,
		props: block ? parseProps(block) : [],
		dependencies: collectDependencies(source),
		framework,
		suggestedType: suggestedType(path),
		suggestedName
	};
}
function describeParsed(file) {
	const kind = file.suggestedType.replace("registry:", "");
	const exported = file.exports.slice(0, 3).join(", ");
	const propNames = file.props.slice(0, 4).map((prop) => prop.name).join(", ");
	const base = exported ? `${titleFromName(file.suggestedName)} is a ${kind} exporting ${exported}.` : `${titleFromName(file.suggestedName)} is a ${kind} from this repository.`;
	return propNames ? `${base} Props: ${propNames}.` : base;
}
function rankPaths(files, limit, maxBytes) {
	return files.filter((file) => !file.path.includes("..") && !file.path.startsWith("/") && !file.path.includes("\\")).map((file) => ({
		path: file.path,
		size: file.size ?? 0,
		score: scorePath(file.path)
	})).filter((file) => file.score > 0 && (file.size === 0 || file.size <= maxBytes)).sort((a, b) => b.score - a.score || a.path.localeCompare(b.path)).slice(0, limit).map((file) => file.path);
}
var DOCS = "Installed files use Tailwind utilities only (stone and orange). They have no npm dependencies. Kiln does not execute registry source.";
function targetPath(type, name, sourcePath) {
	const ext = sourcePath.match(/\.(tsx|ts|jsx|js|vue|svelte)$/)?.[0] ?? ".tsx";
	if (type === "registry:ui") return `registry/ui/${name}${ext}`;
	if (type === "registry:hook") return `registry/hooks/${name}${ext}`;
	if (type === "registry:lib") return `registry/lib/${name}${ext}`;
	if (type === "registry:block") return `registry/blocks/${name}${ext}`;
	return `registry/components/${name}${ext}`;
}
function categoryFor(type) {
	if (type === "registry:ui") return "ui";
	if (type === "registry:hook") return "hook";
	if (type === "registry:lib") return "lib";
	if (type === "registry:block") return "block";
	return "component";
}
function sealId(text) {
	let hash = 2166136261;
	for (let i = 0; i < text.length; i++) {
		hash ^= text.charCodeAt(i);
		hash = Math.imul(hash, 16777619);
	}
	return (hash >>> 0).toString(16).padStart(8, "0");
}
function uniqueName(base, used) {
	let name = base;
	let n = 2;
	while (used.has(name)) {
		name = `${base}-${n}`;
		n += 1;
	}
	used.add(name);
	return name;
}
function toItem(file, override, name) {
	const type = override?.type ?? file.suggestedType;
	const meta = { sourcePath: file.path };
	if (file.framework !== "react") meta.framework = file.framework;
	const item = {
		$schema: REGISTRY_ITEM_SCHEMA,
		name,
		type,
		title: override?.title?.trim() || titleFromName(name),
		description: override?.description?.trim() || describeParsed(file),
		files: [{
			path: targetPath(type, name, file.path),
			type,
			content: file.source
		}],
		categories: [override?.category?.trim() || categoryFor(type)],
		docs: DOCS,
		meta
	};
	if (file.dependencies.length > 0) item.dependencies = file.dependencies;
	return item;
}
function composeRegistry(options) {
	const overrides = new Map((options.overrides ?? []).map((item) => [item.path, item]));
	const selected = overrides.size > 0 ? options.files.filter((file) => overrides.has(file.path)) : options.files;
	const used = /* @__PURE__ */ new Set();
	const items = selected.map((file) => {
		const override = overrides.get(file.path);
		return toItem(file, override, uniqueName(safeName(override?.name || file.suggestedName, "item"), used));
	});
	return {
		$schema: REGISTRY_SCHEMA,
		name: safeName(options.name, "registry"),
		homepage: options.homepage,
		items
	};
}
function sealOf(registry) {
	return sealId(registry.items.map((item) => `${item.name}\n${item.files.map((file) => file.content).join("\n")}`).join("\n"));
}
var RESERVED = /* @__PURE__ */ new Set([
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
	"account"
]);
function decodePart(value) {
	try {
		return decodeURIComponent(value);
	} catch {
		return value;
	}
}
function parseGitHubUrl(input) {
	const trimmed = input.trim();
	if (!trimmed || trimmed.length > 300) return null;
	let text = trimmed;
	if (!/^https?:\/\//i.test(text)) {
		if (!text.includes("/")) return null;
		text = `https://github.com/${text.replace(/^\/+/, "")}`;
	}
	let url;
	try {
		url = new URL(text);
	} catch {
		return null;
	}
	if (url.protocol !== "https:" && url.protocol !== "http:") return null;
	if (url.hostname.toLowerCase().replace(/^www\./, "") !== "github.com") return null;
	const parts = url.pathname.split("/").filter(Boolean).map(decodePart);
	if (parts.length < 2) return null;
	const owner = parts[0] ?? "";
	const repo = (parts[1] ?? "").replace(/\.git$/, "");
	if (!/^[A-Za-z0-9_.-]+$/.test(owner) || !/^[A-Za-z0-9_.-]+$/.test(repo)) return null;
	if (RESERVED.has(owner.toLowerCase())) return null;
	const section = parts[2];
	if (!section) return {
		owner,
		repo
	};
	if (section !== "tree" && section !== "blob") return null;
	const branch = parts[3];
	if (!branch || !/^[A-Za-z0-9._/-]+$/.test(branch) || branch.includes("..")) return null;
	const tail = parts.slice(4).join("/");
	if (tail.includes("..")) return null;
	if (section === "blob" && tail) return {
		owner,
		repo,
		branch,
		file: tail
	};
	if (tail) return {
		owner,
		repo,
		branch,
		subpath: tail.replace(/\/$/, "")
	};
	return {
		owner,
		repo,
		branch
	};
}
function repoWebUrl(owner, repo, branch) {
	const base = `https://github.com/${owner}/${repo}`;
	return branch ? `${base}/tree/${branch}` : base;
}
//#endregion
export { repoWebUrl as a, rankPaths as i, parseFile as n, sealOf as o, parseGitHubUrl as r, composeRegistry as t };
