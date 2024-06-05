"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const crypto = require("crypto");
function generateToken(length = 64) {
    return crypto.randomBytes(length).toString("hex");
}
exports.generateToken = generateToken;
