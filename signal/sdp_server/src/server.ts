import fs from "fs";
import https from "https";
import express from "express";
import { Server, Socket } from "socket.io";
import config from "../config/env_config";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT: number = parseInt(config.SERVER_PORT || "3000", 10);
const HOST: string = config.SERVER_HOST as string;
app.use(express.static(__dirname));
app.use(express.json());
app.use(cors());

const key = fs.readFileSync("cert.key");
const cert = fs.readFileSync("cert.crt");
const server = https.createServer({ key, cert }, app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

type Offer = {
  offererUserName: string,
  offer: string,
  offerIceCandidates: [],
  answererUserName: string | null,
  answer: string | null,
  answererIceCandidates: [],
}

type User = {
  socketId: string;
  userName: string;
};

type OfferData = {
  offer: RTCSessionDescriptionInit;
  answer: RTCSessionDescriptionInit | null;
};

type Room = {
  users: Set<User>;
  offers: Map<string, OfferData>;
};

const rooms: Map<string, Room> = new Map();


(async () => {
  try {
    server.listen(PORT, HOST, function () {
      console.log(`starting server on port: ${PORT}`);
    });

    io.on("connection", (socket: Socket) => {
      console.log("A user connected:", socket.id);


      socket.on("joinRoom", (room: string) => {
        socket.join(room);
        console.log(`${socket.id} joined room: ${room}`);
        const userName = socket.handshake.auth.userName as string;
        // Ensure room exists
        if (!rooms.has(room)) {
          rooms.set(room, { users: new Set(), offers: new Map() });
        }
        // Add user to the room
        const roomData = rooms.get(room)!;
        roomData.users.add({ socketId: socket.id, userName });

        // Notify other users to request an offer from the new peer
        socket.to(room).emit("requestOffer", { newUser: socket.id });

        // Notify room members
        io.to(room).emit("roomParticipants", Array.from(roomData.users));
      });

      
      socket.on("leaveRoom", (room: string) => {
        if (!rooms.has(room)) return;
        const roomData = rooms.get(room)!;
        roomData.users.forEach((user) => {
          if (user.socketId === socket.id) {
            roomData.users.delete(user);
          }
        });
        // Clean up if room is empty
        if (roomData.users.size === 0) {
          rooms.delete(room);
        }
        socket.leave(room);
        console.log(`${socket.id} left room: ${room}`);
        // Notify remaining users
        io.to(room).emit("roomParticipants", Array.from(roomData.users));
      });

      socket.on("offer", ({ room, offer, from, to }: { room: string; offer: RTCSessionDescriptionInit; from: string; to: string }) => {
        console.log(`An offer has arrived in room ${room} from ${from} to ${to}: ${offer}`);
        if (!rooms.has(room)) return;
        console.log(`handling offer: ${offer}`);
        const recipient = Array.from(rooms.get(room)!.users).find(user => user.socketId === to);
        
        if (recipient) {
          io.to(recipient.socketId).emit("offer", { offer, from });
        }
    
        // Store the offer within the room
        rooms.get(room)!.offers.set(from, { offer, answer: null });
      });

      socket.on("answer", ({ room, answer, from, to }: { room: string; answer: RTCSessionDescriptionInit; from: string; to: string }) => {
        console.log(`An answer has arrived in room ${room} from ${from} to ${to}`);
        if (!rooms.has(room)) return;
    
        const recipient = Array.from(rooms.get(room)!.users).find(user => user.socketId === to);
        
        if (recipient) {
          io.to(recipient.socketId).emit("answer", { answer, from, room });
        }
    
        // Update the stored offer with the answer
        if (rooms.get(room)!.offers.has(to)) {
          rooms.get(room)!.offers.get(to)!.answer = answer;
        }
      });

      socket.on("ice-candidate", ({ room, candidate, from, to }: { room: string; candidate: RTCIceCandidateInit; from: string; to: string }) => {
        console.log(`📥 ICE candidate received from ${from} for ${to}:`, candidate);
        
        if (!rooms.has(room)) return;
        console.log(candidate);
        const recipient = Array.from(rooms.get(room)!.users).find(user => user.userName === to);
        
        if (recipient) {
          io.to(recipient.socketId).emit("ice-candidate", { candidate, from });
        } else {
          console.warn(`⚠ Recipient ${to} not found in room ${room}.`);
        }
      });

      socket.on("disconnect", () => {
        console.log(`${socket.id} disconnected`);
    
        // Remove user from all joined rooms
        rooms.forEach((roomData, room) => {
          roomData.users.forEach(user => {
            if (user.socketId === socket.id) {
              roomData.users.delete(user);
            }
          });
    
          // Notify remaining users
          io.to(room).emit("roomParticipants", Array.from(roomData.users));
    
          // Clean up empty rooms
          if (roomData.users.size === 0) {
            rooms.delete(room);
          }
        });
      });
      
    });

    
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
