import Heading from "@/app/components/heading";
import NotificationCard from "@/app/components/notification-card";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

function NotificationsPage() {
  return (
    <div className="max-w-prose mx-auto bg-white h-screen px-4 py-2 flex flex-col gap-2">
      <Heading>Notifications</Heading>
      <NotificationCard
        title="Someone just liked your post"
        description="You got 5 more likes. You currently have 5.1k likes"
        imgSrc="/images/chat/galaxy.jpg"
        date={new Date()}
      />
      <NotificationCard
        title="Someone commented on your post"
        description="Wow! That's beautiful"
        imgSrc="/images/chat/space.jpg"
      />
      <NotificationCard
        title="Someone just liked your post"
        description="You got 5 more likes. You currently have 5.1k likes"
        imgSrc="/images/chat/galaxy.jpg"
      />
    </div>
  );
}

export default NotificationsPage;
