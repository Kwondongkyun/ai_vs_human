import { ImageItem } from "@/types/game";

export interface RoundImagePool {
  real: ImageItem[];
  ai: ImageItem[];
}

// /public/images/real/real-1.jpg  ~ real-88.jpg  (실제 이미지 88장)
// /public/images/ai/ai-1.png      ~ ai-30.png     (AI 이미지 30장)
//
// 출처:
//   real-1        → 구 round1/real-1
//   real-2~16     → 구 round2/real-1~15
//   real-17~46    → 구 round3/real-1~30
//   real-47~88    → 구 round4/real-1~42

function r(n: number): ImageItem {
  return { id: `real-${n}`, src: `/images/real/real-${n}.jpg`, isAI: false, category: "" };
}
function a(n: number): ImageItem {
  return { id: `ai-${n}`, src: `/images/ai/ai-${n}.png`, isAI: true, category: "" };
}

const ALL_AI: ImageItem[] = Array.from({ length: 30 }, (_, i) => a(i + 1));

export const roundImagePools: RoundImagePool[] = [
  // Round 1: real 1장, ai 1장
  {
    real: Array.from({ length: 20 }, (_, i) => r(i + 1)),   // real-1 ~ real-20
    ai: ALL_AI,
  },

  // Round 2: real 3장, ai 1장
  {
    real: Array.from({ length: 15 }, (_, i) => r(i + 2)),   // real-2 ~ real-16
    ai: ALL_AI,
  },

  // Round 3: real 8장, ai 1장
  {
    real: Array.from({ length: 30 }, (_, i) => r(i + 17)),  // real-17 ~ real-46
    ai: ALL_AI,
  },

  // Round 4: real 15장, ai 1장
  {
    real: Array.from({ length: 42 }, (_, i) => r(i + 47)),  // real-47 ~ real-88
    ai: ALL_AI,
  },
];
