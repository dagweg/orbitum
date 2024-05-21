import { NextFunction, Request, Response } from "express";
import { AUTH_TOKEN } from "../apiConfig";
import { isUserLoggedIn } from "../lib/isUserLoggedIn";

export async function validateUserLoggedIn(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authToken = req.headers.authorization?.split(" ")[1];
    if (!authToken) {
      throw new Error("Authorization token must be provided");
    }
    const loggedIn = await isUserLoggedIn(authToken);
    if (!loggedIn)
      return res.status(401).json({ message: "User is not logged in" });
    // return res.json({ message: "User is logged in" });
    next();
  } catch (error) {
    return res.status(500).json(error);
  }
}
