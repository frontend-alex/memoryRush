import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useIsFocused } from "@react-navigation/native";
import { Room } from "@/types/Types";
import { useGlobalContext } from "@/libs/global-provider";
import { createGameRoom } from "./api";

const useMultiplayerSocket = () => {
  const isFocused = useIsFocused();
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!isFocused) return;

    // Initialize the socket connection
    const newSocket = io("http://192.168.2.9:3000");
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
    if (socket) {

      const { user } = useGlobalContext();

      const response = await createGameRoom(user?.$id, userChoice, maxPlayers);
      console.log(response)
      socket.emit("roomCreated");
      
    } else {
      console.error("Socket is not connected");
    }
  };

  return { availableRooms, createGame };
};

export default useMultiplayerSocket;