import jwt from "jsonwebtoken";
import { Session } from "../models/session.model";

export async function isUserLoggedIn(authToken: string): Promise<boolean> {
  try {
    console.log(`AUTH TOKEN: ${authToken}`);

    const decoded = jwt.verify(authToken, process.env.TOKEN_KEY as string);
    if (!decoded) {
      console.log("Token verification failed");
      return false;
    }

    const email = (decoded as { email: string }).email;
    if (!email) {
      console.log("No email found in token");
      return false;
    }

    const session = await Session.findOne({ email });
    if (!session) {
      console.log("No session found for email:", email);
      return false;
    }

    if (new Date() > session.expires) {
      console.log("Session expired for email:", email);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error in isUserLoggedIn:", error);
    return false;
  }
}
