import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CopyButton, shellInput, shellPrimary } from "@/components/kiln/shell";
import { ASH, ASH_CATEGORIES } from "@/lib/registry/catalog";
import { AshCompact } from "@/registry/ash/previews";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "Ash registry — Kiln" }],
  }),
  component: Home,
});

function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [served, setServed] = useState<number | null>(null);
  const [servedError, setServedError] = useState(false);

  useEffect(() => {
    let cancel = false;
    fetch("/r/registry.json")
      .then((response) => {
        if (!response.ok) throw new Error("bad status");
        return response.json() as Promise<{ items?: unknown[] }>;
      })
      .then((body) => {
        if (!cancel) setServed(Array.isArray(body.items) ? body.items.length : 0);
      })
      .catch(() => {
        if (!cancel) setServedError(true);
      });
    return () => {
      cancel = true;
    };
  }, []);

  const items = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return ASH.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (!needle) return true;
      return (
        item.name.includes(needle) ||
        item.title.toLowerCase().includes(needle) ||
        item.description.toLowerCase().includes(needle)
      );
    });
  }, [query, category]);

  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      <p className="text-xs font-medium tracking-wider text-ember uppercase">Registry · already fired</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl leading-none text-fg sm:text-6xl">Ash is a real registry.</h1>
      <p className="mt-4 max-w-2xl text-base text-muted">
        Ten primitives, no npm dependencies, served as registry JSON from this app. Open an item to use the
        actual component. When you want a registry from a repository, the foundry walks the git tree and seals one.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <Link to="/forge" className={shellPrimary}>
          Forge from a git repo
        </Link>
        <CopyButton
          quiet
          label="Copy registry index"
          onCopy={async () => {
            const response = await fetch("/r/registry.json");
            if (!response.ok) throw new Error("missing");
            return response.text();
          }}
        />
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
        {[
          ["Items", String(ASH.length)],
          ["Schema", "registry.json"],
          ["Dependencies", "None"],
          ["Endpoint", servedError ? "Offline" : served === null ? "Checking" : `${served} served`],
        ].map(([label, value]) => (
          <div key={label} className="bg-bg px-4 py-4">
            <dt className="text-xs font-medium tracking-wider text-muted uppercase">{label}</dt>
            <dd className="mt-1 text-lg font-medium text-fg tabular-nums">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 font-mono text-xs text-muted">
        <a className="text-fg underline" href="/r/registry.json">
          /r/registry.json
        </a>
        {" · "}
        <a className="text-fg underline" href="/r/button.json">
          /r/button.json
        </a>
      </p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Categories">
          {ASH_CATEGORIES.map((entry) => {
            const selected = entry === category;
            return (
              <button
                key={entry}
                type="button"
                aria-pressed={selected}
                onClick={() => setCategory(entry)}
                className={`h-10 rounded-full px-3 text-sm font-medium ${
                  selected ? "bg-fg text-bg" : "bg-bg-raised text-muted"
                }`}
              >
                {entry}
              </button>
            );
          })}
        </div>
        <label className="sr-only" htmlFor="ash-search">
          Search Ash
        </label>
        <input
          id="ash-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search Ash"
          className={`${shellInput} sm:max-w-xs`}
        />
      </div>

      {items.length === 0 ? (
        <p className="mt-10 text-sm text-muted">Nothing in Ash matches that.</p>
      ) : (
        <ul className="mt-6 grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.name} className="min-w-0">
              <Link
                to="/items/$name"
                params={{ name: item.name }}
                className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl bg-bg-raised p-2 shadow-card transition-shadow duration-150 hover:shadow-card-hover"
              >
                <div inert className="pointer-events-none flex h-44 min-w-0 items-center justify-center overflow-hidden rounded-lg bg-stone-100 px-4">
                  <div className="w-full min-w-0">
                    <AshCompact name={item.name} />
                  </div>
                </div>
                <div className="flex flex-1 flex-col px-3 pt-3 pb-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <h2 className="font-display text-2xl text-fg">{item.title}</h2>
                    <span className="text-xs tracking-wide text-muted uppercase">{item.category}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted">{item.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
