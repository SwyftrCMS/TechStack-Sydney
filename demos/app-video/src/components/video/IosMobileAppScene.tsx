import React from 'react';
import {
  Check,
  Home,
  Users,
  BarChart3,
  Zap,
  Lock,
  Mail,
  Server,
  TrendingUp,
  Bell,
} from 'lucide-react';
import { Easing, interpolate, interpolateMulti, spring } from '../../utils/remotionMath';

interface IosMobileAppSceneProps {
  frame: number;
}

const EMAIL_TEXT = 'hannah.walsh@tss.com.au';
const PASS_LENGTH = 10;

export const IosMobileAppScene: React.FC<IosMobileAppSceneProps> = ({ frame }) => {
  // Shrink from full-width website (1180x648, radius 20) down to iOS iPhone dimensions (304x616, radius 46)
  const shrink = interpolate(frame, [588, 616], [0, 1], {
    easing: Easing.expoInOut,
  });

  const width = Math.round(1180 - (1180 - 304) * shrink);
  const height = Math.round(648 - (648 - 616) * shrink);
  const borderRadius = Math.round(20 + 26 * shrink);
  const bezelPad = Math.round(10 * shrink);

  // Fade in iOS inner screen right as shrink settles
  const screenOpacity = interpolate(frame, [600, 616], [0, 1], {
    easing: Easing.easeOut,
  });

  // Login typing & FaceID / Sign-in sequence (frames 614..668)
  const emailChars = Math.floor(
    interpolate(frame, [614, 636], [0, EMAIL_TEXT.length], {
      easing: Easing.easeOut,
    })
  );
  const passDots = Math.floor(
    interpolate(frame, [636, 648], [0, PASS_LENGTH], {
      easing: Easing.easeOut,
    })
  );

  const buttonPress = interpolateMulti(
    frame,
    [649, 652, 656],
    [1, 0.94, 1],
    { easing: Easing.easeInOut }
  );
  const isSigningIn = frame >= 652 && frame < 666;
  const isVerified = frame >= 660 && frame < 668;

  // Slide transition from Login Screen -> Logged-in Mobile App (frames 664..678)
  const appSlide = interpolate(frame, [664, 678], [100, 0], {
    easing: Easing.expoOut,
  });

  // Staggered card reveals inside Mobile App (frames 674..726)
  const localApp = Math.max(0, frame - 672);
  const kpiCard = spring({ frame: localApp, delay: 2, config: { damping: 16, stiffness: 140 } });
  const chartCard = spring({ frame: localApp, delay: 8, config: { damping: 16, stiffness: 140 } });
  const feedCard = spring({ frame: localApp, delay: 14, config: { damping: 16, stiffness: 140 } });

  // Gentle mobile scroll inside app near end (frames 700..732)
  const appScrollY = interpolate(frame, [700, 730], [0, 48], {
    easing: Easing.easeInOut,
  });

  return (
    <div
      className="bg-white border border-slate-300/90 shadow-[0_24px_64px_-16px_rgba(15,23,42,0.22)] relative overflow-hidden flex flex-col"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: `${borderRadius}px`,
        padding: `${bezelPad}px`,
      }}
    >
      {/* Inner iOS Screen */}
      <div
        className="w-full h-full bg-[#FAFBFD] overflow-hidden relative flex flex-col border border-slate-200/70"
        style={{
          borderRadius: `${Math.max(12, borderRadius - 10)}px`,
          opacity: screenOpacity,
        }}
      >
        {/* iOS Status Bar + Dynamic Island */}
        <div className="h-11 px-5 pt-1.5 flex items-center justify-between bg-white shrink-0 relative z-30">
          <span className="text-[11px] font-semibold text-slate-900 tabular-nums">
            9:41
          </span>

          {/* Dynamic Island */}
          <div className="w-[82px] h-[22px] rounded-full bg-slate-900 flex items-center justify-end px-2">
            <span className="w-2 h-2 rounded-full bg-blue-900/90 border border-blue-400/40" />
          </div>

          {/* Signal + Battery */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-end gap-[1.5px] h-2.5">
              <span className="w-[2px] h-1 bg-slate-800 rounded-full" />
              <span className="w-[2px] h-1.5 bg-slate-800 rounded-full" />
              <span className="w-[2px] h-2 bg-slate-800 rounded-full" />
              <span className="w-[2px] h-2.5 bg-slate-800 rounded-full" />
            </div>
            <div className="w-4 h-2.5 rounded-[3px] border border-slate-800 p-[1px] flex items-center">
              <div className="w-full h-full bg-slate-800 rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* Viewport: Login Screen <-> Mobile App */}
        <div className="relative flex-1 overflow-hidden">
          {/* SCREEN 1: iOS Login Screen */}
          <div
            className="absolute inset-0 bg-white px-5 pt-8 pb-6 flex flex-col justify-between"
            style={{
              transform: `translateX(${(appSlide - 100) * 0.35}%)`,
              opacity: appSlide > 5 ? 1 : 0,
            }}
          >
            <div>
              {/* Brand Mark */}
              <div className="flex flex-col items-center text-center mb-7">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md mb-3">
                  <svg viewBox="0 0 16 16" className="w-6 h-6 text-white" fill="none">
                    <rect x="2.5" y="2.5" width="4.5" height="4.5" rx="1" fill="currentColor" />
                    <rect x="9" y="2.5" width="4.5" height="4.5" rx="1" fill="currentColor" opacity="0.7" />
                    <rect x="2.5" y="9" width="4.5" height="4.5" rx="1" fill="currentColor" opacity="0.7" />
                    <rect x="9" y="9" width="4.5" height="4.5" rx="1" fill="currentColor" />
                  </svg>
                </div>
                <div className="font-display text-base font-bold text-slate-900">
                  TSS White Label
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Sign in to Australian workspace
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-3.5">
                <div>
                  <label className="text-[10.5px] font-medium text-slate-600 block mb-1">
                    Work Email
                  </label>
                  <div className="h-10 rounded-xl border border-blue-200 bg-[#FAFBFD] px-3 flex items-center gap-2 text-[11.5px] text-slate-800 font-mono">
                    <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate">
                      {EMAIL_TEXT.slice(0, emailChars)}
                      {frame >= 614 && frame < 636 && (
                        <span className="inline-block w-[1.5px] h-3.5 bg-blue-600 align-middle ml-0.5" />
                      )}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-[10.5px] font-medium text-slate-600 block mb-1">
                    Password
                  </label>
                  <div className="h-10 rounded-xl border border-slate-200 bg-[#FAFBFD] px-3 flex items-center gap-2 text-xs text-slate-800 font-mono">
                    <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="tracking-widest text-slate-800">
                      {'•'.repeat(passDots)}
                    </span>
                  </div>
                </div>

                {/* Sign In Button */}
                <div className="pt-2">
                  <div
                    className={`h-10 rounded-xl font-semibold text-xs text-white flex items-center justify-center gap-2 shadow-sm transition-colors ${
                      isVerified ? 'bg-emerald-600' : 'bg-blue-600'
                    }`}
                    style={{ transform: `scale(${buttonPress})` }}
                  >
                    {isVerified ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Authenticated</span>
                      </>
                    ) : isSigningIn ? (
                      <span>Signing in...</span>
                    ) : (
                      <span>Sign In</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center text-[10px] text-slate-400">
              ap-southeast-2 · Melbourne &amp; Sydney SSO
            </div>
          </div>

          {/* SCREEN 2: Logged-in Mobile App Version of the Site */}
          <div
            className="absolute inset-0 bg-[#FAFBFD] flex flex-col"
            style={{
              transform: `translateX(${appSlide}%)`,
            }}
          >
            {/* Mobile App Header */}
            <div className="px-4 py-2.5 bg-white border-b border-slate-100 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                  <svg viewBox="0 0 16 16" className="w-3 h-3 text-white" fill="none">
                    <rect x="2.5" y="2.5" width="4.5" height="4.5" rx="1" fill="currentColor" />
                    <rect x="9" y="2.5" width="4.5" height="4.5" rx="1" fill="currentColor" opacity="0.7" />
                    <rect x="2.5" y="9" width="4.5" height="4.5" rx="1" fill="currentColor" opacity="0.7" />
                    <rect x="9" y="9" width="4.5" height="4.5" rx="1" fill="currentColor" />
                  </svg>
                </div>
                <span className="font-display text-xs font-bold text-slate-900">
                  TSS White Label
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Bell className="w-3.5 h-3.5 text-slate-500" />
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-[9px] font-bold flex items-center justify-center">
                  HW
                </div>
              </div>
            </div>

            {/* Scrollable Mobile Content */}
            <div className="flex-1 overflow-hidden px-3.5 pt-3">
              <div
                className="space-y-2.5"
                style={{ transform: `translate3d(0, -${appScrollY}px, 0)` }}
              >
                {/* Greeting + AU Status */}
                <div className="px-0.5">
                  <div className="text-[10px] text-slate-400">Welcome back, Hannah Walsh</div>
                  <div className="font-display text-sm font-bold text-slate-900">
                    Sales &amp; Site Overview
                  </div>
                </div>

                {/* KPI Row matching CRM */}
                <div
                  className="grid grid-cols-2 gap-2"
                  style={{
                    opacity: kpiCard,
                    transform: `translateY(${(1 - kpiCard) * 12}px)`,
                  }}
                >
                  <div className="rounded-xl bg-white border border-slate-100 p-3 shadow-[0_2px_8px_rgba(15,23,42,0.03)]">
                    <div className="text-[9.5px] text-slate-500">New Deals</div>
                    <div className="text-base font-bold text-slate-900 tabular-nums mt-0.5">
                      $31,436
                    </div>
                    <div className="text-[9.5px] font-semibold text-emerald-600 mt-0.5 tabular-nums">
                      13% ▲ YoY
                    </div>
                  </div>
                  <div className="rounded-xl bg-white border border-slate-100 p-3 shadow-[0_2px_8px_rgba(15,23,42,0.03)]">
                    <div className="text-[9.5px] text-slate-500">Deals Won</div>
                    <div className="text-base font-bold text-slate-900 tabular-nums mt-0.5">
                      $67,877
                    </div>
                    <div className="text-[9.5px] font-semibold text-blue-600 mt-0.5 tabular-nums">
                      64 Channels
                    </div>
                  </div>
                </div>

                {/* Mobile Sales Chart Card */}
                <div
                  className="rounded-xl bg-white border border-slate-100 p-3 shadow-[0_2px_8px_rgba(15,23,42,0.03)]"
                  style={{
                    opacity: chartCard,
                    transform: `translateY(${(1 - chartCard) * 14}px)`,
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold text-slate-800">
                      Sales Velocity
                    </span>
                    <span className="text-[10px] font-mono font-semibold text-blue-600 tabular-nums">
                      May · 190,239
                    </span>
                  </div>
                  <svg viewBox="0 0 220 64" className="w-full h-14">
                    <defs>
                      <linearGradient id="mobGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563EB" stopOpacity="0.22" />
                        <stop offset="100%" stopColor="#2563EB" stopOpacity="0.01" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M4,52 Q 36,24 68,38 T 134,18 T 216,22 L216,62 L4,62 Z"
                      fill="url(#mobGrad)"
                    />
                    <path
                      d="M4,52 Q 36,24 68,38 T 134,18 T 216,22"
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="2"
                    />
                    <path
                      d="M4,42 Q 40,48 76,26 T 144,32 T 216,14"
                      fill="none"
                      stroke="#14B8A6"
                      strokeWidth="1.6"
                    />
                  </svg>
                </div>

                {/* Mobile Site Services + Australian Team Activity */}
                <div
                  className="rounded-xl bg-white border border-slate-100 p-3 space-y-2 shadow-[0_2px_8px_rgba(15,23,42,0.03)]"
                  style={{
                    opacity: feedCard,
                    transform: `translateY(${(1 - feedCard) * 14}px)`,
                  }}
                >
                  <div className="text-[11px] font-semibold text-slate-800">
                    Live Platform &amp; Team
                  </div>
                  <div className="flex items-center justify-between text-[10.5px] py-1 border-b border-slate-50">
                    <span className="flex items-center gap-1.5 text-slate-700">
                      <Server className="w-3 h-3 text-blue-600" />
                      Sydney Edge SLA
                    </span>
                    <span className="font-mono text-emerald-600 font-semibold tabular-nums">
                      99.99%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10.5px] py-1 border-b border-slate-50">
                    <span className="flex items-center gap-1.5 text-slate-700">
                      <TrendingUp className="w-3 h-3 text-indigo-600" />
                      Lachlan · Top Rep
                    </span>
                    <span className="font-mono text-slate-900 font-semibold tabular-nums">
                      40,950
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10.5px] pt-1">
                    <span className="text-slate-600">Chloe · Melbourne Deals</span>
                    <span className="font-mono text-slate-900 font-semibold tabular-nums">
                      30,010
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom iOS Tab Bar matching CRM navigation */}
            <div className="h-12 px-3 bg-white border-t border-slate-100 grid grid-cols-4 items-center text-[9px] font-medium text-slate-400 shrink-0">
              <div className="flex flex-col items-center gap-0.5 text-blue-600 font-semibold">
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <Users className="w-3.5 h-3.5" />
                <span>Contacts</span>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Sales</span>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <Zap className="w-3.5 h-3.5" />
                <span>Auto</span>
              </div>
            </div>
          </div>
        </div>

        {/* Home Indicator Bar */}
        <div className="h-4 bg-white flex items-center justify-center shrink-0">
          <div className="w-24 h-1 rounded-full bg-slate-900/80" />
        </div>
      </div>
    </div>
  );
};
