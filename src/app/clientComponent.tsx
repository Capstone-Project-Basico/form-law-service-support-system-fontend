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
  const noNav = ["/login", "/registration"];

  return (
    <>
      <Providers>
        {!noNav.includes(pathname) && <Navbar />}
        {children}
        <Footer />
      </Providers>
    </>
  );
}
