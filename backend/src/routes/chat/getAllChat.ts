import { Request, Response } from "express";
import { PrivateChat } from "../../models/private_chat.model";
import { Message, MessageDocument } from "../../models/message.model";
import { User } from "../../models/user.model";

export async function getAllChats(req: Request, res: Response) {
  try {
    const { userId } = req.user;

    // TODO : GET ALL CHATS CORRESPONDING TO THE ID
    // PRIVATE, GROUP and CHANNELS
  } catch (error) {
    console.log((error as Error).message);
    return res.status(500).json(error);
  }
}
