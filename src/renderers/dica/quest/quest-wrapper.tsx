import type { ParentComponent } from 'solid-js';
import { useI18n } from '~/i18n/context';

export const QuestWrapper: ParentComponent<{
  isFinished: boolean;
  failed?: boolean;
}> = (props) => {
  const isSuccess = () => props.isFinished && !props.failed;
  const isFailed = () => props.isFinished && props.failed;
  const isOpen = () => !props.isFinished;

  const { t } = useI18n();

  return (
    <div
      class="my-6 p-6 border-2 rounded-xl"
      classList={{
        'border-cas5': isOpen() || isFailed(),
        'border-cbs5': isSuccess(),
      }}
    >
      <p
        class="text-sm mb-4"
        classList={{
          'text-cas5': isOpen() || isFailed(),
          'text-cbs5': isSuccess(),
        }}
      >
        {isFailed()
          ? t('dica.failedQuest')
          : isSuccess()
            ? t('dica.finishedQuest')
            : t('dica.openQuest')}
      </p>
      {props.children}
    </div>
  );
};
