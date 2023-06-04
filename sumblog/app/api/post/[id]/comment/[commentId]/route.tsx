import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params: { id, commentId } }: { params: { id: string; commentId: string } }
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
  return NextResponse.json(data);
}
