import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { useGlobalContext } from "@/libs/global-provider";
import { Room } from "@/types/Types";

const useMultiplayerSocket = () => {
  const router = useRouter();
  const { socket, user } = useGlobalContext();
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [hasCreatedRoom, setHasCreatedRoom] = useState(false);

  useEffect(() => {
    if (!socket) return;

    socket.on("availableRooms", (rooms) => {
      setAvailableRooms(rooms);
    });

    socket.on("roomCreated", (newRoom) => {
      setAvailableRooms((prevRooms) => [newRoom, ...prevRooms]);
    });

    return () => {
      socket.off("availableRooms");
      socket.off("roomCreated");
    };
  }, [socket]);

  const createGame = (userChoice: number, maxPlayers: number) => {
    if (socket && user) {
      const roomData = { playerId: user?.$id, userChoice, maxPlayers };
  
      socket.emit("createRoom", roomData);
  
      socket.on("roomCreated", ({ roomId }: { roomId: string }) => {
        console.log("Received roomCreated event with roomId:", roomId);
  
        router.push({
          pathname: "/(root)/multiplayer/lobby",
          params: { roomId },
        });
      });
  
      setHasCreatedRoom(true);
    } else {
      console.error("Socket not connected or user is undefined");
    }
  };

  const joinRoom = (roomId: string) => {
    if (socket) {
      socket.emit("joinRoom", roomId, user?.$id);
      router.push({ pathname: "/(root)/multiplayer/lobby", params: { roomId } });
    } else {
      console.error("Socket not connected");
    }
  };

  return { availableRooms, createGame, hasCreatedRoom, joinRoom };
};

export default useMultiplayerSocket;
