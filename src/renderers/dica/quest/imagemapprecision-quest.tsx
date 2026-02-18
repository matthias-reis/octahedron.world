import { Show, createSignal, createEffect, onCleanup } from 'solid-js';
import type { BaseQuestConfig, BaseQuestStatus, QuestVariant } from './types';
import { QuestWrapper } from './quest-wrapper';
import { largeImageUrl } from '~/components/image-helpers';
import { useI18n } from '~/i18n/context';

export type ImageMapPrecisionQuestConfig = BaseQuestConfig & {
  variant: 'imagemapprecision';
  question: string;
  image: string;
  spot: [number, number];
  success: string;
  debug?: boolean;
};

export type ImageMapPrecisionQuestStatus = BaseQuestStatus & {
  variant: 'imagemapprecision';
  clickSpot?: [number, number];
};

const DEVIATION_MULTIPLIER = 3;

export const ImageMapPrecisionQuest: QuestVariant<
  ImageMapPrecisionQuestConfig,
  ImageMapPrecisionQuestStatus
> = (props) => {
  const config = () => props.config;

  const [isFinished, setIsFinished] = createSignal(props.status.finished);
  const [clickSpot, setClickSpot] = createSignal<[number, number] | null>(
    props.status.clickSpot ?? null
  );
  const { t } = useI18n();

  const deviation = () => {
    const click = clickSpot();
    if (!click) return 0;
    const [spotX, spotY] = config().spot;
    const dx = click[0] - spotX;
    const dy = click[1] - spotY;
    return Math.round(Math.sqrt(dx * dx + dy * dy) * 10) / 10;
  };

  const computedScore = () =>
    Math.max(0, Math.round(100 - deviation() * DEVIATION_MULTIPLIER));

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

  const handleImageClick = (e: MouseEvent) => {
    if (isFinished()) return;

    const target = e.currentTarget as HTMLImageElement;
    const rect = target.getBoundingClientRect();

    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    const reveal = config().reveal ?? [];

    setClickSpot([clickX, clickY]);
    setIsFinished(true);
    props.onChange({ clickSpot: [clickX, clickY] });
    props.onFinalize(computedScore(), reveal);
  };

  const dotStyle = (x: number, y: number) => ({
    position: 'absolute' as const,
    left: `${x}%`,
    top: `${y}%`,
    width: '16px',
    height: '16px',
    'border-radius': '50%',
    border: `2px solid white`,
    transform: 'translate(-50%, -50%)',
    'pointer-events': 'none' as const,
    'box-shadow': '0 0 4px rgba(0,0,0,0.4)',
  });

  return (
    <QuestWrapper isFinished={isFinished()}>
      <h3 class="text-2xl mb-6">{config().question}</h3>

      <div class="relative w-full mx-auto">
        <img
          ref={imageRef}
          src={largeImageUrl(config().image)}
          alt="Quest image"
          class={`w-full select-none ${isFinished() ? '' : 'cursor-crosshair'}`}
          onClick={handleImageClick}
          onLoad={handleImageLoad}
          draggable={false}
        />

        <Show when={config().debug && !isFinished() && imageDimensions()}>
          <div
            class="bg-cbs5/50"
            style={dotStyle(config().spot[0], config().spot[1])}
          />
        </Show>

        <Show when={isFinished() && clickSpot()}>
          <div
            class="bg-cas5/50"
            style={dotStyle(clickSpot()![0], clickSpot()![1])}
          />
          <div
            class="bg-cbs5/50"
            style={dotStyle(config().spot[0], config().spot[1])}
          />
        </Show>
      </div>

      <Show when={isFinished()}>
        <p class="text-cbs4 mx-auto text-center mt-6">{config().success}</p>
        <p class="text-can4 text-sm text-center mt-2">
          {t('dica.deviation')}: {deviation()}% — {t('dica.score')}:{' '}
          {computedScore()}/100
        </p>
      </Show>
    </QuestWrapper>
  );
};
