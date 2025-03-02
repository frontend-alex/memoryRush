import axios from 'axios';

import { URL } from '@/constants/data';

export const createGameRoom = async (playerId: string | undefined, userChoice: number, maxPlayers: number) => {
  try {
    console.log(userChoice)
    console.log(maxPlayers)
    
    const response = await axios.post(`${URL}/api/rooms`, {
      playerId,
      userChoice : 25,
      maxPlayers : 3
    });

    return response.data.roomId;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error creating room:', error.response?.data);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error; 
  }
};