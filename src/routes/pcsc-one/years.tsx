import { PcscBreadcrumb } from '~/pcsc/pcsc-breadcrumb';
import { PcscTitle } from '~/pcsc/pcsc-title';

export default function PCSCOneYears() {
  return (
    <>
      <PcscBreadcrumb
        links={[
          { href: '/pcsc-one', label: 'Home' },
          { href: '/pcsc-one/years', label: 'Years' },
        ]}
      />
      <PcscTitle headline="Years" description="Browse by year" />
    </>
  );
}
