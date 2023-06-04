import CommentField from "@/components/CommentField";
import { prisma } from "@/lib/prisma";

interface Props {
  params: {
    id: number;
  };
}
interface Comment {
  comment: string;
  id: number;
}
export default async function IndividualPostDisplay({ params }: Props) {
  const postInfo = await prisma.post.findUnique({
    where: { id: Number(params.id) },
    include: { author: true },
  });
  // const res = await fetch(`/api/post/${params.id}/comment`);
  // const comments: Comment[] = await res.json();
  const comments = await prisma.comment.findMany({
    where: {
      postId: Number(params.id),
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
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
      <CommentField postId={params.id} />

      {comments.map((comment) => {
        return (
          <div className="border-[1px] border-zinc-400" key={comment.id}>
            {comment.comment} BY {comment.author.name}
          </div>
        );
      })}
    </div>
  );
}
