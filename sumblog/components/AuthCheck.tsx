"use client";

import { useSession } from "next-auth/react";
// useSession allows to access current session as well as user status like authenticated
// or loading etc
// similar to get Server Session but it's for client component
export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  // console.log(session, status);

  if (status === "authenticated") {
    return <>{children}</>;
  } else {
    return <></>;
  }
}

// client side protection
