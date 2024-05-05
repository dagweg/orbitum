import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Ellipsis, ThumbsUp, MessageSquareText, Share2 } from "lucide-react";
import React from "react";
import AvatarWrapper from "./avatar-wrapper";

export default function Post() {
  return (
    <Card className="flex flex-col gap-3 items-center p-3 ">
      <section className="flex justify-between w-full">
        <AvatarWrapper name="Dagmawi Wegayehu" date={new Date()} />
        <Button variant={"ghost"}>
          <Ellipsis />
        </Button>
      </section>
      <section className="w-full">
        <div className="bg-neutral-100 h-[400px] w-full"></div>
        {/* <image
            href=""
            width={200}
            height={300}
            className="w-full h-[400px] bg-neutral-100"
          ></image> */}
      </section>
      <section className="w-full space-y-3">
        <div className="flex -space-x-2 border-b-2 pb-2">
          {["😂", "👍", "😔"].map((em, i) => {
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
          7K
        </div>
        <div className="flex gap-3 justify-between">
          <Button variant={"ghost"} className="flex items-center gap-3">
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
