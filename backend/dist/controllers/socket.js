"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const validateSocketSession_1 = require("../middlewares/validateSocketSession");
const sendMessage_1 = __importDefault(require("./sendMessage"));
let map = new Map();
function socketHandler(server) {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: process.env.CLIENT_ORIGIN,
            methods: ["GET", "POST"],
            credentials: true,
        },
    });
    io.use(validateSocketSession_1.validateSocketSession);
    let disconnected = false;
    io.on("connection", (socket) => {
        console.log("a user connected");
        socket.on("user:connect", () => {
            console.log("Connected User is ", socket.data.user.email);
            map.set(socket.data.user.userId, socket.id);
            console.log("Map set to ", map);
        });
        socket.on("chat:sendMessage", async ({ to, message }) => {
            console.log("SENDING MESSAGE TO ", to);
            console.log("MESSAGE IS ", message);
            const socketId = map.get(to);
            console.log("Socket ID is ", socketId);
            const msg = await (0, sendMessage_1.default)(socket.data.user.userId, to, message);
            if (msg.status === 200 || msg.status === 201) {
                io.to(socketId).emit("chat:receiveMessage", {
                    from: socket.data.user.userId,
                    message,
                });
            }
            else {
                console.log("Error: ", msg.message);
            }
        });
        socket.on("disconnect", () => {
            disconnected = true;
            console.log("user disconnected");
        });
    });
}
exports.default = socketHandler;
