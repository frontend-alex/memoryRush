import useApi from "./useFetch";

import { Room } from "@/types/Types";
import { URL } from "@/constants/data";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useGlobalContext } from "@/libs/global-provider";
import { useIsFocused } from "@react-navigation/native";

const useMultiplayerSocket = () => {
  const router = useRouter();
  const isFocused = useIsFocused();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [hasCreatedRoom, setHasCreatedRoom] = useState(false);
  const { user } = useGlobalContext();
  const { isLoading, post } = useApi(URL);

  useEffect(() => {
    if (!isFocused) return;

    const newSocket = io(URL);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      newSocket.emit("getAvailableRooms");
    });

    newSocket.on("availableRooms", (rooms: Room[]) => {
      setAvailableRooms(rooms);
    });

    newSocket.on("roomCreated", (newRoom: Room) => {
      setAvailableRooms((prev) => {
        const updatedRooms = [newRoom, ...prev];
        console.log("Updated rooms after creation:", updatedRooms);
        return updatedRooms;
      });
    });

    newSocket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    return () => {
      newSocket.disconnect();
      setSocket(null);
    };
  }, [isFocused]);

  const createGame = async (userChoice: number, maxPlayers: number) => {
    if (hasCreatedRoom) {
      console.error("You have already created a room.");
      return;
    }

    if (socket) {
      try {
        const response = await post("/api/rooms", {
          playerId: user?.$id,
          userChoice,
          maxPlayers,
        });
        console.log(response);

        setHasCreatedRoom(true);
        socket.emit("roomCreated");

        router.push({
          pathname: "/(root)/multiplayer/lobby",
          params: { roomId: response.roomId },
        });
      } catch (err) {
        console.error("Error in post request:", err);
      }
    } else {
      console.error("Socket is not connected");
    }
  };

  const joinRoom = (roomId: string, playerId: string | undefined) => {
    if (socket) {
      socket.emit("joinRoom", roomId, playerId);
      router.push({
        pathname: "/(root)/multiplayer/lobby",
        params: { roomId },
      });
    } else {
      console.error("Socket is not connected");
    }
  };

  return { availableRooms, createGame, hasCreatedRoom, joinRoom };
};

export default useMultiplayerSocket;
