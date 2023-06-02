import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";

//adding new posts (By session ID)
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

//updating posts (by user ID/Post id)
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const data = await req.json();
  // data.xxx = Number(data.xxx), if database expecting number, ie want to patch number

  // console.log(data);
  const user = await prisma.post.update({
    where: {
      id: Number(id),
    },
    data,
  });

  return NextResponse.json(user);
}
