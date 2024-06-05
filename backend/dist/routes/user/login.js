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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const user_model_1 = require("../../models/user.model");
const session_model_1 = require("../../models/session.model");
const date_1 = require("../../utils/date");
const jwt = __importStar(require("jsonwebtoken"));
const apiConfig_1 = require("../../config/apiConfig");
async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        // Check if user exists
        let user = await user_model_1.User.findOne({ email });
        console.log("👤 USER IS");
        console.log(user);
        if (!user) {
            return res.status(401).json({
                message: "Please create an account.",
            });
        }
        // Check if password is incorrect
        if (user.password !== password) {
            return res
                .status(401)
                .json({ message: "Invalid email or password. Please try again!" });
        }
        if (!user.emailVerified) {
            return res.status(403).json({
                message: "You must verify your account before logging in. We've sent an otp. Check your email.",
            });
        }
        const expireDuration = 24 * 3; // 3 days
        const expires = (0, date_1.dateHoursFromNow)(expireDuration);
        const sessionToken = jwt.sign({
            userId: user._id,
            email,
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: `${expireDuration}h`,
        });
        const session = await session_model_1.Session.findOneAndUpdate({ userId: user._id }, // Use email as the unique identifier
        {
            $set: {
                sessionToken,
                expires,
                userId: user._id,
            },
        }, { upsert: true, new: true });
        console.log("🏠 SESSION IS");
        console.log(session);
        if (!session) {
            return res.status(500).json({ message: "Session creation failed!" });
        }
        return res
            .status(200)
            .cookie(apiConfig_1.SESSION_TOKEN, sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === apiConfig_1.PRODUCTION,
        })
            .json({ message: "Successfully logged in!" });
    }
    catch (error) {
        return res.status(500).json({ error, message: error.message });
    }
}
exports.loginUser = loginUser;
