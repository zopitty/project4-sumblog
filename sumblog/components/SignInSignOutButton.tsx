"use client";

import { useSession, signIn, signOut } from "next-auth/react";
// have to configure if you wanna use Image, below just use img if you don't wanna configure
import Link from "next/link";

export function SignInButton() {
  const { data: session, status } = useSession();
  console.log(session, status);
  if (status === "loading") {
    return <>...</>;
  }
  if (status === "authenticated") {
    // link to the dashboard
    // default to some image if no profile picture
    return (
      <Link href={`/dashboard`}>
        <img
          src={session.user?.image ?? "defaultimg"}
          width={32}
          height={32}
          alt="Your Name"
        />
      </Link>
    );
  }
  return <button onClick={() => signIn()}>Sign In</button>;
}

export function SignOutButton() {
  return <button onClick={() => signOut()}>Sign Out</button>;
}
