"use client";

import { useEffect } from "react";
import Navbar from "../../components/dashboardNavbar/navbar";
import Sidebar from "../../components/dashboardStaffSidebar/staffSidebar";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { UserLocal } from "@/constants/types/homeType";

type LayoutProps = {
  children: React.ReactNode; // Typing the children prop
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  // const userString = localStorage.getItem("user");
  // if (!userString) {
  //   console.log("No user found");
  //   // router.push("/");
  //   return;
  // }

  // const user = JSON.parse(userString);
  // const userRole = user?.data.data.roleName;
  const getUserFromStorage = () => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
  };

  const user: UserLocal | null = getUserFromStorage();
  const userRole = user?.data.data.roleName;

  // Check if the user role is not admin

  useEffect(() => {
    if (userRole !== "ROLE_STAFF") {
      // Redirect non-admin users to the home page or login page
      router.push("/");
    }
  }, [userRole]);

  if (userRole !== "ROLE_STAFF") {
    return null;
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-cow">
        <Navbar />
      </div>
      <div className="flex flex-cow">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
