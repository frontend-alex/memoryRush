import { Room, Card, GameResult } from '../types/gameTypes';
import { generateCards, shuffle } from '../utils/utils';
import { saveGameResult } from './databaseService';

const rooms: { [key: string]: Room } = {};

export const createRoom = (playerId: string): string => {
  const roomId = `room_${Math.random().toString(36).substr(2, 9)}`;
  const cards = shuffle(generateCards(12)).map((name, index) => ({
    id: index,
    name,
    flipped: false,
    matched: false,
  }));

  rooms[roomId] = {
    id: roomId,
    players: [playerId],
    cards,
    flippedCards: [],
    currentPlayer: playerId,
    gameOver: false,
  };

  return roomId;
};

export const joinRoom = (roomId: string, playerId: string): boolean => {
  if (rooms[roomId] && rooms[roomId].players.length < 4) {
    rooms[roomId].players.push(playerId);
    return true;
  }
  return false;
};

export const getRoom = (roomId: string): Room | undefined => {
  return rooms[roomId];
};

export const flipCard = (roomId: string, card: Card, playerId: string): Room | null => {
  const room = rooms[roomId];
  if (!room || room.currentPlayer !== playerId) return null;

  room.flippedCards.push(card);
  if (room.flippedCards.length === 2) {
    const [firstCard, secondCard] = room.flippedCards;
    if (firstCard.name === secondCard.name) {
      room.cards = room.cards.map((c) =>
        c.id === firstCard.id || c.id === secondCard.id ? { ...c, matched: true } : c
      );
    } else {
      setTimeout(() => {
        room.flippedCards = [];
      }, 750);
    }
    room.currentPlayer = room.players[(room.players.indexOf(playerId) + 1) % room.players.length];
  }

  return room;
};

export const endGame = async (roomId: string, elapsedTime: number): Promise<void> => {
  const room = rooms[roomId];
  if (!room) return;

  const scores: { [playerId: string]: number } = {};
  let winner = '';
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
    console.log('Game result saved successfully:', gameResult);
  } catch (error) {
    console.error('Failed to save game result:', error);
  }

  // Clean up the room
  delete rooms[roomId];
};