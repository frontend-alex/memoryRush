import { Server, Socket } from "socket.io";
import {
  joinRoom,
  getAvailableRooms,
  getRoom,
  flipCard,
  endGame,
  deleteRoom,
} from "./gameService";

export const socketService = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("a user connected");

    socket.on("getAvailableRooms", () => {
      const availableRooms = getAvailableRooms();
      socket.emit("availableRooms", availableRooms);
    });

    socket.on("joinRoom", (roomId, playerId) => {
      const room = getRoom(roomId);
      if (room) {
        if (!room.players.includes(playerId)) {
          room.players.push(playerId);
    
          io.to(roomId).emit("playerJoined", room.players);
    
          socket.emit("roomInfo", { ownerId: room.ownerId, players: room.players });
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
          console.log(`Room ${roomId} deleted because it is empty.`);
        }
      }
    });

    socket.on("deleteRoom", (roomId) => {
      io.to(roomId).emit("roomDeleted", { roomId });
      deleteRoom(roomId);
    });

    socket.on(
      "kickPlayer",
      ({ roomId, playerId }: { roomId: string; playerId: string }) => {
        const room = getRoom(roomId);
        if (room) {
          room.players = room.players.filter((id) => id !== playerId);
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
  });
};
