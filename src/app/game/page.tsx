'use client';

import { useEffect, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { XCircle } from 'lucide-react';
import { useGameStore } from '@/stores/gameStore';
import { ROUNDS_COUNT, ROUND_CONFIGS } from '@/lib/constants';
import { useTimer } from '@/hooks/useTimer';
import ImageGrid from '@/components/game/ImageGrid';
import GameHUD from '@/components/game/GameHUD';
import RoundBriefing from '@/components/game/RoundBriefing';
import RoundComplete from '@/components/game/RoundComplete';

export default function GamePage() {
  const router = useRouter();
  const store = useGameStore();
  const {
    phase, currentRound, score, totalScore, gridImages,
    isCorrect, wrongClicks, roundScores,
    setPhase, startRound, selectImage, setTimeRemaining, handleTimeout,
  } = store;

  const config = ROUND_CONFIGS[currentRound] ?? ROUND_CONFIGS[0];
  const [showWrongToast, setShowWrongToast] = useState(false);

  useEffect(() => {
    if (wrongClicks > 0) {
      setShowWrongToast(true);
      const timer = setTimeout(() => setShowWrongToast(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [wrongClicks]);

  useEffect(() => {
    if (phase === 'landing' || phase === 'nickname') {
      startRound(0);
    }
  }, [phase, startRound]);

  const handleTimerComplete = useCallback(() => {
    handleTimeout();
  }, [handleTimeout]);

  const { remaining, start: startTimer, stop: stopTimer } = useTimer({
    duration: config.timeLimit,
    onTick: setTimeRemaining,
    onComplete: handleTimerComplete,
  });

  useEffect(() => {
    if (phase === 'feedback') {
      stopTimer();
    }
  }, [phase, stopTimer]);

  const handleStartRound = useCallback(() => {
    setPhase('playing');
    startTimer();
  }, [setPhase, startTimer]);

  const handleImageClick = useCallback((imageId: string) => {
    selectImage(imageId);
  }, [selectImage]);

  const handleNextRound = useCallback(() => {
    const nextRound = currentRound + 1;
    if (nextRound >= ROUNDS_COUNT) {
      router.push('/result');
    } else {
      startRound(nextRound);
    }
  }, [currentRound, router, startRound]);

  const lastRoundScore = roundScores.length > 0 ? roundScores[roundScores.length - 1] : 0;

  return (
    <div className="min-h-screen bg-yonam-dark px-4 py-6 max-w-2xl mx-auto flex flex-col gap-4">
      <GameHUD
        round={currentRound + 1}
        totalRounds={ROUNDS_COUNT}
        score={score}
        totalScore={totalScore}
        timeRemaining={remaining}
        timeLimit={config.timeLimit}
        missionText={config.missionText}
        wrongClicks={wrongClicks}
      />

      <div className="flex-1 flex items-center justify-center relative">
        <AnimatePresence>
          {showWrongToast && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-0 z-30 bg-danger/90 text-white text-sm font-bold px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg"
            >
              <XCircle className="w-4 h-4" strokeWidth={2} />
              오답! -50점
            </motion.div>
          )}
        </AnimatePresence>
        <ImageGrid
          images={gridImages}
          config={config}
          onImageClick={handleImageClick}
          disabled={phase !== 'playing'}
        />
      </div>

      <AnimatePresence>
        {phase === 'briefing' && (
          <RoundBriefing
            config={config}
            onStart={handleStartRound}
          />
        )}

        {phase === 'roundComplete' && (
          <RoundComplete
            round={currentRound + 1}
            roundScore={lastRoundScore}
            totalScore={totalScore}
            isCorrect={isCorrect ?? false}
            isLastRound={currentRound >= ROUNDS_COUNT - 1}
            onNext={handleNextRound}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
