import express from 'express';
import {
  createGameRoom,
  joinGameRoom,
  getGameResult,
  saveGame,
} from '../controllers/gameController';

const router = express.Router();

router.post('/rooms', (req, res) => createGameRoom(req, res));

router.post('/rooms/join', (req, res) => joinGameRoom(req, res));

router.get('/rooms/:roomId', (req, res) => getGameResult(req, res));

router.post('/games', (req, res) => saveGame(req, res));

export default router;