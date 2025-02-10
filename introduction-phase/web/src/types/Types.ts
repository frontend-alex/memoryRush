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
  elapsedTime: number;
  preFlip: boolean;
  handleClick: (name: string, index: number) => void;
};
