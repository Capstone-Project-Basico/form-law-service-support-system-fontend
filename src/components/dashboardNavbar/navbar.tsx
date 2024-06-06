"use client";
import {
  Navbar,
  Button,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const DashboardNavbar = () => {
  const router = useRouter();

  const logout = () => {
    router.push("/login");
    localStorage.clear();
  };
  return (
    <Navbar maxWidth="full" isBordered className="border-[#FF0004] px-8">
      <NavbarBrand className="">
        <a href="/dashboard">
          <Image
            src="/logoBasico.jpg"
            alt=""
            width={200}
            height={70}
            priority
          />
        </a>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            className="mr-2"
            as={Link}
            color="primary"
            href="/profile"
            variant="flat"
          >
            Profile
          </Button>

          <Button
            as={Link}
            color="primary"
            href="/"
            variant="flat"
            onClick={() => logout()}
          >
            Logout
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default DashboardNavbar;
