"use client";

import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthCheck from "./AuthCheck";
import { useSession } from "next-auth/react";

interface Props {
  id: number;
  comment: string | null;
  createdAt: Date;
  author: { name: string | null; id: string };
  postId: number;
  parentId: number | null;
  onChildDelete?: () => Promise<void> | null;
}

export default function CommentDisplay({
  id,
  comment,
  author,
  createdAt,
  parentId,
  postId,
  onChildDelete,
}: Props) {
  const [subComment, setSubComment] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const router = useRouter();
  const [replies, setReplies] = useState<Props[]>([]);
  // callback from next-auth puts in the id & role
  const { data: session } = useSession();
  // @ts-expect-error
  console.log(session?.user?.id);

  const f = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Singapore",
  });
  const newDate = f.format(new Date(createdAt));

  const getReplies = async () => {
    const res = await fetch(`/api/post/${postId}/comment/${id}`);
    const data = await res.json();
    setReplies(data);
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
    console.log(postId, id);
    const res = await fetch(`/api/post/${postId}/comment/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (res.status === 200) {
      setReplies((prevComments) => {
        return prevComments.filter((comment) => comment.id !== id);
      });
      router.refresh();
      if (onChildDelete) {
        onChildDelete();
      }
    } else {
      console.log(res);
      alert("error");
    }
  };

  useEffect(() => {
    getReplies();
  }, []);

  return (
    <div className="flex flex-col border-l-[1px] border-zinc-300 p-3">
      <span className="pb-1">
        <div className="flex items-center p-0">
          <span className="order-0 mr-2 flex w-20 flex-none flex-grow-0 flex-row justify-center rounded-md bg-purple-400 p-0 text-sm text-gray-200">
            {author.name}
          </span>
          <span className="font-roboto h-5 text-xs font-normal leading-5 text-black">
            {newDate}
          </span>
          {/* prettier-ignore */}
          <AuthCheck>
            {/* @ts-expect-error */}
            {(author.id === session?.user?.id || session?.user?.role === "admin") && (
                <button
                  onClick={() => deleteComment(id)}
                  className="ml-2 w-20 rounded-full border-[1px] border-purple-400 text-xs"
                >
                  DELETE
                </button>
              )}
          </AuthCheck>
        </div>
      </span>

      <span className="ml-2 pb-2 pt-1">{comment}</span>
      <AuthCheck>
        {isReplying ? (
          <button
            onClick={() => setIsReplying(false)}
            className="w-24 rounded-full border-[1px] border-purple-400 text-sm"
          >
            cancel
          </button>
        ) : (
          <button
            onClick={() => setIsReplying(true)}
            className="w-24 rounded-full border-[1px] border-purple-400 text-sm"
          >
            Reply
          </button>
        )}
        {isReplying && (
          <form onSubmit={postReply} className="flex flex-col gap-2 pt-1">
            <input
              autoFocus
              type="text"
              value={subComment}
              onChange={(e) => setSubComment(e.target.value)}
              placeholder="What are your thoughts"
              className="w-1/2 border-[1px] border-zinc-400 p-4"
            />
            <button className="w-28 rounded-full border-[1px] border-zinc-400 text-sm">
              Comment
            </button>
          </form>
        )}
      </AuthCheck>
      {replies.map((reply) => {
        return (
          <div key={reply.id} className="ml-3 mt-2">
            <CommentDisplay {...reply} onChildDelete={getReplies} />
          </div>
        );
      })}
    </div>
  );
}
