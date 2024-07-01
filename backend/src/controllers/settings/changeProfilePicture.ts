import { Request, Response } from "express";
import { User } from "../../models/user.model";
import { Images } from "../../models/image.model";

export async function changeProfilePicture(req: Request, res: Response) {
  try {
    const { userId } = req.user;

    const { base64, name, type } = req.body;

    const user = await User.findById(userId);

    user!.profilePicture = await Images.create({
      name,
      type,
      base64,
    });

    // user!.populate("images");

    await user!.save();

    return res.json({
      user,
    });
  } catch (error) {
    return res.status(500).json({
      error: (error as Error).message,
    });
  }
}
