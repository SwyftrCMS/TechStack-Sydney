export const FPS = 30;
export const TOTAL_FRAMES = 885; // 29.5 seconds @ 30fps

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
