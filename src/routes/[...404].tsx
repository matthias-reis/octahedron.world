import { createAsync, query, redirect, useLocation } from '@solidjs/router';
import rawRedirects from '../../redirects.json';

const redirects: Record<string, string> = rawRedirects;

const getHandleRedirectsQuery = query(async (path) => {
  const redirectPath = redirects[path];
  if (redirectPath) {
    console.log(`REDIR ${path} -> ${redirectPath}`);
    return redirect(`/${redirectPath}`);
  }

  return 'not-found';
}, 'isRedirect');

export default function NotFound() {
  const location = useLocation();
  const path = location.pathname.slice(1);
  createAsync(() => getHandleRedirectsQuery(path));
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        Not Found {path}
      </h1>
    </main>
  );
}
