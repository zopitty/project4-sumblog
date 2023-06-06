import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string; commentId: string };
}

// { params: { id: string; commentId: string } }
export async function GET(req: Request, { params: { id, commentId } }: Props) {
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
  return NextResponse.json(data);
}

export async function DELETE(
  req: NextRequest,
  { params: { id, commentId } }: Props
) {
  const deleted = await prisma.comment.delete({
    where: {
      id: Number(commentId),
    },
  });
  const path = req.nextUrl.pathname;
  revalidatePath(path);
  return NextResponse.json(deleted);
}
