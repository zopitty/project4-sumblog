import FollowServer from "@/components/FollowServer";
import { prisma } from "@/lib/prisma";
import Image from "next/image";

interface Props {
  params: {
    id: string;
  };
}

export default async function UserProfile({ params }: Props) {
  const user = await prisma.user.findUnique({ where: { id: params.id } });
  const { name, bio, image, age } = user ?? {};

  return (
    <div>
      <h1>{name}</h1>
      <div>{age}</div>
      <Image
        src={image ?? "/default-profile-icon-24.jpg"}
        alt={`${name}'s profile`}
        width={200}
        height={200}
      />
      <h3>{bio}</h3>
      {/* Server Component */}
      {/* @ts-expect-error */}
      <FollowServer targetId={params.id} />
    </div>
  );
}
