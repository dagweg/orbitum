import jwt from "jsonwebtoken";

export function verifyJWT(jwtToken: string) {
  try {
    return jwt.verify(jwtToken, process.env.TOKEN_KEY as string);
  } catch (error) {
    return error;
  }
}
