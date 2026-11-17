import React, { useEffect, useRef, useState } from 'react';
import { FPS, TOTAL_FRAMES } from '../utils/remotionMath';
import { ShowcaseVideo } from './video/ShowcaseVideo';

interface VideoPlayerShellProps {
  frame: number;
  setFrame: React.Dispatch<React.SetStateAction<number>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

export const VideoPlayerShell: React.FC<VideoPlayerShellProps> = ({
  frame,
  setFrame,
  isPlaying,
  setIsPlaying,
}) => {
  const stageContainerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = stageContainerRef.current;
    if (!el) return;

    const updateScale = () => {
      const w = el.clientWidth;
      if (w > 0) setScale(w / 1280);
    };

    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    let rafId = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      setFrame((prev) => (prev + dt * FPS) % TOTAL_FRAMES);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isPlaying, setFrame]);

  return (
    <div
      ref={stageContainerRef}
      onClick={() => setIsPlaying((p) => !p)}
      role="button"
      tabIndex={0}
      aria-label={isPlaying ? 'Pause showcase video' : 'Play showcase video'}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsPlaying((p) => !p);
        }
      }}
      className="relative w-full max-w-[1280px] aspect-video bg-white overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500"
    >
      <div
        className="w-[1280px] h-[720px] origin-top-left bg-white"
        style={{
          transform: `scale(${scale})`,
        }}
      >
        <ShowcaseVideo frame={frame} />
      </div>
    </div>
  );
};
