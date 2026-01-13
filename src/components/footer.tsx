import { A } from '@solidjs/router';

export const Footer = () => {
  return (
    <footer class="w-full bg-neutral-100 text-neutral-500 text-center py-4 mt-8 text-sm">
      <p>
        &copy; 2022 - {new Date().getFullYear()} Octahedron World / Matthias
        Reis. All rights reserved.
      </p>
      <p class="flex justify-center gap-4 mt-2">
        <A href="/about" class="underline hover:font-bold">
          About
        </A>
        <A href="/privacy" class="underline hover:font-bold">
          Privacy Policy
        </A>
        <A href="/imprint" class="underline hover:font-bold">
          Imprint
        </A>
      </p>
    </footer>
  );
};
