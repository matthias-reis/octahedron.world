import { Show, For, createSignal, createEffect, onCleanup } from 'solid-js';
import type { BaseQuestConfig, BaseQuestStatus, QuestVariant } from './types';
import { QuestWrapper } from './quest-wrapper';
import { largeImageUrl } from '~/components/image-helpers';

export type ImageMapMultiQuestConfig = BaseQuestConfig & {
  variant: 'imagemapmulti';
  question: string;
  image: string;
  spots: [number, number][];
  success: string;
  failure: string;
  debug?: boolean;
  tolerance?: number;
};

export type ImageMapMultiQuestStatus = BaseQuestStatus & {
  variant: 'imagemapmulti';
  tries?: number;
  foundSpots?: number[];
};

const TOLERANCE_PERCENT = 4;
const PENALTY_PER_TRY = 10;
const MIN_TOLERANCE_PX = 30;

export const ImageMapMultiQuest: QuestVariant<
  ImageMapMultiQuestConfig,
  ImageMapMultiQuestStatus
> = (props) => {
  const config = () => props.config;

  const [isFinished, setIsFinished] = createSignal(props.status.finished);
  const [tries, setTries] = createSignal(props.status.tries ?? 0);
  const [foundSpots, setFoundSpots] = createSignal<number[]>(
    props.status.foundSpots ?? []
  );
  const [showError, setShowError] = createSignal(false);

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

    const toleranceX = getTolerancePercent('x');
    const toleranceY = getTolerancePercent('y');

    const spots = config().spots;
    const currentFound = foundSpots();

    let matchedSpotIndex = -1;
    for (let i = 0; i < spots.length; i++) {
      if (currentFound.includes(i)) continue;

      const [spotX, spotY] = spots[i];
      const withinX = Math.abs(clickX - spotX) <= toleranceX;
      const withinY = Math.abs(clickY - spotY) <= toleranceY;

      if (withinX && withinY) {
        matchedSpotIndex = i;
        break;
      }
    }

    if (matchedSpotIndex >= 0) {
      const newFoundSpots = [...currentFound, matchedSpotIndex];
      setFoundSpots(newFoundSpots);
      setShowError(false);

      if (newFoundSpots.length === spots.length) {
        const currentTries = tries();
        const score = Math.max(0, 100 - PENALTY_PER_TRY * currentTries);
        const reveal = config().reveal ?? [];
        setIsFinished(true);
        props.onFinalize(score, reveal);
      } else {
        props.onChange({ foundSpots: newFoundSpots });
      }
    } else {
      const newTries = tries() + 1;
      setTries(newTries);
      setShowError(true);
      props.onChange({ tries: newTries });
    }
  };

  const debugOverlayStyle = (spot: [number, number]) => {
    const [spotX, spotY] = spot;
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

  const foundMarkerStyle = (spot: [number, number]) => {
    const [spotX, spotY] = spot;

    return {
      position: 'absolute' as const,
      left: `${spotX}%`,
      top: `${spotY}%`,
      transform: 'translate(-50%, -50%)',
      width: '24px',
      height: '24px',
      'background-color': 'rgba(16, 185, 129, 0.8)',
      'border-radius': '50%',
      'pointer-events': 'none' as const,
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      color: 'white',
      'font-size': '14px',
      'font-weight': 'bold',
    };
  };

  const totalSpots = () => config().spots.length;
  const foundCount = () => foundSpots().length;

  return (
    <QuestWrapper isFinished={isFinished()}>
      <h3 class="text-2xl mb-6">{config().question}</h3>

      <Show when={isFinished()}>
        <img
          src={`/img/${config().image}/l.jpg`}
          alt="Quest image"
          class="max-w-sm mx-auto mb-6"
        />
        <p class="text-emerald-500 max-w-sm mx-auto text-center">
          {config().success}
        </p>
      </Show>

      <Show when={!isFinished()}>
        <p class="text-center text-neutral-500 mb-4">
          Found {foundCount()} out of {totalSpots()}
          {tries() > 0 && ` (false attempts: ${tries()})`}
        </p>

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
            <For each={config().spots}>
              {(spot) => <div style={debugOverlayStyle(spot)} />}
            </For>
          </Show>

          <For each={foundSpots()}>
            {(spotIndex) => (
              <div style={foundMarkerStyle(config().spots[spotIndex])}>
                <span>&#10003;</span>
              </div>
            )}
          </For>
        </div>

        <Show when={showError()}>
          <p class="text-saturated-600 mt-4 text-center">{config().failure}</p>
        </Show>
      </Show>
    </QuestWrapper>
  );
};
