import UserCard from "@/components/UserCard";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Users() {
  // access user -> find an easier way to do this
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }
  const currentUserEmail = session?.user?.email!;
  const user = await prisma.user.findUnique({
    where: {
      email: currentUserEmail,
    },
  });
  const currentUserId = user?.id!;
  // (end) access user

  // get all users except for current user
  const users = await prisma.user.findMany({
    where: {
      NOT: {
        id: currentUserId,
      },
    },
  });
  // (end) get all users except for current user

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-500">
      {users.map((user) => {
        return <UserCard key={user.id} {...user} />;
      })}
    </div>
  );
}

//ts note: {..user} passes the properties into the component UserCard
