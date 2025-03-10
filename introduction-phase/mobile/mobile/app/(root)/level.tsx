import useGame from "@/hooks/useGame";
import GameCard from "@/components/cards/GameCard";
import BackButton from "@/components/ui/goBackButton";
import FullSafeAreaScreen from "@/components/FullSafeAreaScreen";

import {  FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { shortEnglishHumanizer } from "@/libs/utils";
import { ThemedText } from "@/components/ui/themed-components";

import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const Level = () => {
  const { userChoice, levelName, levelId } = useLocalSearchParams();

  const cardCount = Number(userChoice);

  const { state, handleClick } = useGame(cardCount, levelId, levelName);

  const getNumColumns = () => (cardCount >= 10 ? 5 : 4);

  return (
    <FullSafeAreaScreen className="flex-col-5">
      {/* Fullscreen Countdown */}
      {state.countdown > 0 ? (
        <Animated.View 
          entering={FadeIn.duration(500)} 
          exiting={FadeOut.duration(500)}
          className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center"
        >
          <ThemedText className="font-rubik-bold text-8xl">
            {state.countdown}
          </ThemedText>
        </Animated.View>
      ) : (
        <>
          <Animated.View className="flex flex-row items-center justify-between">
            <BackButton
              unsavedChanges={true}
              className="w-max"
              path={"/story-mode"}
            />
            <ThemedText className="font-rubik-semibold text-center">
              {levelName}
            </ThemedText>
            <ThemedText className="font-rubik-semibold w-max">
              {shortEnglishHumanizer(state.elapsedTime)}
            </ThemedText>
          </Animated.View>

          <Animated.View className="h-[80%]">
            <FlatList
              data={state.cardList}
              numColumns={getNumColumns()}
              keyExtractor={(card) => card.id.toString()}
              renderItem={({ item }) => (
                <GameCard
                  id={item.id}
                  cardCount={cardCount}
                  name={item.name}
                  flipped={item.flipped}
                  matched={item.matched}
                  preFlip={state.preFlip}
                  clicked={
                    state.flippedCards.length === 2
                      ? () => {}
                      : () => handleClick(item.name, item.id)
                  }
                />
              )}
            />
          </Animated.View>
        </>
      )}
    </FullSafeAreaScreen>
  );
};

export default Level;
