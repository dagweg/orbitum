import { NextFunction, Request, Response, Router } from "express";

import { UserSchemaRefined } from "../../validators/user.validation";
import { TUserSchema } from "../../validators/types";
import { sendOtpEmail } from "../../utils/email";
import { generateOTP } from "../../utils/otp";
import { sendEmail } from "../../utils/email";
import { User } from "../../models/user.model";

import express from "express";
import { validateSession } from "./validate/route";

export default function userRouteHandler(): Router {
  const router = express.Router();

  // Session Validation
  router.post("/validate", validateSession);

  return router;
}
