import React from 'react';
import { Easing, interpolate, interpolateMulti, spring } from '../../utils/remotionMath';

interface CodeEditorSceneProps {
  frame: number;
}

interface CodeLine {
  tokens: Array<{ text: string; color: string }>;
}

const CODE_LINES: CodeLine[] = [
  {
    tokens: [
      { text: 'import ', color: '#60A5FA' },
      { text: '{ DashboardShell, DonutChart, SplineArea, RadarMatrix } ', color: '#E2E8F0' },
      { text: 'from ', color: '#60A5FA' },
      { text: "'@tss/crm'", color: '#38BDF8' },
      { text: ';', color: '#94A3B8' },
    ],
  },
  {
    tokens: [
      { text: 'import ', color: '#60A5FA' },
      { text: '{ deployEdgeAU, registerWebhookBot } ', color: '#E2E8F0' },
      { text: 'from ', color: '#60A5FA' },
      { text: "'@tss/scale'", color: '#38BDF8' },
      { text: ';', color: '#94A3B8' },
    ],
  },
  { tokens: [] },
  {
    tokens: [
      { text: 'export const ', color: '#818CF8' },
      { text: 'RevenueCRM ', color: '#38BDF8' },
      { text: '= () => {', color: '#CBD5E1' },
    ],
  },
  {
    tokens: [
      { text: '  const ', color: '#818CF8' },
      { text: 'channels ', color: '#E2E8F0' },
      { text: '= ', color: '#94A3B8' },
      { text: 'useChannelMetrics', color: '#7DD3FC' },
      { text: '({ total: ', color: '#CBD5E1' },
      { text: '64', color: '#34D399' },
      { text: ', region: ', color: '#CBD5E1' },
      { text: "'ap-southeast-2'", color: '#38BDF8' },
      { text: ' });', color: '#CBD5E1' },
    ],
  },
  {
    tokens: [
      { text: '  const ', color: '#818CF8' },
      { text: 'pipeline ', color: '#E2E8F0' },
      { text: '= { newDeals: ', color: '#CBD5E1' },
      { text: '31436', color: '#34D399' },
      { text: ', dealsWon: ', color: '#CBD5E1' },
      { text: '67877', color: '#34D399' },
      { text: ', ratio: ', color: '#CBD5E1' },
      { text: '+0.13', color: '#34D399' },
      { text: ' };', color: '#CBD5E1' },
    ],
  },
  { tokens: [] },
  {
    tokens: [
      { text: '  return ', color: '#60A5FA' },
      { text: '(', color: '#CBD5E1' },
    ],
  },
  {
    tokens: [
      { text: '    <DashboardShell ', color: '#38BDF8' },
      { text: 'brand', color: '#93C5FD' },
      { text: '=', color: '#CBD5E1' },
      { text: '"TSS White Label" ', color: '#7DD3FC' },
      { text: 'sla', color: '#93C5FD' },
      { text: '=', color: '#CBD5E1' },
      { text: '"99.99%"', color: '#7DD3FC' },
      { text: '>', color: '#38BDF8' },
    ],
  },
  {
    tokens: [
      { text: '      <DonutChart ', color: '#38BDF8' },
      { text: 'title', color: '#93C5FD' },
      { text: '="Revenue by channel" ', color: '#7DD3FC' },
      { text: 'data', color: '#93C5FD' },
      { text: '={channels} />', color: '#CBD5E1' },
    ],
  },
  {
    tokens: [
      { text: '      <SplineArea ', color: '#38BDF8' },
      { text: 'title', color: '#93C5FD' },
      { text: '="Sales Amount" ', color: '#7DD3FC' },
      { text: 'series', color: '#93C5FD' },
      { text: '={["Opportunities", "Deal Size"]} />', color: '#CBD5E1' },
    ],
  },
  {
    tokens: [
      { text: '      <RadarMatrix ', color: '#38BDF8' },
      { text: 'title', color: '#93C5FD' },
      { text: '="Team Capability" ', color: '#7DD3FC' },
      { text: 'teams', color: '#93C5FD' },
      { text: '={["Team A", "Team B", "Team C"]} />', color: '#CBD5E1' },
    ],
  },
  {
    tokens: [
      { text: '      <WorkflowBot ', color: '#38BDF8' },
      { text: 'trigger', color: '#93C5FD' },
      { text: '="q4_deal_velocity >= 0.13" ', color: '#7DD3FC' },
      { text: 'autoShip', color: '#93C5FD' },
      { text: ' />', color: '#38BDF8' },
    ],
  },
  {
    tokens: [
      { text: '    </DashboardShell>', color: '#38BDF8' },
    ],
  },
  {
    tokens: [
      { text: '  );', color: '#CBD5E1' },
    ],
  },
  {
    tokens: [
      { text: '};', color: '#CBD5E1' },
    ],
  },
];

