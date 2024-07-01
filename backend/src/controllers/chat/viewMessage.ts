import { Request, Response } from "express";
import { User } from "../../models/user.model";
import { Images } from "../../models/image.model";
import { Message } from "../../models/message.model";

export async function viewMessage(req: Request, res: Response) {
  try {
    const { userId } = req.user;
    const { messageId } = req.body;

    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({
        message: "Message with that id is not found",
      });
    }

    if (message.views.findIndex(userId) != -1) {
      res.status(200).json({
        message: "Already viewed that message",
      });
    }

    message.views.push(userId);
    await message.save();

    return res.status(201).json(message);
  } catch (error) {
    return res.status(500).json({
      error: (error as Error).message,
    });
  }
}
