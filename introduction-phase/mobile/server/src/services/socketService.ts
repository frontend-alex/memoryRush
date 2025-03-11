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

      const roomId = createRoom(playerId, userChoice, maxPlayers);
      const room = getRoom(roomId);
    
      if (room) {
        socket.join(roomId);
    
        console.log(`Room created with ID: ${roomId}`); 
        console.log(`Emitting roomCreated to client`);
    
        socket.emit("roomCreated", { roomId, playerId });
    
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
          console.log(`Room ${roomId} deleted because it is empty.`);
        }
      }
    });

    // Handle request to delete a room
    socket.on("deleteRoom", (roomId) => {
      io.to(roomId).emit("roomDeleted", { roomId }); // Notify all players in the room
      deleteRoom(roomId); // Delete the room
    });

    // Handle request to kick a player from the room
    socket.on(
      "kickPlayer",
      ({ roomId, playerId }: { roomId: string; playerId: string }) => {
        const room = getRoom(roomId);
        if (room) {
          room.players = room.players.filter((id) => id !== playerId);
          io.to(roomId).emit("playerJoined", room.players); // Update all players in the room
        }
      }
    );

    // Handle start game request (only room owner can start)
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

    // Handle card flipping
    socket.on("flipCard", (roomId: string, card: any) => {
      const updatedRoom = flipCard(roomId, card, socket.id);
      if (updatedRoom) {
        io.to(roomId).emit("cardFlipped", card); // Notify all players that a card was flipped
        if (updatedRoom.flippedCards.length === 2) {
          const [firstCard, secondCard] = updatedRoom.flippedCards;
          if (firstCard.name === secondCard.name) {
            io.to(roomId).emit("cardsMatched", [firstCard, secondCard]); // If cards match, notify players
          } else {
            setTimeout(() => {
              io.to(roomId).emit("resetCards"); // Reset cards after a short delay if they don't match
            }, 750);
          }
          io.to(roomId).emit("nextTurn", updatedRoom.currentPlayer); // Notify who’s next
        }
      }
    });

    // Handle game over logic
    socket.on("gameOver", (roomId: string, elapsedTime: number) => {
      endGame(roomId, elapsedTime); // Process the game end logic
      io.to(roomId).emit("gameSaved"); // Notify everyone that the game is saved
    });

    // Handle disconnection
    socket.on("disconnect", (reason) => {
      console.log("Disconnected:", socket.id, "Reason:", reason);
    });

    // Handle connection error
    socket.on("connect_error", (err) => {
      console.error("Connection error:", err);
    });

    // Handle general socket errors
    socket.on("error", (err) => {
      console.error("Socket error:", err);
    });
  });
};
