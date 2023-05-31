import PostField from "@/components/PostField";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  // protect the route
  // const session = await getServerSession();
  // if (!session) {
  //   redirect("/api/auth/signin");
  //   // return <p>You must be signed in...</p>;
  // }

  return (
    <main>
      <PostField />
    </main>
  );
}
