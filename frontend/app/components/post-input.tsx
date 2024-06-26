"use client";

import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Image as LucideImage, Video, X } from "lucide-react";
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
import { FileUploader } from "react-drag-drop-files";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import Spinner from "./spinner";
import { TImage, TVideo } from "../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { createPost } from "@/lib/redux/slices/post/postThunks";
import { arrayBuffertoBase64 } from "@/util/file";
import { usePostInput } from "../hooks/usePostInput";

const FILE_TYPES = ["JPG", "PNG", "GIF"];

export default function PostInput() {
  const triggerRef = useRef<HTMLButtonElement>(null);

  const [content, setContent] = useState("");

  const [images, setImages] = useState<TImage[]>([]);
  const [videos, setVideos] = useState<TVideo[]>([]);
  const [size, setSize] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);

  const { openDialog, removeImage, handleFileChange, handlePost } =
    usePostInput(
      triggerRef,
      content,
      images,
      videos,
      size,
      loading,
      setLoading,
      setImages,
      setSize,
      setVideos
    );

  return (
    <div>
      <Card className="flex gap-3 items-center p-3 ">
        <AvatarWrapper />
        <Input placeholder="Share your thoughts" onClick={openDialog}></Input>
        <Button variant={"outline"} onClick={openDialog}>
          <LucideImage />
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
        <DialogContent className="w-[425px] sm:w-[500px]  flex flex-col">
          <DialogHeader>
            <CardTitle>Create a Post</CardTitle>
          </DialogHeader>
          <Card className="flex flex-col gap-3 justify-center p-3 border-none shadow-none  max-w-[425px] sm:max-w-[500px] ">
            <Textarea
              placeholder="The world is waiting to hear from you <3"
              rows={5}
              className="w-full"
              value={content}
              onChangeCapture={(e) => setContent(e.currentTarget.value)}
            ></Textarea>
            <div className="flex flex-col gap-3 justify-center">
              <div className=" flex gap-2  overflow-x-scroll  w-full no-scrollbar p-2">
                {loading &&
                  Array.from({ length: size ?? 0 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-center">
                      <Spinner className="absolute z-[10]" />
                      <Skeleton className="aspect-square w-12" />
                    </div>
                  ))}
                {images &&
                  images.map((image, key) => {
                    return (
                      <>
                        <div className="relative group/image">
                          <Image
                            src={image.url}
                            alt={image.name}
                            width={50}
                            height={50}
                            key={key}
                            className="rounded-sm shadow-sm min-w-[100px] "
                            objectFit="fit"
                          />
                          <Button
                            size={"iconSm"}
                            className="aspect-square absolute top-[-5px] left-[-5px] !p-[1px] bg-gray-200 hidden group-hover/image:block"
                            variant={"circleGhost"}
                            onClick={() => removeImage(key)}
                          >
                            <X className="w-full h-full" />
                          </Button>
                        </div>
                      </>
                    );
                  })}
              </div>
              <FileUploader
                handleChange={handleFileChange}
                name="file"
                types={FILE_TYPES}
                multiple={true}
              />
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
