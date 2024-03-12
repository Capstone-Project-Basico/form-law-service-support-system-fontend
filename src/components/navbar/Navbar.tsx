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
} from "@nextui-org/react";
import { Navbar as MyNavbar } from "@nextui-org/react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { practices } from "@/lib/navbarItems";
import { researchAndPublications, about } from "@/lib/navbarItems";

const Navbar = () => {
  const [serviceDropdownVisible, setServiceDropdownVisible] = useState(false);
  const [researchDropdownVisible, setResearchDropdownVisible] = useState(false);
  const [aboutDropdownVisible, setAboutDropdownVisible] = useState(false);

  const pathname = usePathname();
  return (
    <div className={styles.container}>
      <MyNavbar className={styles.navbar}>
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

          {/* upload file */}
          <NavbarItem>
            <a href="/manager">
              <Button className="red-hover-button bg-white" radius="none">
                THEM TEMPLATE
              </Button>
            </a>
          </NavbarItem>

          {/* template list */}
          <NavbarItem>
            <a href="/template">
              <Button className="red-hover-button bg-white" radius="none">
                TEMPLATE list*
              </Button>
            </a>
          </NavbarItem>
        </NavbarContent>
      </MyNavbar>
    </div>
  );
};

export default Navbar;
