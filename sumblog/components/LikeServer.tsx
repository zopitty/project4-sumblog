import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import LikeClient from "./LikeClient";

interface Props {
  targetId: number;
}

export default async function LikeServer({ targetId }: Props) {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findFirst({
    where: { email: session?.user?.email },
  });
  const currentUserId = user?.id;
  const isLiked = await prisma.likes.findFirst({
    where: { userId: currentUserId, postId: Number(targetId) },
  });

  return <LikeClient targetId={targetId} isLiked={!!isLiked} />;
}
