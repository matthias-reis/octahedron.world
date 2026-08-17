import { getRequestEvent, isServer } from "solid-js/web";

export type Site = "octahedron" | "mreis";

const MREIS_HOSTNAMES = new Set([
  "mreis.me",
  "next.mreis.me",
  "mreis.localhost",
]);

export function getSite(): Site {
  const host = isServer
    ? (getRequestEvent()?.request.headers.get("host") ?? "")
    : window.location.host;

  const hostname = host.split(":")[0].replace(/^www\./, "");

  // Explicit allowlist for mreis; octahedron is the default for any other
  // hostname so the existing site never breaks from an unrecognized host.
  return MREIS_HOSTNAMES.has(hostname) ? "mreis" : "octahedron";
}
