import { C as require_jsx_runtime, x as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { c as shellQuiet } from "./_ssr/router-BamLOpiv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_name-BpoMSTuC.js
var import_jsx_runtime = require_jsx_runtime();
function MissingItem() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-5 py-16 sm:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-5xl text-fg",
				children: "Not in Ash"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted",
				children: "That name is not part of the fired registry."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: `${shellQuiet} mt-6`,
				children: "Back to the registry"
			})
		]
	});
}
//#endregion
export { MissingItem as notFoundComponent };
