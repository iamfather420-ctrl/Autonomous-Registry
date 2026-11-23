import { createFileRoute } from "@tanstack/react-router";
import { ashItem, ashRegistry } from "@/lib/registry/catalog";

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
    },
  });
}

export const Route = createFileRoute("/r/{$name}.json")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const name = params.name;
        if (!ashItem(name)) return json({ error: "Not in the Ash registry." }, 404);
        const origin = new URL(request.url).origin;
        const item = ashRegistry(origin, true).items.find((entry) => entry.name === name);
        if (!item) return json({ error: "Not in the Ash registry." }, 404);
        return json(item);
      },
    },
  },
});
