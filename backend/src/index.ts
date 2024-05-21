import express from "express";
import connectDB from "./db";
import dotenv from "dotenv";
import userRouteHandler from "./routes/user/handler";
import cors from "cors";
import cookieParser from "cookie-parser";
import { tokenRouteHandler } from "./routes/token/handler";
import { otpRouteHandler } from "./routes/otp/handler";

// Load environment variables
dotenv.config();

// Estabilish connection to MongoDB
connectDB();

const app = express();
const router = express.Router();

const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

// Define routes
app.use("/", router);
app.use("/api/v1/user", userRouteHandler());
app.use("/api/v1/otp", otpRouteHandler());
app.use("/api/v1/token", tokenRouteHandler());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
