"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  postId: number;
}
export default function CommentField({ postId }: Props) {
  const [comment, setComment] = useState("");
  const router = useRouter();

  const postComment = async () => {
    const res = await fetch(`/api/post/${postId}/comment`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment }),
    });
    if (res.status === 200) {
      setComment("");
      router.refresh();
    } else {
      console.log(res);
      alert("error");
    }
  };
  return (
    <>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="What are your thoughts"
        className="w-1/2 border-[1px] border-zinc-400 p-4"
      />
      <button
        className="w-28 rounded-full border-[1px] border-zinc-400"
        onClick={() => postComment()}
      >
        Comment
      </button>
    </>
  );
}
