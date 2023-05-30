import Link from "next/link";

interface Props {
  id: string;
  name: string | null;
  image: string | null;
}

export default function UserCard({ id, name, image }: Props) {
  return (
    <div className="grid h-52 w-52 grid-cols-1 justify-items-center gap-0 border-solid border-black">
      <img
        className="h-32 w-32"
        src={image ?? "../public/default-profile-icon-24.jpg"}
        alt={`${name}'s profile`}
      />
      <div>
        <Link href={`/users/${id}`}>
          <p>{name}</p>
        </Link>
      </div>
    </div>
  );
}
