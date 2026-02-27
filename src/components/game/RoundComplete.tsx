'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, ChevronRight, Trophy } from 'lucide-react';
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
  const StatusIcon = isCorrect ? CheckCircle2 : XCircle;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
    >
      <motion.div
        initial={{ scale: 0.85, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="bg-yonam-dark border border-white/10 rounded-2xl p-6 max-w-sm w-full text-center"
      >
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className={`absolute inset-0 blur-2xl rounded-full scale-[2] ${isCorrect ? 'bg-success/20' : 'bg-danger/20'}`} />
            <div className={`relative rounded-2xl p-4 border ${isCorrect ? 'bg-success/10 border-success/30' : 'bg-danger/10 border-danger/30'}`}>
              <StatusIcon
                className={`w-10 h-10 ${isCorrect ? 'text-success' : 'text-danger'}`}
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-1">Round {round}</h2>
        <p className={`text-sm font-semibold mb-5 ${isCorrect ? 'text-success' : 'text-danger'}`}>
          {isCorrect ? '정답 맞췄습니다!' : '시간 초과...'}
        </p>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-5 space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-white/50">라운드 점수</span>
            <span className={`font-bold tabular-nums ${roundScore > 0 ? 'text-lg-red' : 'text-white/40'}`}>
              {roundScore > 0 ? `+${roundScore.toLocaleString()}` : '0'}
            </span>
          </div>
          <div className="flex justify-between items-center border-t border-white/10 pt-3">
            <span className="text-white/50 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5" strokeWidth={1.5} />
              누적 점수
            </span>
            <span className="font-bold text-white tabular-nums">{totalScore.toLocaleString()}</span>
          </div>
        </div>

        <Button size="lg" className="w-full flex items-center justify-center gap-2" onClick={onNext}>
          {isLastRound ? (
            <>
              <Trophy className="w-4 h-4" strokeWidth={1.5} />
              결과 보기
            </>
          ) : (
            <>
              다음 라운드
              <ChevronRight className="w-4 h-4" strokeWidth={2} />
            </>
          )}
        </Button>
      </motion.div>
    </motion.div>
  );
}
