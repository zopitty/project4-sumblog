import FollowClient from "@/components/FollowClient";
import FollowServer from "@/components/FollowServer";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
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
  // console.log(user?.id);
  return (
    <div>
      <h1>{name}</h1>
      <Image
        src={image ?? "/default-profile-icon-24.jpg"}
        alt={`${name}'s profile`}
        width={25}
        height={25}
      />
      <h3>{bio}</h3>
      {/* @ts-expect-error */}
      <FollowServer targetId={params.id} />
    </div>
  );
}
