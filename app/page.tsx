import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-[1500px] mx-auto px-6">
      <div className="flex flex-col items-center mt-20 min-h-screen ">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to My Contacts app for Hux
        </h1>
        <p className="text-lg text-gray-600 mb-4 font-semibold">
          This is a simple contacts directory application created for Hux's
          fullstack developer coding test. With this app you can create and
          authenticate (login and sign up) a user, create a contact, fetch
          contacts that belong to the authenticated user, edit contacts, and
          delete contacts.
        </p>
        <p className="text-md font-semibold mb-5">
          Tech stack used are typescript, Nextjs, tailwind, etc for the frontend
          and Javascript, express, nodejs, mongodb, etc for the backend.
        </p>

        <Link
          href="/signup"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Get Started
        </Link>
      </div>
    </main>
  );
}
