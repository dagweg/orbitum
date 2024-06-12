"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Ellipsis,
  ThumbsUp,
  MessageSquareText,
  Share2,
  LucideThumbsUp,
  Send,
  SendHorizonal,
  MessageSquareMore,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import AvatarWrapper from "./avatar-wrapper";
import Image from "next/image";
import { TUserSchema } from "@/lib/types/schema";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store } from "@/lib/redux/store";
import { fetchUser } from "@/lib/redux/slices/user/userThunks";
import { likePost, postComment } from "@/lib/redux/slices/post/postThunks";
import { cn } from "@/lib/utils";
import useClickOutsideObserver from "../hooks/useClickOutsideObserver";
import { Textarea } from "@/components/ui/textarea";
import CommentCard from "./comment-card";
import { TUser } from "../types";

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
  liked: boolean;
  comments: Object[];
  shares: Object[];
};

export default function Post({
  postId,
  user,
  date,
  content,
  likes,
  liked,
  comments,
  shares,
}: TPost) {
  const dispatch = useDispatch<AppDispatch>();

  dispatch(fetchUser());

  const handleLike = () => {
    dispatch(likePost({ postId }));
  };

  const comment = useRef("");
  const [commentMode, setCommentMode] = useState(false);

  const commentModeStyle =
    "w-full fixed inset-0 bg-white bg-transparent backdrop-blur-2xl flex items-center justify-center   z-[100] h-full";
  const commentModeCardStyle =
    "fixed w-[95%] sm:w-[550px] max-h-[98%] overflow-y-scroll no-scrollbar";

  useEffect(() => {
    if (commentMode) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [commentMode]);

  function handleComment() {
    setCommentMode(true);
  }

  function handleSendComment() {
    // Send the comment here
    console.log("you are going to send ", comment.current);
    dispatch(
      postComment({
        postId,
        comment: comment.current,
      })
    );
  }

  const cardRef = useRef<HTMLDivElement>(null);
  function cardOutsideClickHandler() {
    setCommentMode(false);
  }
  useClickOutsideObserver(cardRef, cardOutsideClickHandler);

  return (
    <div className={cn(commentMode && commentModeStyle)}>
      <Card
        ref={cardRef}
        className={cn(
          "flex flex-col gap-3 items-center p-3 border-opacity-60  shadow-sm relative",
          commentMode && commentModeCardStyle
        )}
      >
        <section className="flex justify-between w-full">
          <AvatarWrapper name={user.userName} date={date} />
          <Button variant={"ghost"}>
            <Ellipsis />
          </Button>
        </section>
        <section className="w-full font-lato">{content}</section>
        <section className="w-full  space-y-3 flex flex-col">
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
              variant={liked ? "selected" : "ghost"}
              className="flex items-center gap-3"
              onClick={() => handleLike()}
            >
              <ThumbsUp
                className={cn({
                  "text-green-700": liked,
                })}
              />
              {liked ? "Liked" : "Like"}
            </Button>
            <Button
              variant={"ghost"}
              className="flex items-center gap-3"
              onClick={handleComment}
            >
              <MessageSquareText /> Comments{" "}
              {comments.length > 0 && `(${comments.length})`}
            </Button>
            <Button variant={"ghost"} className="flex items-center gap-3">
              <Share2 /> Share
            </Button>
          </div>
          {commentMode && (
            <div className="w-full bg-white h-fit relative">
              <Textarea
                placeholder="Share your thoughts"
                rows={3}
                className="pr-12 no-scrollbar"
                onChangeCapture={(e) => {
                  comment.current = e.currentTarget.value;
                }}
                
              />
              <Button
                variant={"ghost"}
                className="absolute right-0 bottom-0"
                onClick={handleSendComment}
              >
                <SendHorizonal />
              </Button>
            </div>
          )}
          {commentMode &&
            (comments && comments.length > 0 ? (
              <div className="flex flex-col gap-2  flex-1 ">
                <span className="font-semibold flex items-center gap-3">
                  Comments
                </span>
                {comments.map((comment: any, key) => (
                  <CommentCard
                    user={comment.user as TUser}
                    text={comment.text}
                    createdAt={comment.createdAt}
                  />
                ))}
              </div>
            ) : (
              <div className=" p-2 rounded-lg">
                <p className="text-center font-lato py-8 flex  gap-3 mx-auto  w-fit">
                  <MessageSquareMore />
                  Be the first to comment
                </p>
              </div>
            ))}
        </section>
        {commentMode && (
          <Button
            variant={"circleGhost"}
            className="fixed right-0 top-0 rounded-full m-0 !p-3 w-fit h-fit bg-neutral-200 "
            onClick={() => setCommentMode(false)}
          >
            <X size={15} />
          </Button>
        )}
      </Card>
    </div>
  );
}
