import { Room } from "@/types/Types";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/libs/global-provider";
import { useIsFocused } from "@react-navigation/native";
import useApi from "./useFetch";
import { URL } from "@/constants/data";

const useMultiplayerSocket = () => {
  const router = useRouter();

  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [hasCreatedRoom, setHasCreatedRoom] = useState(false);

  const { post, get } = useApi(URL);
  const { user, socket } = useGlobalContext();

  useEffect(() => {
    if (!socket) return;

    socket.on("availableRooms", (rooms: Room[]) => {
      setAvailableRooms(rooms);
    });

    const fetchRoom = async () => {
      const response = await get('/api/rooms');
      setAvailableRooms(response)
    }

    fetchRoom();

    socket.on("roomCreated", (newRoom: Room) => {
      setAvailableRooms((prev) => {
        const updatedRooms = [newRoom, ...prev];
        console.log("Updated rooms after creation:", updatedRooms);
        return updatedRooms;
      });
    });

    return () => {
      socket.off("availableRooms");
      socket.off("roomCreated");
    };
  }, [socket]);

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

  const joinRoom = (roomId: string) => {
    if (socket) {
      socket.emit("joinRoom", roomId, user?.$id);
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