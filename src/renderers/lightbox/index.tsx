import { JSX } from 'solid-js';
import { transform } from 'solid-mds';
import { HastParseResult } from 'hast-mds';
import type { GlobalScope } from '~/types';
import { A, createAsync, useNavigate } from '@solidjs/router';
import { largeImageUrl } from '~/components/image-helpers';
import { cx } from '~/components/cx';
import dayjs from 'dayjs';
import { canonicalComponents } from '~/components/canonical-components';
import { getAllCompactRoutes } from '~/model/model';
import { createEffect, onCleanup } from 'solid-js';

export default function createTemplate(props: {
  mds: HastParseResult<GlobalScope, {}>;
}): JSX.Element {
  const parsed = transform<GlobalScope, {}>(props.mds, canonicalComponents);
  const item = parsed.global;
  const navigate = useNavigate();
  const routes = createAsync(() => getAllCompactRoutes());

  createEffect(() => {
    const allRoutes = routes();
    if (!allRoutes || !item?.group || !item?.slug) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        navigate(`/${item.group}`);
        return;
      }

      const siblings = Object.values(allRoutes).filter((r) => {
        console.log(r.group, item.group, r);
        return r.group === item.group && r.type === 'lightbox';
      });

      const currentIndex = siblings.findIndex((r) => r.slug === item.slug);

      if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) {
          navigate(`/${siblings[currentIndex - 1].slug}`);
        }
      } else if (e.key === 'ArrowRight') {
        if (currentIndex < siblings.length - 1) {
          navigate(`/${siblings[currentIndex + 1].slug}`);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    onCleanup(() => window.removeEventListener('keydown', handleKeyDown));
  });

  return (
    <div
      class={cx(`min-h-screen gradient bg-neutral-100 pb-20`, item?.colorSpace)}
    >
      {item?.image && (
        <div class="justify-center items-center pt-5 pb-2 relative w-full h-[90vh]">
          <img
            src={largeImageUrl(item.image)}
            alt={item?.title}
            class="top-0 object-contain w-full h-full"
          />
        </div>
      )}
      <h1 class="text-4xl font-octa font-bold text-decent-900 text-center">
        {item?.title}
      </h1>
      <A
        href={`/${item?.group}`}
        class="flex justify-center uppercase text-decent-600 gap-3 text-sm"
      >
        <span>{dayjs(item?.date).format('YYYY-MM-DD')}</span>
        <span>·</span>
        <strong class="font-bold">{item?.group}</strong>
      </A>
      {item?.date && (
        <p class="uppercase text-center text-xs text-decent-600 tracking-wider"></p>
      )}
      <div class="max-w-2xl mx-auto px-3 py-7 text-decent-600">
        {item?.description}
      </div>

      {/* Render any MDS content steps */}
      <div class="max-w-3xl mx-auto px-3 py-7">
        {Object.values(parsed.steps).map((step) => (
          <step.Body />
        ))}
      </div>
    </div>
  );
}
