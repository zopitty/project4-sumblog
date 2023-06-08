"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  postId: number;
}
export default function CommentField({ postId }: Props) {
  const [comment, setComment] = useState("");
  const router = useRouter();
  const [sending, setSending] = useState(false);

  const postComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const res = await fetch(`/api/post/${postId}/comment`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment }),
    });
    if (res.status === 200) {
      setSending(false);
      setComment("");
      router.refresh();
    } else {
      console.log(res);
      alert("error");
    }
  };
  return (
    <form onSubmit={postComment} className="flex flex-col gap-2 pb-2">
      <div className="pt-4">
        <input
          required
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full rounded-lg border-[1px] border-zinc-400 p-4"
        />
      </div>
      {sending ? (
        <button
          disabled
          className="w-28 rounded-full border-[1px] border-zinc-400"
        >
          wait.
        </button>
      ) : (
        <button className="w-28 rounded-full border-[1px] border-purple-400">
          Comment
        </button>
      )}
    </form>
  );
}
