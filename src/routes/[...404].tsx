import { A, createAsync, query, redirect, useLocation } from '@solidjs/router';
import rawRedirects from '../../redirects.json';
import { Head } from '~/components/head';

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
    <main class="text-center mx-auto p-4">
      <Head title="Not Found" description={`The page ${path} was not found.`} />

      <h2 class=" text-3xl font-mono text-main mt-8 mb-1">
        Path: {location.pathname}
      </h2>
      <h1 class="text-8xl font-serif text-main mb-8">Not Found</h1>
      <p class="text-saturated-700 underline hover:text-saturated-900 hover:underline-offset-4">
        <A href="/">Go back to the Homepage</A>
      </p>
    </main>
  );
}
