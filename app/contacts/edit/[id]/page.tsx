"use client";

import Spinner from "@/app/components/contacts/Spinner";
import { useAuth } from "@/app/context/AuthContext";
import { IContact } from "@/app/models/userModel";
import { useParams, useRouter, useSearchParams } from "next/navigation";
// import { useParams } from "next/router";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {};

function EditContactPage({}: Props) {
  const router = useRouter();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<IContact>({
    firstName: "",
    lastName: "",
    phone: "",
  });

  const { user } = useAuth();
  useEffect(() => {
    setLoading(true);
    const getContact = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/contact/get/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        setFormData({
          firstName: result.firstName,
          lastName: result.lastName,
          phone: result.phone,
        });
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };
    getContact();
    setLoading(false);
    !user && router.push("/login");
  }, []);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:5000/api/contact/update/${id}`, {
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
      toast.success(`${formData.firstName} has been edited successfully`);
      router.push("/contacts");
      setFormData({ firstName: "", lastName: "", phone: "" });
    } else {
      toast.error("Error editing contact. Please try again!");
    }
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-gray-50 h-[100vh] w-full pt-20">
          <h2 className="flex justify-center items-center w-full mx-auto mb-7 font-bold text-xl">
            Edit contact
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
              Save changes
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default EditContactPage;
