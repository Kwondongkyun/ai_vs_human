'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ScanSearch, Timer, Layers, Trophy, Play } from 'lucide-react';
import { useGameStore } from '@/stores/gameStore';
import Button from '@/components/ui/Button';
import TopRanking from '@/components/game/TopRanking';

export default function LandingPage() {
  const router = useRouter();
  const { reset } = useGameStore();

  const handleStart = () => {
    reset();
    router.push('/game');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 relative overflow-x-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-yonam-dark via-yonam-blue/15 to-lg-red/25" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-yonam-blue/10 via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 text-center max-w-sm w-full"
      >
        {/* 배지 */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="inline-flex items-center gap-1.5 bg-yonam-blue/20 border border-yonam-blue/40 rounded-full px-3 py-1 text-xs text-yonam-light mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-yonam-light animate-pulse" />
          연암공대 AI 이미지 구별 챌린지
        </motion.div>

        {/* 메인 아이콘 */}
        <motion.div
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.25, type: 'spring', stiffness: 180 }}
          className="flex justify-center mb-7"
        >
          <div className="relative">
            <div className="absolute inset-0 blur-3xl bg-lg-red/30 rounded-full scale-[2]" />
            <div className="relative bg-white/5 border border-white/10 rounded-2xl p-5">
              <ScanSearch className="w-14 h-14 text-lg-red" strokeWidth={1.5} />
            </div>
          </div>
        </motion.div>

        {/* 타이틀 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight mb-3">
            <span className="text-lg-red">AI</span> 이미지를<br />찾아라!
          </h1>
          <p className="text-white/45 text-sm mb-10 leading-relaxed">
            실제 사진과 AI 생성 이미지가 섞여 있습니다<br />
            라운드마다 난이도가 올라갑니다
          </p>
        </motion.div>

        {/* 스탯 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.4 }}
          className="flex justify-center gap-4 mb-10"
        >
          {[
            { icon: Layers, label: '4 라운드' },
            { icon: Timer, label: '시간 제한' },
            { icon: Trophy, label: '리더보드' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-colors">
                <Icon className="w-5 h-5 text-yonam-light" strokeWidth={1.5} />
              </div>
              <span className="text-xs text-white/35">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.4 }}
        >
          <Button
            size="lg"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleStart}
          >
            <Play className="w-4 h-4 fill-current" />
            게임 시작
          </Button>
        </motion.div>

        <TopRanking />
      </motion.div>
    </div>
  );
}
