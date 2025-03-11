import React from "react";
import { ThemedText, ThemedView } from "../ui/themed-components";
import { useGlobalContext } from "@/libs/global-provider";
import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import { useAppwrite } from "@/hooks/useAppwrite";
import { getUserById } from "@/libs/appwrite";
import icons from "@/constants/icons";

interface LobbyUserCardProps {
  isOwner: boolean;
  playerId: string;
  ownerId : string | null
  handleKickPlayer: (arg0: string) => void;
}

const LobbyUserCard = ({
  isOwner,
  playerId,
  ownerId,
  handleKickPlayer,
}: LobbyUserCardProps) => {
  const { user } = useGlobalContext();
  const { data } = useAppwrite({
    fn: getUserById,
    params: { id: playerId },
  });

  return (
    <ThemedView className="p-4 mb-2 flex-between flex-row relative ">
      <View className="flex flex-row gap-3">
        <Image
          className="size-12 rounded-full"
          source={{ uri: data?.avatar }}
        />
        <View className="flex flex-col">
          <ThemedText className="font-rubik-bold text-lg">
            {data?.name}
          </ThemedText>
          <Text className="text-sm text-stone-400">{data?.email}</Text>
        </View>
      </View>
      {isOwner && playerId !== user?.$id && (
        <TouchableOpacity onPress={() => handleKickPlayer(playerId)}>
          <Image
            source={icons.plus}
            className="rotate-45"
            tintColor={"#dc2626"}
          />
        </TouchableOpacity>
      )}
      {ownerId === playerId && (
          <Image
            source={icons.crown}
            tintColor={"#f59e0b"}
          />
      )}
    </ThemedView>
  );
};

export default LobbyUserCard;
