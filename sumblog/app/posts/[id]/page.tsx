import Comments from "@/components/Comments";
import { prisma } from "@/lib/prisma";

interface Props {
  params: {
    id: number;
  };
}

export default async function IndividualPostDisplay({ params }: Props) {
  const postInfo = await prisma.post.findUnique({
    where: { id: Number(params.id) },
    include: { author: true },
  });

  return (
    <div className="flex h-screen w-screen flex-col gap-3 p-6">
      <span className="text-1xl">
        A POST BY {postInfo?.author.name} Created:{" "}
        {postInfo?.createdAt.toString()}
      </span>
      <h2>Title: {postInfo?.title}</h2>
      <h3>Content: {postInfo?.content}</h3>
      <h1>COMMENTS SECTION</h1>
      <Comments />
    </div>
  );
}
