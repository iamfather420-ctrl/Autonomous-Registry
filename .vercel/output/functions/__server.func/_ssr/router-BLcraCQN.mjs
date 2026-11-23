import { i as __toESM } from "../_runtime.mjs";
import { n as REGISTRY_ITEM_SCHEMA, r as REGISTRY_SCHEMA } from "./types-PF7nF_s_.mjs";
import { C as require_jsx_runtime, S as useRouter, X as notFound, Z as require_react, _ as Outlet, b as createRootRoute, f as Scripts, g as createRouter, m as useRouterState, p as HeadContent, v as lazyRouteComponent, x as Link, y as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as object, i as number, o as string, r as literal, s as union } from "../_libs/zod.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalog-DyLynbIW.js
var button_default = "import type { ReactNode } from \"react\";\n\nfunction cx(...parts: Array<string | false | null | undefined>) {\n  return parts.filter(Boolean).join(\" \");\n}\n\nconst variants = {\n  solid: \"bg-orange-700 text-orange-50 hover:bg-orange-800\",\n  quiet: \"bg-stone-200 text-stone-900 hover:bg-stone-300\",\n  outline: \"border border-stone-300 bg-stone-50 text-stone-900 hover:border-stone-900\",\n  ink: \"bg-stone-900 text-stone-50 hover:bg-stone-800\",\n} as const;\n\nconst sizes = {\n  sm: \"h-9 px-3 text-xs\",\n  md: \"h-11 px-4 text-sm\",\n  lg: \"h-12 px-5 text-base\",\n} as const;\n\nexport type ButtonProps = {\n  variant?: \"solid\" | \"quiet\" | \"outline\" | \"ink\";\n  size?: \"sm\" | \"md\" | \"lg\";\n  type?: \"button\" | \"submit\" | \"reset\";\n  disabled?: boolean;\n  className?: string;\n  children?: ReactNode;\n  onClick?: () => void;\n};\n\nexport function Button({\n  variant = \"solid\",\n  size = \"md\",\n  type = \"button\",\n  disabled,\n  className,\n  children,\n  onClick,\n}: ButtonProps) {\n  return (\n    <button\n      type={type}\n      disabled={disabled}\n      onClick={onClick}\n      className={cx(\n        \"inline-flex items-center justify-center gap-2 rounded-lg font-medium tracking-wide transition-colors duration-150\",\n        \"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700\",\n        \"disabled:pointer-events-none disabled:opacity-40\",\n        variants[variant],\n        sizes[size],\n        className,\n      )}\n    >\n      {children}\n    </button>\n  );\n}\n";
var chip_default = "import type { ReactNode } from \"react\";\n\nconst tones = {\n  neutral: \"bg-stone-200 text-stone-900\",\n  ember: \"bg-orange-700 text-orange-50\",\n  ink: \"bg-stone-900 text-stone-50\",\n  quiet: \"border border-stone-300 bg-transparent text-stone-600\",\n} as const;\n\nexport type ChipProps = {\n  tone?: \"neutral\" | \"ember\" | \"ink\" | \"quiet\";\n  children?: ReactNode;\n};\n\nexport function Chip({ tone = \"neutral\", children }: ChipProps) {\n  return (\n    <span className={`inline-flex h-7 items-center rounded-full px-2.5 text-xs font-medium tracking-wide ${tones[tone]}`}>\n      {children}\n    </span>\n  );\n}\n";
var field_default = "import { useId } from \"react\";\n\nfunction cx(...parts: Array<string | false | null | undefined>) {\n  return parts.filter(Boolean).join(\" \");\n}\n\nexport type FieldProps = {\n  label: string;\n  hint?: string;\n  error?: string;\n  value?: string;\n  placeholder?: string;\n  onChange?: (value: string) => void;\n  type?: string;\n  name?: string;\n  readOnly?: boolean;\n};\n\nexport function Field({\n  label,\n  hint,\n  error,\n  value,\n  placeholder,\n  onChange,\n  type = \"text\",\n  name,\n  readOnly,\n}: FieldProps) {\n  const autoId = useId();\n  const help = error || hint;\n  return (\n    <div className=\"flex w-full flex-col gap-1.5\">\n      <label htmlFor={autoId} className=\"text-sm font-medium text-stone-900\">\n        {label}\n      </label>\n      <input\n        id={autoId}\n        name={name}\n        type={type}\n        readOnly={readOnly || (value !== undefined && !onChange)}\n        value={value}\n        placeholder={placeholder}\n        aria-invalid={error ? true : undefined}\n        aria-describedby={help ? `${autoId}-help` : undefined}\n        onChange={onChange ? (event) => onChange(event.target.value) : undefined}\n        className={cx(\n          \"h-11 rounded-lg border bg-stone-50 px-3 text-sm text-stone-900 outline-none transition-colors\",\n          \"placeholder:text-stone-400 focus-visible:border-stone-900\",\n          error ? \"border-orange-700\" : \"border-stone-300\",\n        )}\n      />\n      {help ? (\n        <p id={`${autoId}-help`} className={cx(\"text-xs\", error ? \"text-orange-800\" : \"text-stone-500\")}>\n          {help}\n        </p>\n      ) : null}\n    </div>\n  );\n}\n";
var meter_default = "export type MeterProps = {\n  label: string;\n  value: number;\n  max?: number;\n};\n\nexport function Meter({ label, value, max = 100 }: MeterProps) {\n  const safeMax = max <= 0 ? 100 : max;\n  const clamped = Math.min(safeMax, Math.max(0, value));\n  const pct = Math.round((clamped / safeMax) * 100);\n  return (\n    <div className=\"flex w-full flex-col gap-2\">\n      <div className=\"flex items-baseline justify-between gap-3\">\n        <span className=\"text-sm font-medium text-stone-900\">{label}</span>\n        <span className=\"font-mono text-xs text-stone-500 tabular-nums\">{pct}%</span>\n      </div>\n      <div\n        role=\"meter\"\n        aria-label={label}\n        aria-valuemin={0}\n        aria-valuemax={safeMax}\n        aria-valuenow={Math.round(clamped)}\n        className=\"h-2 overflow-hidden rounded-full bg-stone-200\"\n      >\n        <div className=\"h-full rounded-full bg-orange-700\" style={{ width: `${pct}%` }} />\n      </div>\n    </div>\n  );\n}\n";
var notice_default = "import type { ReactNode } from \"react\";\n\nexport type NoticeProps = {\n  tone?: \"note\" | \"ember\" | \"ink\";\n  title: string;\n  children?: ReactNode;\n};\n\nexport function Notice({ tone = \"note\", title, children }: NoticeProps) {\n  const ink = tone === \"ink\";\n  const frame =\n    tone === \"ink\"\n      ? \"border-stone-900 bg-stone-900\"\n      : tone === \"ember\"\n        ? \"border-orange-300 bg-orange-50\"\n        : \"border-stone-300 bg-stone-50\";\n  return (\n    <div role=\"status\" className={`rounded-lg border px-4 py-3 ${frame}`}>\n      <p className={`text-sm font-medium ${ink ? \"text-stone-50\" : \"text-stone-900\"}`}>{title}</p>\n      {children ? (\n        <p className={`mt-1 text-sm ${ink ? \"text-stone-300\" : \"text-stone-600\"}`}>{children}</p>\n      ) : null}\n    </div>\n  );\n}\n";
var panel_default = "import type { ReactNode } from \"react\";\n\nexport type PanelProps = {\n  kicker?: string;\n  title: string;\n  action?: ReactNode;\n  children?: ReactNode;\n};\n\nexport function Panel({ kicker, title, action, children }: PanelProps) {\n  return (\n    <section className=\"w-full rounded-xl border border-stone-300 bg-stone-50\">\n      <header className=\"flex items-start justify-between gap-3 border-b border-stone-200 px-4 py-3\">\n        <div>\n          {kicker ? <p className=\"text-xs font-medium tracking-wider text-stone-500 uppercase\">{kicker}</p> : null}\n          <h3 className=\"text-base font-medium text-stone-900\">{title}</h3>\n        </div>\n        {action ? <div className=\"shrink-0\">{action}</div> : null}\n      </header>\n      <div className=\"px-4 py-4\">{children}</div>\n    </section>\n  );\n}\n";
var segmented_default = "export type SegmentedOption = {\n  value: string;\n  label: string;\n};\n\nexport type SegmentedProps = {\n  label: string;\n  value: string;\n  options: SegmentedOption[];\n  onChange?: (value: string) => void;\n};\n\nexport function Segmented({ label, value, options, onChange }: SegmentedProps) {\n  return (\n    <div role=\"radiogroup\" aria-label={label} className=\"inline-flex max-w-full flex-wrap gap-1 rounded-lg bg-stone-200 p-1\">\n      {options.map((option) => {\n        const selected = option.value === value;\n        return (\n          <button\n            key={option.value}\n            type=\"button\"\n            role=\"radio\"\n            aria-checked={selected}\n            onClick={() => onChange?.(option.value)}\n            className={\n              selected\n                ? \"h-9 min-w-11 rounded-md bg-stone-50 px-3 text-sm font-medium text-stone-900\"\n                : \"h-9 min-w-11 rounded-md px-3 text-sm font-medium text-stone-500 hover:text-stone-900\"\n            }\n          >\n            {option.label}\n          </button>\n        );\n      })}\n    </div>\n  );\n}\n";
var snippet_default = "import { useState } from \"react\";\n\nexport type SnippetProps = {\n  label?: string;\n  value: string;\n};\n\nexport function Snippet({ label = \"Command\", value }: SnippetProps) {\n  const [copied, setCopied] = useState(false);\n\n  return (\n    <div className=\"w-full min-w-0 overflow-hidden rounded-lg bg-stone-900\">\n      <div className=\"flex items-center justify-between gap-3 px-3 pt-2\">\n        <p className=\"text-xs font-medium tracking-wide text-stone-400\">{label}</p>\n        <button\n          type=\"button\"\n          className=\"h-8 rounded-md px-2 text-xs font-medium text-stone-50 hover:bg-stone-800\"\n          onClick={() => {\n            void navigator.clipboard.writeText(value).then(() => {\n              setCopied(true);\n              window.setTimeout(() => setCopied(false), 1400);\n            });\n          }}\n        >\n          {copied ? \"Copied\" : \"Copy\"}\n        </button>\n      </div>\n      <pre className=\"overflow-x-auto px-3 pb-3 font-mono text-sm break-all whitespace-pre-wrap text-stone-50\">\n        <code>{value}</code>\n      </pre>\n    </div>\n  );\n}\n";
var stat_default = "export type StatProps = {\n  label: string;\n  value: string;\n  detail?: string;\n};\n\nexport function Stat({ label, value, detail }: StatProps) {\n  return (\n    <div className=\"flex flex-col gap-1\">\n      <p className=\"text-xs font-medium tracking-wider text-stone-500 uppercase\">{label}</p>\n      <p className=\"text-4xl leading-none font-medium tracking-tight text-stone-900 tabular-nums\">{value}</p>\n      {detail ? <p className=\"text-sm text-stone-500\">{detail}</p> : null}\n    </div>\n  );\n}\n";
var timeline_default = "export type TimelineStep = {\n  title: string;\n  detail: string;\n  state: \"done\" | \"current\" | \"wait\";\n};\n\nexport type TimelineProps = {\n  steps: TimelineStep[];\n};\n\nexport function Timeline({ steps }: TimelineProps) {\n  return (\n    <ol className=\"flex w-full flex-col\">\n      {steps.map((step, index) => (\n        <li key={step.title} className=\"grid grid-cols-[1.25rem_minmax(0,1fr)] gap-3\">\n          <div className=\"flex flex-col items-center\">\n            <span\n              className={\n                step.state === \"wait\"\n                  ? \"mt-1.5 size-2.5 rounded-full bg-stone-300\"\n                  : step.state === \"current\"\n                    ? \"mt-1 size-3 rounded-full bg-orange-700 ring-4 ring-orange-200\"\n                    : \"mt-1.5 size-2.5 rounded-full bg-orange-700\"\n              }\n            />\n            {index < steps.length - 1 ? <span className=\"mt-1 w-px flex-1 bg-stone-300\" /> : null}\n          </div>\n          <div className={index === steps.length - 1 ? \"pb-0\" : \"pb-5\"}>\n            <p className=\"text-sm font-medium text-stone-900\">{step.title}</p>\n            <p className=\"mt-0.5 text-sm text-stone-500\">{step.detail}</p>\n          </div>\n        </li>\n      ))}\n    </ol>\n  );\n}\n";
var DOCS = "Tailwind utilities only (stone and orange). No npm dependencies. The preview in Kiln renders this source; fetched repositories are never executed.";
var ASH = [
	{
		name: "button",
		title: "Button",
		description: "Pressable control in four temperatures — solid, quiet, outline, and ink — and three heights.",
		category: "control",
		filename: "button.tsx",
		source: button_default,
		props: [
			{
				name: "variant",
				type: "\"solid\" | \"quiet\" | \"outline\" | \"ink\"",
				required: false,
				detail: "Visual temperature. Defaults to solid."
			},
			{
				name: "size",
				type: "\"sm\" | \"md\" | \"lg\"",
				required: false,
				detail: "Height and type size. Defaults to md."
			},
			{
				name: "type",
				type: "\"button\" | \"submit\" | \"reset\"",
				required: false,
				detail: "Native button type. Defaults to button."
			},
			{
				name: "disabled",
				type: "boolean",
				required: false,
				detail: "Blocks clicks and dims the control."
			},
			{
				name: "children",
				type: "ReactNode",
				required: false,
				detail: "Label or inner content."
			},
			{
				name: "onClick",
				type: "() => void",
				required: false,
				detail: "Click handler."
			}
		]
	},
	{
		name: "field",
		title: "Field",
		description: "Labeled text input with optional hint or error, wired to aria-invalid and a described-by id.",
		category: "input",
		filename: "field.tsx",
		source: field_default,
		props: [
			{
				name: "label",
				type: "string",
				required: true,
				detail: "Visible label, associated with the input."
			},
			{
				name: "hint",
				type: "string",
				required: false,
				detail: "Helper text under the field."
			},
			{
				name: "error",
				type: "string",
				required: false,
				detail: "Replaces the hint and marks the field invalid."
			},
			{
				name: "value",
				type: "string",
				required: false,
				detail: "Controlled value."
			},
			{
				name: "placeholder",
				type: "string",
				required: false,
				detail: "Placeholder copy."
			},
			{
				name: "onChange",
				type: "(value: string) => void",
				required: false,
				detail: "Receives the next string, not the event."
			},
			{
				name: "type",
				type: "string",
				required: false,
				detail: "Input type. Defaults to text."
			},
			{
				name: "name",
				type: "string",
				required: false,
				detail: "Form field name."
			},
			{
				name: "readOnly",
				type: "boolean",
				required: false,
				detail: "Locks the input. Also implied when value is set without onChange."
			}
		]
	},
	{
		name: "segmented",
		title: "Segmented",
		description: "Single-select control rendered as a radiogroup. One option is pressed at a time.",
		category: "control",
		filename: "segmented.tsx",
		source: segmented_default,
		props: [
			{
				name: "label",
				type: "string",
				required: true,
				detail: "Accessible name for the radiogroup."
			},
			{
				name: "value",
				type: "string",
				required: true,
				detail: "Currently selected option value."
			},
			{
				name: "options",
				type: "SegmentedOption[]",
				required: true,
				detail: "Each option has a value and a label."
			},
			{
				name: "onChange",
				type: "(value: string) => void",
				required: false,
				detail: "Called with the next value."
			}
		]
	},
	{
		name: "chip",
		title: "Chip",
		description: "Compact status marker. Neutral, ember, ink, or a quiet outline.",
		category: "status",
		filename: "chip.tsx",
		source: chip_default,
		props: [{
			name: "tone",
			type: "\"neutral\" | \"ember\" | \"ink\" | \"quiet\"",
			required: false,
			detail: "Defaults to neutral."
		}, {
			name: "children",
			type: "ReactNode",
			required: false,
			detail: "Short status label."
		}]
	},
	{
		name: "notice",
		title: "Notice",
		description: "Inline status block with a title, supporting text, and a note, ember, or ink tone.",
		category: "status",
		filename: "notice.tsx",
		source: notice_default,
		props: [
			{
				name: "tone",
				type: "\"note\" | \"ember\" | \"ink\"",
				required: false,
				detail: "Defaults to note."
			},
			{
				name: "title",
				type: "string",
				required: true,
				detail: "Primary line."
			},
			{
				name: "children",
				type: "ReactNode",
				required: false,
				detail: "Supporting sentence."
			}
		]
	},
	{
		name: "meter",
		title: "Meter",
		description: "Labeled progress meter with a numeric percent and an accessible value range.",
		category: "data",
		filename: "meter.tsx",
		source: meter_default,
		props: [
			{
				name: "label",
				type: "string",
				required: true,
				detail: "Visible name and accessible label."
			},
			{
				name: "value",
				type: "number",
				required: true,
				detail: "Current value, clamped to the range."
			},
			{
				name: "max",
				type: "number",
				required: false,
				detail: "Range maximum. Defaults to 100."
			}
		]
	},
	{
		name: "stat",
		title: "Stat",
		description: "One figure, a small label, and an optional supporting line. Figures use tabular numbers.",
		category: "data",
		filename: "stat.tsx",
		source: stat_default,
		props: [
			{
				name: "label",
				type: "string",
				required: true,
				detail: "Uppercase caption."
			},
			{
				name: "value",
				type: "string",
				required: true,
				detail: "The figure, already formatted."
			},
			{
				name: "detail",
				type: "string",
				required: false,
				detail: "Secondary line under the figure."
			}
		]
	},
	{
		name: "snippet",
		title: "Snippet",
		description: "Monospace value with its own copy control and a short copied state.",
		category: "data",
		filename: "snippet.tsx",
		source: snippet_default,
		props: [{
			name: "label",
			type: "string",
			required: false,
			detail: "Caption. Defaults to Command."
		}, {
			name: "value",
			type: "string",
			required: true,
			detail: "Exact text copied to the clipboard."
		}]
	},
	{
		name: "timeline",
		title: "Timeline",
		description: "Ordered steps marked done, current, or waiting. Current steps carry an ember ring.",
		category: "data",
		filename: "timeline.tsx",
		source: timeline_default,
		props: [{
			name: "steps",
			type: "TimelineStep[]",
			required: true,
			detail: "Each step has a title, detail, and state: done, current, or wait."
		}]
	},
	{
		name: "panel",
		title: "Panel",
		description: "Titled surface with an optional kicker and a header action. Body is whatever you pass as children.",
		category: "surface",
		filename: "panel.tsx",
		source: panel_default,
		props: [
			{
				name: "kicker",
				type: "string",
				required: false,
				detail: "Small uppercase line above the title."
			},
			{
				name: "title",
				type: "string",
				required: true,
				detail: "Panel heading."
			},
			{
				name: "action",
				type: "ReactNode",
				required: false,
				detail: "Slot at the end of the header."
			},
			{
				name: "children",
				type: "ReactNode",
				required: false,
				detail: "Body content."
			}
		]
	}
];
function itemFromEntry(entry, withContent) {
	return {
		$schema: REGISTRY_ITEM_SCHEMA,
		name: entry.name,
		type: "registry:ui",
		title: entry.title,
		description: entry.description,
		categories: [entry.category],
		docs: DOCS,
		files: [{
			path: `registry/ui/${entry.filename}`,
			type: "registry:ui",
			...withContent ? { content: entry.source } : {}
		}]
	};
}
function ashRegistry(homepage, withContent = true) {
	return {
		$schema: REGISTRY_SCHEMA,
		name: "ash",
		homepage,
		items: ASH.map((entry) => itemFromEntry(entry, withContent))
	};
}
function ashItem(name) {
	return ASH.find((entry) => entry.name === name);
}
var ASH_CATEGORIES = ["all", ...new Set(ASH.map((entry) => entry.category))];
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-BLcraCQN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 bg-bg px-6 text-center text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl text-fg",
			children: "Kiln stopped"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "max-w-md text-sm break-words text-muted",
			children: errorMessage(error)
		})]
	});
}
/**
* Path-based preview hosts serve the dev server under `/{port_id}/` and strip
* that prefix before forwarding, so SSR sees `/` while the browser URL keeps the
* prefix. TanStack Start resets `basepath` on hydration, so a `rewrite` keeps
* client routing and generated links aligned with the public URL.
*/
var PATH_BASED_PREVIEW_HOSTS = /* @__PURE__ */ new Set([
	"preview.grok.genai.mil",
	"preview.grok.mil",
	"preview.grokgsac.com"
]);
var PORT_ID_PREFIX = /^\/hds-[a-z0-9]+-\d+-[a-z0-9]+(?=\/|$)/i;
function previewPathPrefix(hostname, pathname) {
	if (!PATH_BASED_PREVIEW_HOSTS.has(hostname.toLowerCase())) return void 0;
	return PORT_ID_PREFIX.exec(pathname)?.[0];
}
function prefixRewrite(prefix) {
	return {
		input: ({ url }) => {
			if (url.pathname === prefix) url.pathname = "/";
			else if (url.pathname.startsWith(`${prefix}/`)) url.pathname = url.pathname.slice(prefix.length);
			return url;
		},
		output: ({ url }) => {
			url.pathname = `${prefix}${url.pathname}`;
			return url;
		}
	};
}
function previewPathRewrite() {
	if (typeof window === "undefined") return void 0;
	const prefix = previewPathPrefix(window.location.hostname, window.location.pathname);
	return prefix ? prefixRewrite(prefix) : void 0;
}
var shellPrimary = "inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-fg px-4 text-sm font-medium text-bg transition-colors duration-150 hover:bg-fg/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember disabled:cursor-not-allowed disabled:opacity-40";
var shellQuiet = "inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-line bg-bg-raised px-4 text-sm font-medium text-fg transition-colors duration-150 hover:border-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember disabled:cursor-not-allowed disabled:opacity-40";
var shellInput = "h-11 w-full rounded-lg border border-line bg-bg px-3 text-sm text-fg outline-none placeholder:text-muted focus-visible:border-fg";
function Mark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "5",
				y: "5",
				width: "22",
				height: "22",
				rx: "3",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M10 21.5 16 9.5 22 21.5",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M12.4 17.4h7.2",
				stroke: "var(--color-ember)",
				strokeWidth: "1.75"
			})
		]
	});
}
function CopyButton({ label, idle, done = "Copied", quiet = false, onCopy }) {
	const [state, setState] = (0, import_react.useState)("idle");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: quiet ? shellQuiet : shellPrimary,
		onClick: () => {
			Promise.resolve(onCopy()).then(async (value) => {
				if (typeof value === "string") await navigator.clipboard.writeText(value);
				setState("done");
				window.setTimeout(() => setState("idle"), 1400);
			}).catch(() => toast.error("Could not copy that."));
		},
		children: state === "done" ? done : idle ?? label
	});
}
function downloadJson(filename, value) {
	const blob = new Blob([JSON.stringify(value, null, 2)], { type: "application/json" });
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = filename;
	link.click();
	URL.revokeObjectURL(url);
}
var LINKS = [
	{
		to: "/",
		label: "Registry",
		exact: true
	},
	{
		to: "/forge",
		label: "Foundry",
		exact: false
	},
	{
		to: "/shelf",
		label: "Shelf",
		exact: false
	}
];
function AppHeader() {
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-20 border-b border-line bg-bg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-5 sm:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "inline-flex h-11 items-center gap-2 text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: "size-7" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-xl leading-none tracking-tight",
					children: "Kiln"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex items-center",
				"aria-label": "Primary",
				children: LINKS.map((link) => {
					const active = link.exact ? pathname === link.to : pathname === link.to || pathname.startsWith(`${link.to}/`);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: link.to,
						"aria-current": active ? "page" : void 0,
						className: `inline-flex h-11 items-center px-2.5 text-sm font-medium sm:px-3 ${active ? "text-fg" : "text-muted"}`,
						children: link.label
					}, link.to);
				})
			})]
		})
	});
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var styles_default = "/assets/styles-BJ-y9LWx.css";
var Route$7 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Kiln" },
			{
				name: "description",
				content: "Kiln seals a production component registry from a public git repository. Ash, a real registry, is already served."
			},
			{
				name: "theme-color",
				content: "#141210"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-bg font-sans text-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
						position: "bottom-center",
						toastOptions: { style: {
							background: "var(--color-bg-raised)",
							color: "var(--color-fg)",
							border: "1px solid var(--color-line)"
						} }
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
var $$splitComponentImporter$4 = () => import("./routes-RZu_7Rtl.mjs");
var Route$6 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "Ash registry — Kiln" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./forge-B0yYahsR.mjs");
var Route$5 = createFileRoute("/forge")({
	head: () => ({ meta: [{ title: "Foundry — Kiln" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("../_name-CBdBMh1U.mjs");
var $$splitNotFoundComponentImporter = () => import("../_name-B-gibK7y.mjs");
var Route$4 = createFileRoute("/items/$name")({
	loader: ({ params }) => {
		const item = ashItem(params.name);
		if (!item) throw notFound();
		return {
			name: item.name,
			title: item.title,
			description: item.description,
			category: item.category,
			filename: item.filename,
			source: item.source,
			props: item.props
		};
	},
	head: ({ loaderData }) => ({ meta: [{ title: loaderData ? `${loaderData.title} — Kiln` : "Kiln" }] }),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
function json$1(body, status = 200) {
	return new Response(JSON.stringify(body, null, 2), {
		status,
		headers: {
			"content-type": "application/json; charset=utf-8",
			"access-control-allow-origin": "*",
			"cache-control": "no-store"
		}
	});
}
var Route$3 = createFileRoute("/r/registry.json")({ server: { handlers: { GET: async ({ request }) => {
	const origin = new URL(request.url).origin;
	return json$1(ashRegistry(origin, false));
} } } });
function json(body, status = 200) {
	return new Response(JSON.stringify(body, null, 2), {
		status,
		headers: {
			"content-type": "application/json; charset=utf-8",
			"access-control-allow-origin": "*",
			"cache-control": "no-store"
		}
	});
}
var Route$2 = createFileRoute("/r/{$name}.json")({ server: { handlers: { GET: async ({ request, params }) => {
	const name = params.name;
	if (!ashItem(name)) return json({ error: "Not in the Ash registry." }, 404);
	const origin = new URL(request.url).origin;
	const item = ashRegistry(origin, true).items.find((entry) => entry.name === name);
	if (!item) return json({ error: "Not in the Ash registry." }, 404);
	return json(item);
} } } });
var $$splitComponentImporter$1 = () => import("./shelf-B4mjBgPe.mjs");
var Route$1 = createFileRoute("/shelf/")({
	head: () => ({ meta: [{ title: "Shelf — Kiln" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("../_id-CRb2saVW.mjs");
var Route = createFileRoute("/shelf/$id")({
	head: () => ({ meta: [{ title: "Sealed registry — Kiln" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$6.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$7
});
var ForgeRoute = Route$5.update({
	id: "/forge",
	path: "/forge",
	getParentRoute: () => Route$7
});
var ItemsNameRoute = Route$4.update({
	id: "/items/$name",
	path: "/items/$name",
	getParentRoute: () => Route$7
});
var RRegistryDotjsonRoute = Route$3.update({
	id: "/r/registry.json",
	path: "/r/registry.json",
	getParentRoute: () => Route$7
});
var RChar123nameChar125DotjsonRoute = Route$2.update({
	id: "/r/{$name}.json",
	path: "/r/{$name}.json",
	getParentRoute: () => Route$7
});
var ShelfIndexRoute = Route$1.update({
	id: "/shelf/",
	path: "/shelf/",
	getParentRoute: () => Route$7
});
var rootRouteChildren = {
	IndexRoute,
	ForgeRoute,
	ItemsNameRoute,
	RRegistryDotjsonRoute,
	RChar123nameChar125DotjsonRoute,
	ShelfIdRoute: Route.update({
		id: "/shelf/$id",
		path: "/shelf/$id",
		getParentRoute: () => Route$7
	}),
	ShelfIndexRoute
};
var routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		rewrite: previewPathRewrite(),
		defaultErrorComponent: AppErrorComponent,
		scrollRestoration: true
	});
}
//#endregion
export { downloadJson as a, shellQuiet as c, CopyButton as i, ASH as l, Route as n, shellInput as o, Route$4 as r, shellPrimary as s, router_exports as t, ASH_CATEGORIES as u };
