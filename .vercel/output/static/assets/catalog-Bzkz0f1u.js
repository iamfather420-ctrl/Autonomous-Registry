var e=[{name:`button`,title:`Button`,description:`Pressable control in four temperatures — solid, quiet, outline, and ink — and three heights.`,category:`control`,filename:`button.tsx`,source:`import type { ReactNode } from "react";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const variants = {
  solid: "bg-orange-700 text-orange-50 hover:bg-orange-800",
  quiet: "bg-stone-200 text-stone-900 hover:bg-stone-300",
  outline: "border border-stone-300 bg-stone-50 text-stone-900 hover:border-stone-900",
  ink: "bg-stone-900 text-stone-50 hover:bg-stone-800",
} as const;

const sizes = {
  sm: "h-9 px-3 text-xs",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-base",
} as const;

export type ButtonProps = {
  variant?: "solid" | "quiet" | "outline" | "ink";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
};

export function Button({
  variant = "solid",
  size = "md",
  type = "button",
  disabled,
  className,
  children,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium tracking-wide transition-colors duration-150",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700",
        "disabled:pointer-events-none disabled:opacity-40",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </button>
  );
}
`,props:[{name:`variant`,type:`"solid" | "quiet" | "outline" | "ink"`,required:!1,detail:`Visual temperature. Defaults to solid.`},{name:`size`,type:`"sm" | "md" | "lg"`,required:!1,detail:`Height and type size. Defaults to md.`},{name:`type`,type:`"button" | "submit" | "reset"`,required:!1,detail:`Native button type. Defaults to button.`},{name:`disabled`,type:`boolean`,required:!1,detail:`Blocks clicks and dims the control.`},{name:`children`,type:`ReactNode`,required:!1,detail:`Label or inner content.`},{name:`onClick`,type:`() => void`,required:!1,detail:`Click handler.`}]},{name:`field`,title:`Field`,description:`Labeled text input with optional hint or error, wired to aria-invalid and a described-by id.`,category:`input`,filename:`field.tsx`,source:`import { useId } from "react";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export type FieldProps = {
  label: string;
  hint?: string;
  error?: string;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  type?: string;
  name?: string;
  readOnly?: boolean;
};

export function Field({
  label,
  hint,
  error,
  value,
  placeholder,
  onChange,
  type = "text",
  name,
  readOnly,
}: FieldProps) {
  const autoId = useId();
  const help = error || hint;
  return (
    <div className="flex w-full flex-col gap-1.5">
      <label htmlFor={autoId} className="text-sm font-medium text-stone-900">
        {label}
      </label>
      <input
        id={autoId}
        name={name}
        type={type}
        readOnly={readOnly || (value !== undefined && !onChange)}
        value={value}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={help ? \`\${autoId}-help\` : undefined}
        onChange={onChange ? (event) => onChange(event.target.value) : undefined}
        className={cx(
          "h-11 rounded-lg border bg-stone-50 px-3 text-sm text-stone-900 outline-none transition-colors",
          "placeholder:text-stone-400 focus-visible:border-stone-900",
          error ? "border-orange-700" : "border-stone-300",
        )}
      />
      {help ? (
        <p id={\`\${autoId}-help\`} className={cx("text-xs", error ? "text-orange-800" : "text-stone-500")}>
          {help}
        </p>
      ) : null}
    </div>
  );
}
`,props:[{name:`label`,type:`string`,required:!0,detail:`Visible label, associated with the input.`},{name:`hint`,type:`string`,required:!1,detail:`Helper text under the field.`},{name:`error`,type:`string`,required:!1,detail:`Replaces the hint and marks the field invalid.`},{name:`value`,type:`string`,required:!1,detail:`Controlled value.`},{name:`placeholder`,type:`string`,required:!1,detail:`Placeholder copy.`},{name:`onChange`,type:`(value: string) => void`,required:!1,detail:`Receives the next string, not the event.`},{name:`type`,type:`string`,required:!1,detail:`Input type. Defaults to text.`},{name:`name`,type:`string`,required:!1,detail:`Form field name.`},{name:`readOnly`,type:`boolean`,required:!1,detail:`Locks the input. Also implied when value is set without onChange.`}]},{name:`segmented`,title:`Segmented`,description:`Single-select control rendered as a radiogroup. One option is pressed at a time.`,category:`control`,filename:`segmented.tsx`,source:`export type SegmentedOption = {
  value: string;
  label: string;
};

export type SegmentedProps = {
  label: string;
  value: string;
  options: SegmentedOption[];
  onChange?: (value: string) => void;
};

export function Segmented({ label, value, options, onChange }: SegmentedProps) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex max-w-full flex-wrap gap-1 rounded-lg bg-stone-200 p-1">
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange?.(option.value)}
            className={
              selected
                ? "h-9 min-w-11 rounded-md bg-stone-50 px-3 text-sm font-medium text-stone-900"
                : "h-9 min-w-11 rounded-md px-3 text-sm font-medium text-stone-500 hover:text-stone-900"
            }
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
`,props:[{name:`label`,type:`string`,required:!0,detail:`Accessible name for the radiogroup.`},{name:`value`,type:`string`,required:!0,detail:`Currently selected option value.`},{name:`options`,type:`SegmentedOption[]`,required:!0,detail:`Each option has a value and a label.`},{name:`onChange`,type:`(value: string) => void`,required:!1,detail:`Called with the next value.`}]},{name:`chip`,title:`Chip`,description:`Compact status marker. Neutral, ember, ink, or a quiet outline.`,category:`status`,filename:`chip.tsx`,source:`import type { ReactNode } from "react";

const tones = {
  neutral: "bg-stone-200 text-stone-900",
  ember: "bg-orange-700 text-orange-50",
  ink: "bg-stone-900 text-stone-50",
  quiet: "border border-stone-300 bg-transparent text-stone-600",
} as const;

export type ChipProps = {
  tone?: "neutral" | "ember" | "ink" | "quiet";
  children?: ReactNode;
};

export function Chip({ tone = "neutral", children }: ChipProps) {
  return (
    <span className={\`inline-flex h-7 items-center rounded-full px-2.5 text-xs font-medium tracking-wide \${tones[tone]}\`}>
      {children}
    </span>
  );
}
`,props:[{name:`tone`,type:`"neutral" | "ember" | "ink" | "quiet"`,required:!1,detail:`Defaults to neutral.`},{name:`children`,type:`ReactNode`,required:!1,detail:`Short status label.`}]},{name:`notice`,title:`Notice`,description:`Inline status block with a title, supporting text, and a note, ember, or ink tone.`,category:`status`,filename:`notice.tsx`,source:`import type { ReactNode } from "react";

export type NoticeProps = {
  tone?: "note" | "ember" | "ink";
  title: string;
  children?: ReactNode;
};

export function Notice({ tone = "note", title, children }: NoticeProps) {
  const ink = tone === "ink";
  const frame =
    tone === "ink"
      ? "border-stone-900 bg-stone-900"
      : tone === "ember"
        ? "border-orange-300 bg-orange-50"
        : "border-stone-300 bg-stone-50";
  return (
    <div role="status" className={\`rounded-lg border px-4 py-3 \${frame}\`}>
      <p className={\`text-sm font-medium \${ink ? "text-stone-50" : "text-stone-900"}\`}>{title}</p>
      {children ? (
        <p className={\`mt-1 text-sm \${ink ? "text-stone-300" : "text-stone-600"}\`}>{children}</p>
      ) : null}
    </div>
  );
}
`,props:[{name:`tone`,type:`"note" | "ember" | "ink"`,required:!1,detail:`Defaults to note.`},{name:`title`,type:`string`,required:!0,detail:`Primary line.`},{name:`children`,type:`ReactNode`,required:!1,detail:`Supporting sentence.`}]},{name:`meter`,title:`Meter`,description:`Labeled progress meter with a numeric percent and an accessible value range.`,category:`data`,filename:`meter.tsx`,source:`export type MeterProps = {
  label: string;
  value: number;
  max?: number;
};

export function Meter({ label, value, max = 100 }: MeterProps) {
  const safeMax = max <= 0 ? 100 : max;
  const clamped = Math.min(safeMax, Math.max(0, value));
  const pct = Math.round((clamped / safeMax) * 100);
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-stone-900">{label}</span>
        <span className="font-mono text-xs text-stone-500 tabular-nums">{pct}%</span>
      </div>
      <div
        role="meter"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={Math.round(clamped)}
        className="h-2 overflow-hidden rounded-full bg-stone-200"
      >
        <div className="h-full rounded-full bg-orange-700" style={{ width: \`\${pct}%\` }} />
      </div>
    </div>
  );
}
`,props:[{name:`label`,type:`string`,required:!0,detail:`Visible name and accessible label.`},{name:`value`,type:`number`,required:!0,detail:`Current value, clamped to the range.`},{name:`max`,type:`number`,required:!1,detail:`Range maximum. Defaults to 100.`}]},{name:`stat`,title:`Stat`,description:`One figure, a small label, and an optional supporting line. Figures use tabular numbers.`,category:`data`,filename:`stat.tsx`,source:`export type StatProps = {
  label: string;
  value: string;
  detail?: string;
};

export function Stat({ label, value, detail }: StatProps) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-medium tracking-wider text-stone-500 uppercase">{label}</p>
      <p className="text-4xl leading-none font-medium tracking-tight text-stone-900 tabular-nums">{value}</p>
      {detail ? <p className="text-sm text-stone-500">{detail}</p> : null}
    </div>
  );
}
`,props:[{name:`label`,type:`string`,required:!0,detail:`Uppercase caption.`},{name:`value`,type:`string`,required:!0,detail:`The figure, already formatted.`},{name:`detail`,type:`string`,required:!1,detail:`Secondary line under the figure.`}]},{name:`snippet`,title:`Snippet`,description:`Monospace value with its own copy control and a short copied state.`,category:`data`,filename:`snippet.tsx`,source:`import { useState } from "react";

export type SnippetProps = {
  label?: string;
  value: string;
};

export function Snippet({ label = "Command", value }: SnippetProps) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full min-w-0 overflow-hidden rounded-lg bg-stone-900">
      <div className="flex items-center justify-between gap-3 px-3 pt-2">
        <p className="text-xs font-medium tracking-wide text-stone-400">{label}</p>
        <button
          type="button"
          className="h-8 rounded-md px-2 text-xs font-medium text-stone-50 hover:bg-stone-800"
          onClick={() => {
            void navigator.clipboard.writeText(value).then(() => {
              setCopied(true);
              window.setTimeout(() => setCopied(false), 1400);
            });
          }}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto px-3 pb-3 font-mono text-sm break-all whitespace-pre-wrap text-stone-50">
        <code>{value}</code>
      </pre>
    </div>
  );
}
`,props:[{name:`label`,type:`string`,required:!1,detail:`Caption. Defaults to Command.`},{name:`value`,type:`string`,required:!0,detail:`Exact text copied to the clipboard.`}]},{name:`timeline`,title:`Timeline`,description:`Ordered steps marked done, current, or waiting. Current steps carry an ember ring.`,category:`data`,filename:`timeline.tsx`,source:`export type TimelineStep = {
  title: string;
  detail: string;
  state: "done" | "current" | "wait";
};

export type TimelineProps = {
  steps: TimelineStep[];
};

export function Timeline({ steps }: TimelineProps) {
  return (
    <ol className="flex w-full flex-col">
      {steps.map((step, index) => (
        <li key={step.title} className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-3">
          <div className="flex flex-col items-center">
            <span
              className={
                step.state === "wait"
                  ? "mt-1.5 size-2.5 rounded-full bg-stone-300"
                  : step.state === "current"
                    ? "mt-1 size-3 rounded-full bg-orange-700 ring-4 ring-orange-200"
                    : "mt-1.5 size-2.5 rounded-full bg-orange-700"
              }
            />
            {index < steps.length - 1 ? <span className="mt-1 w-px flex-1 bg-stone-300" /> : null}
          </div>
          <div className={index === steps.length - 1 ? "pb-0" : "pb-5"}>
            <p className="text-sm font-medium text-stone-900">{step.title}</p>
            <p className="mt-0.5 text-sm text-stone-500">{step.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
`,props:[{name:`steps`,type:`TimelineStep[]`,required:!0,detail:`Each step has a title, detail, and state: done, current, or wait.`}]},{name:`panel`,title:`Panel`,description:`Titled surface with an optional kicker and a header action. Body is whatever you pass as children.`,category:`surface`,filename:`panel.tsx`,source:`import type { ReactNode } from "react";

export type PanelProps = {
  kicker?: string;
  title: string;
  action?: ReactNode;
  children?: ReactNode;
};

export function Panel({ kicker, title, action, children }: PanelProps) {
  return (
    <section className="w-full rounded-xl border border-stone-300 bg-stone-50">
      <header className="flex items-start justify-between gap-3 border-b border-stone-200 px-4 py-3">
        <div>
          {kicker ? <p className="text-xs font-medium tracking-wider text-stone-500 uppercase">{kicker}</p> : null}
          <h3 className="text-base font-medium text-stone-900">{title}</h3>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </header>
      <div className="px-4 py-4">{children}</div>
    </section>
  );
}
`,props:[{name:`kicker`,type:`string`,required:!1,detail:`Small uppercase line above the title.`},{name:`title`,type:`string`,required:!0,detail:`Panel heading.`},{name:`action`,type:`ReactNode`,required:!1,detail:`Slot at the end of the header.`},{name:`children`,type:`ReactNode`,required:!1,detail:`Body content.`}]}];function t(t){return e.find(e=>e.name===t)}var n=[`all`,...new Set(e.map(e=>e.category))];export{n,t as r,e as t};