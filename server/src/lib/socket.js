import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

const userSocketMap = {};

export function getReceiverId(userId){
    return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log("A user Connected : ", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;
//   console.log(userId);

  io.emit("GettingOnlineUsers", Object.keys(userSocketMap));


  socket.on("disconnect", () => {
    console.log("A user disconnected : ", socket.id);
    delete userSocketMap[userId];
    io.emit("GettingOnlineUsers", Object.keys(userSocketMap))
  });
});

export { io, app, server };
