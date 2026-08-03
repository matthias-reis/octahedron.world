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
export const LinkBox: Component<{ item: CompactItemMeta; small?: boolean }> = (
  props,
) => (
  <SharedLinkBox
    variant="row"
    href={`/${props.item.slug}`}
    title={props.item.title}
    description={props.item.description}
    image={smallImageUrl(props.item.image)}
    imageAlt={props.item.title}
    class={`bg-can7 min-h-8 gap-3 hover:outline-cas5 ${
      props.small ? "md:flex-col" : ""
    }`}
    imageClass={props.small ? "h-8 md:h-auto" : "h-8"}
    titleClass="font-octa text-can2 mb-2"
    descriptionClass="text-can4"
  />
);
