export interface Card {
  id: number;
  name: string;
  flipped: boolean;
  matched: boolean;
}

export interface Room {
  id: string;
  players: string[];
  cards: Card[];
  flippedCards: Card[];
  currentPlayer: string | null;
  gameOver: boolean;
}

export interface GameResult {
  roomId: string;
  elapsedTime: number;
  players: string[];
  scores: { [playerId: string]: number };
  winner: string;
  bonus: number;
}
