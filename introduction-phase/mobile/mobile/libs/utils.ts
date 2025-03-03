import humanizeDuration from "humanize-duration";

import { availableCards } from "@/constants/data";
import { useTheme } from "@/contexts/ThemeProvider";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { Difficulty } from "@/types/Types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getBackgroundColor = () => {
  const { isDarkMode } = useTheme();

  return isDarkMode ? "900" : "50";
};

export const shuffle = <T>(array: Array<T>): Array<T> => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

export const generateCards = (num: number): string[] => {
  const count = Math.min(Math.max(num, 1), availableCards.length / 2);

  const selectedPairs = new Set<string>();
  while (selectedPairs.size < count) {
    const randomCard =
      availableCards[Math.floor(Math.random() * availableCards.length)];
    selectedPairs.add(randomCard);
  }
  const generatedCards: string[] = [...selectedPairs, ...selectedPairs];

  return shuffle(generatedCards);
};

interface ScoreOptions {
  maxScore?: number; // Maximum perfect score (default: 100)
  idealTime?: number; // Ideal time in seconds to achieve maxScore (default: 30)
  decayRate?: number; // Rate at which score decays beyond the ideal time (default: 0.04)
  precision?: number; // Decimal places for rounding the score (default: 0)
  allowBonus?: boolean;
}

export const calculateScore = (
  elapsedTime: number,
  options?: ScoreOptions
): number => {
  const {
    maxScore = 100,
    idealTime = 30,
    decayRate = 0.04,
    precision = 0,
    allowBonus = false,
  } = options || {};

  const seconds = elapsedTime / 1000;

  let rawScore: number;
  if (allowBonus) {
    if (seconds <= idealTime) {
      // The bonus factor rewards finishing faster than the ideal time.
      // For example, if idealTime is 30 and you finish in 18 seconds,
      // the factor is 30/18 ≈ 1.67, so the score is about 167.
      rawScore = maxScore * (idealTime / seconds);
    } else {
      // For times above the ideal, the score decays exponentially.
      rawScore = maxScore * Math.exp(-decayRate * (seconds - idealTime));
    }
  } else {
    // Without bonus, any time below or equal to the ideal time gets maxScore.
    if (seconds <= idealTime) {
      rawScore = maxScore;
    } else {
      rawScore = maxScore * Math.exp(-decayRate * (seconds - idealTime));
    }
  }

  // Ensure the score is not negative and round it to the desired precision.
  const finalScore = Math.max(0, rawScore);
  const factor = Math.pow(10, precision);
  return Math.round(finalScore * factor) / factor;
};

export const shortEnglishHumanizer = humanizeDuration.humanizer({
  language: "shortEn",
  languages: {
    shortEn: {
      y: () => "y",
      mo: () => "mo",
      w: () => "w",
      d: () => "d",
      h: () => "h",
      m: () => "m",
      s: () => "s",
      ms: () => "ms",
    },
  },
});

export const getDifficulty = (cardLength: number) => {
  if (cardLength <= 15) {
    return "easy";
  } else if (cardLength <= 20) {
    return "medium";
  } else if (cardLength > 20) {
    return "hard";
  } 
};

export const getDifficultyColor = (difficulty: Difficulty): string => {
  switch (difficulty) {
    case "medium":
      return "#fcd34d";
    case "hard":
      return "#ef4444";
    case "easy":
      return "#4ade80";
    default:
      return "#000000";
  }
};

export const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return "Good morning";
  } else if (hour >= 12 && hour < 18) {
    return "Good afternoon";
  } else if (hour >= 18 && hour < 22) {
    return "Good evening";
  } else {
    return "Good night";
  }
};

interface Level {
  $id: string;
  name: string;
  description: string;
  difficulty: string;
  numOfCards: number;
  bestPlayerId: string | null;
  [key: string]: any;
}

export const getNextLevel = (levels: Level[], currentId: string): Level => {
  const currentIndex = levels.findIndex((level) => level.$id === currentId);

  if (currentIndex === levels.length - 1) {
    return levels[currentIndex - 1];
  }

  return levels[currentIndex + 1];
};
