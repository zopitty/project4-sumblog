import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          <Link href="/">SumBlog</Link>
        </span>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 dark: text-white">
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/Blog">Blog</Link>
            </li>
            <li>
              <Link href="/users">Users</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
