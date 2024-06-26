"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";
import GoogleSignIn from "../components/firebase/GoogleSignIn";
import EyeButton from "../components/signup/EyeButton";

type Props = {};

function SignupPage({}: Props) {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { user, login, signup } = useAuth();
  const router = useRouter();

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (!credentials.email || !credentials.password) {
      toast.error("Please enter all required fields!");
      return;
    }
    if (credentials.password !== credentials.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const userData = { ...credentials, confirmPassword: undefined };

    signup(userData);

    router.push("/login"); // Redirect to login page after logout
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-gray-50  flex items-center rounded-xl shadow-lg max-w-3xl p-5 py">
          <div className="w-full md:w-1/2 flex flex-col space-y-5 p-5">
            <div className="">
              <p className="text-xs mt-1">Need a new account? Register now</p>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold text-lg">Register</h2>
              <form
                action=""
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
              >
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  value={credentials.username}
                  onChange={handleInputChange}
                  required
                  className="p-2 rounded-md outline-none border"
                />
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
                  <EyeButton
                    toggleEye={togglePasswordVisibility}
                    showPassword={showPassword}
                  />
                </div>
                <div className="relative">
                  <input
                    type={`${!showPassword ? "password" : "text"}`}
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm password"
                    value={credentials.confirmPassword}
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

                  <EyeButton
                    toggleEye={togglePasswordVisibility}
                    showPassword={showPassword}
                  />
                </div>
                <button className="bg-cyan-100 font-semibold rounded-md p-2 hover:scale-105 duration-200">
                  Sign Up
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
                Sign Up with Google
              </button> */}
              <GoogleSignIn />
              <div className="text-xs flex justify-between items-center">
                <p>If you already have an account</p>
                <button className="hover:font-semibold bg-white border rounded-md py-1 px-2">
                  <Link href="/login">Login</Link>
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

export default SignupPage;
