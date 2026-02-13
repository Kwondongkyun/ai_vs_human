'use client';

import { motion } from 'framer-motion';
import ProgressBar from '@/components/ui/ProgressBar';

interface GameHUDProps {
  round: number;
  totalRounds: number;
  score: number;
  totalScore: number;
  timeRemaining: number;
  timeLimit: number;
  missionText: string;
  wrongClicks: number;
}

export default function GameHUD({
  round,
  totalRounds,
  score,
  totalScore,
  timeRemaining,
  timeLimit,
  missionText,
  wrongClicks,
}: GameHUDProps) {
  const timePercent = (timeRemaining / timeLimit) * 100;
  const timeColor = timePercent > 50 ? 'bg-success' : timePercent > 25 ? 'bg-warning' : 'bg-danger';

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="bg-lg-red px-3 py-1 rounded-full text-sm font-bold">
            R{round}/{totalRounds}
          </span>
          {wrongClicks > 0 && (
            <span className="text-xs text-danger">
              오답 {wrongClicks}회
            </span>
          )}
        </div>
        <motion.span
          key={totalScore + score}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="text-lg font-bold text-lg-red"
        >
          {(totalScore + score).toLocaleString()}점
        </motion.span>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-center">
        <span className="text-sm font-medium">{missionText}</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm">⏱️</span>
        <ProgressBar value={timeRemaining} max={timeLimit} color={timeColor} className="flex-1" />
        <motion.span
          key={Math.floor(timeRemaining)}
          initial={timeRemaining <= 5 ? { scale: 1.3, color: '#EF4444' } : undefined}
          animate={{ scale: 1, color: timeRemaining <= 5 ? '#EF4444' : '#FFFFFF' }}
          className="text-sm font-mono w-10 text-right"
        >
          {Math.ceil(timeRemaining)}s
        </motion.span>
      </div>
    </div>
  );
}
