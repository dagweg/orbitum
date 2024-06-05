"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http_1 = require("http");
const db_1 = __importDefault(require("./utils/db"));
const dotenv = __importStar(require("dotenv"));
const handler_1 = __importDefault(require("./routes/user/handler"));
const cors = require("cors");
const cookieParser = require("cookie-parser");
const handler_2 = require("./routes/token/handler");
const handler_3 = require("./routes/otp/handler");
const handler_4 = __importDefault(require("./routes/post/handler"));
const handler_5 = require("./routes/search/handler");
const handler_6 = __importDefault(require("./routes/chat/handler"));
const createConversations_1 = require("./models/mock/createConversations");
const socket_1 = __importDefault(require("./controllers/socket"));
// Load environment variables
dotenv.config();
// Estabilish connection to MongoDB
(0, db_1.default)();
const app = express();
const server = new http_1.Server(app);
const router = express.Router();
const port = process.env.PORT || 5000;
// Socket.IO
(0, socket_1.default)(server);
// middlewares
app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
// Define routes
app.use("/", router);
app.use("/api/v1/user", (0, handler_1.default)());
app.use("/api/v1/posts", (0, handler_4.default)());
app.use("/api/v1/otp", (0, handler_3.otpRouteHandler)());
app.use("/api/v1/token", (0, handler_2.tokenRouteHandler)());
app.use("/api/v1/search", (0, handler_5.searchHandler)());
app.use("/api/v1/chat", (0, handler_6.default)());
app.get("/api/v1/mock/conversations", (req, res) => {
    return res.json((0, createConversations_1.createConversations)());
});
server.listen(port, () => {
    console.log("LISTENING ON PORT ", port);
});
