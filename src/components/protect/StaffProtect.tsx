"use client";
import { UserLocal } from "@/constants/types/homeType";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
const Navbar = dynamic(() => import("../dashboardNavbar/navbar"));

// export const dynamic = "force-dynamic";

type LayoutProps = {
  children: React.ReactNode; // Typing the children prop
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  function getPathnameOrder(pathname: string) {
    const parts = pathname.split("/").filter(Boolean); // filter out empty strings from the array

    const paths = [];
    let currentPath = "";

    for (let part of parts) {
      currentPath += "/" + part;
      paths.push(currentPath);
    }

    return paths;
  }

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

  //   if (userRole !== "ROLE_ADMIN") {
  //     return <></>;
  //   }

  return <>{children}</>;
};

export default Layout;
