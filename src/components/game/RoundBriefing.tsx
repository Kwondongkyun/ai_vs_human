'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { RoundConfig } from '@/types/game';

interface RoundBriefingProps {
  config: RoundConfig;
  onStart: () => void;
}

const ROUND_EMOJIS = ['🔰', '🎯', '🔥', '💀'];

export default function RoundBriefing({ config, onStart }: RoundBriefingProps) {
  const emoji = ROUND_EMOJIS[config.round - 1] ?? '🎯';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
    >
      <motion.div
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-yonam-dark border border-white/10 rounded-2xl p-6 max-w-sm w-full text-center"
      >
        <div className="text-5xl mb-4">{emoji}</div>
        <h2 className="text-2xl font-bold mb-2">Round {config.round}</h2>

        <div className="bg-white/5 border border-white/10 rounded-lg p-3 mb-4">
          <p className="text-lg font-medium text-lg-red">{config.missionText}</p>
        </div>

        <div className="space-y-2 text-sm text-white/60 mb-6">
          <p>
            그리드: <strong className="text-white">{config.gridCols}x{config.gridRows}</strong>
            {' '}({config.totalImages}장)
          </p>
          <p>제한 시간: <strong className="text-warning">{config.timeLimit}초</strong></p>
          <p>오답 감점: <strong className="text-danger">-{config.wrongPenalty}점</strong></p>
          <p>정답 점수: <strong className="text-success">+{config.correctScore}점</strong> + 시간 보너스</p>
        </div>

        <Button size="lg" className="w-full" onClick={onStart}>
          시작!
        </Button>
      </motion.div>
    </motion.div>
  );
}
