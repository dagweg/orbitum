import { ServerApiVersion } from "mongodb";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

function connectDB() {
  if (mongoose.connection.readyState === 1) {
    console.log("Mongoose already connected");
    return;
  }

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
