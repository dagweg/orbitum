import { Request, Response } from "express";
import { User } from "../../models/user.model";

export async function searchChatSidebar(req: Request, res: Response) {
  try {
    const { query } = req.query;
    const { email } = req.user;
    console.log(query);
    console.log(email);
    const users = await User.find({
      $and: [
        {
          $or: [
            { email: { $regex: query, $options: "i" } },
            { username: { $regex: query, $options: "i" } },
          ],
        },
        { email: { $ne: email } },
      ],
    }).select("-password");

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
}
