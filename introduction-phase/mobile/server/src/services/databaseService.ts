import { databases } from '../config/appwrite';
import { GameResult } from '../types/gameTypes';
import { config } from '../config/appwrite';

export const saveGameResult = async (gameResult: GameResult) => {
  try {
    const response = await databases.createDocument(
      config.databaseId!,
      config.mutiplayerGameCollectionid!,
      gameResult.roomId,
      gameResult
    );
    return response;
  } catch (error) {
    console.error('Error saving game result:', error);
    throw error;
  }
};