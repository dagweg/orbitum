import jwt from "jsonwebtoken";
import { Session } from "../models/session.model";

export async function isUserLoggedIn(authToken: string): Promise<boolean> {
  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET_KEY as string);
    if (!decoded) {
      return false;
    }

    const email = (decoded as { email: string }).email;
    if (!email) {
      return false;
    }

    const session = await Session.findOne({ email });
    if (!session) {
      return false;
    }

    if (new Date() > session.expires) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error in isUserLoggedIn:", error);
    return false;
  }
}
