import { Server as SocketIOServer } from "socket.io";

export default function socketHandler(server: any) {
  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.CLIENT_ORIGIN,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected");

    setInterval(() => {
      io.emit("chat", JSON.stringify(new Date()));
      console.log("EMMITED CHAT");
    }, 5000);

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
}
