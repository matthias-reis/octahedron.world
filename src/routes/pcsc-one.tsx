import { ParentProps, Suspense } from 'solid-js';
import { largeImageUrl } from '~/components/image-helpers';
import { PcscLogo } from '~/pcsc/pcsc-logo';
import { PcscNav } from '~/pcsc/pcsc-nav';

export default function PCSCOnePage(props: ParentProps) {
  return (
    <div
      class="min-h-screen bg-center bg-cover bg-fixed pcsc-one"
      style={{ 'background-image': `url(${largeImageUrl('pcsc-blue')})` }}
    >
      <main class="max-w-3xl mx-auto py-5 px-3">
        <div class="flex gap-3 items-center justify-center text-3xl font-octa font-bold uppercase opacity-50">
          <PcscLogo class="w-5 h-5" />
          <span>
            PCSC <span class="font-light">One</span>
          </span>
        </div>
        <PcscNav
          links={[
            { href: '/pcsc-one', label: 'Home' },
            { href: '/pcsc-one/ratings', label: 'Ratings' },
            { href: '/pcsc-one/albums', label: 'Albums' },
            { href: '/pcsc-one/artists', label: 'Artists' },
            { href: '/pcsc-one/years', label: 'Years' },
          ]}
        />
        <div class="my-6">
          <Suspense>{props.children}</Suspense>
        </div>
      </main>
    </div>
  );
}
