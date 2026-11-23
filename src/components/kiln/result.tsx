import { useState } from "react";
import { CopyButton, downloadJson, shellPrimary } from "@/components/kiln/shell";
import type { ForgeStep, RegistryDocument } from "@/lib/registry/types";

export function ForgeReport({
  registry,
  steps,
  sealedBy,
  seal,
  summary,
  note,
  sourceLabel,
  sourceUrl,
}: {
  registry: RegistryDocument;
  steps: ForgeStep[];
  sealedBy: "parser" | "grok";
  seal: string;
  summary: string;
  note?: string;
  sourceLabel: string;
  sourceUrl?: string;
}) {
  const [open, setOpen] = useState(registry.items[0]?.name ?? "");
  const active = registry.items.find((item) => item.name === open) ?? registry.items[0];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-wider text-ember uppercase">Seal {seal}</p>
          <h2 className="mt-2 font-display text-4xl leading-none text-fg">{registry.name}</h2>
          <p className="mt-3 text-sm text-muted">{summary}</p>
          <p className="mt-2 text-sm text-muted">
            {registry.items.length} items · sealed by {sealedBy === "grok" ? "Grok" : "the parser"} · {sourceLabel}
          </p>
          {note ? <p className="mt-2 text-sm text-fg">{note}</p> : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className={shellPrimary} onClick={() => downloadJson(`${registry.name}-registry.json`, registry)}>
            Download registry.json
          </button>
          <CopyButton
            quiet
            label="Copy registry JSON"
            onCopy={() => JSON.stringify(registry, null, 2)}
          />
        </div>
      </div>

      {sourceUrl ? (
        <p className="text-sm text-muted">
          Source stays on GitHub. This seal is a file for you to host. Kiln does not publish fetched code.
          {" "}
          <a href={sourceUrl} className="text-fg underline" target="_blank" rel="noreferrer">
            {sourceLabel}
          </a>
        </p>
      ) : null}

      <ol className="grid gap-4 sm:grid-cols-2">
        {steps.map((step, index) => (
          <li key={step.id} className="border-t border-line pt-3">
            <p className="text-xs font-medium tracking-wider text-muted tabular-nums">0{index + 1}</p>
            <p className="mt-1 text-sm font-medium text-fg">{step.label}</p>
            <p className="mt-1 text-sm text-muted">{step.detail}</p>
          </li>
        ))}
      </ol>

      <div className="grid gap-3 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <ul className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          {registry.items.map((item) => {
            const selected = item.name === active?.name;
            return (
              <li key={item.name} className="shrink-0 lg:shrink">
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setOpen(item.name)}
                  className={`flex h-11 w-full items-center justify-between gap-3 rounded-lg px-3 text-left text-sm ${
                    selected ? "bg-fg text-bg" : "bg-bg-raised text-fg"
                  }`}
                >
                  <span className="truncate font-medium">{item.title}</span>
                  <span className={selected ? "text-bg/70" : "text-muted"}>{item.type.replace("registry:", "")}</span>
                </button>
              </li>
            );
          })}
        </ul>
        {active ? (
          <article className="min-w-0 rounded-2xl bg-bg-raised p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-3xl text-fg">{active.title}</h3>
                <p className="mt-2 max-w-xl text-sm text-muted">{active.description}</p>
              </div>
              <CopyButton
                quiet
                label="Copy item JSON"
                onCopy={() => JSON.stringify(active, null, 2)}
              />
            </div>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
              <div>
                <dt className="text-muted">Name</dt>
                <dd className="font-mono text-fg">{active.name}</dd>
              </div>
              <div>
                <dt className="text-muted">Category</dt>
                <dd className="text-fg">{active.categories?.join(", ") || "—"}</dd>
              </div>
              <div>
                <dt className="text-muted">Dependencies</dt>
                <dd className="text-fg">{active.dependencies?.join(", ") || "None"}</dd>
              </div>
            </dl>
            {active.files.map((file) => (
              <div key={file.path} className="mt-4">
                <p className="font-mono text-xs text-muted">{file.path}</p>
                <pre className="mt-2 max-h-80 overflow-auto rounded-lg border border-line bg-bg p-3 font-mono text-xs leading-relaxed text-fg">
                  <code>{file.content || "Source omitted from this view."}</code>
                </pre>
              </div>
            ))}
            <p className="mt-3 text-xs text-muted">Fetched source is shown, never executed.</p>
          </article>
        ) : null}
      </div>
    </div>
  );
}
