import AuthCheck from "@/components/AuthCheck";
import { SignInButton, SignOutButton } from "@/components/SignInSignOutButton";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="border-gray-200 bg-white dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
          <Link href="/">SumBlog</Link>
        </span>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="dark: mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium text-white dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/Blog">Blog</Link>
            </li>
            <li>
              <Link href="/users">Users</Link>
            </li>
            <li>
              <SignInButton />
            </li>
            <li>
              <AuthCheck>
                <SignOutButton />
              </AuthCheck>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
