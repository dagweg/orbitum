"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Image, Video } from "lucide-react";
import React, { useRef, useState } from "react";
import AvatarWrapper from "./avatar-wrapper";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { API_ORIGIN } from "../config/apiConfig";

export default function PostInput() {
  const triggerRef = useRef<HTMLButtonElement>(null);

  const [content, setContent] = useState("");

  function openDialog() {
    triggerRef.current?.click();
  }

  function handlePost() {
    const formData = JSON.stringify({
      content,
    });

    fetch(`${API_ORIGIN}/api/v1/user/post`, {
      method: "POST",
      credentials: "include",
      body: formData,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      const data = await res.json();
    });
  }

  return (
    <div>
      <Card className="flex gap-3 items-center p-3 ">
        <AvatarWrapper />
        <Input placeholder="Share your thoughts" onClick={openDialog}></Input>
        <Button variant={"outline"} onClick={openDialog}>
          <Image />
        </Button>
        <Button variant={"outline"} onClick={openDialog}>
          <Video />
        </Button>
      </Card>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="sr-only" ref={triggerRef}>
            Trigger
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[425px] sm:w-[500px]">
          <DialogHeader>
            <DialogTitle>Create a new post</DialogTitle>
          </DialogHeader>
          <Card className="flex flex-col gap-3 justify-center p-3 border-none shadow-none">
            <Textarea
              placeholder="Share your thoughts"
              rows={5}
              className="w-full"
              value={content}
              onChangeCapture={(e) => setContent(e.currentTarget.value)}
            ></Textarea>
            <div className="flex gap-3 ">
              <Button variant={"outline"}>Upload Image</Button>
              <Button variant={"outline"}>Upload Video</Button>
            </div>
          </Card>
          <DialogFooter>
            <DialogClose>
              <Button type="submit" onClick={handlePost}>
                Post
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
