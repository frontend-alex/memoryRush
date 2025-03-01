import axios from 'axios';

import { URL } from '@/constants/data';

export const createGameRoom = async (playerId: string | undefined, userChoice: number, maxPlayers: number) => {
  try {

    const response = await axios.post(`${URL}/api/rooms`, {
      playerId,
      userChoice : 25,
      maxPlayers : 3
    });

    console.log(response)

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