// authContext.ts
import React, { createContext, useContext, useEffect, useState } from "react";
import { IRegisterUser, IUser } from "../models/userModel";
import { usePathname, useRouter } from "next/navigation";

// interface User {
//   // id: string;
//   name: string;
//   email: string;
// }

// Define authentication context type
interface AuthContextType {
  user: any;
  setUser: any;
  login: (userData: IUser) => void;
  logout: () => void;
  checkLoggedIn: () => void;
  signup: (userData: IRegisterUser) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode; // Define children prop explicitly
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState(null);

  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    // if (path == "/contacts") checkLoggedIn();
    checkLoggedIn();
  }, []);

  const signup = async (userData: IRegisterUser) => {
    try {
      const res = await fetch(`http://localhost:5000/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData }),
      });
      // const user = await res.json();
      // setUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  // check user is logged in
  const checkLoggedIn = async () => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
    try {
      // console.log(localStorage.getItem("token"));
      const res = await fetch(`http://localhost:5000/api/auth/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      if (!result.error) {
        setUser(result);
        router.push("/contacts");
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (userData: IUser) => {
    // console.log(userData);

    try {
      const res = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      // console.log(res);
      const result = await res.json();
      // console.log(result.token);
      // console.log(`user: ${result.user} `);
      if (!result.error) {
        setUser(result);
        // console.log(`result: ${result} `);
        localStorage.setItem("token", result.token);
        // setUser(result);
        router.push("/contacts");
      } else {
        console.log(result.error);
      }
    } catch (error) {
      console.log(error);
    }

    // setUser(userData);
    // console.log(user);
    // console.log(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, signup, login, checkLoggedIn, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
