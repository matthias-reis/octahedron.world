import { MoonIcon, SunIcon } from "lucide-solid";
import { createSignal, onMount } from "solid-js";
import { cx } from "~/ui/cx";

/**
 * Light/dark switch for mreis. Writes a `colorScheme` cookie and toggles the
 * `.light`/`.dark` class on <html>, which overrides the site's default
 * `color-scheme: light dark`.
 */
export function ThemeToggle() {
  const [theme, setTheme] = createSignal("light");

  onMount(() => {
    const match = document.cookie.match(/(?:^|; )colorScheme=([^;]+)/);
    const cookieTheme = match ? match[1] : "light";
    setTheme(cookieTheme === "system" ? "light" : cookieTheme);
  });

  const updateTheme = (newTheme: string) => {
    setTheme(newTheme);
    document.cookie = `colorScheme=${newTheme}; path=/; max-age=31536000`;

    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(
      newTheme === "dark" ? "dark" : "light",
    );
  };

  const toggleTheme = () => {
    updateTheme(theme() === "light" ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      class="flex items-center gap-sxs p-sxs border border-col-fg rounded-full text-sm transition-colors cursor-pointer outline-offset-2 outline-col-hi-bg focus:outline-2"
      title="Toggle Theme"
    >
      <div
        class={cx(
          "p-sxs rounded-full",
          theme() === "light" ? "text-col-bg bg-col-fg" : "text-col-fg",
        )}
      >
        <SunIcon size={16} />
      </div>
      <div
        class={cx(
          "p-sxs rounded-full",
          theme() === "light" ? "text-col-fg" : "text-col-bg bg-col-fg",
        )}
      >
        <MoonIcon size={16} />
      </div>
    </button>
  );
}
