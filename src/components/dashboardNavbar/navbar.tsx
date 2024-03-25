import {
  Navbar,
  Button,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

const DashboardNavbar = () => {
  const logout = () => {
    window.localStorage.clear();
  };
  return (
    <Navbar isBordered className="border-[#FF0004]">
      <NavbarBrand>
        <a href="/">
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
          <Button as={Link} color="primary" href="/profile" variant="flat">
            Profile
          </Button>
          <Button
            as={Link}
            color="primary"
            href="/"
            variant="flat"
            // onClick={() => logout}
          >
            Logout
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default DashboardNavbar;
