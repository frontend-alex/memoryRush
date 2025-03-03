import React from "react";
import icons from "@/constants/icons";
import useMultiplayerSocket from "@/hooks/useMultiplayer";

import { Room } from "@/types/Types";
import { getUserById } from "@/libs/appwrite";
import { useAppwrite } from "@/hooks/useAppwrite";
import { getDifficulty, getDifficultyColor } from "@/libs/utils";
import { Alert, Image, Pressable, Text, View } from "react-native";
import { ThemedIcon, ThemedText, ThemedView } from "../ui/themed-components";

const RoomCard = ({
  id,
  cards,
  players,
  ownerId,
  maxPlayers,
}: Room) => {

  const { joinRoom } = useMultiplayerSocket();

  const { data, loading } = useAppwrite({
    fn: getUserById,
    params: {
      id: ownerId,
    },
  });

  const handlePress = () => {
    Alert.alert(`Joining ${id}...`, "Are you sure?", [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => joinRoom(id),
        style: "default",
      },
    ]);
  };

  return (
    <Pressable className="mt-2" onPress={handlePress}>
      <ThemedView className="p-5 flex-col-1 relative overflow-hidden">
        <ThemedText className="font-rubik-semibold">
          {data?.name}'s room
        </ThemedText>
        <ThemedText className="uppercase text-xl font-rubik-bold text-stone-400">
          #{id.split("_")[1]}
        </ThemedText>
        <View className="flex flex-row gap-1">
          <ThemedIcon
            className={players.length === maxPlayers ? "opacity-35" : ""}
            tintColor={players.length === maxPlayers ? "#a8a29e" : ""}
            icon={icons.user}
          />
          <ThemedText
            className={`${
              players.length === maxPlayers ? "text-stone-400 opacity-35" : ""
            } font-rubik-semibold`}
          >
            {players.length} / {maxPlayers}
          </ThemedText>
          {players?.length === maxPlayers && (
            <Text className="text-stone-400 text-sm font-rubik-semibold opacity-35">
              Full
            </Text>
          )}
        </View>
        <View className="flex flex-row gap-1 w-full">
          <ThemedIcon icon={icons.swrod} />
          <View
            className="w-5 h-5 rounded-full"
            style={{
              backgroundColor: getDifficultyColor(getDifficulty(cards.length)),
            }}
          />
          <ThemedText className="capitalize w-full font-rubik-semibold">
            {getDifficulty(cards.length)} ({cards.length})
          </ThemedText>
        </View>
        <Image
          source={{ uri: data?.avatar }}
          className="size-64 absolute opacity-20 rounded-full -right-20 -top-20"
        />
      </ThemedView>
    </Pressable>
  );
};

export default RoomCard;
