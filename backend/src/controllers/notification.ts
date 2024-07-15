import { Notification as NotificationModel } from "../models/notification.model";
import { ObjectId } from "mongodb";
export class Notification {
  constructor() {}

  async createNotficiation(
    userId: ObjectId,
    title: string,
    description: string,
    link: string,
    thumbnail?: string
  ): Promise<{
    notification?: object;
    error?: Error;
  }> {
    try {
      const notification = await NotificationModel.create({
        user: userId,
        link,
        thumbnail,
        title,
        description,
      });
      return {
        notification,
      };
    } catch (error) {
      return { error: error as Error };
    }
  }
}
