import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import FollowClient from "./FollowClient";
// check if they are following a certain user
interface Props {
  targetId: string;
}

export default async function FollowServer({targetId}: Props) {
  const session = await getServerSession(authOptions);

  //can do this instead to get current user
  const currentUserId = await prisma.user
    .findFirst({
      where: { email: session?.user?.email },
    })
    .then((user) => user?.id);

  // check for match, then convert into a boolean value
  // unique following+follower
  const isFollowing = await prisma.follows.findFirst({
    where: { followerUserId: currentUserId, followingUserId: targetId },
  });

  return <FollowClient targetId={targetId} isFollowing={!!isFollowing} />;
}
