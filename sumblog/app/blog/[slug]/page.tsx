// data we are fetching from server
interface Post {
  title: string;
  content: string;
  slug: string;
}

interface Props {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: Props) {
  const res = await fetch("http://localhost:3000/api/content");
  const posts: Post[] = await res.json();
  const post = posts.find((post) => post.slug === params.slug)!;
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
