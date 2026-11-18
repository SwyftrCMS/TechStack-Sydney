import { useEffect, useState } from 'react';
import { VideoPlayerShell } from './components/VideoPlayerShell';

export default function App() {
  const [frame, setFrame] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      window.parent.postMessage({ type: 'tss-app-video-ready' }, window.location.origin);
    });
    return () => window.cancelAnimationFrame(frameId);
  }, []);

  return (
    <main className="h-full min-h-0 w-full bg-white flex items-center justify-center overflow-hidden">
      <VideoPlayerShell
        frame={frame}
        setFrame={setFrame}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </main>
  );
}
