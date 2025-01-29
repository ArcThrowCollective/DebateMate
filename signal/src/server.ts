//** Signaling server for WebRTC using Socket.io */

import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'node:http';
import { Server, Socket } from 'socket.io';
dotenv.config({ path: '.env' });

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// extend socket interface to add user
declare module 'socket.io' {
  interface Socket {
    user: string;
  }
}

// inject user ID
// connect like: const socket = io('ws://localhost:5000', {query: {user: 'Nody'}});
io.use((socket, next) => {
  if (socket.handshake.query && socket.handshake.query.user) {
    socket.user = <string>socket.handshake.query.user;
  } else {
    // TODO: make user ID mandatory?
    socket.user = 'anonymous';
  }
  next();
});

// join room
io.use((socket, next) => {
  socket.join('default');
  next();
});

io.on('connection', (socket) => {
  console.log(`${socket.user} connected. Rooms: `, socket.rooms);
  socket.on('disconnect', () => {
    console.log(`${socket.user} disconnected. Rooms: `, socket.rooms);
  });
  socket.on('ping', (text) => {
    console.log('ping', text);
    io.emit('pong');
  });
});

server.listen(process.env.SIGNAL_PORT, () => {
  console.log(`signalling server running on port ${process.env.SIGNAL_PORT}`);
});
