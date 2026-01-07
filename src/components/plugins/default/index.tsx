import { type Plugin } from '~/types';

export const DefaultPlugin: Plugin = ({ type, payload, wrapper }) => {
  return (
    <section class="border-2 border-dashed border-red-500 p-8">
      <p>
        Unknown section type: <strong>{type}</strong>
      </p>
      {payload && <p>Payload: {payload}</p>}
    </section>
  );
};
