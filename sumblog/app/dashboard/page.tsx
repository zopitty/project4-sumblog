// "use client";
export const revalidate = 0;
import React, { useEffect, useState } from "react";
import { getServerSession } from "next-auth";
import { SignOutButton } from "@/components/SignInSignOutButton";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EditProfile from "./EditProfile";
import { revalidatePath } from "next/cache";

export default async function Dashboard() {
  // access session (check if session still valid)
  // authOptions needs to be passed in (from NextAuth Docs)
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }
  // throwing me errors without '!' pls stop
  const currentUserEmail = session?.user?.email!;
  const user = await prisma.user.findUnique({
    where: {
      email: currentUserEmail,
    },
  });
  // const [updateName, setUpdateName] = useState<string>("");
  // const [updateBio, setUpdateBio] = useState<string>("");
  // const [updateImage, setUpdateImage] = useState<string>("");
  // useEffect(() => {
  //   setUpdateName(user?.name ?? "");
  //   setUpdateBio(user?.bio ?? "");
  //   setUpdateImage(user?.image ?? "");
  // }, []);

  // const updateProfile = async () => {
  //   const res = await fetch("/api/user", {
  //     method: "PATCH",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       name: updateName,
  //       bio: updateBio,
  //       image: updateImage,
  //     }),
  //   });
  //   const data = await res.json();
  //   // revalidatePath(`/users/${data.id}`);
  //   alert("updated");
  // };

  return (
    <>
      <h1>Dashboard</h1>
      <EditProfile user={user} />
      {/* <h1>Edit Profile</h1>
      <div className="flex">
        <h3>NAME: </h3>
        <input
          type="text"
          placeholder="name"
          value={updateName}
          onChange={(e) => {
            setUpdateName(e.target.value);
          }}
        />
      </div>
      <div className="flex">
        <h3>BIO: </h3>
        <input
          type="text"
          placeholder="bio"
          value={updateBio}
          onChange={(e) => {
            setUpdateBio(e.target.value);
          }}
        />
      </div>
      <div className="flex">
        <h3>IMG: </h3>
        <input
          type="text"
          placeholder="image link"
          value={updateImage}
          onChange={(e) => {
            setUpdateImage(e.target.value);
          }}
        />
        <button
          onClick={() => {
            updateProfile();
          }}
        >
          Update
        </button> */}
      {/* </div> */}
    </>
  );
}
