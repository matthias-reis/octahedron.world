import { FCC } from '../core/types';

export const SectionHead: FCC = ({ children }) => (
  <h2 className="text-decent-900 text-7xl font-condensed font-bold border-b border-decent-400 pb-6 mb-2">
    {children}
  </h2>
);

export const Text: FCC = ({ children }) => (
  <p className="text-decent-700 font-light my-1">{children}</p>
);
