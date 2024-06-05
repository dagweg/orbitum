"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLoginStatus = void 0;
const apiConfig_1 = require("../config/apiConfig");
const jwt_1 = require("../utils/jwt");
const user_model_1 = require("../models/user.model");
const session_model_1 = require("../models/session.model");
async function checkLoginStatus(req, res, next) {
    try {
        const sessionToken = req.cookies[apiConfig_1.SESSION_TOKEN];
        if (!sessionToken) {
            return res
                .status(401)
                .json({ loggedIn: false, message: "No session token" });
        }
        const decoded = (0, jwt_1.verifyJWT)(sessionToken);
        if (!decoded) {
            return res
                .status(401)
                .json({ loggedIn: false, message: "Invalid session token" });
        }
        const { email, userId } = decoded;
        const user = await user_model_1.User.findById(userId);
        if (!user) {
            return res
                .status(401)
                .json({ loggedIn: false, message: "User not found" });
        }
        const session = await session_model_1.Session.findOne({ userId, sessionToken });
        if (!session || session.expires < new Date()) {
            return res.status(401).json({
                loggedIn: false,
                message: "Session has expired. Login again.",
            });
        }
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({ loggedIn: false });
    }
}
exports.checkLoginStatus = checkLoginStatus;
