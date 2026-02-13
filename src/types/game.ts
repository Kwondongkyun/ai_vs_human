export interface ImageItem {
  id: string;
  src: string;
  isAI: boolean;
  category: string;
}

export interface RoundConfig {
  round: number;
  gridCols: number;
  gridRows: number;
  totalImages: number;
  realCount: number;
  aiCount: number;
  timeLimit: number;
  correctScore: number;
  wrongPenalty: number;
  mission: 'pickReal' | 'pickAI';
  missionText: string;
}

export type GamePhase =
  | 'landing'
  | 'nickname'
  | 'briefing'
  | 'playing'
  | 'feedback'
  | 'roundComplete'
  | 'result';

export interface GridImage extends ImageItem {
  index: number;
  selected: boolean;
  revealed: boolean;
}

export interface GameState {
  nickname: string;
  currentRound: number;
  score: number;
  totalScore: number;
  roundScores: number[];
  phase: GamePhase;
  gridImages: GridImage[];
  selectedImageId: string | null;
  isCorrect: boolean | null;
  timeRemaining: number;
  wrongClicks: number;
}

export interface LeaderboardEntry {
  nickname: string;
  score: number;
  round: number;
  date: string;
}
