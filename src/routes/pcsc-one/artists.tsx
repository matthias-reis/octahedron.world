import { PcscBreadcrumb } from '~/pcsc/pcsc-breadcrumb';
import { PcscTitle } from '~/pcsc/pcsc-title';

export default function PCSCOneArtists() {
  return (
    <>
      <PcscBreadcrumb
        links={[
          { href: '/pcsc-one', label: 'Home' },
          { href: '/pcsc-one/artists', label: 'Artists' },
        ]}
      />
      <PcscTitle headline="Artists" description="Browse all artists" />
    </>
  );
}
