"use client";
// client component
import { SessionProvider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};
// this will allow any client side component to access the current user
export default function AuthProvider({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}

//NOTE: if used directly in the layout it will throw an error
// uses client side features without saying is client compoenent
// problem with nextjs component,
// not all components in react specifies they're client components
