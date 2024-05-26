import mongoose from "mongoose";

function connectDB() {
  const uri = process.env.MONGO_URI;

  mongoose
    .connect(uri as string)
    .then(() => {})
    .catch((err) => {});
}

export default connectDB;
