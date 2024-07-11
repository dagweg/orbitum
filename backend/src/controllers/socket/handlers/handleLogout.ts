import { Socket } from "socket.io";

export const handleLogout =
  (socket: Socket, userMap: Map<string, string>) => () => {
    console.log("Logged out user ", socket.data.user.email);
    userMap.delete(socket.data.user.userId);
  };
