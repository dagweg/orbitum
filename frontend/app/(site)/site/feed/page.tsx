import AvatarWrapper from "@/app/components/avatar-wrapper";
import Heading from "@/app/components/heading";
import Post from "@/app/components/post";
import PostInput from "@/app/components/post-input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AvatarFallback } from "@radix-ui/react-avatar";
import {
  Ellipsis,
  Image,
  MessageSquareText,
  Share2,
  ThumbsUp,
  Video,
} from "lucide-react";
import { default as image } from "next/image";

function FeedPage() {
  return (
    <div className="max-w-prose mx-auto bg-white h-full px-4 py-2 flex flex-col gap-3">
      <Heading>Feed</Heading>
      <PostInput />
      <Post />
    </div>
  );
}

export default FeedPage;
