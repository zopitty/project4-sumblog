import { revalidatePath } from "next/cache";
import Link from "next/link";

interface Props {
  id: string;
  name: string | null;
  image: string | null;
  bio: string | null;
}

export default function UserCard({ id, name, image, bio }: Props) {
  return (
    // <div className="grid h-52 w-52 grid-cols-1 justify-items-center gap-0 border-solid border-black">
    //   <img
    //     className="h-32 w-32"
    //     src={image ?? "../public/default-profile-icon-24.jpg"}
    //     alt={`${name}'s profile`}
    //   />
    //   <div>
    //     <Link href={`/users/${id}`}>
    //       <p>{name}</p>
    //     </Link>
    //   </div>
    // </div>
    <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col items-center p-10">
        <img
          className="mb-3 h-24 w-24 rounded-full shadow-lg"
          src={image ?? "../public/default-profile-icon-24.jpg"}
          alt={`${name}'s profile`}
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">{bio}</span>
        <div className="mt-4 flex space-x-3 md:mt-6">
          <Link
            href={`/users/${id}`}
            className="inline-flex items-center rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
