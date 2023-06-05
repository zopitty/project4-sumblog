import UserCard from "@/components/UserCard";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Followers() {
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

  const users = await prisma.follows.findMany({
    include: { following: true },
    where: { followerUserId: currentUserId },
  });
  console.log(users);

  return (
    <div className="flex flex-wrap gap-3 bg-slate-500 p-6">
      {users.map((user) => {
        return <UserCard key={user.following.id} {...user.following} />;
      })}
    </div>
  );
}

//ts note: {..user} passes the properties into the component UserCard
