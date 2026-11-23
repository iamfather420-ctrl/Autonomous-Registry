import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Z as require_react, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as CopyButton, l as ASH, o as shellInput, s as shellPrimary, u as ASH_CATEGORIES } from "./router-BLcraCQN.mjs";
import { t as AshCompact } from "./previews-CgWxgpNd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-RZu_7Rtl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const [query, setQuery] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("all");
	const [served, setServed] = (0, import_react.useState)(null);
	const [servedError, setServedError] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let cancel = false;
		fetch("/r/registry.json").then((response) => {
			if (!response.ok) throw new Error("bad status");
			return response.json();
		}).then((body) => {
			if (!cancel) setServed(Array.isArray(body.items) ? body.items.length : 0);
		}).catch(() => {
			if (!cancel) setServedError(true);
		});
		return () => {
			cancel = true;
		};
	}, []);
	const items = (0, import_react.useMemo)(() => {
		const needle = query.trim().toLowerCase();
		return ASH.filter((item) => {
			if (category !== "all" && item.category !== category) return false;
			if (!needle) return true;
			return item.name.includes(needle) || item.title.toLowerCase().includes(needle) || item.description.toLowerCase().includes(needle);
		});
	}, [query, category]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-wider text-ember uppercase",
				children: "Registry · already fired"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 max-w-3xl font-display text-5xl leading-none text-fg sm:text-6xl",
				children: "Ash is a real registry."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-base text-muted",
				children: "Ten primitives, no npm dependencies, served as registry JSON from this app. Open an item to use the actual component. When you want a registry from a repository, the foundry walks the git tree and seals one."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/forge",
					className: shellPrimary,
					children: "Forge from a git repo"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton, {
					quiet: true,
					label: "Copy registry index",
					onCopy: async () => {
						const response = await fetch("/r/registry.json");
						if (!response.ok) throw new Error("missing");
						return response.text();
					}
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4",
				children: [
					["Items", String(ASH.length)],
					["Schema", "registry.json"],
					["Dependencies", "None"],
					["Endpoint", servedError ? "Offline" : served === null ? "Checking" : `${served} served`]
				].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-bg px-4 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs font-medium tracking-wider text-muted uppercase",
						children: label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 text-lg font-medium text-fg tabular-nums",
						children: value
					})]
				}, label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 font-mono text-xs text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "text-fg underline",
						href: "/r/registry.json",
						children: "/r/registry.json"
					}),
					" · ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "text-fg underline",
						href: "/r/button.json",
						children: "/r/button.json"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						role: "group",
						"aria-label": "Categories",
						children: ASH_CATEGORIES.map((entry) => {
							const selected = entry === category;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": selected,
								onClick: () => setCategory(entry),
								className: `h-10 rounded-full px-3 text-sm font-medium ${selected ? "bg-fg text-bg" : "bg-bg-raised text-muted"}`,
								children: entry
							}, entry);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "sr-only",
						htmlFor: "ash-search",
						children: "Search Ash"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "ash-search",
						value: query,
						onChange: (event) => setQuery(event.target.value),
						placeholder: "Search Ash",
						className: `${shellInput} sm:max-w-xs`
					})
				]
			}),
			items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 text-sm text-muted",
				children: "Nothing in Ash matches that."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "min-w-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/items/$name",
						params: { name: item.name },
						className: "flex h-full min-w-0 flex-col overflow-hidden rounded-2xl bg-bg-raised p-2 shadow-card transition-shadow duration-150 hover:shadow-card-hover",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							inert: true,
							className: "pointer-events-none flex h-44 min-w-0 items-center justify-center overflow-hidden rounded-lg bg-stone-100 px-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full min-w-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AshCompact, { name: item.name })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-1 flex-col px-3 pt-3 pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-2xl text-fg",
									children: item.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs tracking-wide text-muted uppercase",
									children: item.category
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: item.description
							})]
						})]
					})
				}, item.name))
			})
		]
	});
}
//#endregion
export { Home as component };
