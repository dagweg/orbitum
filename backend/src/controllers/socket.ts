import { Server as SocketIOServer } from "socket.io";
import { validateSocketSession } from "../middlewares/validateSocketSession";
import { Server } from "http";
import SocketEvents from "../config/socketEvents";
import { handleLogout } from "./socket/handlers/handleLogout";
import { handleMessageSend } from "./socket/handlers/handleMessageSend";
import { handleTyping } from "./socket/handlers/handleTyping";

const userMap: Map<string, string> = new Map();

export default function socketHandler(server: Server) {
  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.CLIENT_ORIGIN,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.use(validateSocketSession);

  io.on(SocketEvents.ON_CONNECTION, (socket) => {
    console.log("a user connected");

    console.log("Connected User is ", socket.data.user.email);

    if (!userMap.get(socket.data.user.userId)) {
      userMap.set(socket.data.user.userId, socket.id);
      console.log("Socket Id ", socket.id);
    }

    // Broadcast the connected users
    io.emit(SocketEvents.EMIT_USERS_CONNECTED, Object.fromEntries(userMap));

    // Logout Event
    socket.on(SocketEvents.ON_USER_LOGOUT, handleLogout(socket, userMap));

    // Listening to message send
    socket.on(
      SocketEvents.ON_CHAT_SEND_MESSAGE,
      handleMessageSend(io, socket, userMap)
    );

    // Listening to typing event
    socket.on(SocketEvents.ON_CHAT_TYPE, handleTyping(io, socket, userMap));

    // Listening to user disconnection
    socket.on(SocketEvents.ON_DISCONNECT, () => {
      console.log("Disconnected user ", socket.data.user.email);
      userMap.delete(socket.data.user.userId);

      // Broadcast the connected users after user with id has been deleted
      io.emit("users:connected", Object.fromEntries(userMap));
    });
  });
}
