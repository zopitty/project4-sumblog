import { prisma } from "@/lib/prisma";
import { Metadata } from "next";

interface Props {
  params: {
    id: string;
  };
}

//consider adding metadata?

export default async function UserProfile({ params }: Props) {
  const user = await prisma.user.findUnique({ where: { id: params.id } });
  const { name, bio, image } = user ?? {};

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
