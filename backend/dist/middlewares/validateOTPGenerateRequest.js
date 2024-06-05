"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOTPGenerateRequest = void 0;
const zod_1 = require("zod");
const user_model_1 = require("../models/user.model");
const jwt_1 = require("../utils/jwt");
/**
 *
 * @param req {token}
 * @param res
 * @param next
 * @returns
 */
async function validateOTPGenerateRequest(req, res, next) {
    try {
        const schema = zod_1.z.object({
            token: zod_1.z.string(),
        });
        const validation = schema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ errors: validation.error.errors });
        }
        const { token } = validation.data;
        let decoded = (0, jwt_1.verifyJWT)(token);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid token" });
        }
        const email = decoded.email;
        let user = await user_model_1.User.findOne({
            email,
        });
        if (!user) {
            return res.status(400).json({
                message: "Token doesn't correspond to any user. Check your token!",
            });
        }
        req.user = { email };
        next();
    }
    catch (e) {
        return res.status(500).json(e);
    }
}
exports.validateOTPGenerateRequest = validateOTPGenerateRequest;
