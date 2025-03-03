import { ImageSourcePropType } from "react-native";

interface LoginInputsProps {
  name: string;
  placeholder: string;
  type: string;
  icon: ImageSourcePropType;
}

export type Difficulty = "easy" | "medium" | "hard" | undefined;

interface GameSettingsProps {
  id: string;
  difficulty: Difficulty;
  name: string;
  numOfCards: number;
  description: string;
  bestPlayerId: string | null;
}

interface CardProps {
  id: number;
  name: string;
  flipped: boolean;
  matched: boolean;
}

interface FlippedCardProps {
  name: string;
  index: number;
}
interface Card {
  id: number;
  name: string;
  flipped: boolean;
  matched: boolean;
}

interface Player {}

interface Room {
  id: string;
  players: string[];
  cards: Card[];
  maxPlayers: number;
  flippedCards: Card[];
  currentPlayer: string | null;
  ownerId: string,
  gameOver: boolean;
}

export {
  LoginInputsProps,
  GameSettingsProps,
  CardProps,
  FlippedCardProps,
  Room,
  Card,
};
