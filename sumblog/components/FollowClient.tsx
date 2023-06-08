"use client";

import { useRouter } from "next/navigation";

interface Props {
  targetId: string;
  isFollowing: boolean | null;
}

export default function FollowClient({ targetId, isFollowing }: Props) {
  const router = useRouter();

  const follow = async () => {
    const res = await fetch("/api/follow", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ targetId }),
    });
    console.log(res);
    router.refresh();
  };

  const unfollow = async () => {
    const res = await fetch(`/api/follow?targetId=${targetId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    console.log(res);
    router.refresh();
  };

  if (isFollowing) {
    return (
      <button
        onClick={unfollow}
        className="inline-flex items-center rounded-lg bg-red-400 px-4 py-2 text-center text-sm font-medium text-white hover:bg-red-300 focus:outline-none focus:ring-4 focus:ring-purple-300"
      >{`Unfollow`}</button>
    );
  } else {
    return (
      <button
        onClick={follow}
        className="inline-flex items-center rounded-lg bg-gray-900 px-4 py-2 text-center text-sm font-medium text-white hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-purple-300"
      >{`Follow`}</button>
    );
  }
}
