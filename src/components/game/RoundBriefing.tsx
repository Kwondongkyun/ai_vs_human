'use client';

import { motion } from 'framer-motion';
import { Shield, Target, Flame, Zap, Play, LayoutGrid, Timer, XCircle, CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import { RoundConfig } from '@/types/game';

interface RoundBriefingProps {
  config: RoundConfig;
  onStart: () => void;
}

const ROUND_ICONS = [Shield, Target, Flame, Zap];

export default function RoundBriefing({ config, onStart }: RoundBriefingProps) {
  const RoundIcon = ROUND_ICONS[config.round - 1] ?? Target;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
    >
      <motion.div
        initial={{ scale: 0.85, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="bg-yonam-dark border border-white/10 rounded-2xl p-6 max-w-sm w-full text-center"
      >
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="absolute inset-0 blur-2xl bg-lg-red/20 rounded-full scale-[2]" />
            <div className="relative bg-white/5 border border-white/10 rounded-2xl p-4">
              <RoundIcon className="w-10 h-10 text-lg-red" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 bg-lg-red/15 border border-lg-red/30 rounded-full px-3 py-1 text-xs text-lg-red font-bold mb-2">
          ROUND {config.round}
        </div>

        <div className={`rounded-xl px-4 py-3 mb-2 border ${
          config.mission === 'pickAI'
            ? 'bg-danger/10 border-danger/30'
            : 'bg-success/10 border-success/30'
        }`}>
          <p className={`text-base font-bold ${
            config.mission === 'pickAI' ? 'text-danger' : 'text-success'
          }`}>{config.missionText}</p>
        </div>
        <p className="text-xs text-white/40 mb-4">
          총 {config.totalImages}장 중 AI 이미지 {config.aiCount}장, 실제 이미지 {config.realCount}장
        </p>

        <div className="grid grid-cols-2 gap-2 text-sm mb-6">
          <div className="bg-white/3 border border-white/8 rounded-xl p-3 flex flex-col items-center gap-1.5">
            <LayoutGrid className="w-4 h-4 text-white/40" strokeWidth={1.5} />
            <span className="text-white/40 text-xs">그리드</span>
            <span className="font-bold text-white">{config.gridCols}×{config.gridRows}</span>
          </div>
          <div className="bg-white/3 border border-white/8 rounded-xl p-3 flex flex-col items-center gap-1.5">
            <Timer className="w-4 h-4 text-warning" strokeWidth={1.5} />
            <span className="text-white/40 text-xs">제한시간</span>
            <span className="font-bold text-warning">{config.timeLimit}s</span>
          </div>
          <div className="bg-white/3 border border-white/8 rounded-xl p-3 flex flex-col items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-success" strokeWidth={1.5} />
            <span className="text-white/40 text-xs">정답</span>
            <span className="font-bold text-success">+{config.correctScore}</span>
          </div>
          <div className="bg-white/3 border border-white/8 rounded-xl p-3 flex flex-col items-center gap-1.5">
            <XCircle className="w-4 h-4 text-danger" strokeWidth={1.5} />
            <span className="text-white/40 text-xs">오답 감점</span>
            <span className="font-bold text-danger">-{config.wrongPenalty}</span>
          </div>
        </div>

        <Button size="lg" className="w-full flex items-center justify-center gap-2" onClick={onStart}>
          <Play className="w-4 h-4 fill-current" />
          시작!
        </Button>
      </motion.div>
    </motion.div>
  );
}
