"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stories = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const storiesSchema = new mongoose_1.default.Schema({});
exports.Stories = mongoose_1.default.model("Stories", storiesSchema);
