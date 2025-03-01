import { Server, Socket } from 'socket.io';
import { Room } from '../types/gameTypes';
import {
  createRoom,
  joinRoom,
  getRoom,
  flipCard,
  endGame,
  getAvailableRooms,
} from './gameService';

export const socketService = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    
    console.log('a user connected');

    socket.on('getAvailableRooms', () => {
      const availableRooms = getAvailableRooms();
      socket.emit('availableRooms', availableRooms);
    });

    // socket.on('createRoom', () => {
    //   const roomId = createRoom(socket.id, userChoice);
    //   socket.join(roomId);
    //   socket.emit('roomCreated', roomId);
    // });

    socket.on('joinRoom', (roomId: string) => {
      const success = joinRoom(roomId, socket.id);
      if (success) {
        socket.join(roomId);
        io.to(roomId).emit('playerJoined', getRoom(roomId)?.players);
      } else {
        socket.emit('roomFull');
      }
    });

    socket.on('flipCard', (roomId: string, card: any) => {
      const updatedRoom = flipCard(roomId, card, socket.id);
      if (updatedRoom) {
        io.to(roomId).emit('cardFlipped', card);
        if (updatedRoom.flippedCards.length === 2) {
          const [firstCard, secondCard] = updatedRoom.flippedCards;
          if (firstCard.name === secondCard.name) {
            io.to(roomId).emit('cardsMatched', [firstCard, secondCard]);
          } else {
            setTimeout(() => {
              io.to(roomId).emit('resetCards');
            }, 750);
          }
          io.to(roomId).emit('nextTurn', updatedRoom.currentPlayer);
        }
      }
    });

    socket.on('gameOver', (roomId: string, elapsedTime: number) => {
      endGame(roomId, elapsedTime);
      io.to(roomId).emit('gameSaved');
    });
  });
};