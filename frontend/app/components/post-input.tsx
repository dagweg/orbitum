import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Image, Video } from "lucide-react";
import React from "react";
import AvatarWrapper from "./avatar-wrapper";

export default function PostInput() {
  return (
    <Card className="flex gap-3 items-center p-3 ">
      <AvatarWrapper />
      <Input placeholder="Share what you are thinking"></Input>
      <Button variant={"outline"}>
        <Image />
      </Button>
      <Button variant={"outline"}>
        <Video />
      </Button>
    </Card>
  );
}
