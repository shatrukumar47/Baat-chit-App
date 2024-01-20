const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

//Middlewares
app.use(express.json());
app.use(cors());

io.on("connection", (socket) => {
  console.log("New user : ", socket);
});

server.listen(8080, () => {
  console.log("Server is connected to PORT 8080");
});
