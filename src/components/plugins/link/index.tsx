import { A, createAsyncStore } from '@solidjs/router';
import { type JSX, Suspense, ParentComponent } from 'solid-js';
import { smallImageUrl } from '~/components/image-helpers';
import { Loading } from '~/components/loading';
import { getAllCompactRoutes } from '~/model/model';
import { type Plugin } from '~/types';

const Container: ParentComponent<{ wrapper?: ParentComponent }> = ({
  children,
  wrapper,
}) => {
  const Wrapper = wrapper || 'section';
  return (
    <Wrapper>
      <div class="h-8 bg-decent-300 my-5">{children}</div>
    </Wrapper>
  );
};

export const LinkPlugin: Plugin = ({ type, payload, wrapper }) => {
  const items = createAsyncStore(() => getAllCompactRoutes());

  return (
    <Suspense
      fallback={
        <Container wrapper={wrapper}>
          <Loading />
        </Container>
      }
    >
      {(() => {
        const data = items();
        if (!data) return null;

        const item = data[payload || ''];

        // Loaded but nothing found - display nothing
        if (!item) return null;

        // Loaded and found - display the link
        return (
          <Container wrapper={wrapper}>
            <A
              href={`/${item.slug}`}
              class="flex justify-stretch gap-3 outline-2 -outline-offset-2 outline-transparent hover:outline-saturated-500"
            >
              <img
                src={smallImageUrl(item.image)}
                alt=""
                class="aspect-image object-contain h-8"
              />
              <span class="m-3 flex flex-col">
                <span class="font-octa font-bold text-2xl">{item.title}</span>
                <span class="text-sm text-decent-500">{item.description}</span>
              </span>
            </A>
          </Container>
        );
      })()}
    </Suspense>
  );
};
