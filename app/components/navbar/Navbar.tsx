// "use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AddContactButton from "./AddContactButton";
import UserNav from "./UserNav";
import { useAuth } from "@/app/context/AuthContext";

type Props = {};

function Navbar({}: Props) {
  const { user } = useAuth();

  useEffect(() => {}, [user]);

  return (
    <nav className="w-full fixed top-0 left-0 py-3 border-b bg-cyan-100 shadow-md z-10">
      <div className="max-w-[1500px] mx-auto px-6">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src="/logo_contacts.png"
              alt="DjangoBnb logo"
              width={50}
              height={38}
            />
          </Link>
          <div className="flex flex-col items-center justify-center">
            <h1 className="font-bold tracking-widest text-xl">hux</h1>
            {user && (
              <i className="text-black z-77 text-xs md:text-lg">{user.email}</i>
            )}
          </div>

          <div className="flex items-center space-x-6">
            {user && (
              <AddContactButton

              //   userId={userId}
              />
            )}

            <UserNav
            //   userId={userId}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
