"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/footer/Footer";
import { Providers } from "./providers";
import dynamic from "next/dynamic";
import { createContext, useState } from "react";

export const UpdateContext = createContext([] as any);

const Navbar = dynamic(() => import("@/components/navbar/Navbar"), {
  ssr: false,
});
export default function ExampleClientComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const noNav = [
    "/login",
    "/register",
    "/dashboard",
    "/admin",
    "/forgetPassword",
  ];

  const shouldHideNavbar = noNav.some((path) => pathname.startsWith(path));


  const [updated, setUpdated] = useState<boolean>(false);

  return (
    <>
      <Providers>
        <UpdateContext.Provider value={[updated, setUpdated]} >
          {!shouldHideNavbar && <Navbar />}
          {children}
          <Footer />
        </UpdateContext.Provider>
      </Providers>
    </>
  );
}
