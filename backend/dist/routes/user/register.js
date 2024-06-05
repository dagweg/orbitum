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
exports.registerUser = void 0;
const user_model_1 = require("../../models/user.model");
const email_1 = require("../../utils/email");
const otp_1 = require("../../utils/otp");
const jwt = __importStar(require("jsonwebtoken"));
async function registerUser(req, res) {
    try {
        let userData = req.body;
        let { otp, otpExpiry } = (0, otp_1.generateOTP)();
        const token = jwt.sign({ email: userData.email }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1800s",
        });
        let user = await user_model_1.User.findOne({
            $or: [{ email: userData.email }, { userName: userData.userName }],
        });
        if (user) {
            let response = {
                message: "Conflict",
                verified: user.emailVerified,
                token,
            };
            if (user.email === userData.email) {
                response.message =
                    "User with the specified email already exists. Please login!";
            }
            else if (user.userName === userData.userName) {
                response.message =
                    "User with the specified username already exists. Please login!";
            }
            return res.status(409).json(response);
        }
        // Create user
        user = await user_model_1.User.create(Object.assign(Object.assign({}, userData), { otp,
            otpExpiry }));
        await (0, email_1.sendOtpEmail)(userData.email, otp, otpExpiry);
        return res.status(200).json({
            message: "OTP Has been sent",
            token,
        });
    }
    catch (error) {
        return res.status(400).send({ error });
    }
}
exports.registerUser = registerUser;
