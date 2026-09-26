import type { APIEvent } from "@solidjs/start/server";
import { siteForHost } from "~/site/context";

/**
 * Images of a seiten page (client previews), served only to whoever may see
 * the page — same check as the page itself (`authorize`): public page,
 * admin cookie, page cookie, or `?k=<code>` (link-preview crawlers fetch
 * og:image with the code attached).
 *
 * Files live next to the page in `_content/seiten/<slug>/`, so they never
 * enter the public build — and the client names in the slugs never enter
 * the JS bundle.
 */

const TYPES: Record<string, string> = {
  webp: "image/webp",
  jpg: "image/jpeg",
  png: "image/png",
};

const notFound = () => new Response("Not found", { status: 404 });

export async function GET({ request, params }: APIEvent) {
  if (siteForHost(request.headers.get("host") ?? "") !== "seiten") {
    return notFound();
  }
  const { slug, file } = params;
  const ext = /^[a-z0-9-]+\.(webp|jpg|png)$/.exec(file ?? "")?.[1];
  if (!slug || !/^[a-z0-9-]+$/.test(slug) || !ext) return notFound();

  const { seitenItem, authorize } = await import("~/sites/seiten/server");
  const item = await seitenItem(slug);
  if (!item) return notFound();
  if (!authorize(request, item).ok) {
    return new Response("Forbidden", { status: 403 });
  }

  const { readFile } = await import("node:fs/promises");
  const { join } = await import("node:path");
  try {
    const body = await readFile(
      join(process.cwd(), "_content", "seiten", slug, file as string),
    );
    return new Response(body, {
      headers: {
        "Content-Type": TYPES[ext],
        // Private: never in a shared cache. An hour is plenty for a preview.
        "Cache-Control": "private, max-age=3600",
        "X-Robots-Tag": "noindex",
      },
    });
  } catch {
    return notFound();
  }
}
