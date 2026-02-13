'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
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
    nickname, phase, currentRound, score, totalScore, gridImages,
    isCorrect, wrongClicks, roundScores,
    setPhase, startRound, selectImage, setTimeRemaining, handleTimeout,
  } = store;

  const config = ROUND_CONFIGS[currentRound] ?? ROUND_CONFIGS[0];

  useEffect(() => {
    if (!nickname) {
      router.replace('/');
      return;
    }
    if (phase === 'landing' || phase === 'nickname') {
      startRound(0);
    }
  }, [nickname, phase, router, startRound]);

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

  if (!nickname) return null;

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

      <div className="flex-1 flex items-center justify-center">
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
