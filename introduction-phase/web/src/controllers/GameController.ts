import { useState, useEffect } from "react";
import { generateCards, shuffle, TriggerConfetti } from "@/lib/utils";
import { TCard, TFlippedCard, TGameControllerReturn } from "@/types/Types";

const GameController = (userChoice: number): TGameControllerReturn => {
  const cards: string[] = generateCards(userChoice);

  const [preFlip, setPreFlip] = useState(true);

  const [cardList, setCardList] = useState<TCard[]>(() =>
    shuffle(cards).map((name, index) => ({
      id: index,
      name,
      flipped: false,
      matched: false,
    }))
  );


  const [gameOver, setGameOver] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0); 
  const [flippedCards, setFlippedCards] = useState<TFlippedCard[]>([]);

  useEffect(() => {
    let timerInterval: NodeJS.Timeout | null = null; 

    if (!gameOver) {
      timerInterval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1000); 
      }, 1000);
    } else {
      if (timerInterval) clearInterval(timerInterval);
    }

    // Cleanup the interval when the component is unmounted or game is over
    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [gameOver]); 

  const handleClick = (name: string, index: number) => {
    if (flippedCards.length === 2) return;

    const currentCard: TFlippedCard = { name, index };

    const updatedCards = cardList.map((card) => card.id === index ? { ...card, flipped: true } : card);

    const updatedFlipped = [...flippedCards, currentCard];

    setFlippedCards(updatedFlipped);
    setCardList(updatedCards);

    if (updatedFlipped.length === 2) {
      setTimeout(() => {
        check(updatedFlipped);
      }, 750);
    }
  };


  const check = (flipped: TFlippedCard[]) => {
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
    if(isGameOver) TriggerConfetti();
  }, [cardList]); 

  // const restartGame = () => {
  //   const shuffledCards = shuffle(cards).map((name, index) => ({
  //     id: index,
  //     name,
  //     flipped: false,
  //     matched: false,
  //   }));

  //   setCardList(shuffledCards);
  //   setFlippedCards([]);
  //   setGameOver(false);
  //   setElapsedTime(0); 
  // };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.returnValue = "Are you sure you want to leave? Your progress will be lost.";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return {
    gameOver,
    cardList,
    flippedCards,
    elapsedTime, 
    preFlip,
    handleClick,
  };
};

export default GameController;
