// export const revalidate = 0;
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EditProfile from "./EditProfile";
import Link from "next/link";

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
    <div className="flex w-screen items-center justify-center">
      <div className="flex max-w-xl flex-col items-center rounded-xl p-10 shadow-md">
        <div className="py-2 text-xl font-bold">Dashboard</div>
        <div className="pb-5 font-semibold">
          <Link href="/following">FOLLOWING: {countFollowing}</Link>{" "}
          <Link href="/followers">FOLLOWERS: {countFollowers}</Link>
        </div>
        <EditProfile user={user} />
      </div>
    </div>
  );
}
