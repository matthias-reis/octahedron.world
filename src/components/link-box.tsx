import type { Component } from "solid-js";
import type { CompactItemMeta } from "~/types";
import { LinkBox as SharedLinkBox } from "~/ui/link-box";
import { smallImageUrl } from "./image-helpers";

/**
 * Octahedron's adapter over the shared <LinkBox>: maps a content item onto the
 * generic props and pins the palette and metrics that the semantic tokens do
 * not cover one-to-one (surface is one step lighter here, and the box uses the
 * numeric spacing scale).
 */
export const LinkBox: Component<{
  item: CompactItemMeta;
  layout?: "teaser" | "group";
}> = (props) => (
  <SharedLinkBox
    variant={props.layout === "group" ? "tile" : "row"}
    href={`/${props.item.slug}`}
    title={props.item.title}
    description={
      Array.isArray(props.item.description)
        ? props.item.description.join(" ")
        : props.item.description
    }
    image={smallImageUrl(props.item.image)}
    squareCover
    imageAlt={props.item.title}
    class={`bg-can7 min-h-8 gap-3 hover:outline-cas5 ${props.layout === "group" ? "" : "sm:items-start"}`}
    imageClass={
      props.layout === "group"
        ? "w-full"
        : "w-full sm:w-40 sm:max-w-[40%] sm:shrink-0 sm:self-start"
    }
    titleClass="font-octa text-can2 mb-2"
    descriptionClass="text-can4"
  />
);
