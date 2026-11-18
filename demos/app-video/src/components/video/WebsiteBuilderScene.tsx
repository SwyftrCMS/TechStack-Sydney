import React from 'react';
import { MapPin, Send, Server, TrendingUp, Workflow, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Easing, interpolate, interpolateMulti, spring } from '../../utils/remotionMath';

interface WebsiteBuilderSceneProps {
  frame: number;
}

export const WebsiteBuilderScene: React.FC<WebsiteBuilderSceneProps> = ({ frame }) => {
  // Local frame starts at 362 as the flip reveals the back face
  const local = Math.max(0, frame - 362);

  // Expand smoothly from CRM width (920x564) into full-width website frame (1180x648)
  const expandProgress = interpolate(frame, [368, 392], [0, 1], {
    easing: Easing.expoOut,
  });
  const frameWidth = Math.round(920 + 260 * expandProgress);
  const frameHeight = Math.round(564 + 84 * expandProgress);

  // Smooth full-width scroll across the 238 frames of website assembly
  const scrollY = interpolateMulti(
    frame,
    [362, 412, 466, 518, 566, 586],
    [0, 0, 250, 500, 745, 745],
    { easing: Easing.easeInOut }
  );

  // Block-by-block spring entrances matching the wireframe structure
  const navBlock = spring({ frame: local, delay: 4, config: { damping: 16, stiffness: 140 } });
  const heroBlock = spring({ frame: local, delay: 14, config: { damping: 16, stiffness: 130 } });

  const svcCard1 = spring({ frame: local, delay: 56, config: { damping: 15, stiffness: 150 } });
  const svcCard2 = spring({ frame: local, delay: 66, config: { damping: 15, stiffness: 150 } });
  const svcCard3 = spring({ frame: local, delay: 76, config: { damping: 15, stiffness: 150 } });

  const splitLeft = spring({ frame: local, delay: 108, config: { damping: 15, stiffness: 140 } });
  const splitRight = spring({ frame: local, delay: 120, config: { damping: 15, stiffness: 140 } });

  const aboutLeft = spring({ frame: local, delay: 148, config: { damping: 15, stiffness: 140 } });
  const mapRight = spring({ frame: local, delay: 160, config: { damping: 14, stiffness: 145 } });
  const mapPinDrop = spring({ frame: local, delay: 172, config: { damping: 12, stiffness: 180 } });

  const contactBlock = spring({ frame: local, delay: 186, config: { damping: 15, stiffness: 140 } });
  const sendActive = frame >= 570;

  // Scrollbar thumb position
  const scrollPct = scrollY / 745;

  return (
    <div
      className="rounded-[20px] bg-white border border-blue-200/80 shadow-[0_22px_58px_-16px_rgba(37,99,235,0.14)] overflow-hidden flex flex-col relative"
      style={{
        width: `${frameWidth}px`,
        height: `${frameHeight}px`,
      }}
    >
      {/* Subtle Minimalist Browser Chrome */}
      <div className="h-9 px-5 border-b border-slate-100 bg-white flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
        </div>
        <div className="px-4 py-1 rounded-md bg-slate-50 border border-slate-100 text-[11px] font-mono text-slate-500">
          tsswhitelabel.com.au
        </div>
        <div className="text-[10.5px] font-mono text-blue-600 font-medium tabular-nums">
          Live Site
        </div>
      </div>

      {/* Scrollable Full-Width Website Viewport */}
      <div className="relative flex-1 overflow-hidden bg-white">
        {/* Scrollbar Indicator */}
        <div className="absolute right-1.5 top-3 bottom-3 w-1.5 rounded-full bg-slate-100 z-20 pointer-events-none">
          <div
            className="w-full h-24 rounded-full bg-blue-500/45"
            style={{
              transform: `translateY(${scrollPct * 430}px)`,
            }}
          />
        </div>

        {/* Scrolling Page Canvas */}
        <div
          className="w-full bg-white"
          style={{
            transform: `translate3d(0, -${scrollY}px, 0)`,
          }}
        >
          {/* BLOCK 1: Top Navigation Bar (LOGO — ABOUT SERVICES CONTACT [CONTACT]) */}
          <div
            className="px-10 h-16 border-b border-slate-100 flex items-center justify-between bg-white"
            style={{
              opacity: navBlock,
              transform: `translateY(${(1 - navBlock) * -14}px)`,
            }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-white" fill="none">
                  <rect x="2.5" y="2.5" width="4.5" height="4.5" rx="1" fill="currentColor" />
                  <rect x="9" y="2.5" width="4.5" height="4.5" rx="1" fill="currentColor" opacity="0.7" />
                  <rect x="2.5" y="9" width="4.5" height="4.5" rx="1" fill="currentColor" opacity="0.7" />
                  <rect x="9" y="9" width="4.5" height="4.5" rx="1" fill="currentColor" />
                </svg>
              </div>
              <span className="font-display font-bold text-[15px] text-slate-900 tracking-tight">
                TSS White Label
              </span>
            </div>

            <div className="flex items-center gap-7 text-[13px] font-medium text-slate-600">
              <span>About</span>
              <span>Services</span>
              <span>Contact</span>
              <span className="px-4 py-1.5 rounded-lg bg-blue-600 text-white font-semibold text-xs">
                Contact
              </span>
            </div>
          </div>

          {/* BLOCK 2: Centered Hero Section (HEADLINE + Subcopy + GET STARTED) */}
          <div
            className="px-10 py-20 border-b border-slate-100 flex flex-col items-center text-center bg-gradient-to-b from-white to-[#FAFBFD]"
            style={{
              opacity: heroBlock,
              transform: `translateY(${(1 - heroBlock) * 24}px) scale(${0.96 + 0.04 * heroBlock})`,
            }}
          >
            <h1 className="font-display text-[42px] font-bold tracking-tight text-slate-900 leading-[1.12] max-w-2xl">
              Scale your Australian CRM &amp; web operations
            </h1>
            <p className="mt-4 text-[15.5px] text-slate-500 max-w-xl leading-relaxed">
              Unified sales pipelines, sovereign Sydney infrastructure, and automated client workflows built in one white-label platform.
            </p>
            <div className="mt-7 px-7 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm shadow-[0_10px_24px_-6px_rgba(37,99,235,0.45)] flex items-center gap-2">
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* BLOCK 3: OUR SERVICES (3-Column Grid matching wireframe) */}
          <div className="px-10 py-14 border-b border-slate-100 bg-white">
            <h2
              className="font-display text-2xl font-bold text-slate-900 text-center mb-9"
              style={{
                opacity: svcCard1,
                transform: `translateY(${(1 - svcCard1) * 14}px)`,
              }}
            >
              Our Services
            </h2>

            <div className="grid grid-cols-3 gap-6">
              {[
                {
                  prog: svcCard1,
                  title: 'AU Sovereign Hosting',
                  desc: 'Multi-AZ Sydney & Melbourne clusters delivering 99.99% uptime SLA.',
                  icon: <Server className="w-5 h-5 text-blue-600" />,
                  metric: '11.4ms Edge',
                  color: 'from-blue-50 to-sky-50 border-blue-100',
                },
                {
                  prog: svcCard2,
                  title: 'Pipeline Analytics',
                  desc: 'Real-time channel attribution, deal velocity tracking, and team capability insights.',
                  icon: <TrendingUp className="w-5 h-5 text-indigo-600" />,
                  metric: '+13% Velocity',
                  color: 'from-indigo-50 to-blue-50 border-indigo-100',
                },
                {
                  prog: svcCard3,
                  title: 'Workflow Automation',
                  desc: 'Instant webhook routing and automated CRM bot alerts for sales teams.',
                  icon: <Workflow className="w-5 h-5 text-teal-600" />,
                  metric: 'Zero Manual Sync',
                  color: 'from-teal-50 to-emerald-50 border-teal-100',
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-[0_4px_16px_rgba(15,23,42,0.03)]"
                  style={{
                    opacity: card.prog,
                    transform: `translateY(${(1 - card.prog) * 28}px) scale(${0.92 + 0.08 * card.prog})`,
                  }}
                >
                  {/* Card Visual Frame (replaces wireframe X-box cleanly in same CRM style) */}
                  <div
                    className={`h-28 rounded-lg border bg-gradient-to-br ${card.color} p-4 flex flex-col justify-between mb-4`}
                  >
                    <div className="w-9 h-9 rounded-lg bg-white border border-slate-100 shadow-sm flex items-center justify-center">
                      {card.icon}
                    </div>
                    <div className="font-mono text-xs font-semibold text-slate-700">
                      {card.metric}
                    </div>
                  </div>
                  <div className="font-display text-[15px] font-semibold text-slate-900">
                    {card.title}
                  </div>
                  <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* BLOCK 4: 2-Column Split Row matching wireframe */}
          <div className="grid grid-cols-2 border-b border-slate-100 bg-[#FAFBFD]">
            {/* Left Split Cell: Preview graphic on left + copy on right */}
            <div
              className="p-9 border-r border-slate-100 flex items-center gap-6"
              style={{
                opacity: splitLeft,
                transform: `translateX(${(1 - splitLeft) * -22}px)`,
              }}
            >
              <div className="w-36 h-28 rounded-xl bg-white border border-blue-200/80 shadow-sm p-3 shrink-0 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>Deals Won</span>
                  <span className="text-emerald-600 font-semibold">+13%</span>
                </div>
                <div className="text-lg font-bold text-slate-900 tabular-nums">$67,877</div>
                <div className="h-2 rounded-full bg-blue-100 overflow-hidden">
                  <div className="h-full w-3/4 bg-blue-600 rounded-full" />
                </div>
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-slate-900">
                  Client Portal Sign-Off
                </h3>
                <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                  Approve Q4 releases and field updates in real time with Hannah Walsh and Melbourne team leads.
                </p>
              </div>
            </div>

            {/* Right Split Cell: Copy lines on left + square tile on right */}
            <div
              className="p-9 flex items-center justify-between gap-6"
              style={{
                opacity: splitRight,
                transform: `translateX(${(1 - splitRight) * 22}px)`,
              }}
            >
              <div>
                <h3 className="font-display text-base font-semibold text-slate-900">
                  Mobile Field Activity Tracking
                </h3>
                <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                  Capture AI meeting notes and verified Australian street locations directly from iOS and Android.
                </p>
                <div className="mt-2.5 flex items-center gap-1.5 text-xs font-medium text-blue-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Synced with TSS White Label CRM</span>
                </div>
              </div>
              <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-3 shrink-0 flex flex-col justify-between shadow-sm">
                <span className="text-[10px] font-mono text-blue-100">SYNC</span>
                <span className="text-sm font-bold leading-tight">24/7 Live</span>
              </div>
            </div>
          </div>

          {/* BLOCK 5: ABOUT US + Australian Street Map & Pin (2 Columns matching wireframe) */}
          <div className="grid grid-cols-2 border-b border-slate-100 bg-white">
            {/* Left: ABOUT US */}
            <div
              className="p-10 border-r border-slate-100 flex flex-col justify-center"
              style={{
                opacity: aboutLeft,
                transform: `translateY(${(1 - aboutLeft) * 18}px)`,
              }}
            >
              <h2 className="font-display text-xl font-bold text-slate-900">
                About Us
              </h2>
              <p className="mt-3 text-[13px] text-slate-600 leading-relaxed">
                Built in Melbourne and Sydney by Lachlan, Sarah Mitchell, and Liam O&apos;Connor, TSS White Label powers high-growth Australian agencies and enterprise sales teams with transparent reporting and dedicated local engineering.
              </p>
              <div className="mt-4 text-xs font-mono text-slate-400">
                42 Collins St, Level 8, Melbourne VIC 3000
              </div>
            </div>

            {/* Right: Vector Street Map + Pin matching wireframe */}
            <div
              className="p-8 bg-[#FAFBFD] flex items-center justify-center"
              style={{
                opacity: mapRight,
                transform: `scale(${0.94 + 0.06 * mapRight})`,
              }}
            >
              <div className="w-full h-36 rounded-xl bg-[#F1F5F9] border border-slate-200/80 relative overflow-hidden">
                <svg viewBox="0 0 360 140" className="w-full h-full">
                  {/* Diagonal grid streets matching wireframe */}
                  <line x1="0" y1="30" x2="360" y2="10" stroke="#FFFFFF" strokeWidth="5" />
                  <line x1="0" y1="75" x2="360" y2="55" stroke="#FFFFFF" strokeWidth="6" />
                  <line x1="0" y1="120" x2="360" y2="100" stroke="#FFFFFF" strokeWidth="5" />
                  <line x1="60" y1="0" x2="90" y2="140" stroke="#FFFFFF" strokeWidth="5" />
                  <line x1="150" y1="0" x2="180" y2="140" stroke="#FFFFFF" strokeWidth="6" />
                  <line x1="250" y1="0" x2="280" y2="140" stroke="#FFFFFF" strokeWidth="5" />
                  <path d="M120 40 L230 34 L240 80 L130 86 Z" fill="#E2E8F0" opacity="0.65" />
                </svg>

                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                  style={{
                    transform: `translate(-50%, ${-50 - (1 - mapPinDrop) * 28}%) scale(${0.6 + 0.4 * mapPinDrop})`,
                  }}
                >
                  <div className="w-9 h-9 rounded-full bg-blue-600 text-white shadow-md flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="mt-1 px-2 py-0.5 rounded bg-white border border-slate-200 shadow-sm text-[10px] font-semibold text-slate-800 whitespace-nowrap">
                    Melbourne HQ
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BLOCK 6: CONTACT US (Input + Send Button matching wireframe) */}
          <div
            className="px-10 py-14 bg-white flex flex-col items-center text-center"
            style={{
              opacity: contactBlock,
              transform: `translateY(${(1 - contactBlock) * 20}px)`,
            }}
          >
            <h2 className="font-display text-xl font-bold text-slate-900">
              Contact Us
            </h2>
            <p className="mt-1.5 text-xs text-slate-500">
              Speak directly with our Australian platform team.
            </p>
            <div className="mt-5 flex items-center gap-3 w-full max-w-md">
              <div className="flex-1 h-11 rounded-xl border border-slate-200 bg-[#FAFBFD] px-4 flex items-center text-xs text-slate-600 font-mono">
                {sendActive ? 'hannah.walsh@enterprise.com.au' : 'Enter your work email...'}
              </div>
              <div
                className={`h-11 px-6 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-colors ${
                  sendActive
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-blue-600 text-white'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>{sendActive ? 'Sent' : 'Send'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
