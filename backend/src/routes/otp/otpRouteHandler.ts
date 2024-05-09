import express, { NextFunction, Request, Response } from "express";
import { z } from "zod";

export function otpRouteHandler() {
  const router = express.Router();
  router.post("/", validateOtpResend, resendOtp);
  return router;
}

function resendOtp(req: Request, res: Response) {}

function validateOtpResend(req: Request, res: Response, next: NextFunction) {
  try {
    // implement jwt authentication
    next();
  } catch (error) {
    throw new Error(error as string);
  }
}
