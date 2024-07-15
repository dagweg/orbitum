"use client";

import Heading from "@/app/components/heading";
import Post from "@/app/components/post";
import PostInput from "@/app/components/post-input";
import useSocket from "@/app/hooks/useSocket";
import { TImagePost } from "@/app/types";
import { getAllPosts } from "@/lib/redux/slices/post/postThunks";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { IPostSchema, TUserSchema } from "@/lib/types/schema";
import { base64ToBlob } from "@/util/file";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function FeedPage() {
  const posts: IPostSchema[] = useSelector((state: RootState) => state.Posts);
  const dispatch = useDispatch<AppDispatch>();

  useSocket("chat", (data) => {
    console.log("received socketserver data ", data);
  });

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  const testImages: TImagePost[] = [
    {
      url: "https://imgur.com/TUTGvNF.png",
    },
    {
      url: "https://imgur.com/MPm3aok.png",
    },
    {
      url: "https://imgur.com/H2Ar0as.png",
    },
    {
      url: "https://imgur.com/gkAxMj7.png",
    },
    {
      url: "https://imgur.com/TnQ2stP.png",
    },
    {
      url: "https://imgur.com/mNkCX9W.png",
    },
  ];
  // console.log(posts);
  return (
    <div className="flex w-full justify-center bg-white h-screen overflow-y-scroll no-scrollbar">
      <div className="w-[600px] mx-auto  px-4 py-2 flex flex-col gap-3">
        <Heading>Feed</Heading>
        <PostInput />
        {/* <Post
          comments={[]}
          content="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis veniam officiis quis ducimus ea dolorem! Accusamus voluptatum dolorem eius fugiat? Eveniet dolores corporis praesentium, molestiae quia quo consequuntur! Et dicta, recusandae ratione impedit accusantium illo consequatur officiis quasi pariatur alias earum sit placeat. Dolore suscipit sunt nisi quaerat deleniti at!"
          date={new Date()}
          likes={[]}
          postId={""}
          user={{ userName: "Dagmawi Tefera" } as TUserSchema}
          shares={[]}
          liked
          images={testImages}
        /> */}
        {posts.length > 0 &&
          posts.map((post: IPostSchema, key: number) => (
            <Post
              postId={post._id}
              key={key}
              user={post.user as any as TUserSchema}
              date={new Date(post.createdAt)}
              content={post.content}
              likes={post.likes}
              likes_count={post.likes_count}
              liked={post.liked as boolean}
              comments={post.comments}
              shares={post.shares}
              images={post.images.map((image, key) => {
                return {
                  url: URL.createObjectURL(
                    base64ToBlob(image.base64, image.type)
                  ),
                };
              })}
              videos={post.videos}
            />
          ))}
      </div>
    </div>
  );
}

export default FeedPage;
