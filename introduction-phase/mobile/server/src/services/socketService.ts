import { Server, Socket } from "socket.io";
import {
  joinRoom,
  getAvailableRooms,
  getRoom,
  flipCard,
  endGame,
  deleteRoom,
  setSocketServer,
  createRoom,
} from "./gameService";

const userRooms: Record<string, string | null> = {};

export const socketService = (io: Server) => {
  setSocketServer(io);

  io.on("connection", (socket: Socket) => {
    console.log("a user connected");

    socket.on("getAvailableRooms", () => {
      const availableRooms = getAvailableRooms();
      socket.emit("availableRooms", availableRooms);
    });

    socket.on("createRoom", (roomData: { playerId: string, userChoice: number, maxPlayers: number }) => {
      const { playerId, userChoice, maxPlayers } = roomData;

      if (userRooms[playerId]) {
        socket.emit("error", { message: "You already have an active room. Please leave your current room before creating a new one." });
        return;
      }

      const roomId = createRoom(playerId, userChoice, maxPlayers);
      const room = getRoom(roomId);

      if (room) {
        userRooms[playerId] = roomId;

        socket.join(roomId);
        console.log(`Room created with ID: ${roomId}`);
        console.log(`Emitting roomCreated to client`);

        socket.emit("roomCreated", { roomId, playerId });

        const availableRooms = getAvailableRooms();
        io.emit("availableRooms", availableRooms);

        io.to(roomId).emit("roomInfo", {
          ownerId: room.ownerId,
          players: room.players,
        });

        io.to(roomId).emit("playerJoined", [playerId]);
      } else {
        socket.emit("error", { message: "Error creating room" });
      }
    });

    socket.on("joinRoom", (roomId, playerId) => {
      const room = getRoom(roomId);
      if (room) {
        if (!room.players.includes(playerId)) {
          room.players.push(playerId);
          io.to(roomId).emit("playerJoined", room.players);
          socket.emit("roomInfo", {
            ownerId: room.ownerId,
            players: room.players,
          });
        }
      } else {
        socket.emit("roomNotFound", { roomId });
      }
    });

    socket.on("leaveRoom", (roomId, playerId) => {
      const room = getRoom(roomId);
      if (room) {
        room.players = room.players.filter((id) => id !== playerId);
        io.to(roomId).emit("playerLeft", { playerId });

        if (room.players.length === 0) {
          deleteRoom(roomId);
        }

        userRooms[playerId] = null;

        const availableRooms = getAvailableRooms();
        io.emit("availableRooms", availableRooms);
      }
    });

    socket.on("deleteRoom", (roomId) => {
      const room = getRoom(roomId);
      if (room) {
        room.players.forEach((playerId) => {
          userRooms[playerId] = null;
        });
      }

      io.to(roomId).emit("roomDeleted", { roomId });
      deleteRoom(roomId); 
    });

    socket.on(
      "kickPlayer",
      ({ roomId, playerId }: { roomId: string; playerId: string }) => {
        const room = getRoom(roomId);
        if (room) {
          room.players = room.players.filter((id) => id !== playerId);
          
          socket.emit("roomInfo", {
            ownerId: room.ownerId,
            players: room.players,
          });

          io.to(roomId).emit("playerJoined", room.players);
        }
      }
    );

    socket.on("startGame", (roomId, playerId) => {
      const room = getRoom(roomId);
      if (room && room.ownerId === playerId) {
        io.to(roomId).emit("gameStarted");
      } else {
        socket.emit("notOwner", {
          message: "Only the room owner can start the game.",
        });
      }
    });

    socket.on("flipCard", (roomId: string, card: any) => {
      const updatedRoom = flipCard(roomId, card, socket.id);
      if (updatedRoom) {
        io.to(roomId).emit("cardFlipped", card);
        if (updatedRoom.flippedCards.length === 2) {
          const [firstCard, secondCard] = updatedRoom.flippedCards;
          if (firstCard.name === secondCard.name) {
            io.to(roomId).emit("cardsMatched", [firstCard, secondCard]);
          } else {
            setTimeout(() => {
              io.to(roomId).emit("resetCards");
            }, 750);
          }
          io.to(roomId).emit("nextTurn", updatedRoom.currentPlayer);
        }
      }
    });

    socket.on("gameOver", (roomId: string, elapsedTime: number) => {
      endGame(roomId, elapsedTime);
      io.to(roomId).emit("gameSaved");
    });

    socket.on("disconnect", (reason) => {
      console.log("Disconnected:", socket.id, "Reason:", reason);

      const userId = socket.id; 
      if (userRooms[userId]) {
        userRooms[userId] = null;
      }

    });

    socket.on("connect_error", (err) => {
      console.error("Connection error:", err);
    });

    socket.on("error", (err) => {
      console.error("Socket error:", err);
    });
  });
};
