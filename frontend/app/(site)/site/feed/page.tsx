import { getPosts } from "@/app/actions/posts";
import Heading from "@/app/components/heading";
import Post from "@/app/components/post";
import PostInput from "@/app/components/post-input";
import { SESSION_TOKEN } from "@/app/config/constants";
import { TPostSchema, TUserSchema } from "@/lib/types/schema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function FeedPage() {
  const cookieStore = cookies();

  const sessionToken = cookieStore.get(SESSION_TOKEN)?.value;
  const posts: TPostSchema[] = await getPosts(sessionToken);

  if (!sessionToken) {
    redirect("/auth/login");
  }

  return (
    <div className="flex w-full justify-center bg-white">
      <div className="w-[600px] mx-auto  h-screen px-4 py-2 flex flex-col gap-3">
        <Heading>Feed</Heading>
        <PostInput />
        {posts.length > 0 &&
          posts.map((post: TPostSchema, key: number) => (
            <Post
              postId={post._id}
              key={key}
              user={post.user as any as TUserSchema}
              date={new Date(post.createdAt)}
              content={post.content}
              likes={post.likes}
              comments={post.comments}
              shares={post.shares}
            />
          ))}
      </div>
    </div>
  );
}

export default FeedPage;
