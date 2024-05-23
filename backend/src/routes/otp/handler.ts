import express from "express";
import { verifyOTP } from "./verify";
import { validateOTPGenerateRequest } from "../../middlewares/validateOTPGenerateRequest";
import { validateOtpVerifyRequest } from "../../middlewares/validateOTPVerifyRequest";
import { sendOtp } from "./send";

/**
 *  /generate
 *  /verify
 */
export function otpRouteHandler() {
  const router = express.Router();
  router.post("/send", validateOTPGenerateRequest, sendOtp);
  router.post("/verify", validateOtpVerifyRequest, verifyOTP);
  return router;
}
