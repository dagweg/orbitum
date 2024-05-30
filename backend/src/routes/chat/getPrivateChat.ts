import { Request, Response } from "express";
import { PrivateChat } from "../../models/private_chat.model";
import { Message } from "../../models/message.model";

export async function getPrivateChat(req: Request, res: Response) {
  try {
    const { userId } = req.user;
    const user2Id = req.query.userId;
    console.log("User 1 id ", userId);
    console.log("User 2 id ", user2Id);

    // // Inserting data into the collections
    // const message1 = new Message({ content: "Hello", sender: userId });
    // const message2 = new Message({ content: "Hi there", sender: user2Id });

    // let chat = new PrivateChat({
    //   user1: userId,
    //   user2: user2Id,
    //   messages: [message1._id, message2._id],
    // });

    // // Save the documents
    // Promise.all([message1.save(), message2.save(), chat.save()])
    //   .then(() => {
    //     console.log("Data saved successfully");
    //   })
    //   .catch((error) => {
    //     console.error("Error saving data:", error);
    //   });

    let chat = await PrivateChat.find({
      $or: [
        { user1: userId, user2: user2Id },
        { user2: userId, user1: user2Id },
      ],
    }).populate("messages");

    // chat.messages = chat.messages.map(async (messageId: string) => {
    //   return await Message.findById(messageId)
    // })

    return res.json(chat);
  } catch (error) {
    console.log((error as Error).message);
    return res.status(500).json(error);
  }
}
