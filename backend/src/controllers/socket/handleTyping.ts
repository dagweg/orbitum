import { Server as SocketIOServer } from "socket.io";
import { Socket } from "socket.io";

export const handleTyping =
  (io: SocketIOServer, socket: Socket, userMap: Map<string, string>) =>
  ({ to }: { to: string }) => {
    console.log("User is typing to ", to);
    const socketId = userMap.get(to);
    io.to(socketId as string).emit("chat:type", {
      from: socket.data.user.userId,
    });
  };
