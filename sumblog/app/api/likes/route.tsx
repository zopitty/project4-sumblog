import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email!;
  const { targetId } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: currentUserEmail },
  });
  const currentUserId = user?.id!;

  const registerLike = await prisma.likes.create({
    data: {
      userId: currentUserId,
      postId: Number(targetId),
    },
  });
  return NextResponse.json(registerLike);
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email!;
  const targetId = req.nextUrl.searchParams.get("targetId");

  const user = await prisma.user.findUnique({
    where: { email: currentUserEmail },
  });
  const currentUserId = user?.id!;

  const registerUnlike = await prisma.likes.delete({
    where: {
      userId_postId: {
        userId: currentUserId,
        postId: Number(targetId),
      },
    },
  });
  return NextResponse.json(registerUnlike);
}
