import FullSafeAreaScreen from "@/components/FullSafeAreaScreen";
import BackButton from "@/components/ui/goBackButton";

import { ThemedText } from "@/components/ui/themed-components";
import { gameSettingsCards } from "@/constants/data";
import { calculateScore, generateCards, shuffle } from "@/libs/utils";
import { CardProps, FlippedCardProps, RootStackParamList } from "@/types/Types";
import { RouteProp } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

import { View } from "react-native";


const level = () => {
  const cards: string[] = generateCards(6);

  const [preFlip, setPreFlip] = useState(true);

  const [cardList, setCardList] = useState<CardProps[]>(() =>
    shuffle(cards).map((name, index) => ({
      id: index,
      name,
      flipped: false,
      matched: false,
    }))
  );

  const [gameOver, setGameOver] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [flippedCards, setFlippedCards] = useState<FlippedCardProps[]>([]);

  const [bestTime, setBestTime] = useState<number | null>(() => {
    const savedTime = localStorage.getItem(`highscore-${6}`);
    return savedTime ? Number(savedTime) : null;
  });

  const [overallBestTime, setOverallBestTime] = useState<number | null>(null);

  useEffect(() => {
    const allLevelTimes: number[] = [];
    for (let i = 1; i <= gameSettingsCards.length; i++) {
      const levelTime = localStorage.getItem(`highscore-${i}`);
      if (levelTime) {
        allLevelTimes.push(Number(levelTime));
      }
    }

    if (allLevelTimes.length > 0) {
      setOverallBestTime(Math.min(...allLevelTimes));
    }
  }, []);

  useEffect(() => {
    let timerInterval: NodeJS.Timeout | null = null;

    if (!gameOver) {
      timerInterval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1000);
      }, 1000);
    } else {
      if (timerInterval) clearInterval(timerInterval);
    }

    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [gameOver]);

  const handleClick = (name: string, index: number) => {
    if (flippedCards.length === 2) return;

    const currentCard: FlippedCardProps = { name, index };

    const updatedCards = cardList.map((card) =>
      card.id === index ? { ...card, flipped: true } : card
    );

    const updatedFlipped = [...flippedCards, currentCard];

    setFlippedCards(updatedFlipped);
    setCardList(updatedCards);

    if (updatedFlipped.length === 2) {
      setTimeout(() => {
        check(updatedFlipped);
      }, 750);
    }
  };

  const check = (flipped: FlippedCardProps[]) => {
    if (flipped.length < 2) return;

    const [firstCard, secondCard] = flipped;

    setCardList((prevCards) =>
      prevCards.map((card) => {
        if (card.id === firstCard.index || card.id === secondCard.index) {
          return {
            ...card,
            matched: firstCard.name === secondCard.name,
            flipped: firstCard.name === secondCard.name ? true : false,
          };
        }
        return card;
      })
    );

    setFlippedCards([]);
  };

  useEffect(() => {
    setTimeout(() => setPreFlip(false), 1000);
  }, []);

  useEffect(() => {
    const isGameOver = cardList.every((card) => card.matched);
    setGameOver(isGameOver);

    if (isGameOver) {
      const newScore = calculateScore(elapsedTime, { allowBonus: true });
      if (!bestTime || newScore > bestTime) {
        setBestTime(newScore);
        localStorage.setItem(`highscore-${6}`, String(newScore));
      }
    }
  }, [cardList, elapsedTime, bestTime, 6]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <FullSafeAreaScreen>
      <View className="flex items-start justify-start">
        <BackButton className="w-max" />
      </View>
    </FullSafeAreaScreen>
  );
};

export default level;
