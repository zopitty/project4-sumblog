import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { redirect } from "next/navigation";

// updating posts (by user ID/Post id)
// note: usually PUT is to replace the whole thing
// PATCH just the bits that you want updated
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
  // by default, when you do this prisma will patch instead of doing PUT
  // set data to null if you don't want
  // eg. data: {name: data.name || null}
  // reminder: need to ensure the fields are required in the input
  return NextResponse.json(user);
}

//Delete Post
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return;
  }
  const currentUserEmail = session?.user?.email!;
  const user = await prisma.user.findUnique({
    where: {
      email: currentUserEmail,
    },
  });
  const currentUserId = user?.id!;
  const currentUserRole = user?.role;
  const post = await prisma.post.findUnique({
    where: { id: Number(params.id) },
    select: { userId: true },
  });
  if (currentUserId === post?.userId || currentUserRole === "admin") {
    const deleted = await prisma.post.delete({
      where: {
        id: Number(params.id),
      },
    });

    return NextResponse.json(deleted);
  }
}
