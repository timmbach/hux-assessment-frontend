// import React, { createContext, useContext } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// interface ToastContextType {
//   toast: any;
// }

// const ToastContext = createContext<ToastContextType | undefined>(undefined);

// export const useToast = () => {
//   const context = useContext(ToastContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// interface ToastProviderProps {
//   children: React.ReactNode; // Define children prop explicitly
// }

// export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
//   return (
//     <ToastContext.Provider value={{ toast }}>
//       <ToastContainer autoClose={2000} />
//       {children}
//     </ToastContext.Provider>
//   );
// };
