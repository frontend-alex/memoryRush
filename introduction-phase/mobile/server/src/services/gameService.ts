import { Server } from "socket.io";
import { Room, Card, GameResult } from "../types/gameTypes";
import { generateCards, shuffle } from "../utils/utils";
import { saveGameResult } from "./databaseService";

const rooms: { [key: string]: Room } = {};

let io: Server;

export const setSocketServer = (socketIo: Server) => {
  io = socketIo;
};

export const createRoom = (
  playerId: string,
  userChoice: number,
  maxPlayers: number
): string => {
  const roomId = `room_${Math.random().toString(36).substr(2, 9)}`;
  const cards = shuffle(generateCards(userChoice)).map((name, index) => ({
    id: index,
    name,
    flipped: false,
    matched: false,
  }));

  rooms[roomId] = {
    id: roomId,
    players: [playerId],
    cards,
    maxPlayers,
    flippedCards: [],
    currentPlayer: playerId,
    gameOver: false,
    ownerId: playerId,
  };

  return roomId;
};


export const joinRoom = (roomId: string, playerId: string): boolean => {
  const room = getRoom(roomId);
  if (
    room &&
    !room.players.includes(playerId) &&
    room.players.length < room.maxPlayers
  ) {
    room.players.push(playerId);
    return true;
  }
  return false;
};

export const getAvailableRooms = (): Room[] => {
  return Object.values(rooms).filter(
    (room) => room.players.length < room.maxPlayers && !room.gameOver
  );
};

export const getRoom = (roomId: string): Room | undefined => {
  return rooms[roomId];
};

export const deleteRoom = (roomId: string): void => {
  if (rooms[roomId]) {
    delete rooms[roomId];
    console.log(`Room ${roomId} deleted successfully.`);
  } else {
    console.log(`Room ${roomId} not found.`);
  }
};

export const kickPlayer = (roomId: string, playerId: string): void => {
  const room = rooms[roomId];
  if (room) {
    room.players = room.players.filter((id) => id !== playerId);
  }
};

export const flipCard = (
  roomId: string,
  card: Card,
  playerId: string
): Room | null => {
  const room = rooms[roomId];
  if (!room || room.currentPlayer !== playerId) return null;

  room.flippedCards.push(card);
  if (room.flippedCards.length === 2) {
    const [firstCard, secondCard] = room.flippedCards;
    if (firstCard.name === secondCard.name) {
      room.cards = room.cards.map((c) =>
        c.id === firstCard.id || c.id === secondCard.id
          ? { ...c, matched: true }
          : c
      );
    } else {
      setTimeout(() => {
        room.flippedCards = [];
      }, 750);
    }
    room.currentPlayer =
      room.players[(room.players.indexOf(playerId) + 1) % room.players.length];
  }

  return room;
};

export const endGame = async (
  roomId: string,
  elapsedTime: number
): Promise<void> => {
  const room = rooms[roomId];
  if (!room) return;

  const scores: { [playerId: string]: number } = {};
  let winner = "";
  let maxScore = 0;

  room.players.forEach((playerId) => {
    const matchedCards = room.cards.filter((card) => card.matched).length;
    scores[playerId] = matchedCards * 10;
    if (scores[playerId] > maxScore) {
      maxScore = scores[playerId];
      winner = playerId;
    }
  });

  const bonus = winner ? 50 : 0;

  const gameResult: GameResult = {
    roomId,
    elapsedTime,
    players: room.players,
    scores,
    winner,
    bonus,
  };

  try {
    await saveGameResult(gameResult);
    console.log("Game result saved successfully:", gameResult);
  } catch (error) {
    console.error("Failed to save game result:", error);
  }

  delete rooms[roomId];
};
