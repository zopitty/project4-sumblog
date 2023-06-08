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
      <div className="pb-2">Your Profile</div>
      <div className="flex">
        <div className="mr-1">NAME: </div>
        <input
          type="text"
          placeholder="name"
          value={updateName}
          onChange={(e) => {
            setUpdateName(e.target.value);
          }}
        />
      </div>
      <div className="flex py-2">
        <div className="mr-1">BIO: </div>
        <input
          type="text"
          placeholder="bio"
          value={updateBio}
          onChange={(e) => {
            setUpdateBio(e.target.value);
          }}
        />
      </div>
      <div className="flex pb-2">
        <div className="mr-1">AGE: </div>
        <input
          type="text"
          placeholder="age"
          value={updateAge}
          onChange={(e) => {
            setUpdateAge(Number(e.target.value));
          }}
        />
      </div>
      <button
        className="rounded-lg border-[1px] border-zinc-400 px-2"
        onClick={() => {
          updateProfile();
        }}
      >
        Save
      </button>
    </div>
  );
}
