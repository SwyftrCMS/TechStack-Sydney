export const FPS = 30;
export const TOTAL_FRAMES = 885; // 29.5 seconds @ 30fps

export interface StageSpec {
  id: string;
  indexLabel: string;
  title: string;
  cameraMove: string;
  startFrame: number;
  endFrame: number;
  summary: string;
  outcome: string;
  accentHex: string;
}

export const SHOWCASE_STAGES: StageSpec[] = [
  {
    id: 'ai-coder',
    indexLabel: '00',
    title: 'AI Code Synthesis',
    cameraMove: 'Dark-Blue IDE + Whip-Zoom Cut',
    startFrame: 0,
    endFrame: 75,
    summary: 'Streaming TypeScript CRM components and live AST blueprints in a midnight-blue IDE, followed by a sharp kinetic cut.',
    outcome: 'Production CRM compiled from code in 2.5s',
    accentHex: '#38BDF8',
  },
  {
    id: 'hosting',
    indexLabel: '01',
    title: 'Hosting & Monitoring',
    cameraMove: 'Macro Zoom',
    startFrame: 75,
    endFrame: 132,
    summary: 'Macro camera zoom across Australian edge regions (Sydney, Melbourne, Brisbane) and live SLA telemetry cards.',
    outcome: '99.99% uptime SLA at 11ms AU edge latency',
    accentHex: '#2563EB',
  },
  {
    id: 'support',
    indexLabel: '02',
    title: 'Support & Maintenance',
    cameraMove: 'Whip-Pan',
    startFrame: 132,
    endFrame: 189,
    summary: 'High-velocity horizontal whip-pan into a live client-to-developer conversation resolving a Q4 pipeline request.',
    outcome: 'Direct engineering resolution in under 5 minutes',
    accentHex: '#6366F1',
  },
  {
    id: 'analytics',
    indexLabel: '03',
    title: 'Analytics & Insights',
    cameraMove: '3D Rise + Sweep',
    startFrame: 189,
    endFrame: 252,
    summary: '3D perspective rise and panoramic sweep over channel revenue, dual-series sales velocity, capability radar, and rep rankings.',
    outcome: '$67,877 deals won tracked across 64 channels',
    accentHex: '#0EA5E9',
  },
  {
    id: 'features',
    indexLabel: '04',
    title: 'New Features',
    cameraMove: 'Zoom-Out Reveal',
    startFrame: 252,
    endFrame: 306,
    summary: 'Zoom-out from the client portal sign-off approval as new feature modules and mobile activity tracking materialize from nothing.',
    outcome: 'Zero-downtime feature shipping & mobile sync',
    accentHex: '#8B5CF6',
  },
  {
    id: 'automation',
    indexLabel: '05',
    title: 'Automation',
    cameraMove: '3D Flyover',
    startFrame: 306,
    endFrame: 356,
    summary: '3D flyover tracing real-time webhook events through rule evaluation into automated CRM Bot pipeline notifications.',
    outcome: '+13% Q4 deal velocity alerts automated',
    accentHex: '#10B981',
  },
  {
    id: 'website-builder',
    indexLabel: '06',
    title: 'Website Generation',
    cameraMove: '3D Flip + Full-Width Scroll',
    startFrame: 356,
    endFrame: 590,
    summary: '3D flip from the CRM into a full-width TSS White Label website assembling block by block as the page scrolls.',
    outcome: 'Client-ready web presence built block by block',
    accentHex: '#2563EB',
  },
  {
    id: 'ios-mobile-app',
    indexLabel: '07',
    title: 'iOS Mobile App',
    cameraMove: 'Shrink to iOS + Login Flow',
    startFrame: 590,
    endFrame: 732,
    summary: 'Website shrinks into an iOS device, authenticates with Australian workspace credentials, and opens the mobile app.',
    outcome: 'Full CRM & site experience on iOS',
    accentHex: '#2563EB',
  },
  {
    id: 'brand-outro',
    indexLabel: '08',
    title: 'TechStack Sydney',
    cameraMove: 'Phone Breakup -> Stacked Blocks + Encoded Wordmark',
    startFrame: 732,
    endFrame: 885,
    summary: 'iOS device breaks into five stacked blocks that lift upward before landing in the TechStack Sydney logo with encoded text.',
    outcome: 'TechStack Sydney brand reveal',
    accentHex: '#39A6DE',
  },
];

export const Easing = {
  linear: (t: number) => t,
  easeIn: (t: number) => t * t * t,
  easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
  easeInOut: (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  expoOut: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  expoInOut: (t: number) => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    return t < 0.5
      ? Math.pow(2, 20 * t - 10) / 2
      : (2 - Math.pow(2, -20 * t + 10)) / 2;
  },
  backOut: (t: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
};

interface InterpolateOptions {
  extrapolateLeft?: 'clamp' | 'extend';
  extrapolateRight?: 'clamp' | 'extend';
  easing?: (t: number) => number;
}

export function interpolate(
  input: number,
  inputRange: [number, number],
  outputRange: [number, number],
  options: InterpolateOptions = {}
): number {
  const {
    extrapolateLeft = 'clamp',
    extrapolateRight = 'clamp',
    easing = Easing.linear,
  } = options;

  const [inMin, inMax] = inputRange;
  const [outMin, outMax] = outputRange;

  if (inMax === inMin) return outMax;

  let progress = (input - inMin) / (inMax - inMin);

  if (progress < 0 && extrapolateLeft === 'clamp') progress = 0;
  if (progress > 1 && extrapolateRight === 'clamp') progress = 1;

  const eased =
    progress >= 0 && progress <= 1 ? easing(progress) : progress;

  return outMin + eased * (outMax - outMin);
}

export function interpolateMulti(
  input: number,
  inputRange: number[],
  outputRange: number[],
  options: InterpolateOptions = {}
): number {
  if (inputRange.length !== outputRange.length || inputRange.length < 2) {
    return outputRange[0] ?? 0;
  }

  if (input <= inputRange[0]) {
    return interpolate(
      input,
      [inputRange[0], inputRange[1]],
      [outputRange[0], outputRange[1]],
      options
    );
  }

  for (let i = 0; i < inputRange.length - 1; i++) {
    if (input <= inputRange[i + 1] || i === inputRange.length - 2) {
      return interpolate(
        input,
        [inputRange[i], inputRange[i + 1]],
        [outputRange[i], outputRange[i + 1]],
        options
      );
    }
  }

  return outputRange[outputRange.length - 1];
}

export interface SpringConfig {
  damping?: number;
  stiffness?: number;
  mass?: number;
}

export function spring({
  frame,
  fps = FPS,
  delay = 0,
  config = {},
}: {
  frame: number;
  fps?: number;
  delay?: number;
  config?: SpringConfig;
}): number {
  const t = Math.max(0, (frame - delay) / fps);
  if (t <= 0) return 0;

  const damping = config.damping ?? 14;
  const stiffness = config.stiffness ?? 140;
  const mass = config.mass ?? 1;

  const omega0 = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));

  if (zeta < 1) {
    const omegaD = omega0 * Math.sqrt(1 - zeta * zeta);
    const value =
      1 -
      Math.exp(-zeta * omega0 * t) *
        (Math.cos(omegaD * t) +
          ((zeta * omega0) / omegaD) * Math.sin(omegaD * t));
    return Math.max(0, Math.min(1.15, value));
  }

  const value = 1 - Math.exp(-omega0 * t) * (1 + omega0 * t);
  return Math.max(0, Math.min(1, value));
}
