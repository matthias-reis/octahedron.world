import { headers } from 'next/headers';
import { LayoutFrame } from '../../comp/layout-frame';
import { getItem } from '../../core/data-layer';
import { ReactNode } from 'react';

const Layout = async ({ children }: { children: ReactNode }) => {
  const requestHeaders = await headers();
  const slug = requestHeaders.get('x-path');
  const colorSpace = getItem(slug || '')?.colorSpace ?? 'neutral';

  return (
    <LayoutFrame className={colorSpace} withTextLogo>
      {children}
    </LayoutFrame>
  );
};

export default Layout;
