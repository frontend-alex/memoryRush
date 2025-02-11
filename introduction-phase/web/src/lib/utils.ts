import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { availableCards } from "@/constants/Data";
import confetti from "canvas-confetti";
import { ScoreOptions } from "@/types/Types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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
    const randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];
    selectedPairs.add(randomCard);
  }
  const generatedCards: string[] = [...selectedPairs, ...selectedPairs];

  return shuffle(generatedCards);
};

export const calculateScore = (
  elapsedTime: number,
  options?: ScoreOptions
): number => {
  // Set default options and override if provided
  const {
    maxScore = 100,
    idealTime = 30,
    decayRate = 0.04,
    precision = 0,
    allowBonus = false,
  } = options || {};

  // Convert elapsed time from milliseconds to seconds
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


export const TriggerConfetti = () => {
  const end = Date.now() + 3 * 2000; 
  const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

  const frame = () => {
    if (Date.now() > end) return;

    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      startVelocity: 60,
      origin: { x: 0, y: 0.5 },
      colors: colors,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      startVelocity: 60,
      origin: { x: 1, y: 0.5 },
      colors: colors,
    });

    requestAnimationFrame(frame);
  };

  frame();
};