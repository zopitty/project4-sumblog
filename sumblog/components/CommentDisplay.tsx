"use client";

import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  id: number;
  comment: string | null;
  createdAt: Date;
  author: { name: string | null };
  userId: string;
  postId: number;
  parentId: number | null;
}

export default function CommentDisplay({
  id,
  comment,
  author,
  createdAt,
  userId,
  parentId,
  postId,
}: Props) {
  const [subComment, setSubComment] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const router = useRouter();
  const [replies, setReplies] = useState<Props[]>([]);

  const f = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Singapore",
  });

  const newDate = f.format(new Date(createdAt));

  const getReplies = async () => {
    const res = await fetch(`/api/post/${postId}/comment/${id}`, {
      cache: "no-store",
    });
    const data = await res.json();
    setReplies(data);
    console.log("GETTING ID: ", id);
  };
  const getParentReplies = async () => {
    const res = await fetch(`/api/post/${postId}/comment/${parentId}`, {
      cache: "no-store",
    });
    const data = await res.json();
    setReplies(data);
    console.log("GETTING PARENT ID: ", parentId);
  };

  const postReply = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/post/${postId}/comment`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment: subComment, parentId: id }),
    });
    if (res.status === 200) {
      setSubComment("");
      setIsReplying(false);
      getReplies();
      setReplies([]);
    } else {
      console.log(res);
      alert("error");
    }
  };
  const deleteComment = async (id: number) => {
    const res = await fetch(`/api/post/${postId}/comment/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (res.status === 200) {
      setReplies((prevComments) => {
        return prevComments.filter((comment) => comment.id !== id);
      });

      // const res = await fetch(`/api/post/${postId}/comment/${id}`, {
      //   cache: "no-store",
      // });
      // const data = await res.json();
      if (parentId) {
        window.location.reload();
      }
      setReplies([]);
      // setReplies((prevComments) =>
      //   prevComments.filter((comment) => comment.id !== id)
      // );
      getParentReplies();
      console.log("DELETE ID: ", id);
      console.log(replies);
      router.refresh();
    } else {
      console.log(res);
      alert("error");
    }
  };

  useEffect(() => {
    getReplies();
  }, []);

  return (
    <div className="flex flex-col border-[1px] border-zinc-400 p-3">
      <span>
        {author.name} @ {newDate}{" "}
        <button
          onClick={() => deleteComment(id)}
          className="w-28 rounded-full border-[1px] border-zinc-400"
        >
          DELETE
        </button>
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

      {replies.map((reply) => {
        return (
          <div key={reply.id} className="mt-2">
            <CommentDisplay {...reply} />
          </div>
        );
      })}
    </div>
  );
}
