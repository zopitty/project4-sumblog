"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PostField() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const postData = async () => {
    const res = await fetch("/api/post", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });
    if (res.status === 200) {
      setContent("");
      setTitle("");
      router.refresh();
    } else {
      console.log(res);
      alert("error");
    }
  };
  return (
    <div>
      <h3>Create Post</h3>
      <div>
        <input
          type="text"
          placeholder="Title"
          id="small-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="sm:text-M block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        />
      </div>
      <div className="mb-4 w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700">
        <div className="rounded-t-lg bg-white px-4 py-2 dark:bg-gray-800">
          <textarea
            id="comment"
            rows={4}
            className="w-full border-0 bg-white px-0 text-sm text-gray-900 focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
            placeholder="Write a post..."
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="flex items-center justify-between border-t px-3 py-2 dark:border-gray-600">
          <button
            onClick={() => postData()}
            className="inline-flex items-center rounded-lg bg-blue-700 px-4 py-2.5 text-center text-xs font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900"
          >
            Post!!
          </button>
        </div>
      </div>
    </div>
  );
}
