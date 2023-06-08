"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
// have to configure if you wanna use Image, below just use img if you don't wanna configure
import Link from "next/link";

export function SignInButton() {
  const { data: session, status } = useSession();
  // console.log(session, status);
  if (status === "loading") {
    return (
      <div className="font-circular order-0 w-25 flex-none flex-grow-0 text-sm font-medium text-black">
        ...
      </div>
    );
  }
  if (status === "authenticated") {
    // link to the dashboard
    // default to some image if no profile picture
    return (
      <Link href={`/dashboard`}>
        <Image
          src={session.user?.image ?? "/default-profile-icon-24.jpg"}
          width={28}
          height={28}
          alt="Your Name"
          className="mr-2 rounded-lg"
        />
      </Link>
    );
  }
  return (
    <div className="font-circular order-0  w-25 flex-none flex-grow-0 text-sm font-medium text-black">
      <button onClick={() => signIn()}>Log in/ </button>
      <Link href="/register">Register</Link>
    </div>
  );
}

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="font-circular order-0 w-25 flex-none flex-grow-0 text-sm font-medium text-black"
    >
      / Log out
    </button>
  );
}
