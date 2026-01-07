import { NextResponse } from "next/server";

export function proxy(request: Request) {
  // get the URL from request header
  const headers = new Headers(request.headers);
  const url = new URL(request.url);
  headers.set('x-path', url.pathname.slice(1));

  // pass the header to the layout
  return NextResponse.next({
    request: {
      headers,
    },
  });
}
