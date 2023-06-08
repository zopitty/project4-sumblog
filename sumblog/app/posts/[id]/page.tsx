import CommentDisplay from "@/components/CommentDisplay";
import CommentField from "@/components/CommentField";
import LikeServer from "@/components/LikeServer";
import { prisma } from "@/lib/prisma";

interface Props {
  params: {
    id: number;
  };
}
interface Comment {
  comment: string;
  id: number;
  createdAt: Date;
}
export default async function IndividualPostDisplay({ params }: Props) {
  const postInfo = await prisma.post.findFirst({
    where: { id: Number(params.id) },
    include: { author: true },
  });
  // const res = await fetch(`/api/post/${params.id}/comment`);
  // const comments: Comment[] = await res.json();
  const comments = await prisma.comment.findMany({
    where: {
      postId: Number(params.id),
      parentId: null,
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
  // console.log(comments[0]);

  return (
    <div className="flex h-screen w-screen flex-col gap-3 p-6">
      {/* @ts-expect-error */}
      <LikeServer targetId={params.id} />
      <span className="text-1xl">
        a post by {postInfo?.author.name} Created:{" "}
        {postInfo?.createdAt.toString()}
      </span>
      <h2>Title: {postInfo?.title}</h2>
      <h3>Content: {postInfo?.content}</h3>
      <h1>COMMENTS SECTION</h1>
      <CommentField postId={params.id} />
      {comments.map((comment) => {
        return <CommentDisplay key={comment.id} {...comment} />;
      })}
    </div>
  );
}
