import { GridImage } from '@/types/game';
import { roundImages } from '@/data/images';

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function getShuffledImagesForRound(roundIndex: number): GridImage[] {
  const images = roundImages[roundIndex];
  if (!images) return [];

  const shuffled = shuffle(images);

  return shuffled.map((img, index) => ({
    ...img,
    index,
    selected: false,
    revealed: false,
  }));
}
