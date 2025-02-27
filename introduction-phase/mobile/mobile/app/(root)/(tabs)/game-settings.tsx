import React, { useEffect, useState } from "react";
import icons from "@/constants/icons";
import FullSafeAreaScreen from "@/components/FullSafeAreaScreen";

import {
  ThemedIcon,
  ThemedInput,
  ThemedText,
} from "@/components/ui/themed-components";
import {
  Image,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { GameSettingsProps } from "@/types/Types";
import BackButton from "@/components/ui/goBackButton";
import GameSettingsCard from "@/components/cards/GameSettingCard";
import { useAppwrite } from "@/hooks/useAppwrite";
import { getAllLevel } from "@/libs/appwrite";

const GameSettings = () => {
  const { data, loading, error } = useAppwrite({ fn: getAllLevel });

  const [cards, setCards] = useState<GameSettingsProps[]>([]);
  const [searchedText, setSearchedText] = useState("");
  const [filteredItems, setFilteredItems] = useState(cards);


  useEffect(() => {
    if (data?.documents) {
      const mappedCards: GameSettingsProps[] = data.documents.map((doc) => ({
        id: doc.$id,
        name: doc.name,
        difficulty: doc.difficulty,
        numOfCards: doc.numOfCards,
        description: doc.description,
        bestPlayerId: doc.bestPlayerId,
      }));
      setCards(mappedCards);
    }
  }, [data]);

  useEffect(() => {
    if (cards.length > 0) {
      const filtered = cards.filter((c) =>
        c.name.toLowerCase().includes(searchedText.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [cards, searchedText]);

  const handleSearch = (text: string) => {
    setSearchedText(text);
  };

  return (
    <FullSafeAreaScreen className="flex-col-5">
      <View className="flex flex-row items-center justify-between">
        <BackButton path={"/home"} />
        <ThemedText className="font-rubik-semibold">
          Choose Your Challenge
        </ThemedText>
        <ThemedIcon icon={icons.bell} />
      </View>
      <ThemedText className="font-rubik-bold text-2xl">
        Game Settings
      </ThemedText>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
      </TouchableWithoutFeedback>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-64 flex-col-3"
      >
        {loading ? (
          <ThemedText className="text-lg font-rubik-bold">
            Loading...
          </ThemedText>
        ) : filteredItems?.length === 0 ? (
          <ThemedText className="text-lg font-rubik-bold">
            No matches found
          </ThemedText>
        ) : (
          filteredItems?.map((card: GameSettingsProps, idx) => (
            <GameSettingsCard {...card} key={idx} />
          ))
        )}
      </ScrollView>
    </FullSafeAreaScreen>
  );
};

export default GameSettings;
