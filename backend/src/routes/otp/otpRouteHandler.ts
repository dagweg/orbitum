import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { User } from "../../models/user.model";
import { validateToken } from "../tokenRouteHandler";
import { sendEmail } from "../../utils/email";
import { sendOtpEmail } from "../../utils/email";
import { generateOTP } from "../../utils/otp";
import { sendOtp, validateOTPGenerateRequest } from "./generate/route";
import { validateOtpVerifyRequest, verifyOTP } from "./verify/route";

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
