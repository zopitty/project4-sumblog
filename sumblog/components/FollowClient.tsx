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
    const res = await fetch(`/api/follow?targetUserId=${targetId}`, {
      method: "DELETE",
    });
    console.log(res);
    router.refresh();
  };

  if (isFollowing) {
    return <button onClick={unfollow}>{`Unfollow`}</button>;
  } else {
    return <button onClick={follow}>{`Follow`}</button>;
  }
}
