import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextApiRequest } from "next";

export async function PUT(req: Request) {
  // get user info
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email!;
  const user = await prisma.user.findUnique({
    where: { email: currentUserEmail },
  });
  const currentUserId = user?.id!;

  const { title, content } = await req.json();

  const registerPost = await prisma.post.create({
    data: {
      userId: currentUserId,
      title: title,
      content: content,
    },
  });
  return NextResponse.json(registerPost);
}
