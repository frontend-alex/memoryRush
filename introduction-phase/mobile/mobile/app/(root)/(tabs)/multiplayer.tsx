import React, { useRef, useState } from "react";
import icons from "@/constants/icons";
import BackButton from "@/components/ui/goBackButton";
import FullSafeAreaScreen from "@/components/FullSafeAreaScreen";
import useMultiplayerSocket from "@/hooks/useMultiplayer";

import { useGlobalContext } from "@/libs/global-provider";
import { createGameButtons, createGameCardsButtons } from "@/constants/data";
import BottomSheet, { BottomSheetRefProps } from "@/components/BottomSheet";
import {
  ThemedIcon,
  ThemedInput,
  ThemedText,
  ThemedView,
} from "@/components/ui/themed-components";
import {
  View,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import RoomCard from "@/components/cards/RoomCard";

const Multiplayer = () => {
  const { user } = useGlobalContext();
  const { availableRooms, isLoading } = useMultiplayerSocket();

  const { height: SCREEN_HEIGHT } = Dimensions.get("window");

  const bottomSheetRef = useRef<BottomSheetRefProps | null>(null);

  const openBottomSheet = () => {
    bottomSheetRef.current?.scrollTo(-SCREEN_HEIGHT * 0.4);
  };

  return (
    <FullSafeAreaScreen className="flex-col-5">
      <BottomSheet ref={bottomSheetRef}>
        <BottomSheetContent />
      </BottomSheet>

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
            onPress={openBottomSheet}
            className="absolute top-[28%] right-3"
          >
            <ThemedIcon className="size-7" icon={icons.plus} />
          </Pressable>
        </View>
      </TouchableWithoutFeedback>

      {isLoading ? (
        <Text className="text-lg font-rubik-bold">Loading...</Text>
      ) : (
        <FlatList
          data={availableRooms}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <RoomCard {...item} />}
        />
      )}
    </FullSafeAreaScreen>
  );
};

const BottomSheetContent = () => {
  const [userChoice, setUserChoice] = useState<number>(15);
  const [maxPlayers, setMaxPlayers] = useState<number>(2);

  const { createGame } = useMultiplayerSocket();

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="p-5 flex flex-col gap-7">
        <ThemedText className="text-xl font-rubik-bold">
          Create a Room
        </ThemedText>

        {/* Player Count Input */}
        <View className="flex-col-3">
          <ThemedText>Player Count</ThemedText>
          <View className="flex flex-row gap-3">
            {createGameButtons.map((button, idx) => (
              <TouchableOpacity
                onPress={() => setMaxPlayers(button.name)}
                key={idx}
                className={`py-2 px-4 rounded-lg border ${
                  idx + 2 === maxPlayers
                    ? "bg-rose-500 border-rose-500 text-white"
                    : "border border-neutral-100 bg-neutral-50"
                }`}
              >
                <Text
                  className={
                    idx + 2 === maxPlayers ? "text-white" : "text-black"
                  }
                >
                  {button.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Cards Count Input */}
        <View className="flex-col-3">
          <ThemedText>Cards Count</ThemedText>
          <View className="flex flex-row gap-3">
            {createGameCardsButtons.map((button, idx) => (
              <TouchableOpacity
                onPress={() => setUserChoice(button.name)}
                key={idx}
                className={`py-2 px-4 rounded-lg border ${
                  button.name === userChoice
                    ? "bg-rose-500 border-rose-500 text-white"
                    : "border border-neutral-100 bg-neutral-50"
                }`}
              >
                <Text
                  className={
                    button.name === userChoice ? "text-white" : "text-black"
                  }
                >
                  {button.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Create Game Button */}
        <TouchableOpacity
          onPress={() => createGame(userChoice, maxPlayers)}
          className="bg-rose-500 py-4 rounded-lg text-center flex-center"
        >
          <Text className="text-white font-rubik-bold">Create Game</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Multiplayer;
