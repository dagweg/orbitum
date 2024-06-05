"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOtpVerifyRequestToken = void 0;
const jwt_1 = require("../utils/jwt");
async function validateOtpVerifyRequestToken(req, res, next) {
    try {
        const body = req.body;
        const decoded = (0, jwt_1.verifyJWT)(body.token);
        if (!decoded) {
            return res.status(403).json({ message: "Invalid token. Unauthorized." });
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(500).json({ error, message: error.message });
    }
}
exports.validateOtpVerifyRequestToken = validateOtpVerifyRequestToken;
