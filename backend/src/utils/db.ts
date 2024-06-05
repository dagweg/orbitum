import { ServerApiVersion } from "mongodb";
import mongoose from "mongoose";

function connectDB() {
  const uri = process.env.MONGO_URI as string;
  console.log(uri);
  mongoose
    .connect(uri as string, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
      autoIndex: true,
    })
    .then(() => {
      console.log("Connected to MongoDB Atlas");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
}

export default connectDB;
