import dotenv from 'dotenv'
import express from 'express';
import gameRoutes from './routes/gameRoutes';

import { createServer } from 'http';
import { config } from './config/appwrite';
import { Server } from 'socket.io';
import { socketService } from './services/socketService';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', 
  },
});

const PORT = config.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.use('/api', gameRoutes);

socketService(io);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});