const LINE_STRINGS = CODE_LINES.map((line) =>
  line.tokens.map((t) => t.text).join('')
);
const TOTAL_CHARS = LINE_STRINGS.reduce((sum, s) => sum + s.length, 0);

export const CodeEditorScene: React.FC<CodeEditorSceneProps> = ({ frame }) => {
  const typedChars = Math.floor(
    interpolate(frame, [2, 60], [0, TOTAL_CHARS], {
      easing: Easing.easeOut,
    })
  );

  // Smooth floating window entrance & sharp pre-cut punch inside white bounds
  const entrance = spring({ frame, delay: 0, config: { damping: 16, stiffness: 120 } });
  const preCutZoom = interpolate(frame, [63, 73], [1, 1.07], {
    easing: Easing.easeIn,
  });
  const rotY = interpolate(frame, [0, 62], [-7, -1], {
    easing: Easing.easeOut,
  });
  const rotX = interpolate(frame, [0, 62], [3.5, 0.5], {
    easing: Easing.easeOut,
  });

  const blueprintProgress = interpolate(frame, [14, 62], [0, 1], {
    easing: Easing.easeInOut,
  });

  const buildProgress = interpolate(frame, [54, 68], [0, 100], {
    easing: Easing.easeInOut,
  });

  // Localized diagonal light-blade & flash strictly clipped inside the IDE window
  const localCutFlash = interpolateMulti(
    frame,
    [66, 70, 73],
    [0, 0.85, 1],
    { easing: Easing.easeOut }
  );
  const localSwooshX = interpolate(frame, [65, 74], [-1100, 1200], {
    easing: Easing.expoInOut,
  });

  let remainingChars = typedChars;
  let activeLineIndex = 0;

  return (
    <div className="absolute inset-0 bg-white flex items-center justify-center select-none">
      {/* 3D Perspective Stage centered on pure white background */}
      <div
        className="w-full h-full flex items-center justify-center"
        style={{ perspective: '1600px' }}
      >
        <div
          className="relative w-[1040px] h-[584px] rounded-2xl border border-blue-900/40 bg-[#071126] shadow-[0_24px_60px_-18px_rgba(15,23,42,0.28)] overflow-hidden flex flex-col"
          style={{
            transform: `scale(${(0.94 + 0.06 * entrance) * preCutZoom}) rotateY(${rotY}deg) rotateX(${rotX}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* IDE Titlebar */}
          <div className="h-11 px-4 border-b border-sky-400/15 bg-[#0A1833] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-600/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-600/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-600/80" />
              </div>
              <div className="flex items-center gap-1 text-xs font-mono">
                <div className="px-3 py-1.5 rounded-md bg-[#0F234B] text-sky-300 border border-sky-400/25">
                  crm-pipeline.tsx
                </div>
                <div className="px-3 py-1.5 text-slate-400">
                  analytics-charts.tsx
                </div>
                <div className="px-3 py-1.5 text-slate-400">
                  webhook-bot.ts
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 font-mono text-[11px] text-sky-300/90 tabular-nums">
              <span>{frame >= 54 ? 'Compiling CRM bundle' : 'Synthesizing UI AST'}</span>
              <div className="w-28 h-1.5 rounded-full bg-sky-950 overflow-hidden border border-sky-400/20">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-sky-300"
                  style={{
                    width: `${frame >= 54 ? buildProgress : Math.min(92, (typedChars / TOTAL_CHARS) * 92)}%`,
                  }}
                />
              </div>
              <span className="w-9 text-right text-sky-200">
                {Math.round(frame >= 54 ? buildProgress : (typedChars / TOTAL_CHARS) * 92)}%
              </span>
            </div>
          </div>

          {/* IDE Body: Explorer + Code Editor + Live AST Blueprint */}
          <div className="flex-1 grid grid-cols-[188px_1fr_296px] overflow-hidden">
            {/* File Explorer */}
            <div className="border-r border-sky-400/15 bg-[#060E20] p-4 flex flex-col justify-between text-xs font-mono">
              <div>
                <div className="text-[11px] font-medium text-sky-400/70 mb-3">
                  WORKSPACE
                </div>
                <div className="space-y-1.5 text-slate-300">
                  <div className="text-sky-300 font-medium px-2 py-1 rounded bg-blue-500/15 border border-blue-400/20">
                    crm-pipeline.tsx
                  </div>
                  <div className="px-2 py-1 text-slate-400">RevenueDonut.tsx</div>
                  <div className="px-2 py-1 text-slate-400">SalesSpline.tsx</div>
                  <div className="px-2 py-1 text-slate-400">TeamRadar.tsx</div>
                  <div className="px-2 py-1 text-slate-400">SalesRanking.tsx</div>
                  <div className="px-2 py-1 text-slate-400">ActivityMobile.tsx</div>
                  <div className="px-2 py-1 text-slate-400">WorkflowBot.ts</div>
                </div>
              </div>

              <div className="pt-4 border-t border-sky-400/15 space-y-1 text-[11px] text-slate-400 tabular-nums">
                <div className="flex justify-between">
                  <span>Region</span>
                  <span className="text-sky-300">ap-southeast-2</span>
                </div>
                <div className="flex justify-between">
                  <span>Target</span>
                  <span className="text-sky-300">TSS White Label</span>
                </div>
              </div>
            </div>

            {/* Center Dark-Blue Code Stream */}
            <div className="p-5 font-mono text-[13px] leading-[1.7] bg-[#071126] overflow-hidden relative">
              {CODE_LINES.map((line, idx) => {
                const lineText = LINE_STRINGS[idx];
                const showChars = Math.max(0, Math.min(lineText.length, remainingChars));
                const isActiveLine =
                  remainingChars >= 0 && remainingChars <= lineText.length;
                if (isActiveLine) activeLineIndex = idx;
                remainingChars -= lineText.length;

                let charCursor = 0;
                const renderedTokens: React.ReactNode[] = [];
                line.tokens.forEach((tok, tIdx) => {
                  if (charCursor >= showChars) return;
                  const sliceLen = Math.min(tok.text.length, showChars - charCursor);
                  renderedTokens.push(
                    <span key={tIdx} style={{ color: tok.color }}>
                      {tok.text.slice(0, sliceLen)}
                    </span>
                  );
                  charCursor += tok.text.length;
                });

                const showCursor = isActiveLine && Math.floor(frame / 4) % 2 === 0;

                return (
                  <div
                    key={idx}
                    className={`flex items-center rounded px-2 -mx-2 ${
                      idx === activeLineIndex && typedChars < TOTAL_CHARS
                        ? 'bg-blue-500/10'
                        : ''
                    }`}
                  >
                    <span className="w-7 shrink-0 text-right pr-3 text-slate-500/70 text-xs select-none tabular-nums">
                      {idx + 1}
                    </span>
                    <span className="whitespace-pre">
                      {renderedTokens}
                      {showCursor && (
                        <span className="inline-block w-[8px] h-[15px] align-middle bg-sky-400 ml-0.5 shadow-[0_0_8px_#38BDF8]" />
                      )}
                    </span>
                  </div>
                );
              })}

              {/* Build status strip */}
              <div className="absolute left-5 right-5 bottom-4 rounded-lg border border-sky-400/25 bg-[#0B1C3D]/95 px-3.5 py-2 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-sky-200">
                  <span className="text-sky-400 font-semibold">AI Coder</span>
                  <span className="text-slate-500">·</span>
                  <span>
                    {frame < 54
                      ? 'Generating typed CRM layout & analytics modules...'
                      : 'Modules compiled. Launching TSS White Label CRM'}
                  </span>
                </div>
                <span className="text-sky-300 tabular-nums">
                  {typedChars}/{TOTAL_CHARS}
                </span>
              </div>
            </div>

            {/* Right Live Wireframe Blueprint Preview */}
            <div className="border-l border-sky-400/15 bg-[#050D1E] p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-sky-300/80 mb-3">
                  <span>BLUEPRINT PREVIEW</span>
                  <span className="tabular-nums">1280×720</span>
                </div>

                <div className="rounded-xl border border-sky-400/25 bg-[#091734]/80 p-3 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-blue-500/40 border border-sky-400/50" />
                      <span className="text-xs font-medium text-sky-100">TSS White Label</span>
                    </div>
                    <span className="text-[10px] font-mono text-sky-400">CRM</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div
                      className="h-16 rounded-lg border border-sky-400/30 bg-sky-500/10 p-2 flex flex-col items-center justify-center"
                      style={{ opacity: blueprintProgress > 0.15 ? 1 : 0.15 }}
                    >
                      <div className="w-7 h-7 rounded-full border-4 border-sky-400/70 border-t-indigo-400" />
                      <span className="text-[9px] font-mono text-sky-300 mt-1">64 Total</span>
                    </div>
                    <div
                      className="h-16 rounded-lg border border-sky-400/30 bg-sky-500/10 p-2 flex flex-col justify-between"
                      style={{ opacity: blueprintProgress > 0.3 ? 1 : 0.15 }}
                    >
                      <span className="text-[9px] text-sky-300/80">New Deals</span>
                      <span className="text-[11px] font-mono font-semibold text-white tabular-nums">$31,436</span>
                    </div>
                    <div
                      className="h-16 rounded-lg border border-sky-400/30 bg-sky-500/10 p-2 flex flex-col justify-between"
                      style={{ opacity: blueprintProgress > 0.45 ? 1 : 0.15 }}
                    >
                      <span className="text-[9px] text-sky-300/80">Deals Won</span>
                      <span className="text-[11px] font-mono font-semibold text-white tabular-nums">$67,877</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-[1.4fr_1fr_0.9fr] gap-2">
                    <div
                      className="h-24 rounded-lg border border-sky-400/30 bg-sky-500/10 p-2 flex flex-col justify-between"
                      style={{ opacity: blueprintProgress > 0.6 ? 1 : 0.15 }}
                    >
                      <span className="text-[9px] text-sky-300/80">Sales Amount</span>
                      <svg viewBox="0 0 120 40" className="w-full h-12">
                        <path
                          d="M0 32 Q 20 12, 40 26 T 80 14 T 120 18"
                          fill="none"
                          stroke="#38BDF8"
                          strokeWidth="2"
                        />
                        <path
                          d="M0 24 Q 25 28, 50 18 T 90 22 T 120 10"
                          fill="none"
                          stroke="#2DD4BF"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>
                    <div
                      className="h-24 rounded-lg border border-sky-400/30 bg-sky-500/10 p-2 flex flex-col items-center justify-between"
                      style={{ opacity: blueprintProgress > 0.75 ? 1 : 0.15 }}
                    >
                      <span className="text-[9px] text-sky-300/80">Capability</span>
                      <svg viewBox="0 0 60 60" className="w-11 h-11">
                        <polygon
                          points="30,6 50,18 52,40 30,54 10,42 12,18"
                          fill="rgba(56,189,248,0.22)"
                          stroke="#38BDF8"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>
                    <div
                      className="h-24 rounded-lg border border-sky-400/30 bg-sky-500/10 p-2 flex flex-col justify-between"
                      style={{ opacity: blueprintProgress > 0.88 ? 1 : 0.15 }}
                    >
                      <span className="text-[9px] text-sky-300/80">Ranking</span>
                      <div className="space-y-1">
                        <div className="h-2 rounded bg-sky-400/40 w-full" />
                        <div className="h-2 rounded bg-sky-400/30 w-4/5" />
                        <div className="h-2 rounded bg-sky-400/20 w-3/4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-sky-400/20 bg-[#0A1938] p-3 text-xs font-mono text-sky-200/90 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Components</span>
                  <span className="text-sky-300 tabular-nums">6 / 6 ready</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Transition</span>
                  <span className="text-sky-300 tabular-nums">Sharp Cut</span>
                </div>
              </div>
            </div>
          </div>

          {/* Localized Sharp Cut Light-Blade & Flash (clipped strictly inside the IDE window!) */}
          {localCutFlash > 0.01 && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
              <div
                className="absolute inset-0 bg-white"
                style={{ opacity: localCutFlash }}
              />
              <div
                className="absolute -top-24 bottom-0 w-[260px] bg-gradient-to-r from-transparent via-sky-300 to-white skew-x-[-18deg]"
                style={{
                  transform: `translateX(${localSwooshX}px) skewX(-18deg)`,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
