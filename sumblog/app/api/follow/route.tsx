import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";

export async function PUT(req: Request) {
  // check current session to get user email
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email!;
  const { targetId } = await req.json();

  // NOTE!!!: session doesn't contain ID :(
  // ONLY contains name, email, image
  const user = await prisma.user.findUnique({
    where: { email: currentUserEmail },
  });
  const currentUserId = user?.id!;

  const registerFollow = await prisma.follows.create({
    data: {
      followerUserId: currentUserId,
      followingUserId: targetId,
    },
  });
  return NextResponse.json(registerFollow);
}

export async function DELETE(req: NextRequest) {}
