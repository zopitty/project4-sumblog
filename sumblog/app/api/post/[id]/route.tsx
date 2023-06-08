import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { redirect } from "next/navigation";

// updating posts (by user ID/Post id)
// note: usually PUT is to replace the whole thing
// PATCH just the bits that you want updated

// Update Post
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
    });
  }
  const currentUserEmail = session?.user?.email!;
  const user = await prisma.user.findUnique({
    where: {
      email: currentUserEmail,
    },
  });
  const currentUserId = user?.id!;
  const post = await prisma.post.findFirst({
    where: { id: Number(params.id) },
    select: { userId: true },
  });
  const data = await req.json();
  // ensure only user that posted can update
  if (currentUserId === post?.userId) {
    const updated = await prisma.post.update({
      where: {
        id: Number(params.id),
      },
      data,
    });
    // by default, when you do this prisma will patch instead of doing PUT
    // set data to null if you don't want
    // eg. data: {name: data.name || null}
    // reminder: need to ensure the fields are required in the input
    return NextResponse.json(updated);
  } else {
    return new NextResponse(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
    });
  }
}
// (end) Update Post

//Delete Post
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse(JSON.stringify({ error: "no session" }), {
      status: 401,
    });
  }
  const currentUserEmail = session?.user?.email!;
  const user = await prisma.user.findUnique({
    where: {
      email: currentUserEmail,
    },
  });
  const currentUserId = user?.id!;
  const currentUserRole = user?.role;
  const post = await prisma.post.findFirst({
    where: { id: Number(params.id) },
    select: { userId: true },
  });
  // ensure only user that posted or admin can delete
  if (currentUserId === post?.userId || currentUserRole === "admin") {
    const deleted = await prisma.post.delete({
      where: {
        id: Number(params.id),
      },
    });
    return NextResponse.json(deleted);
  } else {
    return new NextResponse(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
    });
  }
}
// (end) Delete Post
