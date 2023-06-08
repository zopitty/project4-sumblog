import UserCard from "@/components/UserCard";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Users() {
  // access user -> find an easier way to do this
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/register");
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
    <div className="flex justify-center">
      <div className="flex flex-wrap items-center justify-center gap-3 p-6">
        {users.map((user) => {
          return <UserCard key={user.id} {...user} />;
        })}
      </div>
    </div>
  );
}

//ts note: {..user} passes the properties into the component UserCard
