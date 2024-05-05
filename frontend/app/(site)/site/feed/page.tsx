import AvatarWrapper from "@/app/components/avatar-wrapper";
import Heading from "@/app/components/heading";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

function FeedPage() {
  return (
    <div className="max-w-prose mx-auto bg-white h-full px-4 py-2">
      <Heading>Feed</Heading>
      <div>
        <AvatarWrapper />
      </div>
    </div>
  );
}

export default FeedPage;
