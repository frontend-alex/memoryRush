import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { availableCards } from "@/constants/Data";
import confetti from "canvas-confetti";

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