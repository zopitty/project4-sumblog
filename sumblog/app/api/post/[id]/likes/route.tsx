import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// count likes
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const likeCount = await prisma.likes.count({
    where: { postId: Number(id) },
  });
  return NextResponse.json(likeCount);
}
// (end) count likes