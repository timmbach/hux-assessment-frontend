"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IUser } from "../models/userModel";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import GoogleSignIn from "../components/firebase/GoogleSignIn";
// import { useToast } from "../context/ToastContext";
// import { useRouter } from "next/router";

type Props = {};

function LoginPage({}: Props) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // const { toast } = useToast();
  const { user, login, checkLoggedIn } = useAuth();
  const router = useRouter();

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    setCredentials({ ...credentials, [name]: value });
  };

  useEffect(() => {
    try {
      user && router.push("/contacts");
    } catch (error: any) {
      setError(error);
    }
  }, []);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (!credentials.email || !credentials.password) {
      toast.error("Please enter all required fields!");
      return;
    }

    // const userData: IUser = { name: "John Doe", email: "johndoe@x.com" }; // Mock user data
    login(credentials);
    toast.success(`${credentials.email} has been logged in`);
    router.push("/contacts");
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
      <i className="text-red-500 italic text-xs">{error}</i>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-gray-50  flex items-center rounded-xl shadow-lg max-w-3xl p-5 py">
          <div className="w-full md:w-1/2 flex flex-col space-y-5 p-5">
            <div className="">
              <h1 className="font-bold text-xl">Welcome back!</h1>
              <p className="text-xs mt-1">
                If you have an account, easily log in
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold text-lg">Login</h2>
              <form
                action=""
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
              >
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={credentials.email}
                  onChange={handleInputChange}
                  required
                  className="p-2 rounded-md outline-none border"
                />
                <div className="relative">
                  <input
                    type={`${!showPassword ? "password" : "text"}`}
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={handleInputChange}
                    required
                    className="p-2 rounded-md outline-none border w-full"
                  />
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="gray"
                    className="bi bi-eye absolute top-[30%]  right-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                  </svg> */}
                  <button type="button" onClick={togglePasswordVisibility}>
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="gray"
                        className="bi bi-eye absolute top-[30%]  right-2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-eye-slash absolute top-[30%]  right-2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                        <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                      </svg>
                    )}
                  </button>
                </div>
                <button className="bg-cyan-100 font-semibold rounded-md p-2 hover:scale-105 duration-200">
                  Login
                </button>
              </form>
              <div className="mt-5 grid grid-cols-3 items-center text-gray-500">
                <hr />
                <p className="text-center text-sm">OR</p>
                <hr />
              </div>
              {/* <button className="bg-white border text-xs py-2 w-full gap-2 rounded-xl mt-0 flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 32 32"
                  width="20"
                  height="20"
                >
                  <defs>
                    <path
                      id="A"
                      d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                    />
                  </defs>
                  <clipPath id="B">
                    <use xlinkHref="#A" />
                  </clipPath>
                  <g transform="matrix(.727273 0 0 .727273 -.954545 -1.45455)">
                    <path
                      d="M0 37V11l17 13z"
                      clipPath="url(#B)"
                      fill="#fbbc05"
                    />
                    <path
                      d="M0 11l17 13 7-6.1L48 14V0H0z"
                      clipPath="url(#B)"
                      fill="#ea4335"
                    />
                    <path
                      d="M0 37l30-23 7.9 1L48 0v48H0z"
                      clipPath="url(#B)"
                      fill="#34a853"
                    />
                    <path
                      d="M48 48L17 24l-4-3 35-10z"
                      clipPath="url(#B)"
                      fill="#4285f4"
                    />
                  </g>
                </svg>
                Login with Google
              </button> */}
              <GoogleSignIn />

              <p className="mt-2 text-xs border-b py-1 italic">
                Forgot your password?
              </p>
              <div className="text-xs flex justify-between items-center">
                <p>If you don't have an account</p>
                <button className="hover:font-semibold bg-white border rounded-md py-1 px-2">
                  <Link href="/signup">Signup</Link>
                </button>
              </div>
            </div>
          </div>
          <div className="w-1/2 bg-cyan-100 rounded-xl hidden md:block h-full">
            <Image
              src="/logo_contacts.png"
              width={500}
              height={500}
              alt="brand image"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
