import { prisma } from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string; commentId: string };
}

// { params: { id: string; commentId: string } }
export async function GET(
  req: NextRequest,
  { params: { id, commentId } }: Props
) {
  // const tag = req.nextUrl.searchParams.get("tag");
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
  // revalidateTag(tag as any);
  // { revalidated: true, now: Date.now() }
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
  // console.log(new Date());
  return NextResponse.json(deleted);
}
