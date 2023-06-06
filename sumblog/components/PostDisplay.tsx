"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  id: number;
  title: string | null;
  content: string | null;
  createdAt: Date;
  heartCount: number | null;
  author: { name: string | null };
}

export default function PostDisplay({
  id,
  title,
  content,
  createdAt,
  heartCount,
  author,
}: Props) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [likes, setLikes] = useState(0);
  const router = useRouter();
  const deletePost = async (id: number) => {
    const res = await fetch(`/api/post/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      router.refresh();
    } else {
      console.log(res);
      alert("error");
    }
  };

  const updatePost = async (e: React.FormEvent) => {
    const res = await fetch(`/api/post/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: newPost }),
    });
  };

  const getLikesCount = async (id: number) => {
    const res = await fetch(`/api/post/${id}/likes`);
    const data = await res.json();
    console.log(data);
    setLikes(Number(data));
  };
  useEffect(() => {
    getLikesCount(id);
  }, []);

  const f = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Singapore",
  });

  const newDate = f.format(new Date(createdAt));

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
      <ul className="flex flex-wrap rounded-t-lg border-b border-gray-200 bg-gray-50 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
        <li className="mr-2">
          <div className="inline-block p-4">
            {author["name"]} @ {newDate}
          </div>
        </li>
        <li>
          <div className="inline-block p-4">Likes: {likes}</div>
        </li>
        <button onClick={() => deletePost(id)}>DELETE</button>
        {isUpdating ? (
          <button onClick={() => setIsUpdating(false)} className="ml-1">
            cancel
          </button>
        ) : (
          <button onClick={() => setIsUpdating(true)} className="ml-1">
            UPDATE
          </button>
        )}
        {isUpdating && (
          <form onSubmit={updatePost}>
            <input
              autoFocus
              type="text"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What are your thoughts"
              className="w-1/2 border-[1px] border-zinc-400 p-4"
            />
            <button className="ml-1 w-28 rounded-full border-[1px] border-zinc-400">
              Update
            </button>
          </form>
        )}
      </ul>

      <div className="rounded-lg bg-white p-4 dark:bg-gray-800 md:p-8">
        <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="mb-3 text-gray-500 dark:text-gray-400">{content}</p>

        <Link
          href={`/posts/${id}`}
          className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700"
        >
          Read more
          <svg className="ml-1 h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"></path>
          </svg>
        </Link>
      </div>
    </div>
  );
}
