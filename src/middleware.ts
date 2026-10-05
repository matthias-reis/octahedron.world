import { createMiddleware } from "@solidjs/start/middleware";
import { siteForHost } from "./site/context";

/**
 * Request-level plumbing for seiten.mreis.me (client previews):
 *
 * - mreis.me/p[/…] moved: 301 to seiten.mreis.me[/…]
 * - POST /login, GET /logout: the admin cookie
 * - GET /<slug>?k=<code>: a valid code also becomes a page cookie, so the
 *   visitor keeps access after the first click (until the code expires)
 * - every seiten response: private, not indexed
 *
 * Whether a page is shown at all is decided in the model (getRoute) and the
 * /asset route, both through `authorize()` in src/sites/seiten/server.ts.
 */

const PAGE_PATH = /^\/([a-z0-9-]+)\/?$/;

function seitenHost(host: string): string {
  const [hostname, port] = host.split(":");
  const target =
    hostname === "mreis.localhost" ? "seiten.localhost" : `seiten.${hostname}`;
  return port ? `${target}:${port}` : target;
}

function redirect(location: string, status = 303, cookie?: string): Response {
  const headers = new Headers({ Location: location });
  if (cookie) headers.append("Set-Cookie", cookie);
  return new Response(null, { status, headers });
}

export default createMiddleware({
  onRequest: async (event) => {
    const { request } = event;
    const host = request.headers.get("host") ?? "";
    const site = siteForHost(host);
    const url = new URL(request.url);

    if (site === "mreis" && /^\/p(\/|$)/.test(url.pathname)) {
      const rest = url.pathname.replace(/^\/p\/?/, "");
      const scheme = host.includes("localhost") ? "http" : "https";
      return redirect(`${scheme}://${seitenHost(host)}/${rest}`, 301);
    }

    if (site !== "seiten") return;

    event.response.headers.set("Cache-Control", "private, no-store");
    event.response.headers.set("X-Robots-Tag", "noindex, nofollow");

    const access = await import("./sites/seiten/access");

    if (url.pathname === "/login" && request.method === "POST") {
      const form = await request.formData();
      const password = String(form.get("passwort") ?? "");
      const token = access.checkAdminPassword(password)
        ? access.createAdminToken()
        : undefined;
      return token
        ? redirect(
            "/",
            303,
            access.cookieHeader(access.ADMIN_COOKIE, token.value, token.maxAge),
          )
        : redirect("/login?fehler=1");
    }

    if (url.pathname === "/logout") {
      return redirect(
        "/",
        303,
        access.cookieHeader(access.ADMIN_COOKIE, "", 0),
      );
    }

    const slug = PAGE_PATH.exec(url.pathname)?.[1];
    if (request.method === "GET" && slug && url.searchParams.has("k")) {
      const { seitenItem, authorize } = await import("./sites/seiten/server");
      const item = await seitenItem(slug);
      const result = item ? authorize(request, item) : undefined;
      if (
        result?.ok &&
        result.via === "code" &&
        result.code &&
        result.expires
      ) {
        const maxAge = Math.floor(
          (result.expires.getTime() - Date.now()) / 1000,
        );
        event.response.headers.append(
          "Set-Cookie",
          access.cookieHeader(access.pageCookie(slug), result.code, maxAge),
        );
      }
    }
  },
});
