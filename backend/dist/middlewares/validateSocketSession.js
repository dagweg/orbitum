"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSocketSession = void 0;
const apiConfig_1 = require("../config/apiConfig");
const jwt_1 = require("../utils/jwt");
const cookie_1 = __importDefault(require("../utils/cookie"));
// Middleware
function validateSocketSession(socket, next) {
    const cookieHeader = socket.handshake.headers.cookie;
    if (!cookieHeader) {
        return next(new Error("Cookie header cannot be empty"));
    }
    let sessionToken = (0, cookie_1.default)(cookieHeader)[apiConfig_1.SESSION_TOKEN];
    console.log("SESSION TOKEN inside SOCKET.IO ", sessionToken);
    if (!sessionToken) {
        return next(new Error("Session token cannot be empty"));
    }
    const decoded = (0, jwt_1.verifyJWT)(sessionToken);
    if (!decoded) {
        return next(new Error("Session token is not valid."));
    }
    socket.data.user = {
        email: decoded.email,
        userId: decoded.userId,
    };
    next();
}
exports.validateSocketSession = validateSocketSession;
