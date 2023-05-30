import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
// import { Metadata } from "next";
//consider adding metadata?

interface Props {
  params: {
    id: string;
  };
}

export default async function UserProfile({ params }: Props) {
  const user = await prisma.user.findUnique({ where: { id: params.id } });
  const { name, bio, image } = user ?? {};
  console.log(user?.id);
  revalidatePath(`/users/${user?.id}`);
  return (
    <div>
      <h1>{name}</h1>
      <img
        src={image ?? "../../public/default-profile-icon-24.jpg"}
        alt={`${name}'s profile`}
      />
      <h3>{bio}</h3>
    </div>
  );
}
