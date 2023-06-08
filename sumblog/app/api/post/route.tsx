import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";

//adding new posts (By session ID)
export async function PUT(req: Request) {
  // get user info
  const session = await getServerSession(authOptions);
  if (!session) {
    return;
  }
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
// (end) adding new posts

// Get all posts
export async function GET(req: Request) {
  const posts = await prisma.post.findMany();
  return NextResponse.json(posts);
}
