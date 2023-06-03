import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json();

  const created = await prisma.comment.create({
    data: {
      ...data,
      post: Number(params.id),
      //postId
    },
  });
  return new NextResponse(JSON.stringify(created));
}
