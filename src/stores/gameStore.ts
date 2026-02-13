import { create } from 'zustand';
import { GameState, GamePhase, GridImage } from '@/types/game';
import { ROUND_CONFIGS } from '@/lib/constants';
import { getShuffledImagesForRound } from '@/lib/imageSelector';
import { calculateRoundScore } from '@/lib/scoring';

interface GameStore extends GameState {
  setNickname: (nickname: string) => void;
  setPhase: (phase: GamePhase) => void;
  startRound: (round: number) => void;
  selectImage: (imageId: string) => void;
  setTimeRemaining: (time: number) => void;
  handleTimeout: () => void;
  nextRound: () => void;
  reset: () => void;
}

const initialState: GameState = {
  nickname: '',
  currentRound: 0,
  score: 0,
  totalScore: 0,
  roundScores: [],
  phase: 'landing',
  gridImages: [],
  selectedImageId: null,
  isCorrect: null,
  timeRemaining: 0,
  wrongClicks: 0,
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  setNickname: (nickname) => set({ nickname }),
  setPhase: (phase) => set({ phase }),

  startRound: (round) => {
    const config = ROUND_CONFIGS[round];
    const gridImages = getShuffledImagesForRound(round);

    set({
      currentRound: round,
      score: 0,
      gridImages,
      selectedImageId: null,
      isCorrect: null,
      timeRemaining: config.timeLimit,
      wrongClicks: 0,
      phase: 'briefing',
    });
  },

  selectImage: (imageId) => {
    const { gridImages, phase, currentRound } = get();
    if (phase !== 'playing') return;

    const config = ROUND_CONFIGS[currentRound];
    const image = gridImages.find((img) => img.id === imageId);
    if (!image || image.selected) return;

    const isTargetAI = config.mission === 'pickAI';
    const isCorrect = isTargetAI ? image.isAI : !image.isAI;

    if (isCorrect) {
      const { timeRemaining, wrongClicks } = get();
      const roundScore = calculateRoundScore(config, true, timeRemaining, wrongClicks);

      const updatedImages = gridImages.map((img) => ({
        ...img,
        selected: img.id === imageId ? true : img.selected,
        revealed: true,
      }));

      set({
        gridImages: updatedImages,
        selectedImageId: imageId,
        isCorrect: true,
        score: roundScore,
        phase: 'feedback',
      });

      setTimeout(() => {
        const state = get();
        set({
          roundScores: [...state.roundScores, roundScore],
          totalScore: state.totalScore + roundScore,
          phase: 'roundComplete',
        });
      }, 1500);
    } else {
      const { wrongClicks } = get();
      const updatedImages = gridImages.map((img) =>
        img.id === imageId ? { ...img, selected: true } : img
      );

      set({
        gridImages: updatedImages,
        selectedImageId: imageId,
        isCorrect: false,
        wrongClicks: wrongClicks + 1,
      });

      setTimeout(() => {
        const state = get();
        const resetImages = state.gridImages.map((img) =>
          img.id === imageId ? { ...img, selected: false } : img
        );
        set({
          gridImages: resetImages,
          selectedImageId: null,
          isCorrect: null,
        });
      }, 800);
    }
  },

  handleTimeout: () => {
    const { gridImages } = get();
    const updatedImages = gridImages.map((img) => ({ ...img, revealed: true }));

    set({
      gridImages: updatedImages,
      isCorrect: false,
      score: 0,
      phase: 'feedback',
    });

    setTimeout(() => {
      const state = get();
      set({
        roundScores: [...state.roundScores, 0],
        totalScore: state.totalScore,
        phase: 'roundComplete',
      });
    }, 1500);
  },

  nextRound: () => {
    // placeholder - called from page
  },

  setTimeRemaining: (time) => set({ timeRemaining: time }),

  reset: () => set(initialState),
}));
