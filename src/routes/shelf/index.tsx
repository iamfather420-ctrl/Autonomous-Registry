import { createFileRoute, Link } from "@tanstack/react-router";
import { shellQuiet } from "@/components/kiln/shell";
import { useShelf, useShelfHydrated } from "@/lib/registry/store";

export const Route = createFileRoute("/shelf/")({
  head: () => ({
    meta: [{ title: "Shelf — Kiln" }],
  }),
  component: ShelfPage,
});

function ShelfPage() {
  const ready = useShelfHydrated();
  const entries = useShelf((state) => state.entries);
  const remove = useShelf((state) => state.remove);

  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      <p className="text-xs font-medium tracking-wider text-ember uppercase">Shelf</p>
      <h1 className="mt-3 font-display text-5xl leading-none text-fg">Sealed registries</h1>
      <p className="mt-4 max-w-2xl text-base text-muted">
        Fires stay in this browser. Kiln keeps the latest four. Download registry.json from a seal if you want to host it.
      </p>

      {!ready ? <p className="mt-8 text-sm text-muted">Opening the shelf…</p> : null}

      {ready && entries.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-line px-5 py-8">
          <p className="text-fg">Nothing sealed yet.</p>
          <Link to="/forge" className={`${shellQuiet} mt-4`}>
            Open the foundry
          </Link>
        </div>
      ) : null}

      {ready ? (
        <ul className="mt-8 divide-y divide-line border-t border-line">
          {entries.map((entry) => (
            <li key={entry.id} className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="font-mono text-xs text-ember">Seal {entry.seal}</p>
                <h2 className="mt-1 truncate font-display text-3xl text-fg">{entry.registry.name}</h2>
                <p className="mt-1 text-sm text-muted">
                  {entry.sourceLabel} · {entry.registry.items.length} items ·{" "}
                  {entry.sealedBy === "grok" ? "Grok" : "parser"} ·{" "}
                  {new Date(entry.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Link to="/shelf/$id" params={{ id: entry.id }} className={shellQuiet}>
                  Open
                </Link>
                <button type="button" className={shellQuiet} onClick={() => remove(entry.id)}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </main>
  );
}
