import { v4 as uuidv4 } from "uuid";
import { availableCards } from "../constants/data";

export const generateRoomId = () => {
  return uuidv4();
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
