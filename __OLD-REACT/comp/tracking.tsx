'use client';

import PiwikProProvider, { usePiwikPro } from '@piwikpro/next-piwik-pro';
import { FCC } from '../core/types';
import { useEffect } from 'react';

export const TrackingProvider: FCC = (props) => (
  <PiwikProProvider
    containerId="70d2fc5f-9f84-43da-a30d-960d909bbbde"
    containerUrl="https://octahedron.containers.piwik.pro"
    {...props}
  />
);

export const TrackingPageView: FCC = (props) => {
  const { PageViews } = usePiwikPro();
  useEffect(() => {
    PageViews.trackPageView();
  }, [PageViews]);
  return null;
};
