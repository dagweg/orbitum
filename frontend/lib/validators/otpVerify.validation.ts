import { z } from "zod";

export const OTPVerifySchema = z.object({
  inputOtp: z.string(),
  token: z.string(),
});
