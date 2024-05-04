"use client";

import React, { useEffect, useState } from "react";
import MenuLink from "./MenuLink";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {};

function UserNav({}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [loginRoute, setLoginRoute] = useState("/login");

  const { user, setUser, login, logout } = useAuth();

  // useEffect(() => {
  //   first

  //   return () => {
  //     second
  //   }
  // }, [loginRoute])

  const router = useRouter();

  const handleLoginRoute = () => {
    if (user) {
      setLoginRoute("/logout");
    } else {
      setLoginRoute("/login");
    }
  };
  const handleLogin = (route: string) => {
    router.push("/login");
  };
  const handleLogout = () => {
    logout();
    setUser(null);
    localStorage.clear();
    router.push("/");
    toast.success("Log out success");
  };
  const handleSignup = () => {
    router.push("/signup");
  };

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="p-2 cursor-pointer relative inline-block border border-slate-400 hover:bg-slate-300 rounded-full"
    >
      <button className="flex items-center duration-100">
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-x w-6 h-6 "
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="w-[220px] absolute top-12 right-0 bg-white border rounded-xl shadow-md flex flex-col cursor-pointer">
          {user ? (
            <MenuLink label="Log out" link="/" onClick={handleLogout} />
          ) : (
            <MenuLink
              label="Log in"
              link="/login"
              onClick={() => handleLogin("/login")}
            />
          )}

          {!user && (
            <MenuLink label="Sign up" link="/signup" onClick={handleSignup} />
          )}
        </div>
      )}
      <div className="">
        <ToastContainer autoClose={1000} />
      </div>
    </div>
  );
}

export default UserNav;
