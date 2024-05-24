import Heading from "@/app/components/heading";
import Image from "next/image";

function NotificationsPage() {
  return (
    <div className="max-w-prose mx-auto bg-white h-screen px-4 py-2">
      <Heading>Notifications</Heading>
      <div className="h-full w-full flex flex-col justify-center items-center">
        <Image
          src={"https://imgur.com/RWDDar5.png"}
          width={100}
          height={100}
          alt=""
        />
        <p>No new notifications.</p>
      </div>
    </div>
  );
}

export default NotificationsPage;
