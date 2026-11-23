import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as downloadJson, i as CopyButton, s as shellPrimary } from "./router-BamLOpiv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/result-BLf7bKTK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ForgeReport({ registry, steps, sealedBy, seal, summary, note, sourceLabel, sourceUrl }) {
	const [open, setOpen] = (0, import_react.useState)(registry.items[0]?.name ?? "");
	const active = registry.items.find((item) => item.name === open) ?? registry.items[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs font-medium tracking-wider text-ember uppercase",
							children: ["Seal ", seal]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-4xl leading-none text-fg",
							children: registry.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted",
							children: summary
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted",
							children: [
								registry.items.length,
								" items · sealed by ",
								sealedBy === "grok" ? "Grok" : "the parser",
								" · ",
								sourceLabel
							]
						}),
						note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-fg",
							children: note
						}) : null
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: shellPrimary,
						onClick: () => downloadJson(`${registry.name}-registry.json`, registry),
						children: "Download registry.json"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton, {
						quiet: true,
						label: "Copy registry JSON",
						onCopy: () => JSON.stringify(registry, null, 2)
					})]
				})]
			}),
			sourceUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"Source stays on GitHub. This seal is a file for you to host. Kiln does not publish fetched code.",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: sourceUrl,
						className: "text-fg underline",
						target: "_blank",
						rel: "noreferrer",
						children: sourceLabel
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "grid gap-4 sm:grid-cols-2",
				children: steps.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "border-t border-line pt-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs font-medium tracking-wider text-muted tabular-nums",
							children: ["0", index + 1]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm font-medium text-fg",
							children: step.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: step.detail
						})
					]
				}, step.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 lg:grid-cols-[16rem_minmax(0,1fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible",
					children: registry.items.map((item) => {
						const selected = item.name === active?.name;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "shrink-0 lg:shrink",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								"aria-pressed": selected,
								onClick: () => setOpen(item.name),
								className: `flex h-11 w-full items-center justify-between gap-3 rounded-lg px-3 text-left text-sm ${selected ? "bg-fg text-bg" : "bg-bg-raised text-fg"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate font-medium",
									children: item.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: selected ? "text-bg/70" : "text-muted",
									children: item.type.replace("registry:", "")
								})]
							})
						}, item.name);
					})
				}), active ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "min-w-0 rounded-2xl bg-bg-raised p-4 sm:p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-3xl text-fg",
								children: active.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-xl text-sm text-muted",
								children: active.description
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton, {
								quiet: true,
								label: "Copy item JSON",
								onCopy: () => JSON.stringify(active, null, 2)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-4 grid gap-3 text-sm sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted",
									children: "Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-mono text-fg",
									children: active.name
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted",
									children: "Category"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-fg",
									children: active.categories?.join(", ") || "—"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted",
									children: "Dependencies"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-fg",
									children: active.dependencies?.join(", ") || "None"
								})] })
							]
						}),
						active.files.map((file) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs text-muted",
								children: file.path
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
								className: "mt-2 max-h-80 overflow-auto rounded-lg border border-line bg-bg p-3 font-mono text-xs leading-relaxed text-fg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: file.content || "Source omitted from this view." })
							})]
						}, file.path)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs text-muted",
							children: "Fetched source is shown, never executed."
						})
					]
				}) : null]
			})
		]
	});
}
//#endregion
export { ForgeReport as t };
