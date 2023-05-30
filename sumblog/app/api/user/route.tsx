import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";

export async function PATCH(req: Request) {
  // authenticate
  const session = await getServerSession(authOptions);
  // access email on server
  const currentUserEmail = session?.user?.email!;
  const data = await req.json();
  // data.xxx = Number(data.xxx), if database expecting number
  console.log(data);
  const user = await prisma.user.update({
    where: {
      email: currentUserEmail,
    },
    data,
  });
  return NextResponse.json(user);
}
