import { PcscBreadcrumb } from '~/pcsc/pcsc-breadcrumb';
import { PcscTitle } from '~/pcsc/pcsc-title';

export default function PCSCOneRatings() {
  return (
    <>
      <PcscBreadcrumb
        links={[
          { href: '/pcsc-one', label: 'Home' },
          { href: '/pcsc-one/ratings', label: 'Ratings' },
        ]}
      />
      <PcscTitle headline="Ratings" description="Browse all ratings" />
    </>
  );
}
