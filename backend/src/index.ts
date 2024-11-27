// // const express = require("express");
import express from "express";
import { Server } from "http";
import connectDB from "./utils/db";
import * as dotenv from "dotenv";
import userRouteHandler from "./routes/user/handler";
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
import cors from "cors";
import cookieParser from "cookie-parser";
import { tokenRouteHandler } from "./routes/token/handler";
import { otpRouteHandler } from "./routes/otp/handler";
import postsRouterHandler from "./routes/post/handler";
import { searchHandler } from "./routes/search/handler";
import chatRouteHandler from "./routes/chat/handler";
import { createConversations } from "./models/mock/createConversations";
import socketHandler from "./controllers/socket";
import { Request, Response } from "express";
import commentRouteHandler from "./routes/comment/handler";
import { notificationRouteHandler } from "./routes/notification/handler";

// Load environment variables
dotenv.config();

// Estabilish connection to MongoDB
connectDB();

export const app = express();
export const server = new Server(app);
const router = express.Router();

// middlewares
app.use(
  cors({
    origin: [
      process.env.CLIENT_ORIGIN as string,
      "http://localhost:3000",
      "https://orbitum.vercel.app",
      "https://orbitum.vercel.app/",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
      "X-Auth-Token",
    ],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb" }));
app.use(cookieParser());

// Define routes
app.use("/", router);
app.use("/api/v1/user", userRouteHandler());
app.use("/api/v1/posts", postsRouterHandler());
app.use("/api/v1/otp", otpRouteHandler());
app.use("/api/v1/token", tokenRouteHandler());
app.use("/api/v1/search", searchHandler());
app.use("/api/v1/chat", chatRouteHandler());
app.use("/api/v1/comment", commentRouteHandler());
app.use("/api/v1/notification", notificationRouteHandler());

app.get("/api/v1/mock/conversations", (req: Request, res: Response) => {
  return res.json(createConversations());
});

// Socket.IO
socketHandler(server);

const port = process.env.PORT;

server.listen(port, () => {
  console.log("LISTENING ON PORT ", port);
});
