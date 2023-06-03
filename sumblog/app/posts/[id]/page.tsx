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
    <div>
      <h1>
        A POST BY {postInfo?.author.name} Created:{" "}
        {postInfo?.createdAt.toString()}
      </h1>
      <h2>Title: {postInfo?.title}</h2>
      <h3>Content: {postInfo?.content}</h3>
      <h1>COMMENTS SECTION</h1>
    </div>
  );
}
