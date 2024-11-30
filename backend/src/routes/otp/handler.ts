// const express = require("express");
import express from "express";
import { verifyOTP } from "./verify";
import { validateOTPGenerateRequest } from "../../middlewares/validateOTPGenerateRequest";
import { validateOtpVerifyRequestToken } from "../../middlewares/validateOtpVerifyRequestToken";
import { sendOtp } from "./send";
import { validatePOSTRequestSchema } from "../../middlewares/validatePOSTRequestSchema";
import { OTPVerifySchema } from "../../validators/otpVerify.validation";
import { z } from "zod";

/**
 *  /generate
 *  /verify
 */
export function otpRouteHandler() {
  const router = express.Router();

  router.post("/send", validateOTPGenerateRequest, sendOtp);

  router.post(
    "/resend",
    (req, res, next) => {
      const schema = z.object({
        email: z.string().email(),
      });

      const validation = schema.safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({ errors: validation.error.errors });
      }

      req.user = { ...req.user, email: validation.data.email };
      next();
    },
    sendOtp
  );

  router.post(
    "/verify",
    validatePOSTRequestSchema(OTPVerifySchema),
    validateOtpVerifyRequestToken,
    verifyOTP
  );
  return router;
}
