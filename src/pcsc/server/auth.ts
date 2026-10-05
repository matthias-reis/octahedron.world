import { timingSafeEqual } from "node:crypto";

/**
 * Write access to the PCSC API: a bearer token matching `PCSC_API_TOKEN`.
 * Reads stay public — the PCSC One pages need them. Without a configured
 * token every write is refused, so a deploy can never open writes by accident.
 *
 * Returns the error response, or null when the request may write.
 */
export function rejectUnauthorizedWrite(request: Request): Response | null {
  const expected = process.env.PCSC_API_TOKEN;
  if (!expected) {
    return Response.json(
      {
        success: false,
        message: "PCSC writes are disabled: PCSC_API_TOKEN is not configured",
      },
      { status: 503 },
    );
  }
  const header = request.headers.get("authorization") ?? "";
  const given = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return Response.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }
  return null;
}
