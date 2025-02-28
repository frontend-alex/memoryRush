import { Server } from 'socket.io';
import { Server as SocketIOServer, Socket } from 'socket.io';

declare global {
  namespace Express {
    interface Request {
      io: SocketIOServer;
      socket: Socket;
    }
  }
}
