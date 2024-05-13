"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/footer/Footer";
import { Providers } from "./providers";
import dynamic from "next/dynamic";

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

  return (
    <>
      <Providers>
        {!shouldHideNavbar && <Navbar />}
        {children}
        <Footer />
      </Providers>
    </>
  );
}
