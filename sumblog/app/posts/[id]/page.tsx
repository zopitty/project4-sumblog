import AuthCheck from "@/components/AuthCheck";
import CommentDisplay from "@/components/CommentDisplay";
import CommentField from "@/components/CommentField";
import LikeServer from "@/components/LikeServer";
import { prisma } from "@/lib/prisma";

interface Props {
  params: {
    id: number;
  };
}
export default async function IndividualPostDisplay({ params }: Props) {
  const postInfo = await prisma.post.findFirst({
    where: { id: Number(params.id) },
    include: { author: true },
  });
  const f = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Singapore",
  });
  // @ts-expect-error
  const dateString = new Date(postInfo?.createdAt.toString());

  const newDate = f.format(dateString);

  const comments = await prisma.comment.findMany({
    where: {
      postId: Number(params.id),
      parentId: null,
    },
    include: {
      author: {
        select: {
          name: true,
          id: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex h-screen w-screen flex-col gap-3 p-6">
      <div className="flex items-center px-4 py-2">
        <span className="order-0 mr-2 flex w-20 flex-none flex-grow-0 flex-row justify-center rounded-md bg-purple-400 p-0 text-gray-200">
          {postInfo?.author.name}
        </span>
        <span className="font-roboto order-1 ml-2 h-5 w-screen flex-none flex-grow text-xs font-normal leading-5 text-black">
          {newDate}
        </span>
      </div>

      <div className="flex-start flex px-6 text-lg font-bold">
        {postInfo?.title}
      </div>
      <div className="px-6 font-light">{postInfo?.content}</div>
      <div className="flext flex-start pl-6">
        {/* Server Component */}
        {/* @ts-expect-error */}
        <LikeServer targetId={params.id} />
      </div>
      <div className="rounded-xl px-6 py-5 shadow-md">
        <div className="font-circular text-md font-bold">Comments</div>
        <AuthCheck>
          <CommentField postId={params.id} />
        </AuthCheck>
        {comments.map((comment) => {
          return <CommentDisplay key={comment.id} {...comment} />;
        })}
      </div>
    </div>
  );
}
