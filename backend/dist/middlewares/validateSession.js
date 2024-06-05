"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSession = void 0;
const apiConfig_1 = require("../config/apiConfig");
const jwt_1 = require("../utils/jwt");
// Middleware
function validateSession(req, res, next) {
    try {
        const sessionToken = req.cookies[apiConfig_1.SESSION_TOKEN];
        if (!sessionToken) {
            return res.status(400).json({ message: "Session token cannot be empty" });
        }
        const decoded = (0, jwt_1.verifyJWT)(sessionToken);
        if (!decoded) {
            return res.status(400).json({ message: "Session token is not valid." });
        }
        req.user = decoded;
        req.body.email = decoded.email;
        req.body.userId = decoded.userId;
        // Future todo : Implement location + device identification  for better session management
        next();
    }
    catch (error) {
        return res.status(500).json({ error, message: error.message });
    }
}
exports.validateSession = validateSession;
