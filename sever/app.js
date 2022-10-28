const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("ic_leave", function (data) {
    console.log("======Left Room========== ");
    console.log(data);

    socket.leave(data, function (err) {
      if (
        typeof io.sockets.adapter.rooms[room1] !== "undefined" &&
        io.sockets.adapter.rooms[room1] != null
      ) {
        console.log(io.sockets.adapter.rooms[room1].length);
        console.log(err);
      } else {
        console.log("room is deleted");
      }
    });
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
  socket.on("forceDisconnect", function () {
    socket.disconnect();
  });
  socket.on("send-notification", function (data) {
    socket.to(data.room).emit("new-notification", data);
  });
});

server.listen(3002, () => {
  console.log("SERVER RUNNING");
});
