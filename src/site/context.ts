import { getRequestEvent, isServer } from "solid-js/web";

export type Site = "octahedron" | "mreis" | "seiten";

const MREIS_HOSTNAMES = new Set(["mreis.me", "mreis.localhost"]);
// Client previews (microsites) — see src/sites/seiten/.
const SEITEN_HOSTNAMES = new Set(["seiten.mreis.me", "seiten.localhost"]);

export function getSite(): Site {
  const host = isServer
    ? (getRequestEvent()?.request.headers.get("host") ?? "")
    : window.location.host;
  return siteForHost(host);
}

/** The site a `host` header (with or without port) belongs to. */
export function siteForHost(host: string): Site {
  const hostname = host.split(":")[0].replace(/^www\./, "");

  // Explicit allowlist for mreis; octahedron is the default for any other
  // hostname so the existing site never breaks from an unrecognized host.
  if (SEITEN_HOSTNAMES.has(hostname)) return "seiten";
  return MREIS_HOSTNAMES.has(hostname) ? "mreis" : "octahedron";
}
