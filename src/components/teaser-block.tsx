import { Show, createResource } from 'solid-js';
import { createAsync } from '@solidjs/router';
import { LinkBox } from '~/components/link-box';
import { getRoute } from '~/model/model';
import { JSX } from 'solid-js';

const Teaser = (props: { slug: string }) => {
  const item = createAsync(() => getRoute(props.slug));

  return (
    <Show
      when={item()}
      fallback={<div class="text-red-500">Teaser missing: {props.slug}</div>}
    >
      {(i) => (
        <div class="my-5">
          <LinkBox item={i()} />
        </div>
      )}
    </Show>
  );
};

export const TeaserBlock = (props: any) => {
  // In case props.data is used instead of direct props
  const slug = props.slug || (props.data && props.data.slug);
  return <Teaser slug={slug} />;
};
