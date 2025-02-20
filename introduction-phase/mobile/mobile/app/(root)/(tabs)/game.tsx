import React, { useState } from "react";
import icons from "@/constants/icons";
import FullSafeAreaScreen from "@/components/FullSafeAreaScreen";

import {
  ThemedIcon,
  ThemedInput,
  ThemedText,
  ThemedView,
} from "@/components/ui/themed-components";
import { Link, useRouter } from "expo-router";
import { useGlobalContext } from "@/libs/global-provider";
import { Image, TouchableOpacity, View, Text, ScrollView } from "react-native";

import { gameSettingsCards } from "@/constants/data";
import { GameSettingsProps } from "@/types/Types";

const GameSettingsCard = ({
  color,
  description,
  levelName,
  numOfCards,
}: GameSettingsProps) => {
  return (
    <View>
      <ThemedView className="flex-between-res gap-3 p-3 rounded-lg group">
        <View className="flex flex-row gap-3 w-full ">
          <View
            style={{ backgroundColor: color }}
            className="w-[10px] h-[70px] rounded-lg"
          />
          <View className="flex-col-1">
            <ThemedText className="text-lg font-rubik-bold">
              {levelName}
            </ThemedText>
            <Text className="text-stone-400 max-w-[250px]">{description}</Text>
            <Text className="text-stone-400">
              Number of cards:{" "}
              <Text className="font-rubik-bold">{numOfCards}</Text>
            </Text>
          </View>
        </View>
        <Link href={`/game?cardId=${numOfCards}`}>
          <TouchableOpacity className="py-1 flex-center rounded-full w-[100px] bg-rose-500 hover:bg-rose-600 border-none">
            <Image tintColor={"white"} className="size-6" source={icons.play} />
          </TouchableOpacity>
        </Link>
      </ThemedView>
    </View>
  );
};

const Game = () => {
  const { user } = useGlobalContext();
  const router = useRouter();

  const [cards, setCards] = useState<GameSettingsProps[]>(gameSettingsCards);

  return (
    <FullSafeAreaScreen className="flex-col-5">
      <View className="flex flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-2 rounded-full bg-rose-300"
        >
          <Image className="size-7" source={icons.chevronLeft} />
        </TouchableOpacity>
        <ThemedText className="font-rubik-semibold">
          Choose Your Challenge
        </ThemedText>
        <ThemedIcon icon={icons.bell} />
      </View>
      <ThemedText className="font-rubik-bold text-2xl">Game Settings</ThemedText>
      <View className="relative">
        <ThemedInput
          className="h-[52px] px-10 rounded-md text-[##8C8E98] border font-rubik-medium border-[#ff00400a]"
          placeholder="Search level"
        />
        <Image
          className="absolute size-5 top-[32%] left-3"
          tintColor={"#a8a29e"}
          source={icons.search}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-64 flex-col-3"
      >
        {cards.map((card: GameSettingsProps, idx) => (
          <GameSettingsCard {...card} key={idx} />
        ))}
      </ScrollView>
    </FullSafeAreaScreen>
  );
};

export default Game;
