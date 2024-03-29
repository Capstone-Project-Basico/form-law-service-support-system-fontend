"use client";

import { useEffect } from "react";
import Navbar from "../../components/dashboardNavbar/navbar";
import Sidebar from "../../components/dashboardSidebar/sidebar";

import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

type LayoutProps = {
  children: React.ReactNode; // Typing the children prop
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (!userString) {
      console.log("No user found");
      router.push("/login"); // Redirect to login or another appropriate page
      return;
    }

    const user = JSON.parse(userString);
    const userRole = user?.data.data.roleName;

    // Check if the user role is not admin
    if (userRole !== "admin") {
      // Redirect non-admin users to the home page or login page
      router.push("/");
    }
  }, [router]);

  return (
    <div className="flex flex-col">
      <div className="">
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
