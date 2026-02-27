'use client';

import { motion } from 'framer-motion';
import { Timer, XCircle } from 'lucide-react';
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
  const isUrgent = timeRemaining <= 5;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="bg-lg-red/90 border border-lg-red/50 px-3 py-1 rounded-full text-sm font-bold tracking-wide">
            ROUND {round} / {totalRounds}
          </span>
          {wrongClicks > 0 && (
            <span className="flex items-center gap-1 text-xs text-danger bg-danger/10 border border-danger/20 px-2 py-1 rounded-full">
              <XCircle className="w-3 h-3" strokeWidth={2} />
              {wrongClicks}회
            </span>
          )}
        </div>
        <motion.div
          key={totalScore + score}
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          className="flex items-baseline gap-1"
        >
          <span className="text-xl font-bold text-lg-red tabular-nums">
            {(totalScore + score).toLocaleString()}
          </span>
          <span className="text-xs text-white/40">점</span>
        </motion.div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-center">
        <span className="text-sm font-semibold text-white/90">{missionText}</span>
      </div>

      <div className="flex items-center gap-2">
        <Timer
          className={`w-4 h-4 shrink-0 ${isUrgent ? 'text-danger' : 'text-white/40'}`}
          strokeWidth={1.5}
        />
        <ProgressBar value={timeRemaining} max={timeLimit} color={timeColor} className="flex-1" />
        <motion.span
          key={Math.floor(timeRemaining)}
          initial={isUrgent ? { scale: 1.3 } : undefined}
          animate={{ scale: 1 }}
          className={`text-sm font-mono w-10 text-right ${isUrgent ? 'text-danger font-bold' : 'text-white/70'}`}
        >
          {Math.ceil(timeRemaining)}s
        </motion.span>
      </div>
    </div>
  );
}
