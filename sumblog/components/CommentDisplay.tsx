"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  id: number;
  comment: string | null;
  createdAt: Date;
  author: { name: string | null };
  userId: string;
  postId: number;
}

export default function CommentDisplay({
  id,
  comment,
  author,
  createdAt,
  userId,
  postId,
}: Props) {
  const [subComment, setSubComment] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const router = useRouter();
  const [replies, setReplies] = useState<Props[]>([]);

  // const f = new Intl.DateTimeFormat("en-GB", {
  //   dateStyle: "short",
  //   timeStyle: "short",
  //   timeZone: "Singapore",
  // });

  // const newDate = f.format(createdAt);

  const postReply = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/post/${postId}/comment`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment: subComment, parentId: id }),
    });
    if (res.status === 200) {
      console.log(replies);
      setSubComment("");
      setIsReplying(false);
      router.refresh();
    } else {
      console.log(res);
      alert("error");
    }
  };

  const getReplies = async () => {
    const res = await fetch(`/api/post/${postId}/comment/${id}`);
    const data = await res.json();
    setReplies(data);
  };

  useEffect(() => {
    getReplies();
  }, [postReply]);

  return (
    <div className="flex flex-col border-[1px] border-zinc-400 p-3">
      <span>
        {author.name} @ {createdAt.toString()}
      </span>
      <span>{comment}</span>
      {isReplying ? (
        <button
          onClick={() => setIsReplying(false)}
          className="w-28 rounded-full border-[1px] border-zinc-400"
        >
          cancel
        </button>
      ) : (
        <button
          onClick={() => setIsReplying(true)}
          className="w-28 rounded-full border-[1px] border-zinc-400"
        >
          reply
        </button>
      )}
      {isReplying && (
        <form onSubmit={postReply} className="flex flex-col gap-2">
          <input
            autoFocus
            type="text"
            value={subComment}
            onChange={(e) => setSubComment(e.target.value)}
            placeholder="What are your thoughts"
            className="w-1/2 border-[1px] border-zinc-400 p-4"
          />
          <button className="w-28 rounded-full border-[1px] border-zinc-400">
            Comment
          </button>
        </form>
      )}
      {replies?.length > 0 && (
        <div className="mt-2">
          {replies.map((reply) => {
            return <CommentDisplay key={reply.id} {...reply} />;
          })}
        </div>
      )}
    </div>
  );
}
