"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import AuthCheck from "./AuthCheck";
import { useSession } from "next-auth/react";

interface Props {
  id: number;
  title: string | null;
  content: string | null;
  createdAt: Date;
  author: { name: string | null; id: string };
}

export default function PostDisplay({
  id,
  title,
  content,
  createdAt,
  author,
}: Props) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [likes, setLikes] = useState(0);
  const router = useRouter();
  // callback from next-auth puts in the id & role
  const { data: session } = useSession();

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
      alert("You are not authorized");
    }
  };

  const updatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/post/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: newPost }),
    });
    if (res.status === 200) {
      setIsUpdating(false);
      setNewPost("");
      router.refresh();
    } else {
      alert("You are not authorized");
    }
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
    <div className="px-12 py-4">
      <div className="w-full rounded-lg border border-gray-200 bg-gray-200 shadow-md">
        <div className="bg-gray-150 flex flex-wrap rounded-t-lg border-b border-gray-300 text-center text-sm font-medium text-gray-500">
          <div className="mr-2">
            <div className="flex items-center px-4 py-2">
              <span className="order-0 mr-2 flex h-7 w-20 flex-none flex-grow-0 flex-row justify-center rounded-md bg-purple-400 p-1 text-gray-200">
                <Link href={`/users/${author.id}`}>{author["name"]}</Link>
              </span>
              <span className="w-1119 font-roboto order-1 h-5 flex-none flex-grow text-xs font-normal leading-5 text-black">
                {newDate}
              </span>
            </div>
          </div>
          {/* prettier-ignore */}
          <AuthCheck>
            {/* @ts-expect-error */}
            {(author.id === session?.user?.id || session?.user?.role === "admin") && (
              <div className="absolute right-20 flex pt-3">
                <button onClick={() => deletePost(id)}>DELETE</button>
              </div>
            )}
          </AuthCheck>
        </div>

        <div className="flex flex-col rounded-lg bg-gray-200 px-5 py-2">
          <div className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900">
            {title}
          </div>
          <div className="mb-3 truncate text-gray-500 dark:text-gray-400">
            {content}

            <AuthCheck>
              {/* @ts-expect-error */}
              {author.id === session?.user?.id && (
                <div className="flex-none text-xs">
                  {isUpdating ? (
                    <button
                      onClick={() => setIsUpdating(false)}
                      className="ml-1"
                    >
                      Cancel
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsUpdating(true)}
                      className=" text-black"
                    >
                      (click HERE to update)
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
                </div>
              )}
            </AuthCheck>
          </div>
          <Link
            href={`/posts/${id}`}
            className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700"
          >
            Read more
            <svg
              className="ml-1 h-6 w-6"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
            </svg>
          </Link>
          <div className="flex items-center">
            <span className="font-roboto order-1 flex-none flex-grow-0 py-4 text-xs font-normal text-black">
              {likes} likes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
