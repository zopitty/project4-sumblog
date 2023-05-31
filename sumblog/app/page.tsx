import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  // protecting the route
  // const session = await getServerSession();
  // if (!session) {
  //   redirect("/api/auth/signin");
  //   // return <p>You must be signed in...</p>;
  // }

  return <main>hello</main>;
}
