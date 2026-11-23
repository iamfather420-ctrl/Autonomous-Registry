import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/previews-CgWxgpNd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cx$1(...parts) {
	return parts.filter(Boolean).join(" ");
}
var variants = {
	solid: "bg-orange-700 text-orange-50 hover:bg-orange-800",
	quiet: "bg-stone-200 text-stone-900 hover:bg-stone-300",
	outline: "border border-stone-300 bg-stone-50 text-stone-900 hover:border-stone-900",
	ink: "bg-stone-900 text-stone-50 hover:bg-stone-800"
};
var sizes = {
	sm: "h-9 px-3 text-xs",
	md: "h-11 px-4 text-sm",
	lg: "h-12 px-5 text-base"
};
function Button({ variant = "solid", size = "md", type = "button", disabled, className, children, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		disabled,
		onClick,
		className: cx$1("inline-flex items-center justify-center gap-2 rounded-lg font-medium tracking-wide transition-colors duration-150", "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700", "disabled:pointer-events-none disabled:opacity-40", variants[variant], sizes[size], className),
		children
	});
}
var tones = {
	neutral: "bg-stone-200 text-stone-900",
	ember: "bg-orange-700 text-orange-50",
	ink: "bg-stone-900 text-stone-50",
	quiet: "border border-stone-300 bg-transparent text-stone-600"
};
function Chip({ tone = "neutral", children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `inline-flex h-7 items-center rounded-full px-2.5 text-xs font-medium tracking-wide ${tones[tone]}`,
		children
	});
}
function cx(...parts) {
	return parts.filter(Boolean).join(" ");
}
function Field({ label, hint, error, value, placeholder, onChange, type = "text", name, readOnly }) {
	const autoId = (0, import_react.useId)();
	const help = error || hint;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex w-full flex-col gap-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: autoId,
				className: "text-sm font-medium text-stone-900",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: autoId,
				name,
				type,
				readOnly: readOnly || value !== void 0 && !onChange,
				value,
				placeholder,
				"aria-invalid": error ? true : void 0,
				"aria-describedby": help ? `${autoId}-help` : void 0,
				onChange: onChange ? (event) => onChange(event.target.value) : void 0,
				className: cx("h-11 rounded-lg border bg-stone-50 px-3 text-sm text-stone-900 outline-none transition-colors", "placeholder:text-stone-400 focus-visible:border-stone-900", error ? "border-orange-700" : "border-stone-300")
			}),
			help ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				id: `${autoId}-help`,
				className: cx("text-xs", error ? "text-orange-800" : "text-stone-500"),
				children: help
			}) : null
		]
	});
}
function Meter({ label, value, max = 100 }) {
	const safeMax = max <= 0 ? 100 : max;
	const clamped = Math.min(safeMax, Math.max(0, value));
	const pct = Math.round(clamped / safeMax * 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex w-full flex-col gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-baseline justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium text-stone-900",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "font-mono text-xs text-stone-500 tabular-nums",
				children: [pct, "%"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			role: "meter",
			"aria-label": label,
			"aria-valuemin": 0,
			"aria-valuemax": safeMax,
			"aria-valuenow": Math.round(clamped),
			className: "h-2 overflow-hidden rounded-full bg-stone-200",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-full rounded-full bg-orange-700",
				style: { width: `${pct}%` }
			})
		})]
	});
}
function Notice({ tone = "note", title, children }) {
	const ink = tone === "ink";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "status",
		className: `rounded-lg border px-4 py-3 ${tone === "ink" ? "border-stone-900 bg-stone-900" : tone === "ember" ? "border-orange-300 bg-orange-50" : "border-stone-300 bg-stone-50"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: `text-sm font-medium ${ink ? "text-stone-50" : "text-stone-900"}`,
			children: title
		}), children ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: `mt-1 text-sm ${ink ? "text-stone-300" : "text-stone-600"}`,
			children
		}) : null]
	});
}
function Panel({ kicker, title, action, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "w-full rounded-xl border border-stone-300 bg-stone-50",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-start justify-between gap-3 border-b border-stone-200 px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [kicker ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-wider text-stone-500 uppercase",
				children: kicker
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-base font-medium text-stone-900",
				children: title
			})] }), action ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "shrink-0",
				children: action
			}) : null]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-4 py-4",
			children
		})]
	});
}
function Segmented({ label, value, options, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "radiogroup",
		"aria-label": label,
		className: "inline-flex max-w-full flex-wrap gap-1 rounded-lg bg-stone-200 p-1",
		children: options.map((option) => {
			const selected = option.value === value;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				role: "radio",
				"aria-checked": selected,
				onClick: () => onChange?.(option.value),
				className: selected ? "h-9 min-w-11 rounded-md bg-stone-50 px-3 text-sm font-medium text-stone-900" : "h-9 min-w-11 rounded-md px-3 text-sm font-medium text-stone-500 hover:text-stone-900",
				children: option.label
			}, option.value);
		})
	});
}
function Snippet({ label = "Command", value }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full min-w-0 overflow-hidden rounded-lg bg-stone-900",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-3 px-3 pt-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-wide text-stone-400",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "h-8 rounded-md px-2 text-xs font-medium text-stone-50 hover:bg-stone-800",
				onClick: () => {
					navigator.clipboard.writeText(value).then(() => {
						setCopied(true);
						window.setTimeout(() => setCopied(false), 1400);
					});
				},
				children: copied ? "Copied" : "Copy"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
			className: "overflow-x-auto px-3 pb-3 font-mono text-sm break-all whitespace-pre-wrap text-stone-50",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: value })
		})]
	});
}
function Stat({ label, value, detail }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-wider text-stone-500 uppercase",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-4xl leading-none font-medium tracking-tight text-stone-900 tabular-nums",
				children: value
			}),
			detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-stone-500",
				children: detail
			}) : null
		]
	});
}
function Timeline({ steps }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "flex w-full flex-col",
		children: steps.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "grid grid-cols-[1.25rem_minmax(0,1fr)] gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: step.state === "wait" ? "mt-1.5 size-2.5 rounded-full bg-stone-300" : step.state === "current" ? "mt-1 size-3 rounded-full bg-orange-700 ring-4 ring-orange-200" : "mt-1.5 size-2.5 rounded-full bg-orange-700" }), index < steps.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1 w-px flex-1 bg-stone-300" }) : null]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: index === steps.length - 1 ? "pb-0" : "pb-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium text-stone-900",
					children: step.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-sm text-stone-500",
					children: step.detail
				})]
			})]
		}, step.title))
	});
}
function AshCompact({ name }) {
	switch (name) {
		case "button": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { children: "Fire" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "quiet",
					children: "Hold"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					children: "Inspect"
				})
			]
		});
		case "field": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Registry name",
			value: "ash",
			placeholder: "ash"
		});
		case "segmented": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
			label: "Temperature",
			value: "solid",
			options: [
				{
					value: "solid",
					label: "Solid"
				},
				{
					value: "quiet",
					label: "Quiet"
				},
				{
					value: "ink",
					label: "Ink"
				}
			]
		});
		case "chip": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap justify-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: "Ready" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					tone: "ember",
					children: "Firing"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					tone: "ink",
					children: "Sealed"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					tone: "quiet",
					children: "Wait"
				})
			]
		});
		case "notice": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
			title: "Tree walked",
			children: "11 component files kept from the public repo."
		});
		case "meter": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
			label: "Kiln heat",
			value: 72
		});
		case "stat": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
			label: "Items",
			value: "10",
			detail: "Served from /r"
		});
		case "snippet": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Snippet, {
			label: "Install",
			value: "npx shadcn@latest add /r/button.json"
		});
		case "timeline": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timeline, { steps: [{
			title: "Resolve",
			detail: "Public default branch",
			state: "done"
		}, {
			title: "Seal",
			detail: "Registry JSON written",
			state: "current"
		}] });
		case "panel": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			kicker: "Ash",
			title: "Button",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
				tone: "quiet",
				children: "ui"
			}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-stone-600",
				children: "A pressable control with four temperatures."
			})
		});
		default: return null;
	}
}
function ButtonPreview() {
	const [variant, setVariant] = (0, import_react.useState)("solid");
	const [size, setSize] = (0, import_react.useState)("md");
	const [disabled, setDisabled] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-start gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
					label: "Variant",
					value: variant,
					onChange: (value) => setVariant(value),
					options: [
						{
							value: "solid",
							label: "Solid"
						},
						{
							value: "quiet",
							label: "Quiet"
						},
						{
							value: "outline",
							label: "Outline"
						},
						{
							value: "ink",
							label: "Ink"
						}
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
					label: "Size",
					value: size,
					onChange: (value) => setSize(value),
					options: [
						{
							value: "sm",
							label: "Sm"
						},
						{
							value: "md",
							label: "Md"
						},
						{
							value: "lg",
							label: "Lg"
						}
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant,
				size,
				disabled,
				onClick: () => setDisabled(true),
				children: disabled ? "Disabled" : "Press to disable"
			}),
			disabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "text-sm text-stone-600 underline",
				onClick: () => setDisabled(false),
				children: "Reset"
			}) : null
		]
	});
}
function FieldPreview() {
	const [name, setName] = (0, import_react.useState)("ash");
	const [repo, setRepo] = (0, import_react.useState)("");
	const error = repo.length > 0 && !repo.includes("/") ? "Use owner/repo" : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid w-full gap-4 sm:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Registry name",
			value: name,
			onChange: setName,
			hint: "Kebab-case, unique in the registry."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "GitHub repo",
			value: repo,
			onChange: setRepo,
			placeholder: "owner/repo",
			error
		})]
	});
}
function SegmentedPreview() {
	const [value, setValue] = (0, import_react.useState)("parser");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-start gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
			label: "Sealer",
			value,
			onChange: setValue,
			options: [{
				value: "parser",
				label: "Parser"
			}, {
				value: "grok",
				label: "Grok"
			}]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm text-stone-600",
			children: [
				"Sealed by ",
				value === "grok" ? "Grok" : "the parser",
				"."
			]
		})]
	});
}
function ChipPreview() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-2",
		children: [
			"neutral",
			"ember",
			"ink",
			"quiet"
		].map((tone) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
			tone,
			children: tone
		}, tone))
	});
}
function NoticePreview() {
	const [tone, setTone] = (0, import_react.useState)("note");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex w-full flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
			label: "Tone",
			value: tone,
			onChange: (value) => setTone(value),
			options: [
				{
					value: "note",
					label: "Note"
				},
				{
					value: "ember",
					label: "Ember"
				},
				{
					value: "ink",
					label: "Ink"
				}
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
			tone,
			title: tone === "ink" ? "Registry sealed" : "Still firing",
			children: tone === "ember" ? "Grok rewrote titles. Source files were not changed." : "Eleven files kept. Nothing from this repo is executed."
		})]
	});
}
function MeterPreview() {
	const [value, setValue] = (0, import_react.useState)(64);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex w-full max-w-md flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
			label: "Files kept",
			value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "flex items-center gap-3 text-sm text-stone-600",
			children: ["Heat", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "range",
				min: 0,
				max: 100,
				value,
				"aria-label": "Meter value",
				onChange: (event) => setValue(Number(event.target.value)),
				className: "h-11 flex-1 accent-orange-700"
			})]
		})]
	});
}
function StatPreview() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid w-full grid-cols-3 gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
				label: "Items",
				value: "10",
				detail: "Ash"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
				label: "Deps",
				value: "0",
				detail: "Per primitive"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
				label: "Schema",
				value: "1",
				detail: "registry.json"
			})
		]
	});
}
function SnippetPreview() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Snippet, {
		label: "Install Button",
		value: "npx shadcn@latest add https://example.com/r/button.json"
	});
}
function TimelinePreview() {
	const [index, setIndex] = (0, import_react.useState)(1);
	const titles = [
		["Resolve", "Read the default branch"],
		["Walk", "Score component files"],
		["Seal", "Write registry items"]
	];
	const steps = titles.map(([title, detail], stepIndex) => ({
		title,
		detail,
		state: stepIndex < index ? "done" : stepIndex === index ? "current" : "wait"
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex w-full flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timeline, { steps }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "quiet",
				onClick: () => setIndex((n) => Math.max(0, n - 1)),
				children: "Back"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => setIndex((n) => Math.min(titles.length - 1, n + 1)),
				children: "Advance"
			})]
		})]
	});
}
function PanelPreview() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		kicker: "Forge",
		title: "cmdk",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
			tone: "ember",
			children: "11 files"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
				label: "Seal",
				value: "a4c1",
				detail: "Parser plus Grok"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ink",
				children: "Download registry.json"
			})]
		})
	});
}
function AshPreview({ name }) {
	switch (name) {
		case "button": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonPreview, {});
		case "field": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldPreview, {});
		case "segmented": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SegmentedPreview, {});
		case "chip": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipPreview, {});
		case "notice": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoticePreview, {});
		case "meter": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeterPreview, {});
		case "stat": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatPreview, {});
		case "snippet": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SnippetPreview, {});
		case "timeline": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelinePreview, {});
		case "panel": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelPreview, {});
		default: return null;
	}
}
//#endregion
export { AshPreview as n, AshCompact as t };
