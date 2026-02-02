import { ParentComponent } from 'solid-js';

export const View: ParentComponent<{ visible: boolean; id: string }> = (
  props
) => {
  return (
    <div
      id={props.id}
      class="w-full h-full absolute transition-opacity duration-500"
      classList={{
        'opacity-100 z-10': props.visible,
        'opacity-0 z-0 pointer-events-none': !props.visible,
      }}
      aria-hidden={!props.visible}
    >
      {props.children}
    </div>
  );
};
