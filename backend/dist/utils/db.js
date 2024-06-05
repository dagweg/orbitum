"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
function connectDB() {
    const uri = process.env.MONGO_URI;
    console.log(uri);
    mongoose_1.default
        .connect(uri, {
        serverApi: {
            version: mongodb_1.ServerApiVersion.v1,
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
exports.default = connectDB;
