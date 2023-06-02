import UserCard from "@/components/UserCard";
import { prisma } from "@/lib/prisma";

export default async function Users() {
  const users = await prisma.user.findMany();

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-500">
      {users.map((user) => {
        return <UserCard key={user.id} {...user} />;
      })}
    </div>
  );
}

//ts note: {..user} passes the properties into the component UserCard
