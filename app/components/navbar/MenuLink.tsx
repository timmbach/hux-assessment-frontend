"use client";

import Link from "next/link";
import React from "react";
import { UrlObject } from "url";

type Props = {
  label: String;
  link: string;
  onClick: () => void;
};

function MenuLink({ label, link, onClick }: Props) {
  return (
    <Link href={{ pathname: link }}>
      <div
        onClick={onClick}
        className={`px-5 py-4 ${
          label == "Log out" && "text-red-500 font-semibold"
        } hover:bg-gray-100 transition`}
      >
        {label}
      </div>
    </Link>
  );
}

export default MenuLink;
