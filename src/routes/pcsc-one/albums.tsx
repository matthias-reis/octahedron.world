import { PcscBreadcrumb } from '~/pcsc/pcsc-breadcrumb';
import { PcscTitle } from '~/pcsc/pcsc-title';

export default function PCSCOneAlbums() {
  return (
    <>
      <PcscBreadcrumb
        links={[
          { href: '/pcsc-one', label: 'Home' },
          { href: '/pcsc-one/albums', label: 'Albums' },
        ]}
      />
      <PcscTitle headline="Albums" description="Browse all albums" />
    </>
  );
}
