import { isServer } from 'solid-js/web';

// fetch from current server and return the json
export async function fetchLocal(url: string) {
  console.log('server url', process.env.VITE_SERVER_URL);
  const baseUrl = isServer
    ? process.env.VITE_SERVER_URL || 'http://localhost:4242'
    : '';

  const res = await globalThis.fetch(baseUrl + url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
