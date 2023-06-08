import AuthCheck from "@/components/AuthCheck";
import { SignInButton, SignOutButton } from "@/components/SignInSignOutButton";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="left-0 top-0 z-20 mb-4 w-full border-b border-gray-200 bg-gray-200 shadow-sm">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link href="/">
          <span className="w-111 h-42 font-circular leading-150 order-0 flex-none flex-grow-0 text-base font-medium text-black">
            sumblog
          </span>
        </Link>
        <div className="flex md:order-2">
          <div className="order-0 flex flex-none flex-grow-0 flex-row items-center justify-center rounded-lg border border-black bg-gray-200 p-2 text-white">
            <SignInButton />
            <AuthCheck>
              <SignOutButton />
            </AuthCheck>
          </div>
        </div>
        <div
          className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
          id="navbar-sticky"
        >
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-200 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0">
            <li className=" font-circular order-1 flex-none flex-grow-0 text-sm font-medium text-black">
              <Link href="/about">About</Link>
            </li>
            <li className=" font-circular  order-1 flex-none flex-grow-0 text-sm font-medium text-black">
              <Link href="/stalker">Your Feed</Link>
            </li>
            <li className=" font-circular order-1 flex-none flex-grow-0 text-sm font-medium text-black">
              <Link href="/users">Users</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
