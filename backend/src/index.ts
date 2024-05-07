import express from "express";
import connectDB from "./db";
import dotenv from "dotenv";
import user_route_handler from "./routes/user/user_route_handler";
import index_route_handler from "./routes/index_route_handler";

// Load environment variables
dotenv.config();

// Estabilish connection to MongoDB
connectDB();

const app = express();
const router = express.Router();

const port = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(express.urlencoded());

// Define routes
app.use("/", router);
app.use("/api/v1/user", user_route_handler());

console.log(router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
