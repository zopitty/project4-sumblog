import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// updating posts (by user ID/Post id)
// note: usually PUT is to replace the whole thine
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

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const deleted = await prisma.post.delete({
    where: {
      id: Number(id),
    },
  });
  return NextResponse.json(deleted);
}
