import Link from "next/link";

interface Props {
  id: number;
  title: string | null;
  content: string | null;
  createdAt: Date;
  heartCount: number | null;
  author: { name: string | null };
}

export default function PostDisplay({
  id,
  title,
  content,
  createdAt,
  heartCount,
  author,
}: Props) {
  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
      <ul className="flex flex-wrap rounded-t-lg border-b border-gray-200 bg-gray-50 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
        <li className="mr-2">
          <div className="inline-block p-4">
            {author["name"]} @ {createdAt.toString()}
          </div>
        </li>
        <li>
          <div className="inline-block p-4">Likes: {heartCount}</div>
        </li>
      </ul>

      <div className="rounded-lg bg-white p-4 dark:bg-gray-800 md:p-8">
        <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="mb-3 text-gray-500 dark:text-gray-400">{content}</p>

        <Link
          href={`/posts/${id}`}
          className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700"
        >
          Read more
          <svg className="ml-1 h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"></path>
          </svg>
        </Link>
      </div>
    </div>
  );
}
