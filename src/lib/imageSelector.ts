import { GridImage, ImageItem } from '@/types/game';
import { roundImagePools } from '@/data/images';
import { ROUND_CONFIGS, ROUNDS_COUNT } from './constants';

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function sample<T>(array: T[], count: number): T[] {
  if (array.length <= count) return shuffle(array);
  return shuffle(array).slice(0, count);
}

/** 게임 시작 시 호출 — 전체 AI 이미지 풀을 셔플해 라운드별 1장씩 배정 */
export function createAIAssignment(): ImageItem[] {
  const allAI = Array.from(
    new Map(
      roundImagePools.flatMap(pool => pool.ai).map(ai => [ai.id, ai])
    ).values()
  );
  return shuffle(allAI).slice(0, ROUNDS_COUNT);
}

export function getShuffledImagesForRound(
  roundIndex: number,
  assignedAI: ImageItem
): GridImage[] {
  const config = ROUND_CONFIGS[roundIndex];
  const pool = roundImagePools[roundIndex];
  if (!pool || !config) return [];

  const realImages: ImageItem[] = sample(pool.real, config.realCount);
  const combined = shuffle([...realImages, assignedAI]);

  return combined.map((img, index) => ({
    ...img,
    index,
    selected: false,
    revealed: false,
  }));
}
