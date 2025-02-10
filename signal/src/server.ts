//** Signaling server for WebRTC using Socket.io */

import dotenv from 'dotenv';
import express from 'express';
import { readFileSync } from 'node:fs';
import { createServer } from 'node:https';
import { Server, Socket } from 'socket.io';

dotenv.config({ path: '.env' });

// create https express/socket.io server
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

interface signalObj {
  from: string;
  to: string;
  room: string;
}
interface offerObj extends signalObj {
  offer: RTCSessionDescription;
}
interface answerObj extends signalObj {
  answer: RTCSessionDescription;
}
interface candidateObj extends signalObj {
  candidate: RTCIceCandidate;
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
  console.log(`# ${socket.user} connected. Rooms: `, socket.rooms);
  socket.on('disconnect', () => {
    console.log(`# ${socket.user} disconnected. Rooms: `, socket.rooms);
  });

  // SDP offers / answers
  socket.on('offer', (offerObj: offerObj) => {
    if (offerObj.offer.type !== 'offer') console.log('offer.type!=offer');
    socket.broadcast.to(offerObj.room).emit('offer', offerObj);
    console.log(
      `o offer from ${offerObj.from} has been broadcast [${offerObj.room}]`
    );
  });
  socket.on('answer', (answerObj: answerObj) => {
    if (answerObj.answer.type !== 'answer') console.log('answer.type!=answer');
    socket.broadcast.to(answerObj.room).emit('answer', answerObj);
    console.log(
      `o answer from ${answerObj.from} has been broadcast [${answerObj.room}]`
    );
  });
  socket.on('ice-candidate', (candidateObj: candidateObj) => {
    console.log(
      `i received iceCandidate from ${candidateObj.from}: ${candidateObj.candidate.candidate} (${candidateObj.candidate.type}) [${candidateObj.room}]`
    );
    socket.broadcast.to(candidateObj.room).emit('ice-candidate', candidateObj);
    console.log('... candidate has been broadcast');
  });

  // rooms
  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`□ ${socket.user} joined room ${room}. Rooms: `, socket.rooms);
  });
  socket.on('leaveRoom', (room) => {
    socket.leave(room);
    console.log(`□ ${socket.user} joined room ${room}. Rooms: `, socket.rooms);
  });

  // error handling
  socket.on('ping', (text) => {
    console.log('ping', text);
    io.emit('pong');
  });
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
