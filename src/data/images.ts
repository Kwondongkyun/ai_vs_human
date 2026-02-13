import { ImageItem } from "@/types/game";

// 라운드별 고정 이미지 (위치만 매번 셔플)
// src는 /public/images/round{N}/ 폴더 기준
// TODO: 실제 이미지 파일을 public/images/ 에 넣은 후 경로 업데이트

export const roundImages: ImageItem[][] = [
  // Round 1: 1x2 (실제 1장, AI 1장)
  [
    {
      id: "r1-1",
      src: "/images/round1/real-1.jpg",
      isAI: false,
      category: "풍경",
    },
    {
      id: "r1-2",
      src: "/images/round1/ai-1.png",
      isAI: true,
      category: "풍경",
    },
  ],

  // Round 2: 2x2 (실제 3장, AI 1장)
  [
    {
      id: "r2-1",
      src: "/images/round2/real-1.jpg",
      isAI: false,
      category: "돌",
    },
    {
      id: "r2-2",
      src: "/images/round2/real-2.jpg",
      isAI: false,
      category: "돌",
    },
    {
      id: "r2-3",
      src: "/images/round2/real-3.jpg",
      isAI: false,
      category: "돌",
    },
    {
      id: "r2-4",
      src: "/images/round2/ai-1.png",
      isAI: true,
      category: "돌",
    },
  ],

  // Round 3: 3x3 (실제 8장, AI 1장)
  [
    {
      id: "r3-1",
      src: "/images/round3/real-1.jpg",
      isAI: false,
      category: "etc",
    },
    {
      id: "r3-2",
      src: "/images/round3/real-2.jpg",
      isAI: false,
      category: "etc",
    },
    {
      id: "r3-3",
      src: "/images/round3/real-3.jpg",
      isAI: false,
      category: "etc",
    },
    {
      id: "r3-4",
      src: "/images/round3/real-4.jpg",
      isAI: false,
      category: "etc",
    },
    {
      id: "r3-5",
      src: "/images/round3/real-5.jpg",
      isAI: false,
      category: "etc",
    },
    {
      id: "r3-6",
      src: "/images/round3/real-6.jpg",
      isAI: false,
      category: "etc",
    },
    {
      id: "r3-7",
      src: "/images/round3/real-7.jpg",
      isAI: false,
      category: "etc",
    },
    {
      id: "r3-8",
      src: "/images/round3/real-8.jpg",
      isAI: false,
      category: "etc",
    },
    {
      id: "r3-9",
      src: "/images/round3/ai-1.png",
      isAI: true,
      category: "etc",
    },
  ],

  // Round 4: 4x4 (실제 15장, AI 1장)
  [
    {
      id: "r4-1",
      src: "/images/round4/real-1.jpg",
      isAI: false,
      category: "동물",
    },
    {
      id: "r4-2",
      src: "/images/round4/real-2.jpg",
      isAI: false,
      category: "동물",
    },
    {
      id: "r4-3",
      src: "/images/round4/real-3.jpg",
      isAI: false,
      category: "동물",
    },
    {
      id: "r4-4",
      src: "/images/round4/real-4.jpg",
      isAI: false,
      category: "동물",
    },
    {
      id: "r4-5",
      src: "/images/round4/real-5.jpg",
      isAI: false,
      category: "동물",
    },
    {
      id: "r4-6",
      src: "/images/round4/real-6.jpg",
      isAI: false,
      category: "동물",
    },
    {
      id: "r4-7",
      src: "/images/round4/real-7.jpg",
      isAI: false,
      category: "동물",
    },
    {
      id: "r4-8",
      src: "/images/round4/real-8.jpg",
      isAI: false,
      category: "동물",
    },
    {
      id: "r4-9",
      src: "/images/round4/real-9.jpg",
      isAI: false,
      category: "동물",
    },
    {
      id: "r4-10",
      src: "/images/round4/real-10.jpg",
      isAI: false,
      category: "동물",
    },
    {
      id: "r4-11",
      src: "/images/round4/real-11.jpg",
      isAI: false,
      category: "동물",
    },
    {
      id: "r4-12",
      src: "/images/round4/real-12.jpg",
      isAI: false,
      category: "동물",
    },
    {
      id: "r4-13",
      src: "/images/round4/real-13.jpg",
      isAI: false,
      category: "동물",
    },
    {
      id: "r4-14",
      src: "/images/round4/real-14.jpg",
      isAI: false,
      category: "동물",
    },
    {
      id: "r4-15",
      src: "/images/round4/real-15.jpg",
      isAI: false,
      category: "동물",
    },
    {
      id: "r4-16",
      src: "/images/round4/ai-1.jpg",
      isAI: true,
      category: "동물",
    },
  ],
];
