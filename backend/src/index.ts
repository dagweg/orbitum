import express from "express";
import connectDB from "./utils/db";
import dotenv from "dotenv";
import userRouteHandler from "./routes/user/handler";
import cors from "cors";
import cookieParser from "cookie-parser";
import { tokenRouteHandler } from "./routes/token/handler";
import { otpRouteHandler } from "./routes/otp/handler";
import postsRouterHandler from "./routes/post/handler";
import { searchHandler } from "./routes/search/handler";

// Load environment variables
dotenv.config();

// Estabilish connection to MongoDB
connectDB();

const app = express();
const router = express.Router();

const port = process.env.PORT || 5000;

// middlewares
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

// Define routes
app.use("/", router);
app.use("/api/v1/user", userRouteHandler());
app.use("/api/v1/posts", postsRouterHandler());
app.use("/api/v1/otp", otpRouteHandler());
app.use("/api/v1/token", tokenRouteHandler());
app.use("/api/v1/search", searchHandler());

app.listen(port, () => {});
