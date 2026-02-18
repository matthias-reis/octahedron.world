import { Show, createSignal, createEffect, onCleanup } from 'solid-js';
import type { BaseQuestConfig, BaseQuestStatus, QuestVariant } from './types';
import { QuestWrapper } from './quest-wrapper';
import { largeImageUrl } from '~/components/image-helpers';
import { useI18n } from '~/i18n/context';

export type ImageMapQuestConfig = BaseQuestConfig & {
  variant: 'imagemap';
  question: string;
  image: string;
  spot: [number, number];
  success: string;
  failure: string;
  debug?: boolean;
  tolerance?: number;
};

export type ImageMapQuestStatus = BaseQuestStatus & {
  variant: 'imagemap';
  tries?: number;
};

const TOLERANCE_PERCENT = 8;
const PENALTY_PER_TRY = 15;
const MIN_TOLERANCE_PX = 30;

export const ImageMapQuest: QuestVariant<
  ImageMapQuestConfig,
  ImageMapQuestStatus
> = (props) => {
  const config = () => props.config;

  const [isFinished, setIsFinished] = createSignal(props.status.finished);
  const [tries, setTries] = createSignal(props.status.tries ?? 0);
  const [showError, setShowError] = createSignal(false);
  const [_lastClick, setLastClick] = createSignal<[number, number] | null>(
    null
  );
  const { t } = useI18n();

  let imageRef: HTMLImageElement | undefined;
  const [imageDimensions, setImageDimensions] = createSignal<{
    width: number;
    height: number;
  } | null>(null);

  const updateDimensions = () => {
    if (imageRef) {
      setImageDimensions({
        width: imageRef.clientWidth,
        height: imageRef.clientHeight,
      });
    }
  };

  createEffect(() => {
    window.addEventListener('resize', updateDimensions);
    onCleanup(() => window.removeEventListener('resize', updateDimensions));
  });

  const handleImageLoad = () => {
    updateDimensions();
  };

  const getTolerancePercent = (dimension: 'x' | 'y') => {
    const tolerance = config().tolerance ?? TOLERANCE_PERCENT;
    const dims = imageDimensions();
    if (!dims) return tolerance;

    const size = dimension === 'x' ? dims.width : dims.height;
    const tolerancePx = (tolerance / 100) * size;

    if (tolerancePx < MIN_TOLERANCE_PX) {
      return (MIN_TOLERANCE_PX / size) * 100;
    }

    return tolerance;
  };

  const handleImageClick = (e: MouseEvent) => {
    if (isFinished()) return;

    const target = e.currentTarget as HTMLImageElement;
    const rect = target.getBoundingClientRect();

    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    setLastClick([clickX, clickY]);

    const [spotX, spotY] = config().spot;
    const toleranceX = getTolerancePercent('x');
    const toleranceY = getTolerancePercent('y');

    const withinX = Math.abs(clickX - spotX) <= toleranceX;
    const withinY = Math.abs(clickY - spotY) <= toleranceY;

    if (withinX && withinY) {
      const currentTries = tries();
      const score = Math.max(0, 100 - PENALTY_PER_TRY * currentTries);
      const reveal = config().reveal ?? [];
      setIsFinished(true);
      setShowError(false);
      props.onFinalize(score, reveal);
    } else {
      const newTries = tries() + 1;
      setTries(newTries);
      setShowError(true);
      props.onChange({ tries: newTries });
    }
  };

  const debugOverlayStyle = () => {
    const [spotX, spotY] = config().spot;
    const toleranceX = getTolerancePercent('x');
    const toleranceY = getTolerancePercent('y');

    return {
      position: 'absolute' as const,
      left: `${spotX - toleranceX}%`,
      top: `${spotY - toleranceY}%`,
      width: `${toleranceX * 2}%`,
      height: `${toleranceY * 2}%`,
      'background-color': 'rgba(236, 72, 153, 0.4)',
      'pointer-events': 'none' as const,
      border: '2px dashed rgba(236, 72, 153, 0.8)',
    };
  };

  return (
    <QuestWrapper isFinished={isFinished()}>
      <h3 class="text-2xl mb-6">{config().question}</h3>

      <Show when={isFinished()}>
        <img
          src={largeImageUrl(config().image)}
          alt="Quest image"
          class="max-w-sm mx-auto mb-6"
        />
        <p class="text-cbs5 max-w-sm mx-auto text-center">{config().success}</p>
      </Show>

      <Show when={!isFinished()}>
        <div class="relative w-full">
          <img
            ref={imageRef}
            src={largeImageUrl(config().image)}
            alt="Quest image"
            class="w-full cursor-crosshair select-none"
            onClick={handleImageClick}
            onLoad={handleImageLoad}
            draggable={false}
          />
          <Show when={config().debug && imageDimensions()}>
            <div style={debugOverlayStyle()} />
          </Show>
        </div>

        <Show when={showError()}>
          <p class="text-saturated-500 mt-4 text-center">{config().failure}</p>
          <p class="text-neutral-500 text-sm text-center mt-1">
            {t('dica.wrongAttempts', { count: tries() })}
          </p>
        </Show>
      </Show>
    </QuestWrapper>
  );
};
