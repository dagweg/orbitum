"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.tokenRouteHandler = void 0;
const express_1 = __importDefault(require("express"));
const jwt = __importStar(require("jsonwebtoken"));
const user_model_1 = require("../../models/user.model");
function tokenRouteHandler() {
    const router = express_1.default.Router();
    router.post("/", validateToken);
    return router;
}
exports.tokenRouteHandler = tokenRouteHandler;
async function validateToken(req, res) {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(400).json({ message: "Token is required" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded) {
            return res.status(403).json({ message: "Invalid token" });
        }
        const user = await user_model_1.User.findOne({
            email: decoded.email,
        });
        if (!user) {
            return res.status(500).json({ message: "User find query error." });
        }
        return res.status(200).json(Object.assign(Object.assign({ message: "Token is Valid!" }, decoded), { emailVerified: user.emailVerified }));
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ error });
    }
}
exports.validateToken = validateToken;
