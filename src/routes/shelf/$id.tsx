import { createFileRoute, Link } from "@tanstack/react-router";
import { ForgeReport } from "@/components/kiln/result";
import { shellQuiet } from "@/components/kiln/shell";
import { useShelf, useShelfHydrated } from "@/lib/registry/store";

export const Route = createFileRoute("/shelf/$id")({
  head: () => ({
    meta: [{ title: "Sealed registry — Kiln" }],
  }),
  component: ShelfDetail,
});

function ShelfDetail() {
  const { id } = Route.useParams();
  const ready = useShelfHydrated();
  const entry = useShelf((state) => state.entries.find((item) => item.id === id));

  if (!ready) {
    return (
      <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <p className="text-sm text-muted">Opening the shelf…</p>
      </main>
    );
  }

  if (!entry) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <h1 className="font-display text-5xl text-fg">Seal not on this shelf</h1>
        <p className="mt-3 text-muted">It may have been removed, or it was sealed in another browser.</p>
        <Link to="/shelf" className={`${shellQuiet} mt-6`}>
          Back to the shelf
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
      <Link to="/shelf" className="text-sm text-muted">
        ← Shelf
      </Link>
      <div className="mt-6">
        <ForgeReport
          registry={entry.registry}
          steps={entry.steps}
          sealedBy={entry.sealedBy}
          seal={entry.seal}
          summary={entry.summary}
          sourceLabel={entry.sourceLabel}
          sourceUrl={entry.sourceUrl}
        />
      </div>
    </main>
  );
}
