"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProfile({ user }: any) {
  //initialise data
  const [updateName, setUpdateName] = useState<string>("");
  const [updateBio, setUpdateBio] = useState<string>("");
  const [updateAge, setUpdateAge] = useState<number>();
  useEffect(() => {
    setUpdateName(user?.name ?? "");
    setUpdateBio(user?.bio ?? "");
    setUpdateAge(user?.age ?? "");
  }, []);
  const router = useRouter();

  const updateProfile = async () => {
    const res = await fetch("/api/user", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: updateName,
        bio: updateBio,
        age: updateAge,
      }),
    });
    await res.json();
    router.refresh();
    alert("updated");
  };
  return (
    <div>
      <h1>Edit Profile</h1>
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
          value={updateAge}
          onChange={(e) => {
            setUpdateAge(Number(e.target.value));
          }}
        />
      </div>

      <button
        onClick={() => {
          updateProfile();
        }}
      >
        Update
      </button>
    </div>
  );
}
