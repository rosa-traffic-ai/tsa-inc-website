import type { MotionPreset } from "@/lib/types";

export interface MotionPresetTokens {
  preset: MotionPreset;
  reduceMotion: boolean;
  revealDuration: number;
  revealDelayStep: number;
  enterDuration: number;
}

export const motionEasing = {
  reveal: [0.16, 1, 0.3, 1] as const,
  standard: [0.22, 1, 0.36, 1] as const,
  loop: "easeInOut" as const,
};

export const motionDuration = {
  instant: 0,
  fast: 0.28,
  base: 0.34,
  reveal: 0.65,
  heroFade: 0.4,
  heroLine: 0.8,
  heroBody: 0.5,
  heroActions: 0.45,
};

export const motionDelay = {
  heroLineStart: 0.28,
  heroLineStep: 0.18,
  heroBody: 1.05,
  heroActions: 1.2,
};

export const revealViewport = {
  once: true,
  amount: 0.12,
  margin: "0px 0px -20px 0px",
} as const;

export const scrollSpring = {
  reduced: { stiffness: 200, damping: 32, mass: 0.22 },
  default: { stiffness: 105, damping: 23, mass: 0.22 },
  homeReduced: { stiffness: 160, damping: 30 },
  homeDefault: { stiffness: 110, damping: 24, mass: 0.22 },
} as const;

export function getMotionPresetTokens(preset: MotionPreset, reduceMotion: boolean): MotionPresetTokens {
  if (reduceMotion) {
    return {
      preset,
      reduceMotion: true,
      revealDuration: motionDuration.instant,
      revealDelayStep: 0,
      enterDuration: motionDuration.instant,
    };
  }

  if (preset === "medium") {
    return {
      preset,
      reduceMotion: false,
      revealDuration: 0.48,
      revealDelayStep: 0.7,
      enterDuration: 0.28,
    };
  }

  return {
    preset,
    reduceMotion: false,
    revealDuration: motionDuration.reveal,
    revealDelayStep: 1,
    enterDuration: motionDuration.base,
  };
}
