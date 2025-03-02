import { Request, Response } from 'express';
import { getRoom, createRoom, joinRoom, getAvailableRooms } from '../services/gameService';
import { GameResult } from '../types/gameTypes';
import { saveGameResult } from '../services/databaseService';

export const createGameRoom = async (req: Request, res: Response): Promise<void> => {
  try {
    const { playerId, userChoice, maxPlayers } = req.body;
    if (!playerId || !userChoice || !maxPlayers) {
      res.status(400).json({ message: 'Player ID, Card or Maximum players is missing' });
      return;
    }

    const roomId = createRoom(playerId, userChoice, maxPlayers);
    res.status(201).json({ roomId });
    
  } catch (error) {
    console.error('Error creating game room:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllRooms = async (req: Request, res: Response): Promise<void> => {
  try {
    const rooms = getAvailableRooms();
    res.status(200).json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const joinGameRoom = async (req: Request, res: Response): Promise<void> => {
  try {
    const { roomId, playerId } = req.body;
    if (!roomId || !playerId) {
      res.status(400).json({ message: 'Room ID and Player ID are required' });
      return;
    }

    const success = joinRoom(roomId, playerId);
    if (!success) {
      res.status(400).json({ message: 'Room is full or does not exist' });
      return;
    }

    res.status(200).json({ message: 'Player joined successfully' });
  } catch (error) {
    console.error('Error joining game room:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getGameResult = async (req: Request, res: Response): Promise<void> => {
  try {
    const { roomId } = req.params;
    if (!roomId) {
      res.status(400).json({ message: 'Room ID is required' });
      return;
    }

    const room = getRoom(roomId);
    if (!room) {
      res.status(404).json({ message: 'Room not found' });
      return;
    }

    res.status(200).json(room);
  } catch (error) {
    console.error('Error fetching game result:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const saveGame = async (req: Request, res: Response): Promise<void> => {
  try {
    const gameResult: GameResult = req.body;
    if (!gameResult.roomId || !gameResult.players || !gameResult.scores) {
      res.status(400).json({ message: 'Invalid game result data' });
      return;
    }

    await saveGameResult(gameResult);
    res.status(201).json({ message: 'Game result saved successfully' });
  } catch (error) {
    console.error('Error saving game result:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};