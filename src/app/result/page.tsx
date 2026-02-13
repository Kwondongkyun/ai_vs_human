'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';
import { ROUNDS_COUNT } from '@/lib/constants';
import Button from '@/components/ui/Button';

export default function ResultPage() {
  const router = useRouter();
  const { nickname, totalScore, roundScores, currentRound, setPhase } = useGameStore();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!nickname) {
      router.replace('/');
      return;
    }
    setPhase('result');
  }, [nickname, router, setPhase]);

  const handleSubmit = async () => {
    if (submitted) return;
    try {
      await fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nickname,
          score: totalScore,
          round: Math.min(currentRound + 1, ROUNDS_COUNT),
        }),
      });
      setSubmitted(true);
    } catch {
      // silent fail
    }
    router.push('/leaderboard');
  };

  if (!nickname) return null;

  return (
    <div className="min-h-screen bg-yonam-dark px-4 py-8 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center"
      >
        <div className="text-6xl mb-4">🎯</div>
        <h1 className="text-3xl font-bold mb-2">게임 완료!</h1>
        <p className="text-white/60 mb-6">{nickname}님의 최종 결과</p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <div className="text-5xl font-bold text-lg-red mb-4">
            {totalScore.toLocaleString()}
          </div>
          <div className="text-sm text-white/40 mb-4">총점</div>

          <div className="space-y-2">
            {roundScores.map((s, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-white/60">Round {i + 1}</span>
                <span className={`font-bold ${s > 0 ? 'text-success' : 'text-danger'}`}>
                  {s > 0 ? `+${s.toLocaleString()}` : '0'}점
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button size="lg" className="w-full" onClick={handleSubmit} disabled={submitted}>
            {submitted ? '등록 완료!' : '리더보드에 등록'}
          </Button>
          <Button variant="ghost" size="md" className="w-full" onClick={() => router.push('/')}>
            홈으로
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
