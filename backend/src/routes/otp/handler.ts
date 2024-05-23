import express from "express";
import { verifyOTP } from "./verify";
import { validateOTPGenerateRequest } from "../../middlewares/validateOTPGenerateRequest";
import { validateOtpVerifyRequestToken } from "../../middlewares/validateOtpVerifyRequestToken";
import { sendOtp } from "./send";
import { validateRequestSchema } from "../../middlewares/validateRequestSchema";
import { OTPVerifySchema } from "../../validators/otpVerify.validation";

/**
 *  /generate
 *  /verify
 */
export function otpRouteHandler() {
  const router = express.Router();
  router.post("/send", validateOTPGenerateRequest, sendOtp);
  router.post(
    "/verify",
    validateRequestSchema(OTPVerifySchema),
    validateOtpVerifyRequestToken,
    verifyOTP
  );
  return router;
}
