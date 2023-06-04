// export const revalidate = 0;
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EditProfile from "./EditProfile";

export default async function Dashboard() {
  // access session (check if session still valid)
  // authOptions needs to be passed in (NextAuth Docs)
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  // throwing me errors without '!' pls stop
  const currentUserEmail = session?.user?.email!;
  const user = await prisma.user.findUnique({
    where: {
      email: currentUserEmail,
    },
  });
  const currentUserId = user?.id!;

  // access following & follower count
  const countFollowing = await prisma.follows.count({
    where: { followerUserId: currentUserId },
  });
  const countFollowers = await prisma.follows.count({
    where: { followingUserId: currentUserId },
  });

  return (
    <>
      <h1>Dashboard</h1>
      <h2>
        FOLLOWING: {countFollowing} FOLLOWERS: {countFollowers}
      </h2>
      <EditProfile user={user} />
    </>
  );
}
