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
exports.sendOtpEmail = exports.sendEmail = exports.createTransport = void 0;
const nodemailer = __importStar(require("nodemailer"));
const process = __importStar(require("process"));
const date_1 = require("./date");
exports.createTransport = nodemailer.createTransport;
async function sendEmail(to, subject, html) {
    try {
        const transporter = (0, exports.createTransport)({
            service: "gmail",
            auth: {
                user: process.env.MAILER_EMAIL,
                pass: process.env.MAILER_PASSWORD,
            },
        });
        transporter.sendMail({
            from: process.env.MAILER_EMAIL,
            to,
            subject,
            html,
        }, (error, info) => {
            console.log("What happened");
            if (error)
                console.log(error.message);
            else
                console.log("Email sent: " + info.response);
        });
    }
    catch (error) {
        console.log(error.message);
    }
}
exports.sendEmail = sendEmail;
async function sendOtpEmail(recieverEmail, otp, otpExpiry) {
    const expiryHours = (0, date_1.getHourGap)(otpExpiry, new Date());
    if (expiryHours <= 0)
        throw new Error("OTP has already expired. Please set another OTP");
    const emailBody = `<p>Thanks for registering to Orbitum.<br>Here is your OTP: <strong>${otp}</strong>.<br> It is to expire after ${expiryHours} hours at ${otpExpiry.toLocaleString()}</p>`;
    await sendEmail(recieverEmail, "Account Verification OTP", emailBody);
}
exports.sendOtpEmail = sendOtpEmail;
