import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, Alert, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useGlobalContext } from "@/libs/global-provider";
import FullSafeAreaScreen from "@/components/FullSafeAreaScreen";
import SplashScreen from "@/components/SplashScreen";

const Lobby = () => {
  const router = useRouter();
  const { roomId } = useLocalSearchParams();
  const roomIdString = Array.isArray(roomId) ? roomId[0] : roomId; // Handle array case
  const { socket, user } = useGlobalContext();

  const [players, setPlayers] = useState<string[]>([]);
  const [ownerId, setOwnerId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (socket && roomIdString) {
      console.log("Socket is connected and roomId is available:", roomIdString); // Debugging

      // Join the room
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
        setPlayers((prevPlayers) => prevPlayers.filter((id) => id !== kickedPlayerId));
        if (kickedPlayerId === user?.$id) {
          Alert.alert("You have been kicked from the room.");
          router.push("/(root)/(tabs)/multiplayer");
        }
      };

      const handleRoomDeleted = ({ roomId: deletedRoomId }: { roomId: string }) => {
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
    <FullSafeAreaScreen>
      <View>
        <Text>Lobby for Room: {roomIdString}</Text>
        <Text>Room Owner: {ownerId}</Text>
        <FlatList
          data={players}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View>
              <Text>Player: {item}</Text>
              {isOwner && item !== user?.$id && ( // Don't allow kicking yourself
                <Button title="Kick" onPress={() => handleKickPlayer(item)} />
              )}
            </View>
          )}
        />
        {isOwner ? (
          <>
            <Button
              title="Start Game"
              onPress={() => socket?.emit("startGame", roomIdString, user?.$id)}
            />
            <Button
              title="Delete Room"
              onPress={handleDeleteRoom}
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