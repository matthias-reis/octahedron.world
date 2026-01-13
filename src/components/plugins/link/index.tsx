import { A, createAsyncStore } from '@solidjs/router';
import { type JSX, Suspense, ParentComponent } from 'solid-js';
import { smallImageUrl } from '~/components/image-helpers';
import { LinkBox } from '~/components/link-box';
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
      <div class="my-5">{children}</div>
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
            <LinkBox item={item} />
          </Container>
        );
      })()}
    </Suspense>
  );
};
