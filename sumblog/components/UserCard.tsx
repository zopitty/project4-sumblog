import Image from "next/image";
import Link from "next/link";
import FollowServer from "./FollowServer";

interface Props {
  id: string;
  name: string | null;
  image: string | null;
  bio: string | null;
}

export default function UserCard({ id, name, image, bio }: Props) {
  return (
    <div className="w-full max-w-xs rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col items-center p-10">
        <Image
          className="mb-3 h-24 w-24 rounded-full shadow-lg"
          src={image ?? "/default-profile-icon-24.jpg"}
          alt={`${name}'s profile`}
          width={100}
          height={100}
        />
        <div className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {name}
        </div>
        <div className="mt-4 flex space-x-3 md:mt-6">
          <Link
            href={`/users/${id}`}
            className="inline-flex items-center rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            View Profile
          </Link>
          {/* @ts-expect-error */}
          <FollowServer targetId={id} />
        </div>
      </div>
    </div>
  );
}
