"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

interface Props {
  targetId: number;
  isLiked: boolean;
}

export default function LikeClient({ targetId, isLiked }: Props) {
  const router = useRouter();
  const [fetching, setFetching] = useState(false);
  const [pending, startTransition] = useTransition();
  const mutating = fetching || pending;

  const like = async () => {
    setFetching(true);
    const res = await fetch("/api/likes", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targetId }),
    });
    setFetching(false);
    startTransition(() => {
      router.refresh();
    });
  };
  const unlike = async () => {
    setFetching(true);
    const res = await fetch(`/api/likes?targetId=${targetId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    setFetching(false);
    startTransition(() => {
      router.refresh();
    });
  };

  if (isLiked) {
    return (
      <button onClick={unlike}>
        {mutating ? (
          <Image src="/halfHeart.svg" alt="likes:" width={15} height={15} />
        ) : (
          <Image src="/filledHeart.svg" alt="likes:" width={15} height={15} />
        )}
      </button>
    );
  } else {
    return (
      <button onClick={like}>
        {mutating ? (
          <Image src="/halfHeart.svg" alt="likes:" width={15} height={15} />
        ) : (
          <Image src="/heart.svg" alt="likes:" width={15} height={15} />
        )}
      </button>
    );
  }
}
