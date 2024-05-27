"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Ellipsis, ThumbsUp, MessageSquareText, Share2 } from "lucide-react";
import React, { useEffect } from "react";
import AvatarWrapper from "./avatar-wrapper";
import Image from "next/image";
import { TUserSchema } from "@/lib/types/schema";
import { useDispatch } from "react-redux";
import { AppDispatch, store } from "@/lib/redux/store";
import { fetchUser, likePost } from "@/lib/redux/slices/user/userThunks";

type TComment = {
  name: string;
  date: Date;
  content: string;
  likes: number;
};

type TPost = {
  postId: string;
  user: TUserSchema;
  date: Date;
  content: string;
  likes: Object[];
  comments: Object[];
  shares: Object[];
};

export default function Post({
  postId,
  user,
  date,
  content,
  likes,
  comments,
  shares,
}: TPost) {
  const dispatch = useDispatch<AppDispatch>();

  dispatch(fetchUser());
  console.log(store.getState().userReducer);

  // useEffect(()=>{

  // },[likePost])

  return (
    <Card className="flex flex-col gap-3 items-center p-3 ">
      <section className="flex justify-between w-full">
        <AvatarWrapper name={user.userName} date={date} />
        <Button variant={"ghost"}>
          <Ellipsis />
        </Button>
      </section>
      <section className="w-full">{content}</section>
      <section className="w-full space-y-3">
        {likes.length > 0 && (
          <>
            <div className="flex -space-x-2 border-b-2 pb-2">
              {["👍"].map((em, i) => {
                // TODO
                const z = 10 - i;
                return (
                  <span
                    key={i}
                    className={`relative rounded-full  bg-white w-[22px] text-center aspect-square`}
                    style={{ zIndex: z }}
                  >
                    {em}
                  </span>
                );
              })}
              {likes.length}
            </div>
          </>
        )}

        <div className="flex gap-3 justify-between">
          <Button
            variant={"ghost"}
            className="flex items-center gap-3"
            onClick={() => {
              dispatch(likePost({ postId }));
            }}
          >
            <ThumbsUp /> Like
          </Button>
          <Button variant={"ghost"} className="flex items-center gap-3">
            <MessageSquareText /> Comment
          </Button>
          <Button variant={"ghost"} className="flex items-center gap-3">
            <Share2 /> Share
          </Button>
        </div>
      </section>
    </Card>
  );
}
