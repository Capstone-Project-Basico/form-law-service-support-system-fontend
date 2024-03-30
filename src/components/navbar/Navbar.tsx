"use client";

import Image from "next/image";
import styles from "./navbar.module.css";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import { Navbar as MyNavbar } from "@nextui-org/react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { practices } from "@/lib/navbarItems";
import { researchAndPublications, about } from "@/lib/navbarItems";
import { log } from "console";

interface UserLocal {
  data: {
    data: {
      userId: string;
    };
  };
}

const Navbar = () => {
  const [serviceDropdownVisible, setServiceDropdownVisible] = useState(false);
  const [researchDropdownVisible, setResearchDropdownVisible] = useState(false);
  const [aboutDropdownVisible, setAboutDropdownVisible] = useState(false);

  const pathname = usePathname();
  const getUserFromStorage = () => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
  };

  const user: UserLocal | null = getUserFromStorage();

  console.log(user)
  return (
    <div className={styles.container}>
      <MyNavbar>
        <NavbarBrand>
          <a href="/">
            <Image className=" !max-w-60" src="/logoBasico.jpg" alt="logo" width={200} height={70} />
          </a>
        </NavbarBrand>
        <NavbarContent>
          {/* dich vu */}
          <NavbarItem
            onMouseEnter={() => setServiceDropdownVisible(true)}
            onMouseLeave={() => setServiceDropdownVisible(false)}
          >
            <Dropdown
              isOpen={serviceDropdownVisible}
              className="bg-black"
              radius="none"
            >
              <DropdownTrigger>
                <Link
                  href="/practices"
                  className={`link ${
                    pathname === "/practices" ? "isActive" : ""
                  }`}
                  color="secondary"
                >
                  <Button className={styles.hoverButton} radius="none">
                    DỊCH VỤ
                  </Button>
                </Link>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions" className="bg-black">
                {practices.map((practice) => (
                  <DropdownItem key="retainerService">
                    <Link href={practice.link} className="text-white">
                      {practice.title}
                    </Link>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>

          {/* Research dropdown */}
          <NavbarItem
            onMouseEnter={() => setResearchDropdownVisible(true)}
            onMouseLeave={() => setResearchDropdownVisible(false)}
          >
            <Dropdown
              isOpen={researchDropdownVisible}
              className="bg-black"
              radius="none"
            >
              <DropdownTrigger>
                <Link href="/researchAndPublications">
                  <Button className={styles.hoverButton} radius="none">
                    NGHIÊN CỨU SÁNG TẠO
                  </Button>
                </Link>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions" className="bg-black">
                {researchAndPublications.map((research) => (
                  <DropdownItem key="retainerService">
                    <Link href={research.link} className="text-white">
                      {research.title}
                    </Link>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>

          {/* About dropdown */}
          <NavbarItem
            onMouseEnter={() => setAboutDropdownVisible(true)}
            onMouseLeave={() => setAboutDropdownVisible(false)}
          >
            <Dropdown
              isOpen={aboutDropdownVisible}
              className="bg-black"
              radius="none"
            >
              <DropdownTrigger>
                <Link href="/about">
                  <Button className={styles.hoverButton} radius="none">
                    GIỚI THIỆU
                  </Button>
                </Link>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions" className="bg-black">
                {about.map((ab) => (
                  <DropdownItem key="retainerService">
                    <Link href={ab.link} className="text-white">
                      {ab.title}
                    </Link>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>

          <NavbarItem>
            <a href="/basicoLawyers">
              <Button className="red-hover-button bg-white" radius="none">
                LUẬT SƯ CỦA BASICO
              </Button>
            </a>
          </NavbarItem>

          <NavbarItem>
            <a href="/contactUs">
              <Button className="red-hover-button bg-white" radius="none">
                LIÊN HỆ
              </Button>
            </a>
          </NavbarItem>
        </NavbarContent>

        {/* login */}
        <NavbarContent justify="end">
          {user ? (
            <div>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    name="Jason Hughes"
                    size="sm"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">zoey@example.com</p>
                  </DropdownItem>
                  <DropdownItem key="settings">My Settings</DropdownItem>
                  <DropdownItem key="team_settings">Team Settings</DropdownItem>
                  <DropdownItem key="analytics">Analytics</DropdownItem>
                  <DropdownItem key="system">System</DropdownItem>
                  <DropdownItem key="configurations">
                    Configurations
                  </DropdownItem>
                  <DropdownItem key="help_and_feedback">
                    Help & Feedback
                  </DropdownItem>
                  <DropdownItem key="logout" color="danger">
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          ) : (
          <NavbarItem className="hidden lg:flex">
            <Button
              as={Link}
              href="/login"
              variant="bordered"
              className="bg-white text-[#FF0004] border-[#FF0004] hover:bg-[#FF0004] hover:text-white"
            >
              Đăng nhập
            </Button>
          </NavbarItem>
         )} 
        </NavbarContent>
      </MyNavbar>
    </div>
  );
};

export default Navbar;
