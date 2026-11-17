import React from 'react';
import {
  Check,
  MessageSquare,
  ShieldCheck,
  Server,
  Webhook,
  Sparkles,
  ChevronLeft,
  MapPin,
  Calendar,
  User,
} from 'lucide-react';
import { Easing, interpolate, interpolateMulti, spring } from '../../utils/remotionMath';

interface StagePanelProps {
  frame: number;
}

/** Stage 1 (Frames 75–132): Hosting & Monitoring — AU Infrastructure + SLA Cards */
export const HostingStageOverlay: React.FC<StagePanelProps> = ({ frame }) => {
  const local = frame - 75;
  const opacity = interpolateMulti(frame, [73, 82, 126, 134], [0, 1, 1, 0]);
  if (opacity <= 0.01) return null;

  const enter = spring({ frame: local, delay: 2, config: { damping: 16, stiffness: 130 } });
  const arcDash = interpolate(local, [4, 42], [120, 0], { easing: Easing.easeOut });

  return (
    <div
      className="absolute right-8 top-14 w-[520px] rounded-2xl bg-white/98 border border-blue-200/80 shadow-[0_20px_48px_-14px_rgba(37,99,235,0.2)] p-5 pointer-events-none"
      style={{
        opacity,
        transform: `translate3d(0, ${(1 - enter) * 16}px, 36px) scale(${0.95 + 0.05 * enter})`,
      }}
    >
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Server className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">AU Sovereign Infrastructure</div>
            <div className="text-[11px] text-slate-500">ap-southeast-2 · Multi-AZ Active</div>
          </div>
        </div>
        <span className="text-[11px] font-mono font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
          Nominal
        </span>
      </div>

      <div className="mt-4 grid grid-cols-[1.1fr_1fr] gap-4 items-center">
        <div className="rounded-xl bg-[#F4F8FF] border border-blue-100 p-3 relative h-[148px]">
          <svg viewBox="0 0 220 150" className="w-full h-full">
            <path
              d="M44,58 L72,42 L106,30 L132,26 L154,38 L178,56 L184,88 L166,118 L142,126 L112,112 L78,116 L46,104 L34,82 Z"
              fill="#E0ECFF"
              stroke="#93C5FD"
              strokeWidth="1.5"
            />
            <path
              d="M168 86 Q 152 60 156 108"
              fill="none"
              stroke="#2563EB"
              strokeWidth="2"
              strokeDasharray="120"
              strokeDashoffset={arcDash}
            />
            <path
              d="M168 86 Q 178 68 175 62"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="1.8"
              strokeDasharray="120"
              strokeDashoffset={arcDash}
            />
            <circle cx="168" cy="86" r="4.5" fill="#2563EB" />
            <text x="142" y="84" className="fill-slate-800 text-[8.5px] font-mono font-semibold">SYD 11ms</text>

            <circle cx="156" cy="108" r="4" fill="#0EA5E9" />
            <text x="122" y="121" className="fill-slate-700 text-[8px] font-mono font-semibold">MEL 14ms</text>

            <circle cx="175" cy="62" r="3.5" fill="#6366F1" />
            <text x="145" y="53" className="fill-slate-700 text-[8px] font-mono font-semibold">BNE 18ms</text>
          </svg>
        </div>

        <div className="space-y-2.5">
          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-500">Uptime SLA</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div className="text-xl font-bold text-slate-900 tabular-nums mt-0.5">99.99%</div>
            <div className="mt-1.5 flex items-center gap-0.5 h-2">
              {Array.from({ length: 18 }).map((_, i) => (
                <div key={i} className="flex-1 h-full rounded-[1px] bg-emerald-500/85" />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-2.5">
              <div className="text-[10px] text-slate-500">Edge p95</div>
              <div className="text-base font-bold text-slate-900 tabular-nums">11.4ms</div>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-2.5">
              <div className="text-[10px] text-slate-500">Failover</div>
              <div className="text-base font-bold text-blue-600 tabular-nums">Auto</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/** Stage 2 (Frames 132–189): Support & Maintenance — Live Client / Developer Chat */
export const SupportStageOverlay: React.FC<StagePanelProps> = ({ frame }) => {
  const local = frame - 132;
  const opacity = interpolateMulti(frame, [130, 138, 184, 192], [0, 1, 1, 0]);
  if (opacity <= 0.01) return null;

  const panX = interpolate(local, [0, 14], [180, 0], { easing: Easing.expoOut });
  const msg1 = spring({ frame: local, delay: 4, config: { damping: 16, stiffness: 140 } });
  const msg2 = spring({ frame: local, delay: 18, config: { damping: 16, stiffness: 140 } });
  const resolved = spring({ frame: local, delay: 32, config: { damping: 15, stiffness: 150 } });

  return (
    <div
      className="absolute left-8 top-20 w-[430px] rounded-2xl bg-white border border-indigo-200/80 shadow-[0_22px_54px_-14px_rgba(79,70,229,0.2)] p-5 pointer-events-none"
      style={{
        opacity,
        transform: `translate3d(${panX}px, 0, 44px)`,
      }}
    >
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">Direct Engineering Support</div>
            <div className="text-[11px] text-slate-500">Ticket #SUP-418 · Live Channel</div>
          </div>
        </div>
        <span className="text-[11px] font-mono text-indigo-600 font-medium">SLA &lt; 5m</span>
      </div>

      <div className="mt-4 space-y-3">
        <div
          className="rounded-xl bg-slate-50 border border-slate-100 p-3"
          style={{
            opacity: msg1,
            transform: `translateY(${(1 - msg1) * 10}px)`,
          }}
        >
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="font-semibold text-slate-800">Sarah Mitchell · Client Ops</span>
            <span className="font-mono text-slate-400 tabular-nums">09:40</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Can we add Q4 deal velocity alerts to the CRM Bot and capture Melbourne field check-ins?
          </p>
        </div>

        <div
          className="rounded-xl bg-blue-600 text-white p-3 ml-6 shadow-sm"
          style={{
            opacity: msg2,
            transform: `translateY(${(1 - msg2) * 10}px)`,
          }}
        >
          <div className="flex items-center justify-between text-[11px] mb-1 text-blue-100">
            <span className="font-semibold text-white">Liam O&apos;Connor · Lead Engineer</span>
            <span className="font-mono tabular-nums">09:42</span>
          </div>
          <p className="text-xs leading-relaxed text-blue-50">
            Shipping pipeline velocity trigger and Mobile Activity form now. Ready for Q4 sign-off.
          </p>
        </div>

        <div
          className="rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2 flex items-center justify-between text-xs text-emerald-800"
          style={{
            opacity: resolved,
            transform: `scale(${0.96 + 0.04 * resolved})`,
          }}
        >
          <span className="flex items-center gap-1.5 font-medium">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            Patch v2.4.1 deployed to Sydney Edge
          </span>
          <span className="font-mono text-[11px] tabular-nums">2m 18s</span>
        </div>
      </div>
    </div>
  );
};

/** Stage 4 (Frames 252–306): New Features — Portal Sign-Off + Generated Feature Cards + Mobile Frame */
export const FeaturesStageOverlay: React.FC<StagePanelProps> = ({ frame }) => {
  const local = frame - 252;
  const opacity = interpolateMulti(frame, [250, 258, 304, 314], [0, 1, 1, 0.92]);
  if (opacity <= 0.01) return null;

  const signOffScale = spring({ frame: local, delay: 2, config: { damping: 16, stiffness: 130 } });
  const card1 = spring({ frame: local, delay: 14, config: { damping: 14, stiffness: 160 } });
  const card2 = spring({ frame: local, delay: 20, config: { damping: 14, stiffness: 160 } });
  const card3 = spring({ frame: local, delay: 26, config: { damping: 14, stiffness: 160 } });
  const phoneEnter = spring({ frame: local, delay: 16, config: { damping: 16, stiffness: 120 } });

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ opacity }}>
      {/* Client Portal Sign-Off Card + Materialized Feature Cards */}
      <div className="absolute left-6 bottom-6 w-[420px] space-y-2.5">
        <div
          className="rounded-xl bg-white border border-violet-200/90 shadow-[0_18px_44px_-12px_rgba(139,92,246,0.2)] p-3.5"
          style={{
            transform: `scale(${0.92 + 0.08 * signOffScale})`,
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-medium text-violet-600">Client Portal Sign-Off</div>
              <div className="text-sm font-semibold text-slate-900 mt-0.5">
                Q4 Feature Release Approved
              </div>
            </div>
            <div className="px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              Signed by Hannah Walsh
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {[
            { title: 'AI Meeting Notes', sub: 'Auto-summarize', prog: card1 },
            { title: 'Mobile Sync', sub: 'iOS & Android', prog: card2 },
            { title: 'Geo Check-In', sub: 'VIC & NSW fields', prog: card3 },
          ].map((feat) => (
            <div
              key={feat.title}
              className="rounded-xl bg-white/98 border border-blue-200/80 shadow-md p-3"
              style={{
                opacity: feat.prog,
                transform: `scale(${0.5 + 0.5 * feat.prog}) translateY(${(1 - feat.prog) * 16}px)`,
              }}
            >
              <div className="w-6 h-6 rounded-md bg-violet-50 text-violet-600 flex items-center justify-center mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div className="text-xs font-semibold text-slate-900">{feat.title}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{feat.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Reference Image Mobile Phone Frame ("Mobile friendly") */}
      <div
        className="absolute right-[-36px] bottom-4 flex flex-col items-end"
        style={{
          opacity: phoneEnter,
          transform: `translate3d(${(1 - phoneEnter) * 32}px, ${(1 - phoneEnter) * 16}px, 50px)`,
        }}
      >
        <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm mb-2 mr-4">
          <svg viewBox="0 0 36 22" className="w-7 h-5 text-blue-500" fill="none">
            <path
              d="M2 20 C 8 6, 22 4, 34 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span>Mobile friendly</span>
        </div>

        <div className="w-[238px] rounded-[26px] bg-white border-[2px] border-blue-200 shadow-[0_22px_54px_-14px_rgba(37,99,235,0.22)] p-4">
          <div className="flex items-center justify-between text-[10px] font-semibold text-slate-800 px-1 mb-3 tabular-nums">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <span className="w-3 h-1.5 rounded-sm bg-slate-800" />
            </div>
          </div>

          <div className="flex items-center gap-6 mb-3.5">
            <ChevronLeft className="w-4 h-4 text-slate-600" />
            <span className="text-xs font-semibold text-slate-900">Activity Tracking</span>
          </div>

          <div className="space-y-2.5 text-[11px]">
            <div>
              <label className="text-slate-600 font-medium flex items-center gap-1">
                Account <span className="text-rose-500">*</span>
              </label>
              <div className="mt-1 rounded-lg border border-slate-200 px-2.5 py-1.5 flex items-center gap-2 bg-slate-50/50">
                <span className="w-4 h-4 rounded-full bg-violet-100 text-violet-700 text-[8px] font-bold flex items-center justify-center">
                  <User className="w-2.5 h-2.5" />
                </span>
                <span className="text-slate-800 font-medium">Hannah Walsh</span>
              </div>
            </div>

            <div>
              <label className="text-slate-600 font-medium flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                Activity date
              </label>
              <div className="mt-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-slate-700 font-mono text-[10.5px] tabular-nums">
                2025/06/25
              </div>
            </div>

            <div>
              <label className="text-slate-600 font-medium">
                Activity Notes <span className="text-rose-500">*</span>
              </label>
              <div className="mt-1 rounded-lg border border-violet-300 bg-violet-50/30 px-2.5 py-1.5 text-slate-800 flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-blue-600 text-white text-[8px] flex items-center justify-center font-bold">
                  AI
                </span>
                <span>AI meeting notes</span>
              </div>
            </div>

            <div>
              <label className="text-slate-600 font-medium flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                Location <span className="text-rose-500">*</span>
              </label>
              <div className="mt-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-[10px] text-slate-600 leading-snug">
                42 Collins St, Level 8, Melbourne VIC 3000
              </div>
            </div>

            <div className="pt-1.5">
              <div className="w-full py-2 rounded-lg border border-blue-500 text-blue-600 font-semibold text-center text-xs">
                Submit
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/** Stage 5 (Frames 306–354): Automation — 3D Flyover Webhook Workflow + CRM BOT Card */
export const AutomationStageOverlay: React.FC<StagePanelProps> = ({ frame }) => {
  const local = frame - 306;
  const opacity = interpolateMulti(frame, [304, 314, 344, 353], [0, 1, 1, 0]);
  if (opacity <= 0.01) return null;

  const botEnter = spring({ frame: local, delay: 4, config: { damping: 15, stiffness: 130 } });
  const flowPulse = (local % 24) / 24;

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ opacity }}>
      {/* Floating Left CRM BOT Card */}
      <div
        className="absolute -left-10 top-32 w-[296px]"
        style={{
          transform: `translate3d(${(1 - botEnter) * -24}px, 0, 56px) scale(${0.92 + 0.08 * botEnter})`,
        }}
      >
        <div className="text-blue-600 font-semibold text-sm mb-2 ml-4 flex items-center gap-2">
          <span>Automated workflow</span>
          <svg viewBox="0 0 28 18" className="w-6 h-4 text-blue-500" fill="none">
            <path d="M12 2 C 4 6, 4 14, 14 16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </div>

        <div className="rounded-2xl bg-white border border-blue-200/80 shadow-[0_22px_54px_-14px_rgba(37,99,235,0.2)] p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-white" fill="none">
                <rect x="2.5" y="2.5" width="4.5" height="4.5" rx="1" fill="currentColor" />
                <rect x="9" y="2.5" width="4.5" height="4.5" rx="1" fill="currentColor" opacity="0.7" />
                <rect x="2.5" y="9" width="4.5" height="4.5" rx="1" fill="currentColor" opacity="0.7" />
                <rect x="9" y="9" width="4.5" height="4.5" rx="1" fill="currentColor" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-slate-700">CRM</span>
            <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[9px] font-bold">
              BOT
            </span>
          </div>

          <div className="rounded-xl border border-violet-200/70 overflow-hidden">
            <div className="bg-gradient-to-r from-violet-100/90 to-indigo-50 px-3 py-2 text-xs font-semibold text-violet-700">
              Pipeline Review Meeting
            </div>
            <div className="p-3 bg-white space-y-3">
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Q4 deal velocity trending up 13% - Review top performers and replicate strategies
              </p>
              <div className="w-full py-1.5 rounded-lg border border-blue-500 text-blue-600 text-[11px] font-medium text-center">
                View record details
              </div>
              <div className="text-[10px] text-slate-400">
                From <span className="text-blue-600">TSS White Label - sales dashboard</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Webhook Pipeline Bar */}
      <div
        className="absolute left-[310px] top-14 w-[520px] rounded-xl bg-white/95 border border-emerald-200/90 shadow-[0_16px_42px_-12px_rgba(16,185,129,0.2)] px-4 py-3"
        style={{
          transform: `translate3d(0, ${(1 - botEnter) * -12}px, 46px)`,
        }}
      >
        <div className="flex items-center justify-between text-[11px] mb-2">
          <span className="flex items-center gap-1.5 font-semibold text-slate-800">
            <Webhook className="w-3.5 h-3.5 text-emerald-600" />
            Real-Time Webhook Execution
          </span>
          <span className="font-mono text-emerald-700 tabular-nums">POST /hooks/deal-velocity</span>
        </div>

        <div className="grid grid-cols-[1fr_34px_1fr_34px_1fr] items-center gap-1">
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 text-center">
            <div className="text-[10px] text-slate-400">Trigger</div>
            <div className="text-[11px] font-semibold text-slate-800">Deal Velocity +13%</div>
          </div>

          <div className="relative h-4 flex items-center">
            <div className="w-full h-[2px] bg-emerald-200" />
            <div
              className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute"
              style={{ left: `${flowPulse * 24}px` }}
            />
          </div>

          <div className="rounded-lg border border-blue-200 bg-blue-50/60 px-2.5 py-2 text-center">
            <div className="text-[10px] text-blue-600">Transform</div>
            <div className="text-[11px] font-semibold text-slate-900">Rank Top Reps</div>
          </div>

          <div className="relative h-4 flex items-center">
            <div className="w-full h-[2px] bg-emerald-200" />
            <div
              className="w-2.5 h-2.5 rounded-full bg-blue-500 absolute"
              style={{ left: `${flowPulse * 24}px` }}
            />
          </div>

          <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 px-2.5 py-2 text-center">
            <div className="text-[10px] text-emerald-700">Dispatch</div>
            <div className="text-[11px] font-semibold text-slate-900">CRM Bot Alert</div>
          </div>
        </div>
      </div>
    </div>
  );
};
