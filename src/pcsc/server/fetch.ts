import { isServer } from "solid-js/web";

// fetch from current server and return the json
export async function fetchLocal(url: string) {
  const fallback = "http://localhost:4242";
  const serverUrl = isServer ? (process.env.VITE_SERVER_URL || fallback) : "";

  if (isServer && !process.env.VITE_SERVER_URL) {
    console.warn(`[fetchLocal] VITE_SERVER_URL is not set, falling back to ${fallback}`);
  }

  const fullUrl = serverUrl + url;
  let res: Response;
  try {
    res = await globalThis.fetch(fullUrl);
  } catch (err) {
    throw new Error(
      `[fetchLocal] Network error fetching ${fullUrl}${isServer && !process.env.VITE_SERVER_URL ? " (VITE_SERVER_URL not set)" : ""}: ${err instanceof Error ? err.message : String(err)}`
    );
  }

  if (!res.ok) {
    throw new Error(`[fetchLocal] HTTP ${res.status} ${res.statusText} for ${fullUrl}`);
  }
  return res.json();
}
