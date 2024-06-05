import * as jwt from "jsonwebtoken";

export function verifyJWT(jwtToken: string): jwt.JwtPayload | string | null {
  try {
    return jwt.verify(jwtToken, process.env.JWT_SECRET_KEY as string);
  } catch (error) {
    console.log((error as Error).message);
    return null;
  }
}
