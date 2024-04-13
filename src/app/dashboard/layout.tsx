"use client";
import dynamic from "next/dynamic";
const Protect = dynamic(() => import("@/components/protect/Protect"));
const Navbar = dynamic(() => import("../../components/dashboardNavbar/navbar"));
import { useEffect } from "react";
import Sidebar from "../../components/dashboardSidebar/sidebar";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";
import "react-toastify/dist/ReactToastify.css";
import { usePathname, useRouter } from "next/navigation";
import { UserLocal } from "@/constants/types/homeType";
import { getPathByURL } from "@/lib/path-link";
import Link from "next/link";
import ExampleClientComponent from "../clientComponent";
// export const dynamic = "force-dynamic";

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
  if (userRole != "ROLE_ADMIN") return <Protect>{<></>}</Protect>;

  return (
    <Protect>
      <div className="flex flex-col">
        <div className="flex flex-cow">
          <Navbar />
        </div>
        <div className="flex flex-cow">
          <Sidebar />
          {children}
        </div>
      </div>
    </Protect>
  );
};

export default Layout;
