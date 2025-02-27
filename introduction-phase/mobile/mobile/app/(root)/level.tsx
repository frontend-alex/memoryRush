import FullSafeAreaScreen from "@/components/FullSafeAreaScreen";
import BackButton from "@/components/ui/goBackButton";

import { useEffect, useState } from "react";
import { generateCards, shuffle } from "@/libs/utils";
import { CardProps, FlippedCardProps } from "@/types/Types";

import { View, FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ui/themed-components";
import GameCard from "@/components/cards/FlipCard";

const Level = () => {
  const { userChoice, levelName } = useLocalSearchParams();
  
  const cardCount = Number(userChoice);
  const cards: string[] = generateCards(cardCount);

  const [preFlip, setPreFlip] = useState(true);
  const [cardList, setCardList] = useState<CardProps[]>(() =>
    shuffle(cards).map((name, index) => ({
      id: index,
      name,
      flipped: false,
      matched: false,
    }))
  );
  const [gameOver, setGameOver] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [flippedCards, setFlippedCards] = useState<FlippedCardProps[]>([]);

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
      setTimeout(() => check(updatedFlipped), 750);
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
            flipped: firstCard.name === secondCard.name,
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
  }, [cardList, elapsedTime, userChoice]);

  const getNumColumns = () => {
    if (cardCount >= 15) return 7; // 6 or 7 columns when userChoice is greater than 15
    if (cardCount>= 10) return 5; // 5 columns when userChoice is greater than 10
    return 4; // default 4 columns
  };

  return (
    <FullSafeAreaScreen className="flex-col-5">
      <View className="flex flex-row justify-between items-center">
        <BackButton className="w-max" />
        <ThemedText className="font-rubik-semibold">{levelName}</ThemedText>
        <View />
      </View>
      <View>
        <FlatList
          data={cardList}
          numColumns={getNumColumns()} 
          keyExtractor={(card) => card.id.toString()}
          renderItem={({ item }) => (
            <GameCard
              id={item.id}
              name={item.name}
              flipped={item.flipped}
              matched={item.matched}
              preFlip={preFlip}
              clicked={flippedCards.length === 2 ? () => {} : handleClick}
            />
          )}
        />
      </View>
    </FullSafeAreaScreen>
  );
};

export default Level;
