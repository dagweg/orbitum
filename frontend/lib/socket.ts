import { API_ORIGIN } from "@/app/config/apiConfig";
import { Socket, io } from "socket.io-client";

let socket: Socket;

const getSocket = () => {
  if (!socket) {
    socket = io(API_ORIGIN, {
      withCredentials: true,
    });

    // Add general event listeners
    socket.on("connect", () => {
      console.log("Connected to server.");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server.");
    });

    socket.on("reconnect_attempt", () => {
      console.log("Attempting to reconnect...");
    });

    socket.on("reconnect", (attemptNumber) => {
      console.log(`Reconnected to server after ${attemptNumber} attempts.`);
    });
  }
  return socket;
};

export default getSocket;
