import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string; commentId: string };
}

//comments with Parents
export async function GET(
  req: NextRequest,
  { params: { id, commentId } }: Props
) {
  const data = await prisma.comment.findMany({
    where: {
      parentId: Number(commentId),
      postId: Number(id),
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  const path = req.nextUrl.pathname;
  revalidatePath(path);
  return NextResponse.json(data);
}
//(end) comments with Parents

//delete comment
export async function DELETE(
  req: NextRequest,
  { params: { id, commentId } }: Props
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
  const currentUserRole = user?.role;
  const comment = await prisma.comment.findFirst({
    where: { id: Number(id) },
    select: { userId: true },
  });
  // ensure only user that commented or admin can delete
  if (currentUserId === comment?.userId || currentUserRole === "admin") {
    const deleted = await prisma.comment.delete({
      where: {
        id: Number(commentId),
      },
    });
    const path = req.nextUrl.pathname;
    revalidatePath(path);
    return NextResponse.json(deleted);
  } else {
    return new NextResponse(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
    });
  }
}
//(end) delete comment
