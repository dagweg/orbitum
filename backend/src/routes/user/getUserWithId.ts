import { Request, Response } from "express";
import { User } from "../../models/user.model";

export async function getUserWithId(req: Request, res: Response) {
  try {
    const { userId } = req.query;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ message: "Couldn't find user with that id." });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
}
