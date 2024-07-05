import { Request, Response } from "express";
import { Session } from "../../models/session.model";
import { SESSION_TOKEN } from "../../config/apiConfig";
import { verifyJWT } from "../../utils/jwt";

export async function logoutUser(req: Request, res: Response) {
  try {
    // Check for the session id that comes as sessionToken
    const sessionToken = req.cookies[SESSION_TOKEN];

    if (!sessionToken) {
      return res.status(400).json({ message: "Already logged out." });
    }

    // Verify the validity of the session id
    const decoded = verifyJWT(sessionToken);
    const { userId } = decoded as { email: string; userId: string };

    if (!decoded) {
      return res.status(400).json("Invalid sessionToken!");
    }

    // The sessionToken is a * as jwt so parse it to get the email
    const sess = await Session.findOneAndUpdate(
      { userId },
      {
        $set: {
          expires: new Date(0),
        },
      }
    );

    if (!sess) {
      return res
        .status(500)
        .json({ message: "There was a problem finding the session." });
    }

    return res.json({ message: "Successully Logged out!" });
  } catch (error) {
    return res.json({ error });
  }
}
