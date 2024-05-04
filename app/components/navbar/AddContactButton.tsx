import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

function AddContactButton({}: Props) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/contacts/create")}
      className="select-none rounded-md bg-gray-100 hover:bg-gray-200 p-3  font-semibold"
    >
      <p className="text-xs md:text-lg">Add new contact</p>
    </button>
  );
}

export default AddContactButton;
