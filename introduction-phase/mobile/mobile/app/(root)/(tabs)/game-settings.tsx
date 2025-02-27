import React, { useState } from "react";
import icons from "@/constants/icons";
import FullSafeAreaScreen from "@/components/FullSafeAreaScreen";

import {
  ThemedIcon,
  ThemedInput,
  ThemedText,
  ThemedView,
} from "@/components/ui/themed-components";
import { router, useRouter } from "expo-router";
import { useGlobalContext } from "@/libs/global-provider";
import { useNavigation } from "@react-navigation/native";
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

import { gameSettingsCards } from "@/constants/data";
import { GameSettingsProps } from "@/types/Types";
import BackButton from "@/components/ui/goBackButton";

const GameSettingsCard = ({
  color,
  description,
  levelName,
  numOfCards,
  difficulty,
}: GameSettingsProps) => {

  //stomp client hooks / client 

  const navigation = useNavigation();

  const handlePress = () => {
    Alert.alert(`Difficulty ${difficulty}`, "Are you sure?", [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => router.push(`/level?userChoice=${numOfCards}&levelName=${levelName}`),
        style: "default",
      },
    ]);
  };

  return (
    <View>
      <ThemedView className="flex-between-res gap-3 p-3 rounded-lg group">
        <View className="flex flex-row gap-3 w-full ">
          <View
            style={{ backgroundColor: color }}
            className="w-[5px] h-[70px] rounded-lg"
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
        <TouchableOpacity
          onPress={handlePress}
          className="py-1 flex-center rounded-full w-[100px] bg-rose-500 hover:bg-rose-600 border-none"
        >
          <Image tintColor={"white"} className="size-6" source={icons.play} />
        </TouchableOpacity>
      </ThemedView>
    </View>
  );
};

const GameSettings = () => {
  const { user } = useGlobalContext();
  const router = useRouter();

  const [cards, setCards] = useState<GameSettingsProps[]>(gameSettingsCards);
  const [searchedText, setSearchedText] = useState("");
  const [filteredItems, setFilteredItems] = useState(cards);

  const handleSearch = (text: string) => {
    setSearchedText(text);

    const filtered = cards.filter((c) =>
      c.levelName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <FullSafeAreaScreen className="flex-col-5">
        <View className="flex flex-row items-center justify-between">
          <BackButton/>
          <ThemedText className="font-rubik-semibold">
            Choose Your Challenge
          </ThemedText>
          <ThemedIcon icon={icons.bell} />
        </View>
        <ThemedText className="font-rubik-bold text-2xl">
          Game Settings
        </ThemedText>
        <View className="relative">
          <ThemedInput
            className="h-[52px] px-10 rounded-md text-[#8C8E98] border font-rubik-medium"
            placeholder="Search level"
            value={searchedText}
            onChangeText={handleSearch}
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
          {filteredItems.length === 0 ? (
            <ThemedText className="text-lg font-rubik-bold">
              No matches found
            </ThemedText>
          ) : (
            filteredItems.map((card: GameSettingsProps, idx) => (
              <GameSettingsCard {...card} key={idx} />
            ))
          )}
        </ScrollView>
      </FullSafeAreaScreen>
    </TouchableWithoutFeedback>
  );
};

export default GameSettings;
