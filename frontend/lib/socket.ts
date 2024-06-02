import { API_ORIGIN } from "@/app/config/apiConfig";
import { io } from "socket.io-client";

const socket = io(API_ORIGIN, {
  withCredentials: true,
});

export default socket;
