'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

export default function LandingPage() {
  const router = useRouter();
  const { setNickname, reset } = useGameStore();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');

  const handleStart = () => {
    if (name.trim().length < 2) return;
    reset();
    setNickname(name.trim());
    router.push('/game');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-yonam-dark via-yonam-dark to-lg-red/20" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-lg"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="text-7xl mb-6"
        >
          🔍
        </motion.div>

        <h1 className="text-4xl font-bold mb-2">
          <span className="text-lg-red">AI</span> 이미지를 찾아라!
        </h1>
        <p className="text-xl text-yonam-medium mb-2">연암공대 AI 이미지 구별 게임</p>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8 text-sm text-white/70 leading-relaxed">
          <p>실제 사진과 <strong className="text-white">AI가 생성한 이미지</strong>가 섞여있습니다.</p>
          <p>라운드마다 그리드가 커지고, 난이도가 올라갑니다!</p>
          <div className="mt-3 space-y-1 text-xs text-white/50">
            <p>R1: 2장 중 실제 이미지 고르기</p>
            <p>R2: 2x2 중 AI 이미지 찾기</p>
            <p>R3: 3x3 중 AI 이미지 찾기</p>
            <p>R4: 4x4 중 AI 이미지 찾기</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-8 text-center text-sm">
          <div className="bg-white/5 border border-white/10 rounded-lg p-3">
            <div className="text-2xl mb-1">4</div>
            <div className="text-white/50">라운드</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-3">
            <div className="text-2xl mb-1">⏱️</div>
            <div className="text-white/50">시간 제한</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-3">
            <div className="text-2xl mb-1">🏆</div>
            <div className="text-white/50">리더보드</div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button size="lg" className="w-full" onClick={() => setShowModal(true)}>
            게임 시작
          </Button>
          <Button variant="ghost" size="md" className="w-full" onClick={() => router.push('/leaderboard')}>
            리더보드
          </Button>
        </div>
      </motion.div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-xl font-bold mb-4 text-center">닉네임을 입력하세요</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleStart()}
          placeholder="2~10자 닉네임"
          maxLength={10}
          className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 outline-none focus:border-lg-red transition-colors mb-4"
          autoFocus
        />
        <Button
          size="lg"
          className="w-full"
          onClick={handleStart}
          disabled={name.trim().length < 2}
        >
          시작하기
        </Button>
      </Modal>
    </div>
  );
}
