import { C as require_jsx_runtime, x as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { c as shellQuiet, n as Route } from "./_ssr/router-BamLOpiv.mjs";
import { t as ForgeReport } from "./_ssr/result-BLf7bKTK.mjs";
import { n as useShelfHydrated, t as useShelf } from "./_ssr/store-wgANnM7L.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-CwtN3JEd.js
var import_jsx_runtime = require_jsx_runtime();
function ShelfDetail() {
	const { id } = Route.useParams();
	const ready = useShelfHydrated();
	const entry = useShelf((state) => state.entries.find((item) => item.id === id));
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "mx-auto max-w-6xl px-5 py-12 sm:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "Opening the shelf…"
		})
	});
	if (!entry) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-5 py-16 sm:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-5xl text-fg",
				children: "Seal not on this shelf"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted",
				children: "It may have been removed, or it was sealed in another browser."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/shelf",
				className: `${shellQuiet} mt-6`,
				children: "Back to the shelf"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/shelf",
			className: "text-sm text-muted",
			children: "← Shelf"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForgeReport, {
				registry: entry.registry,
				steps: entry.steps,
				sealedBy: entry.sealedBy,
				seal: entry.seal,
				summary: entry.summary,
				sourceLabel: entry.sourceLabel,
				sourceUrl: entry.sourceUrl
			})
		})]
	});
}
//#endregion
export { ShelfDetail as component };
