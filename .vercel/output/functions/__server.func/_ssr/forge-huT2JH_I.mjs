import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Z as require_react, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as object, n as boolean, o as string } from "../_libs/zod.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as shellQuiet, l as ASH, o as shellInput, s as shellPrimary } from "./router-BamLOpiv.mjs";
import { t as ForgeReport } from "./result-BLf7bKTK.mjs";
import { t as useShelf } from "./store-wgANnM7L.mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { n as parseFile, o as sealOf, r as parseGitHubUrl, t as composeRegistry } from "./github-D2CriLbO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/forge-huT2JH_I.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var inputSchema = object({
	url: string().trim().min(3).max(300),
	useAi: boolean()
});
var forgeRepository = createServerFn({ method: "POST" }).validator((data) => inputSchema.parse(data)).handler(createSsrRpc("d3bd318f7cf68a660b370a3a7d467ca6167090614da8b5db8046b426c79c8f1e"));
var PRESETS = ["pacocoursey/cmdk", "emilkowalski/sonner"];
function remember(result, sourceLabel) {
	useShelf.getState().add({
		id: crypto.randomUUID(),
		createdAt: Date.now(),
		sealedBy: result.sealedBy,
		seal: result.seal,
		summary: result.summary ?? "",
		sourceLabel,
		sourceUrl: result.source.url,
		steps: result.steps,
		registry: result.registry
	});
}
function sealAsh() {
	const files = ASH.flatMap((entry) => {
		const parsed = parseFile(`registry/ui/${entry.filename}`, entry.source);
		return parsed ? [parsed] : [];
	});
	const registry = composeRegistry({
		name: "ash",
		homepage: window.location.origin,
		files
	});
	return {
		ok: true,
		steps: [{
			id: "read",
			label: "Read Ash source",
			detail: `${files.length} primitives parsed in the browser from the fired registry.`
		}, {
			id: "seal",
			label: "Sealed by the parser",
			detail: "Names and descriptions come from filenames and prop types, not the curated catalog copy."
		}],
		registry,
		sealedBy: "parser",
		seal: sealOf(registry),
		summary: "A parser seal of the Ash source that already ships with Kiln.",
		source: {
			owner: "kiln",
			repo: "ash",
			branch: "local",
			url: `${window.location.origin}/`
		}
	};
}
function ForgePage() {
	const [url, setUrl] = (0, import_react.useState)("pacocoursey/cmdk");
	const [useAi, setUseAi] = (0, import_react.useState)(true);
	const [pending, setPending] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [result, setResult] = (0, import_react.useState)(null);
	async function onSubmit(event) {
		event.preventDefault();
		setError(null);
		if (!parseGitHubUrl(url)) {
			setError("Use a public github.com repository. owner/repo is enough.");
			return;
		}
		setPending(true);
		try {
			const response = await forgeRepository({ data: {
				url,
				useAi
			} });
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-wider text-ember uppercase",
				children: "Foundry"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 max-w-3xl font-display text-5xl leading-none text-fg sm:text-6xl",
				children: "Point it at a repository."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-base text-muted",
				children: "Kiln resolves the repo, walks the git tree, keeps real components, and seals a shadcn-compatible registry. One fire, one optional Grok pass. Fetched source is never run."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "mt-8 flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "repo-url",
						className: "text-sm font-medium text-fg",
						children: "Public GitHub repository"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "repo-url",
							value: url,
							onChange: (event) => setUrl(event.target.value),
							placeholder: "https://github.com/owner/repo",
							spellCheck: false,
							autoCapitalize: "off",
							autoCorrect: "off",
							className: shellInput
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: shellPrimary,
							disabled: pending,
							children: pending ? "Firing" : "Fire the kiln"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: PRESETS.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "h-9 rounded-full bg-bg-raised px-3 text-xs font-medium text-muted",
							onClick: () => setUrl(preset),
							children: preset
						}, preset))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-1 flex items-start gap-3 text-sm text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: useAi,
							onChange: (event) => setUseAi(event.target.checked),
							className: "mt-1 size-4 accent-ember"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ask Grok to name items and drop non-components. One request per fire. If Grok is unavailable, the parser still seals the registry." })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: shellQuiet,
					onClick: () => {
						const sealed = sealAsh();
						setError(null);
						setResult(sealed);
						remember(sealed, "Ash source");
						toast.success("Ash re-sealed by the parser");
					},
					children: "Seal Ash from its source"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/shelf",
					className: "text-sm text-muted underline",
					children: "Open the shelf"
				})]
			}),
			pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8",
				role: "status",
				"aria-live": "polite",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-fg",
						children: "Firing"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Resolving the repository, reading source, and sealing items."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 h-1 overflow-hidden rounded-full bg-line",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "kiln-heat h-full w-1/3 bg-ember" })
					})
				]
			}) : null,
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "mt-6 max-w-2xl rounded-lg border border-line bg-bg-raised px-4 py-3 text-sm text-fg",
				children: error
			}) : null,
			result ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForgeReport, {
					registry: result.registry,
					steps: result.steps,
					sealedBy: result.sealedBy,
					seal: result.seal,
					summary: result.summary ?? "",
					note: result.note,
					sourceLabel: `${result.source.owner}/${result.source.repo}`,
					sourceUrl: result.source.url
				})
			}) : null
		]
	});
}
//#endregion
export { ForgePage as component };
