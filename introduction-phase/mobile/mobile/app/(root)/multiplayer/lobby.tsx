import icons from "@/constants/icons";
import SplashScreen from "@/components/SplashScreen";
import BackButton from "@/components/ui/goBackButton";
import Clipboard from "@react-native-clipboard/clipboard";
import FullSafeAreaScreen from "@/components/FullSafeAreaScreen";

import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/libs/global-provider";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ThemedIcon, ThemedText } from "@/components/ui/themed-components";
import {
  View,
  Text,
  Alert,
  Image,
  Pressable,
  TouchableOpacity,
  Button,
} from "react-native";
import Toast from "@/components/ui/toast";
import { FlatList } from "react-native-gesture-handler";
import { useAppwrite } from "@/hooks/useAppwrite";
import { getUsersByIds } from "@/libs/appwrite";
import LobbyUserCard from "@/components/cards/LobbyUserCard";

const Lobby = () => {
  const router = useRouter();

  const { roomId } = useLocalSearchParams();
  const { socket, user } = useGlobalContext();

  const roomIdString = Array.isArray(roomId) ? roomId[0] : roomId;

  const [players, setPlayers] = useState<string[]>([]);
  const [ownerId, setOwnerId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toggleToast, setToggleToast] = useState(false);

  useEffect(() => {
    if (socket && roomIdString) {
      socket.emit("joinRoom", roomIdString, user?.$id);

      const handleRoomInfo = ({
        ownerId,
        players,
      }: {
        ownerId: string;
        players: string[];
      }) => {
        setOwnerId(ownerId);
        setPlayers(players);
        setIsLoading(false);
      };

      const handlePlayerJoined = (updatedPlayers: string[]) => {
        setPlayers(updatedPlayers);
      };

      const handlePlayerKicked = (kickedPlayerId: string) => {
        setPlayers((prevPlayers) =>
          prevPlayers.filter((id) => id !== kickedPlayerId)
        );
        if (kickedPlayerId === user?.$id) {
          Alert.alert("You have been kicked from the room.");
          router.push("/(root)/(tabs)/multiplayer");
        }
      };

      const handleRoomDeleted = ({
        roomId: deletedRoomId,
      }: {
        roomId: string;
      }) => {
        if (deletedRoomId === roomIdString) {
          Alert.alert("Room Deleted", "The room has been deleted.");
          router.push("/(root)/(tabs)/multiplayer");
        }
      };

      socket.on("roomInfo", handleRoomInfo);
      socket.on("playerJoined", handlePlayerJoined);
      socket.on("playerKicked", handlePlayerKicked);
      socket.on("roomDeleted", handleRoomDeleted);

      return () => {
        socket.off("roomInfo", handleRoomInfo);
        socket.off("playerJoined", handlePlayerJoined);
        socket.off("playerKicked", handlePlayerKicked);
        socket.off("roomDeleted", handleRoomDeleted);
      };
    }
  }, [socket, roomIdString, user?.$id]);

  const handleKickPlayer = (playerId: string) => {
    if (socket) {
      socket.emit("kickPlayer", { roomId: roomIdString, playerId });
    }
  };

  const handleDeleteRoom = () => {
    if (socket) {
      Alert.alert("Delete Room", "Are you sure you want to delete the room?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => {
            socket.emit("deleteRoom", roomIdString);
            router.push("/(root)/(tabs)/multiplayer");
          },
        },
      ]);
    }
  };

  const handleLeaveRoom = () => {
    if (socket) {
      Alert.alert("Leave Room", "Are you sure you want to leave the room?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Leave",
          onPress: () => {
            socket.emit("leaveRoom", roomIdString, user?.$id);
            router.push("/(root)/(tabs)/multiplayer");
          },
        },
      ]);
    }
  };

  if (isLoading) return <SplashScreen />;

  const isOwner = ownerId === user?.$id;

  return (
    <FullSafeAreaScreen className="flex-col-10">
      <View className="flex flex-row items-center justify-between">
        <BackButton path={"/multiplayer"} />
        <ThemedText className="font-rubik-bold text-xl">Game Lobby</ThemedText>
        <Pressable onPress={handleLeaveRoom}>
          <Image source={icons.logout} />
        </Pressable>
      </View>
      <View>
        <View className="flex flex-row gap-1 items-center">
          <ThemedIcon icon={icons.hashtag} />
          <TouchableOpacity
            className="flex flex-row gap-1"
            onPress={() => setToggleToast(true)}
          >
            <Text className="uppercase text-2xl font-rubik-bold text-stone-400">
              {roomIdString.split("_")[1]}
            </Text>
            <Image
              className="size-3"
              tintColor={"#a8a29e"}
              source={icons.copy}
            />
          </TouchableOpacity>
        </View>
        <View className="flex flex-row gap-1 items-center">
          <ThemedIcon icon={icons.user} />
          <Text className="uppercase text-2xl font-rubik-bold text-stone-400">
            {players.length} / 3
          </Text>
        </View>
      </View>

      {toggleToast && (
        <Toast
          message="RoomID successfully coppied"
          variant="success"
          setToast={setToggleToast}
        />
      )}

      <View>
        <FlatList
          data={players}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <LobbyUserCard
              isOwner={isOwner}
              playerId={item}
              handleKickPlayer={handleKickPlayer}
            />
          )}
        />
        {isOwner && (
          <View className="flex flex-row gap-3 mt-5">
            <TouchableOpacity
              className="py-4 w-1/2 flex-center bg-danger/60 px-4 rounded-lg"
              onPress={handleDeleteRoom}
            >
              <Text className="text-red-600">Delete Room</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={players.length === 1}
              className="py-4 disabled:bg-stone-500/10 bg-sky-500/60 px-4 flex-center rounded-lg w-1/2"
              onPress={() => socket?.emit("startGame", roomIdString, user?.$id)}
            >
              <Text className="text-sky-500 disabled:text-stone-300" disabled={players.length === 1}>Start Game</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </FullSafeAreaScreen>
  );
};

export default Lobby;
