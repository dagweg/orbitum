import { Request, Response } from "express";
import { PrivateChat } from "../../models/private_chat.model";

export async function DeleteChatController(req: Request, res: Response) {
  try {
    const { chatId } = req.body;

    // var deleted = await PrivateChat.deleteOne({});
  } catch (error) {
    return res.status(500).json({
      message: "Error occured trying to delete a chat",
    });
  }
}
