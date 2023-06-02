export const revalidate = 0;
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EditProfile from "./EditProfile";

export default async function Dashboard() {
  // access session (check if session still valid)
  // authOptions needs to be passed in (from NextAuth Docs)
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }
  // throwing me errors without '!' pls stop
  const currentUserEmail = session?.user?.email!;
  const user = await prisma.user.findUnique({
    where: {
      email: currentUserEmail,
    },
  });
  const currentUserId = user?.id!;
  const countFollowing = await prisma.follows.count({
    where: { followerUserId: currentUserId },
  });
  const countFollowers = await prisma.follows.count({
    where: { followingUserId: currentUserId },
  });

  console.log(countFollowers);

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
