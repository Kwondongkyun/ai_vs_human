import { RoundConfig } from '@/types/game';
import { TIME_BONUS_MULTIPLIER } from './constants';

export function calculateRoundScore(
  config: RoundConfig,
  isCorrect: boolean,
  timeRemaining: number,
  wrongClicks: number
): number {
  if (!isCorrect) return 0;

  const baseScore = config.correctScore;
  const timeBonus = Math.floor(timeRemaining * TIME_BONUS_MULTIPLIER);
  const penalty = wrongClicks * config.wrongPenalty;

  return Math.max(0, baseScore + timeBonus - penalty);
}
