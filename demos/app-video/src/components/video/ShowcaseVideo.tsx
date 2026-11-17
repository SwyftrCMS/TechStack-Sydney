import React from 'react';
import { Easing, interpolate, interpolateMulti } from '../../utils/remotionMath';
import { CodeEditorScene } from './CodeEditorScene';
import { CrmDashboardCore } from './CrmDashboardCore';
import { IosMobileAppScene } from './IosMobileAppScene';
import { LogoOutroScene } from './LogoOutroScene';
import {
  AutomationStageOverlay,
  FeaturesStageOverlay,
  HostingStageOverlay,
  SupportStageOverlay,
} from './StagePanels';
import { WebsiteBuilderScene } from './WebsiteBuilderScene';

interface ShowcaseVideoProps {
  frame: number;
}

export const ShowcaseVideo: React.FC<ShowcaseVideoProps> = ({ frame }) => {
  const showCoder = frame < 75;
  const showWorldB = frame >= 70 && frame < 746;
  const showOutro = frame >= 732;

  // World B fades in sharply at frame 72 and hands off to LogoOutroScene at 732..742
  const worldBOpacity = interpolateMulti(
    frame,
    [70, 74, 732, 742],
    [0, 1, 1, 0],
    { easing: Easing.easeInOut }
  );

  // 3D Camera Rig Keyframes across CRM stages (Frames 72..352), settling to 0 at 352 for the flip
  const camScale = interpolateMulti(
    frame,
    [72, 78, 128, 134, 185, 194, 248, 255, 302, 312, 342, 352],
    [1.06, 1.14, 1.06, 1.08, 1.06, 0.94, 1.01, 1.12, 0.94, 0.98, 1.03, 1.0],
    { easing: Easing.easeInOut }
  );

  const camX = interpolateMulti(
    frame,
    [72, 82, 128, 133, 144, 185, 195, 248, 256, 302, 312, 342, 352],
    [-40, -56, -32, 120, 18, 10, -8, 12, 20, -10, 32, 8, 0],
    { easing: Easing.easeInOut }
  );

  const camY = interpolateMulti(
    frame,
    [72, 82, 128, 138, 185, 192, 248, 256, 302, 312, 342, 352],
    [22, 28, 14, -6, -6, 28, 0, -16, 4, -8, 10, 0],
    { easing: Easing.easeInOut }
  );

  const camRotX = interpolateMulti(
    frame,
    [72, 82, 128, 138, 185, 192, 248, 256, 302, 312, 342, 352],
    [6, 4.5, 2, 1.5, 0.5, 16, 3, 6, 1, 11, 12, 0],
    { easing: Easing.easeInOut }
  );

  const camRotY = interpolateMulti(
    frame,
    [72, 82, 128, 134, 145, 185, 195, 248, 256, 302, 312, 342, 352],
    [-8, -6, -3, 12, 3, 1.5, -10, 4, 5, -2.5, 8, -4, 0],
    { easing: Easing.easeInOut }
  );

  // Whip-pan directional blur during Stage 2 transition (frames 131..141)
  const whipBlur = interpolateMulti(
    frame,
    [131, 135, 141],
    [0, 3.5, 0],
    { easing: Easing.easeOut }
  );

  // 3D CRM-to-Website Flip (Frames 352..376)
  const flipAngle = interpolate(frame, [352, 376], [0, 180], {
    easing: Easing.easeInOut,
  });
  const flipDipScale = interpolateMulti(
    frame,
    [352, 364, 376],
    [1, 0.88, 1],
    { easing: Easing.easeInOut }
  );

  const activeMenu: 'Home' | 'Contacts' | 'Sales Dashboard' | 'Automations' =
    frame < 132
      ? 'Home'
      : frame < 189
        ? 'Contacts'
        : frame < 252
          ? 'Sales Dashboard'
          : frame < 306
            ? 'Contacts'
            : 'Automations';

  const isFrontVisible = frame < 364;
  const isBackVisible = frame >= 364;

  // Cross-fade full-width website into shrinking iOS device container (frames 588..606)
  const websiteOpacity = interpolate(frame, [590, 606], [1, 0], {
    easing: Easing.easeOut,
  });
  const websiteShrinkScale = interpolate(frame, [588, 608], [1, 0.56], {
    easing: Easing.expoInOut,
  });
  const iosOpacity = interpolateMulti(
    frame,
    [588, 602, 732, 740],
    [0, 1, 1, 0],
    { easing: Easing.easeInOut }
  );

  return (
    <div className="relative w-[1280px] h-[720px] overflow-hidden bg-white select-none">
      {/* WORLD B: Built TSS White Label CRM -> 3D Flip -> Website -> Shrink to iOS Mobile App */}
      {showWorldB && (
        <div
          className="absolute inset-0 bg-white flex items-center justify-center"
          style={{
            perspective: '1800px',
            opacity: worldBOpacity,
          }}
        >
          <div
            className="relative flex items-center justify-center"
            style={{
              transformStyle: 'preserve-3d',
              transform: `translate3d(${camX}px, ${camY}px, 0px) scale(${camScale * flipDipScale}) rotateX(${camRotX}deg) rotateY(${camRotY + flipAngle}deg)`,
              filter: whipBlur > 0.1 ? `blur(${whipBlur}px)` : undefined,
            }}
          >
            {/* FRONT FACE: TSS White Label CRM + 5 Stages */}
            {isFrontVisible && (
              <div
                className="relative flex items-center justify-center"
                style={{
                  transform: 'rotateY(0deg)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                <CrmDashboardCore crmFrame={Math.max(0, frame - 72)} activeMenu={activeMenu} />

                <HostingStageOverlay frame={frame} />
                <SupportStageOverlay frame={frame} />
                <FeaturesStageOverlay frame={frame} />
                <AutomationStageOverlay frame={frame} />
              </div>
            )}

            {/* BACK FACE (rotateY 180deg): Website Builder -> Shrink to iOS Device */}
            {isBackVisible && (
              <div
                className="relative flex items-center justify-center"
                style={{
                  transform: 'rotateY(180deg)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                {frame < 608 && (
                  <div
                    style={{
                      opacity: websiteOpacity,
                      transform: `scale(${websiteShrinkScale})`,
                    }}
                  >
                    <WebsiteBuilderScene frame={frame} />
                  </div>
                )}

                {frame >= 588 && (
                  <div
                    className={frame < 608 ? 'absolute inset-0 flex items-center justify-center' : ''}
                    style={{ opacity: iosOpacity }}
                  >
                    <IosMobileAppScene frame={frame} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* WORLD C: Phone Breakup -> Upward Hop -> TechStack Sydney Logo + Encoded Wordmark */}
      {showOutro && <LogoOutroScene frame={frame} />}

      {/* WORLD A: Floating Dark-Blue AI Coder on plain white */}
      {showCoder && (
        <div
          className="absolute inset-0"
          style={{
            opacity: frame >= 73 ? 0 : 1,
          }}
        >
          <CodeEditorScene frame={frame} />
        </div>
      )}
    </div>
  );
};
