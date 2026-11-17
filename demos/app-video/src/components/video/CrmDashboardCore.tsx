import React from 'react';
import { Easing, interpolate } from '../../utils/remotionMath';

interface CrmDashboardCoreProps {
  /** Local frame relative to when CRM becomes visible (0 = frame 72) */
  crmFrame: number;
  activeMenu: 'Home' | 'Contacts' | 'Sales Dashboard' | 'Automations';
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const SALES_REPS = [
  { rank: 4, name: 'Liam', initials: 'LM', bg: '#E0E7FF', fg: '#3730A3' },
  { rank: 5, name: 'Charlotte', initials: 'CH', bg: '#DCFCE7', fg: '#166534' },
  { rank: 6, name: 'Jack', initials: 'JK', bg: '#FEF3C7', fg: '#92400E' },
  { rank: 7, name: 'Olivia', initials: 'OL', bg: '#FCE7F3', fg: '#9D174D' },
  { rank: 8, name: 'Noah', initials: 'NH', bg: '#E0F2FE', fg: '#075985' },
  { rank: 9, name: 'Matilda', initials: 'MT', bg: '#F3E8FF', fg: '#6B21A8' },
];

const RADAR_AXES = [
  'Risk Positioning',
  'Resolve Objections',
  'Expand Access',
  'Account Planning',
  'Proactive Control',
  'Target Prospect',
  'Collaboration',
  'Leverage Insights',
];

const TOP_MENU: Array<'Home' | 'Contacts' | 'Sales Dashboard' | 'Automations'> = [
  'Home',
  'Contacts',
  'Sales Dashboard',
  'Automations',
];

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function buildRadarPolygon(cx: number, cy: number, maxR: number, values: number[], scale: number) {
  return values
    .map((val, idx) => {
      const angle = (idx * 360) / values.length;
      const pt = polarToCartesian(cx, cy, maxR * val * scale, angle);
      return `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
    })
    .join(' ');
}

export const CrmDashboardCore: React.FC<CrmDashboardCoreProps> = ({
  crmFrame,
  activeMenu,
}) => {
  const donutSweep = interpolate(crmFrame, [4, 48], [0, 1], { easing: Easing.easeOut });
  const kpiCount = interpolate(crmFrame, [2, 36], [0.25, 1], { easing: Easing.easeOut });
  const splineDraw = interpolate(crmFrame, [8, 138], [0.2, 1], { easing: Easing.easeInOut });
  const radarGrow = interpolate(crmFrame, [10, 135], [0.35, 1], { easing: Easing.easeOut });
  const mayTooltipOpacity = interpolate(crmFrame, [115, 135], [0.2, 1], {
    easing: Easing.easeOut,
  });

  const newDealsVal = Math.round(31436 * kpiCount).toLocaleString('en-US');
  const dealsWonVal = Math.round(67877 * kpiCount).toLocaleString('en-US');
  const totalChannels = Math.round(64 * Math.min(1, donutSweep * 1.1));

  const r = 40;
  const circ = 2 * Math.PI * r;
  const slices = [
    { label: 'Direct sales', pct: 0.44, color: '#2563EB' },
    { label: 'Partner channel', pct: 0.25, color: '#A855F7' },
    { label: 'Online/Digital', pct: 0.16, color: '#F59E0B' },
    { label: 'Renewals', pct: 0.15, color: '#F87171' },
  ];

  let cumulativePct = 0;

  return (
    <div className="w-[920px] h-[564px] rounded-[20px] bg-white border border-blue-200/80 shadow-[0_20px_54px_-16px_rgba(37,99,235,0.14)] flex flex-col overflow-hidden">
      {/* TSS White Label CRM Top Bar */}
      <div className="h-12 px-6 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-sm">
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-white" fill="none">
              <rect x="2.5" y="2.5" width="4.5" height="4.5" rx="1" fill="currentColor" />
              <rect x="9" y="2.5" width="4.5" height="4.5" rx="1" fill="currentColor" opacity="0.7" />
              <rect x="2.5" y="9" width="4.5" height="4.5" rx="1" fill="currentColor" opacity="0.7" />
              <rect x="9" y="9" width="4.5" height="4.5" rx="1" fill="currentColor" />
            </svg>
          </div>
          <span className="font-display font-semibold text-[15px] text-slate-900 tracking-tight whitespace-nowrap">
            TSS White Label
          </span>
        </div>

        {/* Exact requested top-right menu: Home | Contacts | Sales Dashboard | Automations */}
        <div className="flex items-center gap-2 text-[11.5px] font-medium whitespace-nowrap">
          {TOP_MENU.map((item, idx) => (
            <React.Fragment key={item}>
              {idx > 0 && <span className="text-slate-300 select-none">|</span>}
              <span
                className={`px-2 py-1 rounded-md transition-colors ${
                  activeMenu === item
                    ? 'text-blue-600 font-semibold bg-blue-50/80'
                    : 'text-slate-500'
                }`}
              >
                {item}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Dashboard Grid Body */}
      <div className="flex-1 p-4 bg-[#FAFBFD] grid grid-rows-[176px_1fr] gap-3.5 overflow-hidden">
        {/* Top Row: Revenue by channel | New Deals Amount | Deals Won Amount */}
        <div className="grid grid-cols-[1.45fr_1fr_1fr] gap-3.5">
          {/* Card 1: Revenue by channel */}
          <div className="rounded-xl bg-white border border-slate-100 p-4 flex flex-col justify-between shadow-[0_2px_10px_rgba(15,23,42,0.02)]">
            <div className="text-[12.5px] font-semibold text-slate-800">
              Revenue by channel
            </div>
            <div className="flex items-center justify-between px-1 pb-0.5">
              <div className="relative w-[108px] h-[108px] flex items-center justify-center">
                <svg viewBox="0 0 110 110" className="w-full h-full -rotate-90">
                  <circle
                    cx="55"
                    cy="55"
                    r={r}
                    fill="none"
                    stroke="#F1F5F9"
                    strokeWidth="12"
                  />
                  {slices.map((slice) => {
                    const segLen = slice.pct * circ * donutSweep;
                    const offset = -cumulativePct * circ * donutSweep;
                    cumulativePct += slice.pct;
                    return (
                      <circle
                        key={slice.label}
                        cx="55"
                        cy="55"
                        r={r}
                        fill="none"
                        stroke={slice.color}
                        strokeWidth="12"
                        strokeDasharray={`${Math.max(0, segLen - 2.5)} ${circ}`}
                        strokeDashoffset={offset}
                        strokeLinecap="butt"
                      />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[20px] font-bold text-slate-900 leading-none tabular-nums">
                    {totalChannels}
                  </span>
                  <span className="text-[9.5px] text-slate-500 mt-0.5">Total</span>
                </div>
              </div>

              <div className="space-y-1.5 pr-2">
                {slices.map((s) => (
                  <div key={s.label} className="flex items-center gap-2 text-[10.5px] text-slate-600">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: s.color }}
                    />
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: New Deals Amount */}
          <div className="rounded-xl bg-white border border-slate-100 p-4 flex flex-col justify-between shadow-[0_2px_10px_rgba(15,23,42,0.02)] relative overflow-hidden">
            <div className="text-[12.5px] font-semibold text-slate-800">
              New Deals Amount
            </div>
            <div className="my-auto">
              <div className="text-[30px] font-bold text-slate-900 tracking-tight leading-none tabular-nums">
                ${newDealsVal}
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-[13px] font-semibold text-emerald-600 tabular-nums">
                <span>13%</span>
                <span className="text-[9.5px]">▲</span>
              </div>
              <div className="text-[10.5px] text-slate-400 mt-0.5">Annual ratio</div>
            </div>
            <svg
              viewBox="0 0 90 36"
              className="w-20 h-9 absolute right-3 bottom-3 opacity-85"
            >
              <defs>
                <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#94A3B8" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              <path
                d="M2 32 L18 24 L32 27 L48 16 L62 19 L78 8 L88 4 L88 36 L2 36 Z"
                fill="url(#sparkFill)"
              />
              <path
                d="M2 32 L18 24 L32 27 L48 16 L62 19 L78 8 L88 4"
                fill="none"
                stroke="#94A3B8"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Card 3: Deals Won Amount */}
          <div className="rounded-xl bg-white border border-slate-100 p-4 flex flex-col justify-between shadow-[0_2px_10px_rgba(15,23,42,0.02)]">
            <div className="text-[12.5px] font-semibold text-slate-800">
              Deals Won Amount
            </div>
            <div className="my-auto">
              <div className="text-[30px] font-bold text-slate-900 tracking-tight leading-none tabular-nums">
                ${dealsWonVal}
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-[13px] font-semibold text-amber-500 tabular-nums">
                <span>10%</span>
                <span className="text-[9.5px]">▼</span>
              </div>
              <div className="text-[10.5px] text-slate-400 mt-0.5">Annual ratio</div>
            </div>
            <div className="h-2" />
          </div>
        </div>

        {/* Bottom Row: Sales Amount | Team Capability | Sales Ranking */}
        <div className="grid grid-cols-[1.55fr_1fr_0.92fr] gap-3.5 min-h-0">
          {/* Card 4: Sales Amount Dual Spline Chart */}
          <div className="rounded-xl bg-white border border-slate-100 p-4 flex flex-col justify-between shadow-[0_2px_10px_rgba(15,23,42,0.02)] relative">
            <div className="flex items-center justify-between">
              <span className="text-[12.5px] font-semibold text-slate-800">
                Sales Amount
              </span>
              <div className="flex items-center gap-3.5 text-[10px] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  Business Opportunities
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  Deal Size
                </span>
              </div>
            </div>

            <div className="relative flex-1 mt-1.5">
              <svg viewBox="0 0 400 185" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="oppGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.20" />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0.01" />
                  </linearGradient>
                  <linearGradient id="dealGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#14B8A6" stopOpacity="0.01" />
                  </linearGradient>
                  <clipPath id="splineClip">
                    <rect x="0" y="0" width={400 * splineDraw} height="190" />
                  </clipPath>
                </defs>

                {[
                  { y: 45, label: '200,000' },
                  { y: 100, label: '100,000' },
                  { y: 155, label: '0' },
                ].map((g) => (
                  <g key={g.label}>
                    <line
                      x1="44"
                      y1={g.y}
                      x2="392"
                      y2={g.y}
                      stroke="#F1F5F9"
                      strokeWidth="1"
                    />
                    <text
                      x="38"
                      y={g.y + 3}
                      textAnchor="end"
                      className="fill-slate-400 text-[8px] font-mono"
                    >
                      {g.label}
                    </text>
                  </g>
                ))}

                <g clipPath="url(#splineClip)">
                  <path
                    d="M44,86 C65,70 78,66 98,84 C118,100 132,38 152,58 C170,76 184,108 206,82 C226,58 244,104 266,86 C288,68 308,40 330,78 C350,112 372,58 392,98 L392,155 L44,155 Z"
                    fill="url(#dealGrad)"
                  />
                  <path
                    d="M44,86 C65,70 78,66 98,84 C118,100 132,38 152,58 C170,76 184,108 206,82 C226,58 244,104 266,86 C288,68 308,40 330,78 C350,112 372,58 392,98"
                    fill="none"
                    stroke="#14B8A6"
                    strokeWidth="2"
                  />

                  <path
                    d="M44,126 C64,90 78,96 98,132 C116,154 134,12 152,56 C168,94 178,108 204,96 C228,86 244,160 264,110 C286,44 306,46 326,88 C346,128 368,20 392,76 L392,155 L44,155 Z"
                    fill="url(#oppGrad)"
                  />
                  <path
                    d="M44,126 C64,90 78,96 98,132 C116,154 134,12 152,56 C168,94 178,108 204,96 C228,86 244,160 264,110 C286,44 306,46 326,88 C346,128 368,20 392,76"
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="2"
                  />

                  <line
                    x1="176"
                    y1="20"
                    x2="176"
                    y2="155"
                    stroke="#CBD5E1"
                    strokeDasharray="2 2"
                  />
                  <circle cx="176" cy="84" r="3.5" fill="#FFFFFF" stroke="#14B8A6" strokeWidth="2" />
                  <circle cx="176" cy="100" r="3.5" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
                </g>

                {MONTHS.map((m, i) => (
                  <text
                    key={m}
                    x={48 + i * 31}
                    y="174"
                    textAnchor="middle"
                    className="fill-slate-400 text-[8px]"
                  >
                    {m}
                  </text>
                ))}
              </svg>

              <div
                className="absolute left-[168px] top-[14px] rounded-lg bg-white border border-slate-100 shadow-[0_8px_24px_rgba(15,23,42,0.08)] px-2.5 py-1.5 text-[9.5px]"
                style={{ opacity: mayTooltipOpacity }}
              >
                <div className="text-slate-400 mb-0.5">May</div>
                <div className="flex items-center gap-1.5 font-mono font-semibold text-slate-800 tabular-nums">
                  <span className="w-0.5 h-2.5 bg-blue-600 rounded-full" />
                  <span>160,600</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono font-semibold text-slate-800 tabular-nums mt-0.5">
                  <span className="w-0.5 h-2.5 bg-teal-500 rounded-full" />
                  <span>190,239</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: Team Capability Radar Chart */}
          <div className="rounded-xl bg-white border border-slate-100 p-4 flex flex-col justify-between shadow-[0_2px_10px_rgba(15,23,42,0.02)]">
            <div className="text-[12.5px] font-semibold text-slate-800">
              Team Capability
            </div>

            <div className="relative flex-1 flex items-center justify-center">
              <svg viewBox="0 0 220 190" className="w-full h-[170px] overflow-visible">
                {[0.25, 0.5, 0.75, 1].map((ring) => (
                  <polygon
                    key={ring}
                    points={buildRadarPolygon(110, 95, 58, [1, 1, 1, 1, 1, 1, 1, 1], ring)}
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="0.9"
                  />
                ))}

                {RADAR_AXES.map((axis, idx) => {
                  const angle = (idx * 360) / RADAR_AXES.length;
                  const end = polarToCartesian(110, 95, 58, angle);
                  const lbl = polarToCartesian(110, 95, 74, angle);
                  return (
                    <g key={axis}>
                      <line
                        x1="110"
                        y1="95"
                        x2={end.x}
                        y2={end.y}
                        stroke="#E2E8F0"
                        strokeWidth="0.9"
                      />
                      <text
                        x={lbl.x}
                        y={lbl.y + 2}
                        textAnchor="middle"
                        className="fill-slate-400 text-[7px]"
                      >
                        {axis}
                      </text>
                    </g>
                  );
                })}

                <polygon
                  points={buildRadarPolygon(
                    110,
                    95,
                    58,
                    [0.86, 0.54, 0.84, 0.58, 0.82, 0.62, 0.76, 0.56],
                    radarGrow
                  )}
                  fill="rgba(37, 99, 235, 0.18)"
                  stroke="#2563EB"
                  strokeWidth="1.6"
                />
                <polygon
                  points={buildRadarPolygon(
                    110,
                    95,
                    58,
                    [0.52, 0.72, 0.58, 0.64, 0.55, 0.88, 0.84, 0.74],
                    radarGrow
                  )}
                  fill="rgba(20, 184, 166, 0.16)"
                  stroke="#14B8A6"
                  strokeWidth="1.5"
                />
                <polygon
                  points={buildRadarPolygon(
                    110,
                    95,
                    58,
                    [0.64, 0.82, 0.60, 0.90, 0.58, 0.66, 0.50, 0.54],
                    radarGrow
                  )}
                  fill="rgba(168, 85, 247, 0.14)"
                  stroke="#A855F7"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            <div className="flex items-center justify-center gap-3 text-[9.5px] text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                Team A
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                Team B
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                Team C
              </span>
            </div>
          </div>

          {/* Card 6: Sales Ranking (Australian names) */}
          <div className="rounded-xl bg-white border border-slate-100 p-4 flex flex-col justify-between shadow-[0_2px_10px_rgba(15,23,42,0.02)] overflow-hidden">
            <div className="text-[12.5px] font-semibold text-slate-800">
              Sales Ranking
            </div>

            <div className="flex items-end justify-around pt-1 pb-2 border-b border-slate-100">
              <div className="flex flex-col items-center">
                <div className="relative w-8 h-8 rounded-full bg-sky-100 text-sky-700 font-semibold text-[10.5px] flex items-center justify-center border border-slate-200">
                  CH
                  <span className="absolute -bottom-1 px-1 rounded-full bg-slate-400 text-white text-[8px] font-bold">
                    2
                  </span>
                </div>
                <span className="text-[9.5px] text-slate-500 mt-1.5">Chloe</span>
                <span className="text-[10.5px] font-bold text-slate-800 tabular-nums">
                  30,010
                </span>
              </div>

              <div className="flex flex-col items-center">
                <div className="relative w-9 h-9 rounded-full bg-amber-100 text-amber-800 font-semibold text-[11px] flex items-center justify-center border-2 border-amber-400">
                  LC
                  <span className="absolute -bottom-1 px-1.5 rounded-full bg-amber-400 text-white text-[8px] font-bold">
                    1
                  </span>
                </div>
                <span className="text-[9.5px] text-slate-500 mt-1.5">Lachlan</span>
                <span className="text-[11.5px] font-bold text-slate-900 tabular-nums">
                  40,950
                </span>
              </div>
            </div>

            <div className="space-y-1 pt-1">
              {SALES_REPS.map((rep) => (
                <div
                  key={rep.rank}
                  className="flex items-center gap-2 text-[10px] text-slate-700"
                >
                  <span className="w-3 text-slate-400 font-mono tabular-nums">
                    {rep.rank}
                  </span>
                  <span
                    className="w-4 h-4 rounded-full text-[8px] font-semibold flex items-center justify-center shrink-0"
                    style={{ backgroundColor: rep.bg, color: rep.fg }}
                  >
                    {rep.initials}
                  </span>
                  <span className="truncate font-medium">{rep.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
