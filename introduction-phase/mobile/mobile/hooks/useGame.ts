import { saveGameData } from "@/libs/appwrite";
import { calculateScore, generateCards, shuffle } from "@/libs/utils";
import { FlippedCardProps } from "@/types/Types";
import { router } from "expo-router";
import { useEffect, useState } from "react";

const useGame = (
  cardCount: number,
  levelId: string | string[],
  levelName: string | string[]
) => {
  const cards = generateCards(cardCount);
  const [state, setState] = useState({
    preFlip: true,
    cardList: shuffle(cards).map((name, index) => ({
      id: index,
      name,
      flipped: false,
      matched: false,
    })),
    flippedCards: [] as FlippedCardProps[],
    gameOver: false,
    elapsedTime: 0,
    countdown: 3,
  });

  useEffect(() => {
    if (state.countdown > 0) {
      const countdownTimer = setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          countdown: prevState.countdown - 1,
        }));
      }, 1000);

      return () => clearTimeout(countdownTimer);
    } else {
      setTimeout(() => {
        setState((prevState) => ({ ...prevState, preFlip: false }));
      }, 1000);
    }
  }, [state.countdown]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (!state.preFlip && !state.gameOver) {
      timer = setInterval(() => {
        setState((prevState) => ({
          ...prevState,
          elapsedTime: prevState.elapsedTime + 1000,
        }));
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [state.preFlip, state.gameOver]);

  useEffect(() => {
    if (state.flippedCards.length === 2) {
      setTimeout(() => checkCards(state.flippedCards), 750);
    }
  }, [state.flippedCards]);

  useEffect(() => {
    if (state.gameOver) {
      const score = calculateScore(state.elapsedTime, { allowBonus: true });
      const gameDetails = {
        timeTaken: state.elapsedTime,
        bestScore: 0,
        score,
      };
      const callApi = async () => {
        const response = await saveGameData(levelId, gameDetails);
        if (response)
          router.push(
            `/level-done?levelId=${levelId}&userChoice=${cardCount}&levelName=${levelName}`
          );
      };

      callApi();
    }
  }, [state.gameOver, state.elapsedTime]);

  const checkCards = async (flipped: FlippedCardProps[]) => {
    if (flipped.length < 2) return;
    const [firstCard, secondCard] = flipped;
    setState((prevState) => {
      const updatedCards = prevState.cardList.map((card) => {
        const isMatched = firstCard.name === secondCard.name;
        return card.id === firstCard.index || card.id === secondCard.index
          ? { ...card, flipped: isMatched, matched: isMatched }
          : card;
      });

      const gameOver = updatedCards.every((card) => card.matched);

      return {
        ...prevState,
        cardList: updatedCards,
        flippedCards: [],
        gameOver,
      };
    });
  };

  const handleClick = (name: string, index: number) => {
    if (state.countdown > 0 || state.flippedCards.length >= 2) return;

    const updatedFlipped = [...state.flippedCards, { name, index }];
    setState((prevState) => ({
      ...prevState,
      flippedCards: updatedFlipped,
      cardList: prevState.cardList.map((card) =>
        card.id === index ? { ...card, flipped: true } : card
      ),
    }));
  };

  return { state, handleClick };
};

export default useGame;
