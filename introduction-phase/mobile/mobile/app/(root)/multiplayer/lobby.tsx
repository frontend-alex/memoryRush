import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { io, Socket } from "socket.io-client";
import { URL } from "@/constants/data";
import FullSafeAreaScreen from "@/components/FullSafeAreaScreen";
import { useGlobalContext } from "@/libs/global-provider";

const Lobby = () => {
  const router = useRouter();
  const { user } = useGlobalContext();
  const { roomId } = useLocalSearchParams();

  const [players, setPlayers] = useState<string[]>([]);
  const [ownerId, setOwnerId] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);


  useEffect(() => {
    const newSocket = io(URL);
    setSocket(newSocket);

    const handlePlayerJoined = (updatedPlayers: string[]) => {
      console.log("Players in room:", updatedPlayers);
      setPlayers(updatedPlayers);
    };

    const handlePlayerKicked = ({ playerId }: { playerId: string }) => {
      console.log(`Player ${playerId} kicked`);
      setPlayers((prev) => prev.filter((id) => id !== playerId));
    };

    const handleRoomInfo = ({
      ownerId,
      players,
    }: {
      ownerId: string;
      players: string[];
    }) => {
      setOwnerId(ownerId); 
      setPlayers(players); 
    };

    newSocket.on("connect", () => {
      console.log("Connected to server");
      newSocket.emit("joinRoom", roomId);
    });

    newSocket.on("playerJoined", handlePlayerJoined);
    newSocket.on("playerKicked", handlePlayerKicked);
    newSocket.on("roomInfo", handleRoomInfo);

    newSocket.on("gameStarted", () => {
      router.push({
        pathname: "/(root)/multiplayer/multiplayer-game",
        params: { roomId },
      });
    });

    newSocket.on("roomDeleted", ({ roomId: deletedRoomId }) => {
      console.log("Received roomDeleted event for room:", deletedRoomId); 
      if (deletedRoomId === roomId) {
        Alert.alert("Room Deleted", "The room has been deleted.");
        router.push("/");
      }
    });

    return () => {
      console.log("Disconnecting socket");
      newSocket.disconnect();
    };
  }, [roomId]);

  const handleKickPlayer = (playerId: string) => {
    if (socket) {
      socket.emit("kickPlayer", { roomId, playerId });
      Alert.alert(
        "Player Kicked",
        `Player ${playerId} has been kicked from the room.`
      );
    }
  };

  const handleStartGame = () => {
    if (socket) {
      socket.emit("startGame", roomId);
    }
  };

  const handleDeleteRoom = () => {
    if (socket) {
      Alert.alert("Delete Room", "Are you sure you want to delete this room?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => {
            socket.emit("deleteRoom", roomId);
            router.push('/(root)/(tabs)/multiplayer')
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
            socket.emit("leaveRoom", roomId, user?.$id);
            router.push("/(root)/(tabs)/multiplayer");
          },
        },
      ]);
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
            <Button title="Start Game" onPress={handleStartGame} />
            <Button
              title="Delete Room"
              onPress={handleDeleteRoom}
              color="red"
            />
          </>
        ) : <Button title="Leave Room" onPress={handleLeaveRoom} color="gray" />}
      </View>
    </FullSafeAreaScreen>
  );
};

export default Lobby;
