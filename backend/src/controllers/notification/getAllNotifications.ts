import { Request, Response } from "express";
import { Notification } from "../../models/notification.model";
export async function getAllNotifications(req: Request, res: Response) {
  try {
    const { userId } = req.user;

    const notifications = await Notification.find({
      user: userId,
    });

    return res.json({
      notifications,
      new_notifications_count: notifications.filter((notif) => !notif.read),
      total_notifications: notifications.length,
    });
  } catch (error) {
    return res.status(500).json({
      error: (error as Error).message,
    });
  }
}
