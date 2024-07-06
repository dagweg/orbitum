const SocketEvents = {
  ON_CONNECTION: "connection",
  ON_DISCONNECT: "disconnect",
  ON_USER_LOGOUT: "user:logout",
  ON_CHAT_SEND_MESSAGE: "chat:sendMessage",
  ON_CHAT_SEND_AUDIO: "chat:sendAudio",
  ON_CHAT_TYPE: "chat:type",
  EMIT_USERS_CONNECTED: "users:connected",
  EMIT_CHAT_RECIEVE_MESSAGE: "chat:receiveMessage",
  EMIT_CHAT_RECIEVE_AUDIO: "chat:recieveAudio",
};

export default SocketEvents;
