// const crypto = require("crypto")
import crypto from "crypto";

export function generateToken(length: number = 64) {
  return crypto.randomBytes(length).toString("hex");
}
