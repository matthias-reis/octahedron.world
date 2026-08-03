import { clientOnly } from "@solidjs/start";
import { type ParentComponent, Suspense } from "solid-js";
import { Footer, type FooterLink } from "~/ui/footer";
import { Logo } from "./logo";

const ThemeToggle = clientOnly(() =>
  import("./theme-toggle").then((m) => ({ default: m.ThemeToggle })),
);

const links: FooterLink[] = [
  { href: "mailto:mr@mreis.me", label: "Email", external: true },
  {
    href: "https://www.linkedin.com/in/matthias-reis-439992214/",
    label: "LinkedIn",
    external: true,
  },
  {
    href: "https://github.com/matthias-reis",
    label: "GitHub",
    external: true,
  },
  {
    href: "https://bsky.app/profile/octahedron.world",
    label: "Bluesky",
    external: true,
  },
];

/** mreis.me's layout: centred column, logo + theme toggle, split footer. */
export const MreisShell: ParentComponent = (props) => (
  <Suspense
    fallback={<div class="p-smd font-sans text-col-fg">Loading...</div>}
  >
    <div class="min-h-screen flex flex-col">
      <header class="py-sxl px-smd w-full max-w-4xl mx-auto flex items-center justify-between">
        <Logo />
        <ThemeToggle />
      </header>
      <div class="flex-grow">{props.children}</div>
      <Footer
        layout="split"
        class="max-w-4xl mx-auto py-s2xl px-smd mt-auto font-sans"
        linkClass="hover:underline hover:text-col-hi-bg transition-colors outline-offset-2 outline-col-hi-bg focus:outline-2 rounded-sm"
        links={links}
        copyright={<>© {new Date().getFullYear()} Matthias Reis</>}
      />
    </div>
  </Suspense>
);
