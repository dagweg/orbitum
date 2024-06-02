import { Server as SocketIOServer } from "socket.io";
import { validateSocketSession } from "../middlewares/validateSocketSession";

let map = new Map();

export default function socketHandler(server: any) {
  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.CLIENT_ORIGIN,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.use(validateSocketSession);

  let disconnected = false;

  io.on("connection", (socket) => {
    console.log("a user connected");

    if (!disconnected) {
      // setInterval(() => {
      //   io.emit("chat", "MY NAME IS JEFF. I'm 21 1 1: D");
      //   console.log("EMMITED CHAT");
      // }, 5000);
    }

    socket.on("user:connect", () => {
      console.log("Connected User is ", socket.data.user.email);
      map.set(socket.data.user.userId, socket.id);
      console.log("Map set to ", map);
    });

    socket.on("chat:sendMessage", ({ to, message }) => {
      console.log("SENDING MESSAGE TO ", to);
      console.log("MESSAGE IS ", message);
      const socketId = map.get(to);
      console.log("Socket ID is ", socketId);
      io.to(socketId).emit("chat:receiveMessage", {
        from: socket.data.user.userId,
        message,
      });
    });

    socket.on("disconnect", () => {
      disconnected = true;
      console.log("user disconnected");
    });
  });
}
