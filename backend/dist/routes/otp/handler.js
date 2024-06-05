"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpRouteHandler = void 0;
const express = require("express");
const verify_1 = require("./verify");
const validateOTPGenerateRequest_1 = require("../../middlewares/validateOTPGenerateRequest");
const validateOtpVerifyRequestToken_1 = require("../../middlewares/validateOtpVerifyRequestToken");
const send_1 = require("./send");
const validatePOSTRequestSchema_1 = require("../../middlewares/validatePOSTRequestSchema");
const otpVerify_validation_1 = require("../../validators/otpVerify.validation");
/**
 *  /generate
 *  /verify
 */
function otpRouteHandler() {
    const router = express.Router();
    router.post("/send", validateOTPGenerateRequest_1.validateOTPGenerateRequest, send_1.sendOtp);
    router.post("/verify", (0, validatePOSTRequestSchema_1.validatePOSTRequestSchema)(otpVerify_validation_1.OTPVerifySchema), validateOtpVerifyRequestToken_1.validateOtpVerifyRequestToken, verify_1.verifyOTP);
    return router;
}
exports.otpRouteHandler = otpRouteHandler;
