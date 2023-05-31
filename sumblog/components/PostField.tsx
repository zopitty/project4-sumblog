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
    console.log(res);
    setContent("");
    setTitle("");
    router.refresh();
  };
  return (
    <div>
      <h3>Create Post</h3>
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button onClick={() => postData()}>Post!!!</button>
    </div>
  );
}
