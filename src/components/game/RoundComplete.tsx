'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

interface RoundCompleteProps {
  round: number;
  roundScore: number;
  totalScore: number;
  isCorrect: boolean;
  isLastRound: boolean;
  onNext: () => void;
}

export default function RoundComplete({
  round,
  roundScore,
  totalScore,
  isCorrect,
  isLastRound,
  onNext,
}: RoundCompleteProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="bg-yonam-dark border border-white/10 rounded-2xl p-6 max-w-sm w-full text-center"
      >
        <div className="text-5xl mb-4">{isCorrect ? '🎉' : '😢'}</div>
        <h2 className="text-xl font-bold mb-2">
          Round {round} {isCorrect ? '정답!' : '실패...'}
        </h2>

        <div className="bg-white/5 rounded-xl p-4 mb-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-white/60">결과</span>
            <span className={isCorrect ? 'text-success font-bold' : 'text-danger font-bold'}>
              {isCorrect ? '정답' : '시간 초과'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/60">라운드 점수</span>
            <span className="font-bold text-lg-red">+{roundScore}</span>
          </div>
          <div className="border-t border-white/10 pt-2 flex justify-between">
            <span className="text-white/60">누적 점수</span>
            <span className="font-bold">{totalScore.toLocaleString()}</span>
          </div>
        </div>

        <Button size="lg" className="w-full" onClick={onNext}>
          {isLastRound ? '결과 보기' : '다음 라운드'}
        </Button>
      </motion.div>
    </motion.div>
  );
}
