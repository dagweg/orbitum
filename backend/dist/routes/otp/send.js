"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtp = void 0;
const user_model_1 = require("../../models/user.model");
const email_1 = require("../../utils/email");
const otp_1 = require("../../utils/otp");
async function sendOtp(req, res) {
    try {
        const { email } = req.user;
        const { otp, otpExpiry } = (0, otp_1.generateOTP)();
        const user = await user_model_1.User.findOneAndUpdate({
            email,
        }, {
            $set: {
                otp,
                otpExpiry,
            },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        await (0, email_1.sendOtpEmail)(email, otp, otpExpiry);
        res.status(200).json({ message: "OTP sent successfully", otp });
    }
    catch (error) {
        res.status(500).json({ error, message: error.message });
    }
}
exports.sendOtp = sendOtp;
