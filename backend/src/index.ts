import express from "express";
import connectDB from "./db";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Estabilish connection to MongoDB
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// Define routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/api/user", async (req, res) => {
  // TODO
  const data = await req.body();
  console.log("YOURE" + data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
