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

const Navbar = () => {
  const [serviceDropdownVisible, setServiceDropdownVisible] = useState(false);
  const [researchDropdownVisible, setResearchDropdownVisible] = useState(false);

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
                <DropdownItem key="retainerService">
                  <Link
                    href="/practices/retainerService"
                    className="text-white"
                  >
                    DỊCH VỤ LUẬT SƯ NỘI BỘ
                  </Link>
                </DropdownItem>
                <DropdownItem key="new">BẢO HIỂM</DropdownItem>
                <DropdownItem key="copy">DOANH NGHIỆP</DropdownItem>
                <DropdownItem key="edit">
                  TƯ VẤN CHIẾN LƯỢC & TÁI CẤU TRÚC DN
                </DropdownItem>
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
                <DropdownItem key="retainerService">
                  <Link
                    href="/researchAndPublications/professionalLegalBooks"
                    className="text-white"
                  >
                    VIẾT SÁCH PHÁP LÍ NGHIỆP VỤ
                  </Link>
                </DropdownItem>
                <DropdownItem key="retainerService">
                  <Link
                    href="/researchAndPublications/researchArticles"
                    className="text-white"
                  >
                    BÀI NGHIÊN CỨU TRÊN BÁO CHÍ
                  </Link>
                </DropdownItem>
                <DropdownItem key="retainerService">
                  <Link
                    href="/researchAndPublications/basicoWeeklyNews"
                    className="text-white"
                  >
                    BASICO TUẦN LUẬT
                  </Link>
                </DropdownItem>
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
