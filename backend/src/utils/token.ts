const crypto = require("crypto");

export function generateToken(length: number = 64) {
  return crypto.randomBytes(length).toString("hex");
}
