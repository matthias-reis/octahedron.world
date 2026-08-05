import { Meta, Title } from "@solidjs/meta";
import type { Component } from "solid-js";
import { getSiteConfig } from "~/sites/config";

/**
 * Page metadata for both sites. Title suffix, fallback copy and the default
 * og:image come from the per-site config; everything else is per page.
 */
export const Head: Component<{
  title?: string;
  description?: string;
  /** Image reference — resolved through the site's image URL builder. */
  image?: string;
}> = (props) => {
  const config = getSiteConfig();
  const title = () => props.title ?? config.defaultTitle;
  const description = () => props.description ?? config.defaultDescription;
  const image = () => config.resolveImage(props.image ?? config.defaultImage);

  return (
    <>
      <Title>
        {title()}
        {config.titleSuffix}
      </Title>
      <Meta name="description" content={description()} />
      <Meta
        property="og:title"
        content={title() === config.defaultTitle ? config.brandTitle : title()}
      />
      <Meta property="og:description" content={description()} />
      <Meta property="og:image" content={image()} />
    </>
  );
};
