"use client";

import { useRouter, usePathname } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { Providers } from "./providers";

export default function ExampleClientComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const noNav = ["/login", "/register", "/dashboard"];

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
