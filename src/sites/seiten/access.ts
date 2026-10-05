import { createHash, createHmac, timingSafeEqual } from "node:crypto";

/**
 * Stateless access control for seiten.mreis.me — no database. SERVER ONLY:
 * import it from middleware, API routes, or dynamically inside "use server"
 * functions, never at module level of shared code.
 *
 * Client codes: `EEEE-SSSS-SSSS-SSSS` (Crockford base32, case-insensitive).
 *   EEEE  expiry, in whole hours since the epoch
 *   S…    HMAC(secret, "page:<slug>:<version>:<expiry>"), 60 bits
 * A code opens exactly one page until its expiry. Bumping the page's
 * `access` version in its MDS invalidates every code issued for it.
 *
 * Admin: a password (env) exchanged for a signed cookie that opens every
 * page and the overview.
 *
 * Env: SEITEN_SECRET, SEITEN_ADMIN_PASSWORD. In development both fall back to
 * "dev"; in production a missing value locks everything (fail closed).
 */

const CROCKFORD = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
const HOUR = 3_600_000;
const ADMIN_DAYS = 30;

export const ADMIN_COOKIE = "seiten_admin";
export const pageCookie = (slug: string) => `seiten_${slug}`;

function env(name: string): string | undefined {
  const value = process.env[name];
  if (value) return value;
  if (process.env.NODE_ENV !== "production") return "dev";
  console.error(`[seiten] ${name} is not set — all previews stay locked`);
  return undefined;
}

function hmac(message: string): Buffer | undefined {
  const secret = env("SEITEN_SECRET");
  return secret
    ? createHmac("sha256", secret).update(message).digest()
    : undefined;
}

function toBase32(value: bigint, length: number): string {
  let out = "";
  let v = value;
  for (let i = 0; i < length; i++) {
    out = CROCKFORD[Number(v % 32n)] + out;
    v /= 32n;
  }
  return out;
}

function fromBase32(text: string): bigint | undefined {
  let v = 0n;
  for (const char of text) {
    const digit = CROCKFORD.indexOf(char);
    if (digit < 0) return undefined;
    v = v * 32n + BigInt(digit);
  }
  return v;
}

/** Typing-tolerant: case, separators, and the look-alikes O/I/L. */
function normalize(code: string): string {
  return code
    .toUpperCase()
    .replace(/[^0-9A-Z]/g, "")
    .replace(/O/g, "0")
    .replace(/[IL]/g, "1");
}

function signature(slug: string, version: number, expiryHours: number) {
  const mac = hmac(`page:${slug}:${version}:${expiryHours}`);
  // 60 bits: 12 base32 characters.
  return mac
    ? toBase32(BigInt(`0x${mac.subarray(0, 8).toString("hex")}`) >> 4n, 12)
    : undefined;
}

function same(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export type PageCode = { code: string; expires: Date };

export function createPageCode(
  slug: string,
  version: number,
  hours: number,
): PageCode | undefined {
  const expiryHours = Math.ceil(Date.now() / HOUR) + Math.max(1, hours);
  const sig = signature(slug, version, expiryHours);
  if (!sig) return undefined;
  const raw = toBase32(BigInt(expiryHours), 4) + sig;
  return {
    code: raw.match(/.{4}/g)?.join("-") ?? raw,
    expires: new Date(expiryHours * HOUR),
  };
}

export type CodeCheck =
  | { ok: true; expires: Date }
  | { ok: false; reason: "invalid" | "expired" };

export function checkPageCode(
  code: string,
  slug: string,
  version: number,
): CodeCheck {
  const raw = normalize(code);
  if (raw.length !== 16) return { ok: false, reason: "invalid" };
  const expiry = fromBase32(raw.slice(0, 4));
  const expected =
    expiry === undefined ? undefined : signature(slug, version, Number(expiry));
  if (!expected || !same(raw.slice(4), expected)) {
    return { ok: false, reason: "invalid" };
  }
  const expires = new Date(Number(expiry) * HOUR);
  return expires.getTime() > Date.now()
    ? { ok: true, expires }
    : { ok: false, reason: "expired" };
}

export function checkAdminPassword(password: string): boolean {
  const expected = env("SEITEN_ADMIN_PASSWORD");
  if (!expected) return false;
  const hash = (s: string) => createHash("sha256").update(s).digest();
  return timingSafeEqual(hash(password), hash(expected));
}

export function createAdminToken():
  | { value: string; maxAge: number }
  | undefined {
  const maxAge = ADMIN_DAYS * 24 * 3600;
  const expires = Math.floor(Date.now() / 1000) + maxAge;
  const mac = hmac(`admin:${expires}`);
  return mac
    ? { value: `${expires}.${mac.toString("base64url")}`, maxAge }
    : undefined;
}

export function checkAdminToken(value: string | undefined): boolean {
  if (!value) return false;
  const [expires, sig] = value.split(".");
  const mac = hmac(`admin:${expires}`);
  if (!mac || !sig || !same(sig, mac.toString("base64url"))) return false;
  return Number(expires) * 1000 > Date.now();
}

export function parseCookies(header: string | null): Record<string, string> {
  const out: Record<string, string> = {};
  for (const part of (header ?? "").split(";")) {
    const i = part.indexOf("=");
    if (i > 0)
      out[part.slice(0, i).trim()] = decodeURIComponent(
        part.slice(i + 1).trim(),
      );
  }
  return out;
}

export function cookieHeader(
  name: string,
  value: string,
  maxAge: number,
): string {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; HttpOnly; SameSite=Lax${secure}`;
}
