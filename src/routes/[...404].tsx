import { A, createAsync, query, redirect, useLocation } from "@solidjs/router";
import { Head } from "~/components/head";
import { getSite } from "~/site/context";
import MreisNotFound from "~/sites/mreis/pages/not-found";
import rawRedirects from "../../redirects.json";

const redirects: Record<string, string> = rawRedirects;

const getHandleRedirectsQuery = query(async (path) => {
  const redirectPath = redirects[path];
  if (redirectPath) {
    console.log(`REDIR ${path} -> ${redirectPath}`);
    return redirect(`/${redirectPath}`);
  }

  return "not-found";
}, "isRedirect");

export default function NotFound() {
  if (getSite() === "mreis") {
    return <MreisNotFound />;
  }

  const location = useLocation();
  const path = location.pathname.slice(1);
  createAsync(() => getHandleRedirectsQuery(path));
  return (
    <main class="text-center mx-auto p-4">
      <Head title="Not Found" description={`The page ${path} was not found.`} />

      <h2 class=" text-3xl font-mono text-cad2 mt-8 mb-1">
        Path: {location.pathname}
      </h2>
      <h1 class="text-8xl font-serif text-cad2 mb-8">Not Found</h1>
      <p class="text-cbs5 underline hover:text-cbs4 hover:underline-offset-4">
        <A href="/">Go back to the Homepage</A>
      </p>
    </main>
  );
}
