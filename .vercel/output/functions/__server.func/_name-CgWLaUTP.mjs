import { i as __toESM } from "./_runtime.mjs";
import { C as require_jsx_runtime, Z as require_react, x as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { i as CopyButton, r as Route$4 } from "./_ssr/router-BamLOpiv.mjs";
import { n as AshPreview } from "./_ssr/previews-CgWxgpNd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_name-CgWLaUTP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ItemPage() {
	const item = Route$4.useLoaderData();
	const [tab, setTab] = (0, import_react.useState)("source");
	const [json, setJson] = (0, import_react.useState)("");
	const [install, setInstall] = (0, import_react.useState)(`npx shadcn@latest add /r/${item.name}.json`);
	(0, import_react.useEffect)(() => {
		let cancel = false;
		setInstall(`npx shadcn@latest add ${window.location.origin}/r/${item.name}.json`);
		fetch(`/r/${item.name}.json`).then((response) => response.text()).then((text) => {
			if (!cancel) setJson(text);
		}).catch(() => {
			if (!cancel) setJson("");
		});
		return () => {
			cancel = true;
		};
	}, [item.name]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "text-sm text-muted",
				children: "← Registry"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs font-medium tracking-wider text-ember uppercase",
							children: ["registry:ui · ", item.category]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-2 font-display text-5xl leading-none text-fg",
							children: item.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-base text-muted",
							children: item.description
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton, {
							label: "Copy source",
							quiet: true,
							onCopy: () => item.source
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton, {
							label: "Copy item JSON",
							quiet: true,
							onCopy: async () => {
								if (json) return json;
								const response = await fetch(`/r/${item.name}.json`);
								if (!response.ok) throw new Error("missing");
								return response.text();
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton, {
							label: "Copy install",
							onCopy: () => install
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 font-mono text-xs break-all text-muted",
				children: install
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 rounded-2xl bg-stone-100 p-4 text-stone-900 sm:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-4 text-xs font-medium tracking-wider text-stone-500 uppercase",
					children: "Live component"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AshPreview, { name: item.name })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl text-fg",
					children: "Props"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[36rem] text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "text-xs tracking-wider text-muted uppercase",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-line",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-4 font-medium",
										children: "Name"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-4 font-medium",
										children: "Type"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-4 font-medium",
										children: "Required"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 font-medium",
										children: "Detail"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: item.props.map((prop) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-line align-top",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 pr-4 font-mono text-fg",
									children: prop.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 pr-4 font-mono text-xs text-muted",
									children: prop.type
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 pr-4 text-fg",
									children: prop.required ? "Yes" : "No"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 text-muted",
									children: prop.detail
								})
							]
						}, prop.name)) })]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-2",
						role: "tablist",
						"aria-label": "Source",
						children: [["source", "Source"], ["json", "Registry JSON"]].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							role: "tab",
							"aria-selected": tab === id,
							onClick: () => setTab(id),
							className: `h-10 rounded-full px-3 text-sm font-medium ${tab === id ? "bg-fg text-bg" : "bg-bg-raised text-muted"}`,
							children: label
						}, id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-mono text-xs text-muted",
						children: tab === "source" ? `registry/ui/${item.filename}` : `/r/${item.name}.json`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "mt-2 max-h-[32rem] overflow-auto rounded-xl border border-line bg-bg-raised p-4 font-mono text-xs leading-relaxed text-fg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: tab === "source" ? item.source : json || "Loading the served item…" })
					})
				]
			})
		]
	});
}
//#endregion
export { ItemPage as component };
