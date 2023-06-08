"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function PostField() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [fetching, setFetching] = useState(false);

  const router = useRouter();

  const postData = async (e: React.FormEvent) => {
    e.preventDefault();

    setFetching(true);
    const res = await fetch("/api/post", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });
    if (res.status === 200) {
      setFetching(false);
      setContent("");
      setTitle("");
      router.refresh();
    } else {
      console.log(res);
      alert("error posting, chrome console");
    }
  };
  return (
    <div className="w-1300 h-387 order-0 pt-13 flex flex-none flex-grow-0 flex-col items-center gap-16 rounded-lg bg-gray-200 px-12">
      <form
        onSubmit={postData}
        className="w-1216 h-291 order-0 flex flex-none flex-grow-0 flex-col items-start gap-2 self-stretch rounded-xl p-10 shadow-lg"
      >
        <div className="w-1216 order-1 flex h-7 flex-none flex-grow-0 flex-row items-start gap-2 p-0">
          <span className="w-141 font-circular order-0 h-7 flex-none flex-grow-0 font-medium text-black">
            Write a post.
          </span>
        </div>
        <div className="w-1216 order-2 flex flex-none flex-grow-0 flex-col items-start gap-2 self-stretch p-0">
          <input
            className="w-1216 order-0 flex flex-none flex-grow-0 flex-col items-start gap-2 self-stretch rounded-lg  bg-white  p-2"
            type="text"
            placeholder="Title"
            id="small-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="order-0 flex flex-row items-center gap-2 self-stretch rounded-lg bg-white p-3"
            id="comment"
            rows={2}
            placeholder="Write a post..."
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        {fetching ? (
          <button
            disabled
            className="w-91 w-51 font-circular order-0 order-3 mt-1 flex h-6 flex-none flex-grow-0 flex-row items-center justify-center gap-2 rounded-lg border border-gray-600 bg-gray-600 p-2 text-base font-medium leading-6 text-white"
          >
            wait.
          </button>
        ) : (
          <button className="w-91 w-51 font-circular order-0 order-3 mt-1 flex h-6 flex-none flex-grow-0 flex-row items-center justify-center gap-2 rounded-lg border border-black bg-black p-3 text-xs font-medium leading-6 text-white">
            Post it!
          </button>
        )}
      </form>
    </div>
  );
}
