import React from 'react';
import { Easing, interpolate, interpolateMulti } from '../../utils/remotionMath';

interface LogoOutroSceneProps {
  frame: number;
}

interface LayerSpec {
  id: string;
  // Starting phone-section positions (centered around 0,0)
  startY: number;
  startWidth: number;
  startHeight: number;
  startRx: number;
  startRot: number;
  // Upward hop offset before landing
  hopX: number;
  hopY: number;
  hopRot: number;
  // Exact SVG coordinates in 96x96 viewBox (scaled by 2.2x)
  endX: number;
  endY: number;
  endWidth: number;
  endHeight: number;
  endRx: number;
  endRot: number;
  fill: string;
  delay: number;
}

// Exact geometry & colors from tech-stack-sydney_confetti-layers_icon_night_93237a7e.svg
const LOGO_LAYERS: LayerSpec[] = [
  {
    id: 'top-pink',
    startY: -220,
    startWidth: 256,
    startHeight: 42,
    startRx: 14,
    startRot: 0,
    hopX: -18,
    hopY: -128,
    hopRot: -11,
    endX: 35,
    endY: 20,
    endWidth: 26,
    endHeight: 9,
    endRx: 4.5,
    endRot: -1.5,
    fill: '#EB4B77',
    delay: 0,
  },
  {
    id: 'second-orange',
    startY: -115,
    startWidth: 256,
    startHeight: 82,
    startRx: 16,
    startRot: 0,
    hopX: 24,
    hopY: -86,
    hopRot: 9,
    endX: 29,
    endY: 33,
    endWidth: 38,
    endHeight: 9,
    endRx: 4.5,
    endRot: 3,
    fill: '#E99557',
    delay: 3,
  },
  {
    id: 'third-yellow',
    startY: -5,
    startWidth: 256,
    startHeight: 108,
    startRx: 16,
    startRot: 0,
    hopX: -14,
    hopY: -44,
    hopRot: -7,
    endX: 24,
    endY: 46,
    endWidth: 48,
    endHeight: 9,
    endRx: 4.5,
    endRot: -2,
    fill: '#FBD354',
    delay: 5,
  },
  {
    id: 'fourth-green',
    startY: 120,
    startWidth: 256,
    startHeight: 104,
    startRx: 16,
    startRot: 0,
    hopX: 16,
    hopY: 6,
    hopRot: 7,
    endX: 19,
    endY: 59,
    endWidth: 58,
    endHeight: 9,
    endRx: 4.5,
    endRot: 2.5,
    fill: '#7CD19F',
    delay: 7,
  },
  {
    id: 'bottom-blue',
    startY: 235,
    startWidth: 256,
    startHeight: 46,
    startRx: 14,
    startRot: 0,
    hopX: -10,
    hopY: 52,
    hopRot: -8,
    endX: 14,
    endY: 72,
    endWidth: 68,
    endHeight: 9,
    endRx: 4.5,
    endRot: -3,
    fill: '#39A6DE',
    delay: 9,
  },
];

const BRAND_TEXT = 'StackTech Sydney';

export const LogoOutroScene: React.FC<LogoOutroSceneProps> = ({ frame }) => {
  // Scene active frames 732..885
  const sceneOpacity = interpolateMulti(
    frame,
    [732, 740, 872, 884],
    [0, 1, 1, 0],
    { easing: Easing.easeInOut }
  );

  if (sceneOpacity <= 0.01) return null;

  // Lift logo slightly upward as text fades in underneath (frames 778..798)
  const logoCenterOffsetY = interpolate(frame, [778, 798], [0, -34], {
    easing: Easing.easeInOut,
  });

  // Clean fade-in for "StackTech Sydney" (frames 786..814)
  const textFadeIn = interpolate(frame, [786, 814], [0, 1], {
    easing: Easing.easeOut,
  });
  const textTranslateY = interpolate(frame, [786, 814], [8, 0], {
    easing: Easing.easeOut,
  });

  return (
    <div
      className="absolute inset-0 bg-white flex flex-col items-center justify-center pointer-events-none select-none"
      style={{ opacity: sceneOpacity }}
    >
      {/* Centered 5-Block Animated Stack -> Confetti Layers Logo */}
      <div
        className="relative flex items-center justify-center"
        style={{
          width: '320px',
          height: '240px',
          transform: `translate3d(0, ${logoCenterOffsetY}px, 0)`,
        }}
      >
        {LOGO_LAYERS.map((layer) => {
          const f = frame - layer.delay;

          // Target box in pixels matching 96x96 SVG scaled by 2.4x (centered at 0,0)
          const scale = 2.4;
          const endW = layer.endWidth * scale;
          const endH = layer.endHeight * scale;
          const endCenterX = (layer.endX + layer.endWidth / 2 - 48) * scale;
          const endCenterY = (layer.endY + layer.endHeight / 2 - 48) * scale;

          // 3-phase arc: Phone Slice -> Fly Up Tiny Bit -> Land in Exact Logo Config
          const width = interpolateMulti(
            f,
            [732, 756, 782],
            [layer.startWidth, endW * 1.12, endW],
            { easing: Easing.easeInOut }
          );
          const height = interpolateMulti(
            f,
            [732, 756, 782],
            [layer.startHeight, endH * 1.25, endH],
            { easing: Easing.easeInOut }
          );
          const rx = interpolateMulti(
            f,
            [732, 756, 782],
            [layer.startRx, endH * 0.5, layer.endRx * scale],
            { easing: Easing.easeInOut }
          );

          const tx = interpolateMulti(
            f,
            [732, 756, 782],
            [0, endCenterX + layer.hopX, endCenterX],
            { easing: Easing.easeInOut }
          );
          const ty = interpolateMulti(
            f,
            [732, 754, 766, 784],
            [layer.startY, layer.hopY - 24, endCenterY - 22, endCenterY],
            { easing: Easing.easeInOut }
          );
          const rot = interpolateMulti(
            f,
            [732, 756, 784],
            [layer.startRot, layer.hopRot, layer.endRot],
            { easing: Easing.easeInOut }
          );

          return (
            <div
              key={layer.id}
              className="absolute"
              style={{
                width: `${width}px`,
                height: `${height}px`,
                borderRadius: `${rx}px`,
                backgroundColor: layer.fill,
                transform: `translate3d(${tx}px, ${ty}px, 0) rotate(${rot}deg)`,
                boxShadow: '0 6px 16px -6px rgba(15, 23, 42, 0.14)',
              }}
            />
          );
        })}
      </div>

      {/* Clean Plus Jakarta Sans fade-in for "StackTech Sydney" underneath the centered logo */}
      <div
        className="-mt-4 h-12 flex items-center justify-center"
        style={{
          opacity: textFadeIn,
          transform: `translate3d(0, ${logoCenterOffsetY + textTranslateY}px, 0)`,
        }}
      >
        <div
          className="text-[36px] font-bold tracking-tight bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent"
          style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
        >
          {BRAND_TEXT}
        </div>
      </div>
    </div>
  );
};
