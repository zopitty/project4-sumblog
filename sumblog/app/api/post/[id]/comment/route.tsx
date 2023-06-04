import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   const data = await prisma.comment.findMany({
//     where: {
//       postId: Number(params.id),
//     },
//     include: {
//       author: {
//         select: {
//           name: true,
//         },
//       },
//     },
//     orderBy: { createdAt: "desc" },
//   });
//   return NextResponse.json(data);
// }

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email!;
  const user = await prisma.user.findUnique({
    where: { email: currentUserEmail },
  });
  const currentUserId = user?.id!;

  const data = await req.json();
  const created = await prisma.comment.create({
    data: {
      ...data,
      postId: Number(params.id),
      userId: currentUserId,
    },
  });
  return new NextResponse(JSON.stringify(created));
}
