import mongoose from "mongoose";

function connectDB() {
  const uri = process.env.MONGO_URI;
  console.log("Mongo uri:", process.env.MONGO_URI);
  mongoose
    .connect(uri as string)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB", err);
    });
}

export default connectDB;
