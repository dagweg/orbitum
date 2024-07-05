import { Request, Response } from "express";
import { Message } from "../../models/message.model";
import { ObjectId } from "mongodb";

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

    const userObjectId = new ObjectId(userId);
    const userObjectIdString = String(userObjectId);

    if (message.views.has(userObjectIdString)) {
      res.status(200).json({
        message: "Already viewed that message",
      });
    }

    message.views.set(userObjectIdString, true);
    await message.save();

    return res.status(201).json(message);
  } catch (error) {
    return res.status(500).json({
      error: (error as Error).message,
    });
  }
}
