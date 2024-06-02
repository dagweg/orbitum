import { Server as SocketIOServer } from "socket.io";
import { validateSocketSession } from "../middlewares/validateSocketSession";

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

    socket.on("user:connect", ({ userId }) => {
      console.log("Connected User id is ", userId);
    });

    socket.on("chat", (data) => {
      console.log(data);
    });

    socket.on("disconnect", () => {
      disconnected = true;
      console.log("user disconnected");
    });
  });
}