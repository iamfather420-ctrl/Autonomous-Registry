import { C as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as shellQuiet } from "./router-BamLOpiv.mjs";
import { n as useShelfHydrated, t as useShelf } from "./store-wgANnM7L.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shelf-Z_JlMo5t.js
var import_jsx_runtime = require_jsx_runtime();
function ShelfPage() {
	const ready = useShelfHydrated();
	const entries = useShelf((state) => state.entries);
	const remove = useShelf((state) => state.remove);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-wider text-ember uppercase",
				children: "Shelf"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-5xl leading-none text-fg",
				children: "Sealed registries"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-base text-muted",
				children: "Fires stay in this browser. Kiln keeps the latest four. Download registry.json from a seal if you want to host it."
			}),
			!ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-sm text-muted",
				children: "Opening the shelf…"
			}) : null,
			ready && entries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 rounded-2xl border border-line px-5 py-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-fg",
					children: "Nothing sealed yet."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/forge",
					className: `${shellQuiet} mt-4`,
					children: "Open the foundry"
				})]
			}) : null,
			ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-8 divide-y divide-line border-t border-line",
				children: entries.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-xs text-ember",
								children: ["Seal ", entry.seal]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 truncate font-display text-3xl text-fg",
								children: entry.registry.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted",
								children: [
									entry.sourceLabel,
									" · ",
									entry.registry.items.length,
									" items ·",
									" ",
									entry.sealedBy === "grok" ? "Grok" : "parser",
									" ·",
									" ",
									new Date(entry.createdAt).toLocaleString()
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shelf/$id",
							params: { id: entry.id },
							className: shellQuiet,
							children: "Open"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: shellQuiet,
							onClick: () => remove(entry.id),
							children: "Remove"
						})]
					})]
				}, entry.id))
			}) : null
		]
	});
}
//#endregion
export { ShelfPage as component };
