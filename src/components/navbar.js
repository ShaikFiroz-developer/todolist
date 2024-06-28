"use client";
import React, { useState } from "react";
import { signOut, useSession, signIn } from "next-auth/react";
import { Cancel } from "@mui/icons-material";
import Image from "next/image";
import GoogleIcon from "@mui/icons-material/Google";

function Navbar() {
  const { data: session } = useSession();
  const [requesprofie, requestingprofile] = useState(false);

  return (
    <header
      style={{ zIndex: "100" }}
      className="min-w-full p-1 min-h-13 bg-black flex justify-between items-center"
    >
      <section className="flex justify-center items-center">
        <img
          src="/checklist.png"
          style={{ height: "50px", width: "50px" }}
          alt="Checklist"
        />
        <h2 className="text-4xl font-extrabold text-white ml-2">TodoList</h2>
      </section>

      <div>
        {session && session.user ? (
          <div className="relative">
            <Image
              onClick={() => requestingprofile(!requesprofie)}
              src={session.user.image}
              alt="profile Img"
              width={50}
              height={50}
              className="rounded-lg w-10 h-10 cursor-pointer"
            />
            {requesprofie && (
              <div className="absolute top-12 right-0 mt-2 flex flex-col w-60 h-32 bg-black text-white rounded-lg shadow-lg">
                <div className="flex w-full justify-between items-center p-2">
                  <span className="text-lg font-semibold text-[#0080ff]">
                    {session.user.name}
                  </span>
                  <Cancel
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => requestingprofile(false)}
                  />
                </div>
                <button
                  onClick={() => signOut()}
                  className="text-2xl font-semibold mt-2 p-2 bg-[#112336] hover:bg-[#00448891] rounded-lg mx-2"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="text-xl font-semibold hover:text-orange-400 bg-[#112336] flex gap-2 px-1 py-2 justify-between items-center hover:bg-[#00448891] rounded-lg text-white"
          >
            <GoogleIcon />
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}

export default Navbar;
