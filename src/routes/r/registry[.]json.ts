import { createFileRoute } from "@tanstack/react-router";
import { ashRegistry } from "@/lib/registry/catalog";

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

export const Route = createFileRoute("/r/registry.json")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;
        return json(ashRegistry(origin, false));
      },
    },
  },
});
