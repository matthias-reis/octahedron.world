import { ParentComponent } from 'solid-js';

export const Page: ParentComponent<{ visible: boolean; id: string }> = (
  props
) => {
  return (
    <section
      id={props.id}
      class="w-full min-h-screen flex flex-col items-stretch justify-start absolute inset-0 transition-opacity duration-500 pt-16"
      classList={{
        'opacity-100 z-10': props.visible,
        'opacity-0 z-0 pointer-events-none': !props.visible,
      }}
      aria-hidden={!props.visible}
    >
      {props.children}
    </section>
  );
};
