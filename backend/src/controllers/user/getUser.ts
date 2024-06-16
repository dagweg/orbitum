import { Request, Response } from "express";
import { User } from "../../models/user.model";

export async function getUser(req: Request, res: Response) {
  try {
    let { userId } = req.user;

    let user = await User.findById(
      userId,
      "userName email firstName lastName phoneNumber  profilePicture settings"
    ).populate("profilePicture");

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
