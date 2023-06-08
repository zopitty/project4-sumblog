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
    <div className="flex w-screen items-center justify-center">
      <div className="flex max-w-xl flex-col items-center rounded-xl p-10 shadow-md">
        <Image
          src={image ?? "/default-profile-icon-24.jpg"}
          alt={`${name}'s profile`}
          width={200}
          height={200}
          className="rounded-2xl"
        />
        <div className="flex-none py-3 text-center text-lg font-medium text-black">
          {name}, {age}
        </div>
        <div className="ml-1 justify-center py-1 text-justify">{bio}</div>
        {/* Server Component */}
        <div className="pt-4">
          {/* @ts-expect-error */}
          <FollowServer targetId={params.id} />
        </div>
      </div>
    </div>
  );
}
