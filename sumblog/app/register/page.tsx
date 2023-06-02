import Link from "next/link";
import RegistrationForm from "./RegistrationForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Register() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
    // return <p>You must be signed in...</p>;
  }
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-500">
      <div className="rounded-xl bg-white p-4 shadow-xl">
        <h1>Create Account</h1>
        <RegistrationForm />
        <p>
          sign in{" "}
          <Link
            className="text-indigo-500 hover:underline"
            href="/api/auth/signin"
          >
            HERE
          </Link>
          , if you have an account
        </p>
      </div>
    </div>
  );
}
