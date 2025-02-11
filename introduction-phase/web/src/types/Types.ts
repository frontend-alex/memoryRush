export type TSortList = {
  setSort: () => void;
};

type Difficulty = "easy" | "medium" | "hard";

export type TGameSetting = {
  difficulty: Difficulty;
  color: string;
  levelName: string;
  numOfCards: number;
  description: string;
};

export type TCard = {
  id: number;
  name: string;
  flipped: boolean;
  matched: boolean;
};

export type TFlippedCard = {
  name: string;
  index: number;
};

export type TGameControllerReturn = {
  gameOver: boolean;
  cardList: TCard[];
  flippedCards: TFlippedCard[];
  // restartGame: () => void;
  bestTime: number | null;
  overallBestTime: number | null;
  elapsedTime: number;
  preFlip: boolean;
  handleClick: (name: string, index: number) => void;
};

export type ScoreOptions = {
  maxScore?: number;   // Maximum perfect score (default: 100)
  idealTime?: number;  // Ideal time in seconds to achieve maxScore (default: 30)
  decayRate?: number;  // Rate at which score decays beyond the ideal time (default: 0.04)
  precision?: number;  // Decimal places for rounding the score (default: 0)
  allowBonus?: boolean;
}

