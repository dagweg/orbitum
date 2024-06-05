"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = void 0;
const session_model_1 = require("../../models/session.model");
const apiConfig_1 = require("../../config/apiConfig");
const jwt_1 = require("../../utils/jwt");
async function logoutUser(req, res) {
    try {
        // Check for the session id that comes as sessionToken
        const sessionToken = req.cookies[apiConfig_1.SESSION_TOKEN];
        if (!sessionToken) {
            return res.status(400).json({ message: "Already logged out." });
        }
        // Verify the validity of the session id
        const decoded = (0, jwt_1.verifyJWT)(sessionToken);
        const { email, userId } = decoded;
        if (!decoded) {
            return res.status(400).json("Invalid sessionToken!");
        }
        // The sessionToken is a * as jwt so parse it to get the email
        const sess = await session_model_1.Session.findOneAndUpdate({ userId }, {
            $set: {
                expires: new Date(0),
            },
        });
        if (!sess) {
            return res
                .status(500)
                .json({ message: "There was a problem finding the session." });
        }
        return res.json({ message: "Successully Logged out!" });
    }
    catch (error) {
        return res.json({ error });
    }
}
exports.logoutUser = logoutUser;
