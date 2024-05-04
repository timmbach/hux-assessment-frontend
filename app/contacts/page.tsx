"use client";
import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { IContact } from "../models/userModel";
import Spinner from "../components/contacts/Spinner";
import DeleteConfirmModal from "../components/contacts/DeleteConfirmModal";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

type Props = {};

function ContactsPage({}: Props) {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [loading, setLoading] = useState(false);
  const { user, checkLoggedIn } = useAuth();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [activeContact, setActiveContact] = useState<IContact>({
    firstName: "",
    lastName: "",
    phone: "",
  });
  const router = useRouter();

  // useEffect(() => {
  //   checkLoggedIn();
  // }, []);
  const fetchContacts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/contact/get");
      const data = await res.json();
      console.log(data);
      setContacts(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setLoading(true);
    console.log(user);
    fetchContacts();

    if (!user) {
      router.push("/login");
    }
  }, []);

  const openDeleteModal = (contact: IContact) => {
    setActiveContact(contact);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleDelete = async (id: string) => {
    // Your delete logic here
    try {
      const res = await fetch(
        `http://localhost:5000/api/contact/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await res.json();
      if (!result.error) {
        toast.success("Delete success");
        fetchContacts();
      } else {
        toast.error(result.error);
      }
    } catch (error) {}

    setIsDeleteModalOpen(false);
  };
  const handleUpdate = async (id: string) => {
    // Your delete logic here
    try {
      const res = await fetch(
        `http://localhost:5000/api/contact/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await res.json();
      if (!result.error) {
        toast.success("Delete success");
        fetchContacts();
      } else {
        toast.error(result.error);
      }
    } catch (error) {}

    setIsDeleteModalOpen(false);
  };

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="h-[100vh] text-black mx-auto flex flex-col items-center">
      <ToastContainer autoClose={1000} />
      <h1 className="font-semibold text-xl p-5 mt-5">
        Your {contacts.length} Contacts
      </h1>
      {/* <hr className="mb-4 border-black" /> */}
      {/* <i>{user.username}</i> */}
      {loading ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto tableWrap">
          {contacts.length == 0 ? (
            <h3 className="mx-auto flex flex-col items-center italic">
              No contacts created yet.{" "}
            </h3>
          ) : (
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="sticky top-0">
                <tr className="overflow-hidden p-4">
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    First name
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Last name
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {contacts.map((contact, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="flex items-center">
                        {/* <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={contact.avatar}
                      alt=""
                    />
                  </div> */}
                        <div className="ml-4">
                          <div className="text-sm leading-5 font-medium text-gray-900">
                            {contact.firstName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">
                        {contact.lastName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">
                        {contact.phone}
                      </div>
                    </td>
                    <td className="flex items-center gap-2 px-6 py-6 whitespace-no-wrap text-right border-b border-gray-200 text-sm font-medium">
                      <Link href={`contacts/edit/${contact._id}`}>
                        <button className="cursor-pointer p-1 hover:bg-blue-400/40 rounded-md">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-pencil-square cursor-pointer"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path
                              fillRule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                            />
                          </svg>
                        </button>
                      </Link>
                      <button
                        onClick={() => openDeleteModal(contact)}
                        className="cursor-pointer p-1 hover:bg-red-400 rounded-md"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-trash "
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
      {isDeleteModalOpen && (
        <DeleteConfirmModal
          contact={activeContact}
          onDelete={handleDelete}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

export default ContactsPage;
