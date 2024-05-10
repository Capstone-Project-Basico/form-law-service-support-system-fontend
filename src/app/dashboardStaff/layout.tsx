"use client";

import { UserLocal } from "@/constants/types/homeType";
import dynamic from "next/dynamic";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../components/dashboardNavbar/navbar";
import Sidebar from "../../components/dashboardStaffSidebar/staffSidebar";
const StaffProtect = dynamic(() => import("@/components/protect/StaffProtect"));

type LayoutProps = {
  children: React.ReactNode; // Typing the children prop
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const getUserFromStorage = () => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
  };

  const user: UserLocal | null = getUserFromStorage();
  const userRole = user?.data.data.roleName;

  if (userRole != "ROLE_STAFF") return <StaffProtect>{<></>}</StaffProtect>;

  return (
    <StaffProtect>
      <div className="flex flex-col">
        <div className="flex flex-cow">
          <Navbar />
        </div>
        <div className="flex flex-cow">
          <Sidebar />
          {children}
        </div>
      </div>
    </StaffProtect>
  );
};

export default Layout;
