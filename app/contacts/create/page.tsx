"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {};

function CreateContactPage({}: Props) {
  const router = useRouter();
  const { user } = useAuth();
  useEffect(() => {
    !user && router.push("/login");
  }, []);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:5000/api/contact/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    // console.log(formData);
    if (!result.error) {
      toast.success(`${formData.firstName} has been saved successfully`);
      router.push("/contacts");
      setFormData({ firstName: "", lastName: "", phone: "" });
    } else {
      toast.error("Error creating contact. Please try again!");
    }
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
      <div className="bg-gray-50 h-[100vh] w-full pt-20">
        <h2 className="flex justify-center items-center w-full mx-auto mb-7 font-bold text-xl">
          Add a new contact
        </h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              First name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Last name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Create
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateContactPage;
