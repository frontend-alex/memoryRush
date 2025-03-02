import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useGlobalContext } from "@/libs/global-provider";
import FullSafeAreaScreen from "@/components/FullSafeAreaScreen";

const Lobby = () => {
  const router = useRouter();
  const { roomId } = useLocalSearchParams();
  const [players, setPlayers] = useState<string[]>([]);
  const [ownerId, setOwnerId] = useState<string | null>(null);
  const { socket, user } = useGlobalContext();

  useEffect(() => {
    if (socket) {
      const handleRoomInfo = ({
        ownerId,
        players,
      }: {
        ownerId: string;
        players: string[];
      }) => {
        console.log(
          "Received roomInfo event with ownerId:",
          ownerId,
          "and players:",
          players
        );
        setOwnerId(ownerId);
        setPlayers(players);
      };

      const handlePlayerJoined = (updatedPlayers: string[]) => {
        console.log(
          "Received playerJoined event with players:",
          updatedPlayers
        );
        setPlayers(updatedPlayers);
      };

      socket.on("roomInfo", handleRoomInfo);
      socket.on("playerJoined", handlePlayerJoined);
      socket.on("gameStarted", () => {
        router.push({
          pathname: "/(root)/multiplayer/multiplayer-game",
          params: { roomId },
        });
      });
      socket.on("roomDeleted", ({ roomId: deletedRoomId }) => {
        if (deletedRoomId === roomId) {
          Alert.alert("Room Deleted", "The room has been deleted.");
          router.push("/");
        }
      });

      socket.emit("joinRoom", roomId, user?.$id);

      return () => {
        socket.off("roomInfo", handleRoomInfo);
        socket.off("playerJoined", handlePlayerJoined);
        socket.off("gameStarted");
        socket.off("roomDeleted");
      };
    }
  }, [socket, roomId, user?.$id]);

  const handleLeaveRoom = () => {
    if (socket) {
      Alert.alert("Leave Room", "Are you sure you want to leave the room?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Leave",
          onPress: () => {
            socket.emit("leaveRoom", roomId, user?.$id);
            router.push("/(root)/(tabs)/multiplayer");
          },
        },
      ]);
    }
  };

  const handleKickPlayer = (playerId: string) => {
    if (socket) {
      socket.emit("kickPlayer", { roomId, playerId });
      Alert.alert(
        "Player Kicked",
        `Player ${playerId} has been kicked from the room.`
      );
    }
  };

  const isOwner = ownerId === user?.$id;

  return (
    <FullSafeAreaScreen>
      <View>
        <Text>Lobby for Room: {roomId}</Text>
        <Text>Room Owner: {ownerId}</Text>
        <FlatList
          data={players}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View>
              <Text>Player: {item}</Text>
              {isOwner && (
                <Button title="Kick" onPress={() => handleKickPlayer(item)} />
              )}
            </View>
          )}
        />
        {isOwner ? (
          <>
            <Button
              title="Start Game"
              onPress={() => socket?.emit("startGame", roomId, user?.$id)}
            />
            <Button
              title="Delete Room"
              onPress={() => socket?.emit("deleteRoom", roomId)}
              color="red"
            />
          </>
        ) : (
          <Button title="Leave Room" onPress={handleLeaveRoom} color="gray" />
        )}
      </View>
    </FullSafeAreaScreen>
  );
};

export default Lobby;
