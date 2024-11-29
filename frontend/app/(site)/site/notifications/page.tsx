"use client";
import Heading from "@/app/components/heading";
import NotificationCard from "@/app/components/notification-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getNotifications } from "@/lib/redux/slices/notification/notificationThunks";
import { getAllPosts } from "@/lib/redux/slices/post/postThunks";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { createUrl } from "@/util/file";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function NotificationsPage() {
  const { notifications } = useSelector(
    (state: RootState) => state.Notification
  );

  const dispatch = useDispatch<AppDispatch>();

  useLayoutEffect(() => {
    dispatch(getNotifications());
  }, []);

  return (
    <div className="max-w-prose mx-auto bg-white h-screen px-4 py-2 flex flex-col gap-2">
      <div className="flex justify-between ">
        <Heading>Notifications</Heading>
        <Button variant={"ghost"} size="sm">
          <Trash size={15} />
        </Button>
      </div>
      {notifications.map(
        ({ title, description, date, user, link, thumbnail }, key) => (
          <NotificationCard
            key={key}
            title={title}
            description={description}
            imgSrc={
              thumbnail
                ? createUrl(thumbnail?.base64, thumbnail?.type)
                : undefined
            }
            date={new Date(date)}
          />
        )
      )}
    </div>
  );
}

export default NotificationsPage;
