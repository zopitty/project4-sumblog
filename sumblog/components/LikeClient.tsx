"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  targetId: number;
  isLiked: boolean;
}

export default function LikeClient({ targetId, isLiked }: Props) {
  const router = useRouter();

  const like = async () => {
    const res = await fetch("/api/likes", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targetId }),
    });
    router.refresh();
  };
  const unlike = async () => {
    const res = await fetch(`/api/likes?targetId=${targetId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    router.refresh();
  };

  if (isLiked) {
    return (
      <button onClick={unlike}>
        <Image src="/filledHeart.svg" alt="likes:" width={15} height={15} />
      </button>
    );
  } else {
    return (
      <button onClick={like}>
        <Image src="/heart.svg" alt="likes:" width={15} height={15} />
      </button>
    );
  }
}
