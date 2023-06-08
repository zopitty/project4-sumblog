import PostField from "@/components/PostField";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PostDisplay from "@/components/PostDisplay";
import AuthCheck from "@/components/AuthCheck";

export default async function Home() {
  const posts = await prisma.post.findMany({
    include: { author: true },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main>
      <AuthCheck>
        <PostField />
      </AuthCheck>
      {posts.map((post) => {
        return <PostDisplay key={post.id} {...post} />;
      })}
    </main>
  );
}
