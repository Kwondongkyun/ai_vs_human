'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Trophy, CheckCircle2, XCircle, Home, Upload } from 'lucide-react';
import { useGameStore } from '@/stores/gameStore';
import { ROUNDS_COUNT } from '@/lib/constants';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

export default function ResultPage() {
  const router = useRouter();
  const { totalScore, roundScores, roundWrongClicks, currentRound, setPhase } = useGameStore();
  const [showModal, setShowModal] = useState(false);
  const [nickname, setNickname] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setPhase('result');
  }, [setPhase]);

  const handleSubmit = async () => {
    if (nickname.trim().length < 2 || submitted) return;
    try {
      await fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nickname: nickname.trim(),
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

  return (
    <div className="min-h-screen px-4 py-8 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-yonam-dark via-yonam-blue/10 to-lg-red/20" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-md w-full text-center"
      >
        {/* 아이콘 */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 180 }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <div className="absolute inset-0 blur-3xl bg-lg-red/30 rounded-full scale-[2]" />
            <div className="relative bg-white/5 border border-white/10 rounded-2xl p-5">
              <Trophy className="w-12 h-12 text-lg-red" strokeWidth={1.5} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl font-extrabold mb-1">게임 완료!</h1>
          <p className="text-white/50 text-sm mb-8">최종 결과</p>
        </motion.div>

        {/* 총점 카드 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-4"
        >
          <p className="text-xs text-white/40 mb-2 uppercase tracking-widest">총점</p>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 150 }}
            className="text-5xl font-extrabold text-lg-red tabular-nums mb-5"
          >
            {totalScore.toLocaleString()}
          </motion.div>

          <div className="space-y-2.5">
            {roundScores.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + i * 0.07 }}
                className="flex items-center justify-between text-sm"
              >
                <span className="flex items-center gap-2 text-white/50">
                  {s > 0
                    ? <CheckCircle2 className="w-3.5 h-3.5 text-success" strokeWidth={2} />
                    : <XCircle className="w-3.5 h-3.5 text-danger" strokeWidth={2} />
                  }
                  Round {i + 1}
                </span>
                <span className="flex items-center gap-2">
                  {(roundWrongClicks[i] ?? 0) > 0 && (
                    <span className="text-xs text-danger/70">
                      -{(roundWrongClicks[i] ?? 0) * 50}
                    </span>
                  )}
                  <span className={`font-bold tabular-nums ${s > 0 ? 'text-success' : 'text-white/30'}`}>
                    {s > 0 ? `+${s.toLocaleString()}` : '0'}점
                  </span>
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 버튼 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col gap-3"
        >
          <Button
            size="lg"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => setShowModal(true)}
            disabled={submitted}
          >
            <Upload className="w-4 h-4" strokeWidth={2} />
            {submitted ? '등록 완료!' : '리더보드에 등록'}
          </Button>
          <Button
            variant="ghost"
            size="md"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => router.push('/')}
          >
            <Home className="w-4 h-4" strokeWidth={1.5} />
            홈으로
          </Button>
          <p className="text-[10px] text-white/20 mt-4 text-center">
            본 게임은 생성형 AI(Claude Opus 4.6)를 활용하여 제작되었습니다
          </p>
        </motion.div>
      </motion.div>

      {/* 닉네임 입력 모달 */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-xl font-bold mb-1 text-center">닉네임을 입력하세요</h2>
        <p className="text-sm text-white/40 text-center mb-5">리더보드에 등록될 이름입니다</p>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="2~10자 닉네임"
          maxLength={10}
          className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 outline-none focus:border-lg-red transition-colors mb-4"
          autoFocus
        />
        <Button
          size="lg"
          className="w-full"
          onClick={handleSubmit}
          disabled={nickname.trim().length < 2}
        >
          등록하기
        </Button>
      </Modal>
    </div>
  );
}
