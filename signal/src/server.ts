//** Signaling server for WebRTC using Socket.io */

import dotenv from 'dotenv';
import express from 'express';
import { readFileSync } from 'node:fs';
import { createServer } from 'node:https';
import { Server, Socket } from 'socket.io';

dotenv.config({ path: '.env' });
const app = express();
const httpsServer = createServer(
  {
    key: readFileSync('./cert/cert-key.pem'),
    cert: readFileSync('./cert/signalcert.pem'),
  },
  app
);

const server = createServer(httpsServer);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// extend socket interface to add user
declare module 'socket.io' {
  interface Socket {
    user: string;
    userID: number;
  }
}

// inject user ID
// connect like: const socket = io('ws://localhost:5000', {query: {user: 'Nody'}});
io.use((socket, next) => {
  if (socket.handshake.query && socket.handshake.auth.user) {
    socket.user = <string>socket.handshake.auth.user;
    socket.userID = <number>socket.handshake.auth.id;
  } else {
    // TODO: make user ID mandatory?
    socket.user = 'anonymous';
  }
  next();
});

// join room
// io.use((socket, next) => {
//   socket.join('default');
//   next();
// });

io.on('connection', (socket) => {
  console.log(`${socket.user} connected. Rooms: `, socket.rooms);
  socket.on('disconnect', () => {
    console.log(`${socket.user} disconnected. Rooms: `, socket.rooms);
  });
  socket.on('ping', (text) => {
    console.log('ping', text);
    io.emit('pong');
  });
  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`${socket.user} joined room ${room}. Rooms: `, socket.rooms)
  })
  io.engine.on('connection_error', (err) => {
    console.log(err.req); // the request object
    console.log(err.code); // the error code, for example 1
    console.log(err.message); // the error message, for example "Session ID unknown"
    // console.log(err.context); // some additional error context
  });
});

server.listen(process.env.SIGNAL_PORT, () => {
  console.log(`signalling server running on port ${process.env.SIGNAL_PORT}`);
});
