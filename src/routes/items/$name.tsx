import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CopyButton, shellQuiet } from "@/components/kiln/shell";
import { ashItem } from "@/lib/registry/catalog";
import { AshPreview } from "@/registry/ash/previews";

export const Route = createFileRoute("/items/$name")({
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
      props: item.props,
    };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData ? `${loaderData.title} — Kiln` : "Kiln" }],
  }),
  notFoundComponent: MissingItem,
  component: ItemPage,
});

function MissingItem() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <h1 className="font-display text-5xl text-fg">Not in Ash</h1>
      <p className="mt-3 text-muted">That name is not part of the fired registry.</p>
      <Link to="/" className={`${shellQuiet} mt-6`}>
        Back to the registry
      </Link>
    </main>
  );
}

function ItemPage() {
  const item = Route.useLoaderData();
  const [tab, setTab] = useState<"source" | "json">("source");
  const [json, setJson] = useState<string>("");
  const [install, setInstall] = useState(`npx shadcn@latest add /r/${item.name}.json`);

  useEffect(() => {
    let cancel = false;
    setInstall(`npx shadcn@latest add ${window.location.origin}/r/${item.name}.json`);
    fetch(`/r/${item.name}.json`)
      .then((response) => response.text())
      .then((text) => {
        if (!cancel) setJson(text);
      })
      .catch(() => {
        if (!cancel) setJson("");
      });
    return () => {
      cancel = true;
    };
  }, [item.name]);

  return (
    <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
      <Link to="/" className="text-sm text-muted">
        ← Registry
      </Link>
      <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-wider text-ember uppercase">
            registry:ui · {item.category}
          </p>
          <h1 className="mt-2 font-display text-5xl leading-none text-fg">{item.title}</h1>
          <p className="mt-3 text-base text-muted">{item.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <CopyButton label="Copy source" quiet onCopy={() => item.source} />
          <CopyButton
            label="Copy item JSON"
            quiet
            onCopy={async () => {
              if (json) return json;
              const response = await fetch(`/r/${item.name}.json`);
              if (!response.ok) throw new Error("missing");
              return response.text();
            }}
          />
          <CopyButton label="Copy install" onCopy={() => install} />
        </div>
      </div>

      <p className="mt-4 font-mono text-xs break-all text-muted">{install}</p>

      <section className="mt-8 rounded-2xl bg-stone-100 p-4 text-stone-900 sm:p-6">
        <p className="mb-4 text-xs font-medium tracking-wider text-stone-500 uppercase">Live component</p>
        <AshPreview name={item.name} />
      </section>

      <section className="mt-8">
        <h2 className="font-display text-3xl text-fg">Props</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="text-xs tracking-wider text-muted uppercase">
              <tr className="border-b border-line">
                <th className="py-2 pr-4 font-medium">Name</th>
                <th className="py-2 pr-4 font-medium">Type</th>
                <th className="py-2 pr-4 font-medium">Required</th>
                <th className="py-2 font-medium">Detail</th>
              </tr>
            </thead>
            <tbody>
              {item.props.map((prop) => (
                <tr key={prop.name} className="border-b border-line align-top">
                  <td className="py-3 pr-4 font-mono text-fg">{prop.name}</td>
                  <td className="py-3 pr-4 font-mono text-xs text-muted">{prop.type}</td>
                  <td className="py-3 pr-4 text-fg">{prop.required ? "Yes" : "No"}</td>
                  <td className="py-3 text-muted">{prop.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8">
        <div className="flex gap-2" role="tablist" aria-label="Source">
          {(
            [
              ["source", "Source"],
              ["json", "Registry JSON"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={`h-10 rounded-full px-3 text-sm font-medium ${tab === id ? "bg-fg text-bg" : "bg-bg-raised text-muted"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="mt-3 font-mono text-xs text-muted">
          {tab === "source" ? `registry/ui/${item.filename}` : `/r/${item.name}.json`}
        </p>
        <pre className="mt-2 max-h-[32rem] overflow-auto rounded-xl border border-line bg-bg-raised p-4 font-mono text-xs leading-relaxed text-fg">
          <code>{tab === "source" ? item.source : json || "Loading the served item…"}</code>
        </pre>
      </section>
    </main>
  );
}
