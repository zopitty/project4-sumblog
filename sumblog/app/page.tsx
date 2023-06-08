import PostField from "@/components/PostField";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import PostDisplay from "@/components/PostDisplay";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function Home() {
  const posts = await prisma.post.findMany({
    include: { author: true },
    orderBy: {
      createdAt: "desc",
    },
  });

  const session = await getServerSession(authOptions);

  return (
    <main>
      {session ? (
        <PostField />
      ) : (
        <div className="font-circular order-0 flex flex-none flex-grow-0 px-14 text-lg font-medium leading-7 text-black">
          Hey, you!
          <span className="ml-1 mr-1 text-purple-400">
            <Link href="/api/auth/signin">Log in</Link>
          </span>
          to start posting
        </div>
      )}
      {posts.map((post) => {
        return <PostDisplay key={post.id} {...post} />;
      })}
    </main>
  );
}
