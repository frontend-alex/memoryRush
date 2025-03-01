import React, { useState } from "react";
import icons from "@/constants/icons";
import BackButton from "@/components/ui/goBackButton";
import FullSafeAreaScreen from "@/components/FullSafeAreaScreen";

import {
  ThemedIcon,
  ThemedInput,
  ThemedText,
  ThemedTochableOpacity,
} from "@/components/ui/themed-components";
import {
  View,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
  Text,
  FlatList,
} from "react-native";
import useMultiplayerSocket from "@/hooks/useMultiplayer";

import { useGlobalContext } from "@/libs/global-provider";
import { useBottomSheet } from "@/contexts/BottomSheetContext";
import { createGameButtons, createGameCardsButtons } from "@/constants/data";

const Multiplayer = () => {
  const { user } = useGlobalContext();
  const { openBottomSheet } = useBottomSheet();

  const [userChoice, setUserChoice] = useState<number>(0);
  const [maxPlayers, setMaxPlayers] = useState<number>(0);

  const { availableRooms, createGame } = useMultiplayerSocket();

  const handleOpenSheet = () => {
    openBottomSheet(
      <BottomSheetContent
        userChoice={userChoice}
        setUserChoice={setUserChoice}
        maxPlayers={maxPlayers}
        setMaxPlayers={setMaxPlayers}
        createGame={createGame}
      />
    );
  };

  return (
    <FullSafeAreaScreen className="flex-col-5">
      <View className="flex flex-row items-center justify-between">
        <BackButton path={"/home"} />
        <Image
          className="size-11 rounded-full"
          source={{ uri: user?.avatar }}
        />
      </View>
      <ThemedText className="font-rubik-bold text-2xl">Multiplayer</ThemedText>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="relative">
          <ThemedInput
            className="h-[52px] px-10 rounded-md text-[#8C8E98] border font-rubik-medium"
            placeholder="Room ID"
          />
          <Image
            className="absolute size-5 top-[32%] left-3"
            tintColor={"#a8a29e"}
            source={icons.search}
          />
          <Pressable
            onPress={handleOpenSheet}
            className="absolute top-[28%] right-3"
          >
            <ThemedIcon className="size-7" icon={icons.plus} />
          </Pressable>
        </View>
      </TouchableWithoutFeedback>

      <FlatList
        data={availableRooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>Room ID: {item.id}</Text>
            <Text>
              Players: {item.players.length}/{item.maxPlayers}
            </Text>
          </View>
        )}
      />
    </FullSafeAreaScreen>
  );
};

// BottomSheetContent Component
const BottomSheetContent = ({
  userChoice,
  setUserChoice,
  maxPlayers,
  setMaxPlayers,
  createGame,
}: {
  userChoice: number;
  setUserChoice: (value: number) => void;
  maxPlayers: number;
  setMaxPlayers: (value: number) => void;
  createGame: (userChoice: number, maxPlayers: number) => void;
}) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="p-5 flex flex-col gap-7">
        <ThemedText className="text-xl font-rubik-bold">Create a room</ThemedText>

        {/* Player Count Input */}
        <View className="flex-col-3">
          <ThemedText>Player count</ThemedText>
          <View className="flex flex-row gap-3">
            {createGameButtons.map((button, idx) => {
              return (
                <ThemedTochableOpacity
                  onPress={() => setUserChoice(idx + 2)}
                  key={idx}
                  className={`${
                    idx + 2 == userChoice ? "bg-rose-500 border-rose-500" : ""
                  } py-2 px-4 rounded-lg border`}
                >
                  <ThemedText>{button.name}</ThemedText>
                </ThemedTochableOpacity>
              );
            })}
          </View>
        </View>

        {/* Cards Count Input */}
        <View className="flex-col-3">
          <ThemedText>Cards count</ThemedText>
          <View className="flex flex-row gap-3">
            {createGameCardsButtons.map((button, idx) => {
              return (
                <ThemedTochableOpacity
                  onPress={() => setMaxPlayers(idx + 2)}
                  key={idx}
                  className={`${
                    idx + 2 == maxPlayers ? "bg-rose-500 border-rose-500 hidden" : ""
                  } py-2 px-4 rounded-lg border`}
                >
                  <ThemedText>{button.name}</ThemedText>
                </ThemedTochableOpacity>
              );
            })}
          </View>
        </View>

        {/* Create Game Button */}
        <ThemedTochableOpacity
          onPress={() => {
            if (userChoice && maxPlayers) {
              createGame(userChoice, maxPlayers);
              console.log('activated')
            } else {
              console.log("Please enter valid numbers for both fields.");
            }
          }}
          className="button py-5"
        >
          <Text className="text-white font-rubik-bold py-1">Create Game</Text>
        </ThemedTochableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Multiplayer;