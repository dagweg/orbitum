"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = void 0;
function generateOTP(len = 6, hours = 7) {
    let otp = "";
    for (let i = 0; i < len; i++) {
        otp += Math.floor(Math.random() * 10);
    }
    const otpExpiry = new Date(Date.now() + hours * 60 * 60 * 1000);
    return { otp, otpExpiry };
}
exports.generateOTP = generateOTP;
