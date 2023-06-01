import PostField from "@/components/PostField";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PostDisplay from "@/components/PostDisplay";

export default async function Home() {
  // protect the route
  // const session = await getServerSession();
  // if (!session) {
  //   redirect("/api/auth/signin");
  //   // return <p>You must be signed in...</p>;
  // }
  const posts = await prisma.post.findMany({
    include: { author: true },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main>
      <PostField />
      {posts.map((post) => {
        return <PostDisplay key={post.id} {...post} />;
      })}
    </main>
  );
}
