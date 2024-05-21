import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { User } from "../../models/user.model";
import { validateToken } from "../token/handler";
import { sendEmail } from "../../utils/email";
import { sendOtpEmail } from "../../utils/email";
import { generateOTP } from "../../utils/otp";
import { sendOtp, validateOTPGenerateRequest } from "./generate";
import { validateOtpVerifyRequest, verifyOTP } from "./verify";

/**
 *  /generate
 *  /verify
 */
export function otpRouteHandler() {
  const router = express.Router();
  router.post("/generate", validateOTPGenerateRequest, sendOtp);
  router.post("/verify", validateOtpVerifyRequest, verifyOTP);
  return router;
}
