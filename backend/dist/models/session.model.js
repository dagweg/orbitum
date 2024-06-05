"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const date_1 = require("../utils/date");
const sessionSchema = new mongoose_1.default.Schema({
    userId: { type: mongodb_1.ObjectId, unique: true, ref: "User", require },
    sessionToken: { type: String, require },
    expires: { type: Date, optional: true, default: (0, date_1.dateHoursFromNow)(24) },
});
exports.Session = mongoose_1.default.model("Session", sessionSchema);
