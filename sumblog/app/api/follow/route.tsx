import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";

// create Follow relation
export async function PUT(req: Request) {
  // access user
  const session = await getServerSession(authOptions);
  // const currentUserEmail = session?.user?.email!;
  const { targetId } = await req.json();

  // NOTE!!!: session doesn't contain ID :(
  // ONLY contains name, email, image
  // --> ADDED IN VIA NEXTAUTH CALLBACK KEK

  // @ts-expect-error
  const currentUserId = session?.user?.id!;
  // (end) access user

  const registerFollow = await prisma.follows.create({
    data: {
      followerUserId: currentUserId,
      followingUserId: targetId,
    },
  });
  return NextResponse.json(registerFollow);
}
// (end) create Follow creation

// remove Follow relation
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email!;
  const targetId = req.nextUrl.searchParams.get("targetId");

  const user = await prisma.user.findUnique({
    where: { email: currentUserEmail },
  });
  const currentUserId = user?.id!;
  const removeFollow = await prisma.follows.delete({
    where: {
      followerUserId_followingUserId: {
        followerUserId: currentUserId,
        followingUserId: targetId!,
      },
    },
  });
  return NextResponse.json(removeFollow);
}
// (end) Follow relation
