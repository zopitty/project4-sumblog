import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import PostDisplay from "@/components/PostDisplay";

export default async function Stalker() {
  // access user -> find an easier way to do this
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/register");
  }
  const currentUserEmail = session?.user?.email!;
  const user = await prisma.user.findUnique({
    where: {
      email: currentUserEmail,
    },
  });
  const currentUserId = user?.id!;
  // (end) access user

  // access following's post
  const postsByFollowing = await prisma.post.findMany({
    where: {
      author: {
        following: {
          some: {
            followerUserId: currentUserId,
          },
        },
      },
    },
    include: { author: true },
    orderBy: {
      createdAt: "desc",
    },
  });
  // (end) access following's post

  return (
    <>
      {postsByFollowing.length === 0 && (
        <div className="flex-start flex flex-wrap px-48 py-4 text-gray-500">
          FOLLOW SOMEONE!/No posts yet..
        </div>
      )}
      {postsByFollowing.map((post) => {
        return <PostDisplay key={post.id} {...post} />;
      })}
    </>
  );
}
