import Heading from "@/app/components/heading";
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
    <div className="max-w-prose mx-auto bg-white h-screen px-4 py-2">
      <Heading>Notifications</Heading>
      <div className="mt-5">
        <div className="w-full py-2 px-4 flex gap-2  bg-neutral-50 rounded-md shadow-sm border border-1 border-neutral-400">
          <div className="flex-1">
            <h1 className="font-semibold">Someone just liked your post</h1>
            <p className="text-sm font-semibold opacity-60">
              5 people liked your post. You currently have 846 likes.{" "}
            </p>
          </div>
          <div className="w-[100px] aspect-square bg-slate-200 rounded-sm "></div>
        </div>
      </div>
      {/* <div className="h-full w-full flex flex-col justify-center items-center">
        <Image
          src={"https://imgur.com/RWDDar5.png"}
          width={100}
          height={100}
          alt=""
        />
        <p>No new notifications.</p>
      </div> */}
    </div>
  );
}

export default NotificationsPage;
