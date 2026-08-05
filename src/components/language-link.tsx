import { A } from "@solidjs/router";
import type { Component } from "solid-js";
import type { ItemMeta } from "~/types";

export const LanguageLink: Component<{ item: ItemMeta }> = ({ item }) => {
  if (!item.ref) return null;

  const text =
    item.language === "en" ? "🇩🇪 German version" : "🇬🇧 English version";

  return (
    <p class="text-right mb-5">
      <A
        href={`/${item.ref}`}
        class="text-cad5 hover:text-cad3 underline underline-offset-4"
      >
        {text}
      </A>
    </p>
  );
};
