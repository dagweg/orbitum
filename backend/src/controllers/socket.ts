import { Server as SocketIOServer } from "socket.io";
import { validateSocketSession } from "../middlewares/validateSocketSession";
import sendMessage from "./sendMessage";

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

  io.on("connection", (socket) => {
    console.log("a user connected");

    console.log("Connected User is ", socket.data.user.email);
    map.set(socket.data.user.userId, socket.id);

    socket.on("chat:sendMessage", async ({ to, message }) => {
      console.log("SENDING MESSAGE TO ", to);
      console.log("MESSAGE IS ", message);
      const socketId = map.get(to);
      console.log("Socket ID is ", socketId);

      const msg = await sendMessage(socket.data.user.userId, to, message);

      if (msg.status === 200 || msg.status === 201) {
        io.to(socketId).emit("chat:receiveMessage", {
          from: socket.data.user.userId,
          message,
        });
      } else {
        console.log("Error: ", msg.message);
      }
    });

    socket.on("chat:type", ({ to }) => {
      console.log("User is typing to ", to);
      const socketId = map.get(to);
      io.to(socketId).emit("chat:type", { from: socket.data.user.userId });
    });

    setInterval(() => {
      io.emit("users:connected", Object.fromEntries(map));
    }, 2000);

    socket.on("disconnect", () => {
      console.log("user disconnected");
      map.delete(socket.data.user.userId);
    });
  });
}
