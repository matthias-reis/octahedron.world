import type { ParentComponent } from 'solid-js';

export const QuestWrapper: ParentComponent<{
  isFinished: boolean;
  failed?: boolean;
}> = (props) => {
  const isSuccess = () => props.isFinished && !props.failed;
  const isFailed = () => props.isFinished && props.failed;
  const isOpen = () => !props.isFinished;

  return (
    <div
      class="my-6 p-6 border-2 rounded-xl"
      classList={{
        'border-saturated-500': isOpen() || isFailed(),
        'border-emerald-700': isSuccess(),
      }}
    >
      <p
        class="text-sm mb-4"
        classList={{
          'text-saturated-600': isOpen() || isFailed(),
          'text-emerald-700': isSuccess(),
        }}
      >
        {isFailed() ? 'Failed' : isSuccess() ? 'Finished' : 'Open'} Quest
      </p>
      {props.children}
    </div>
  );
};
