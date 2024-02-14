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

const Navbar = () => {
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
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <Button className="red-hover-button bg-white" radius="none">
                  DỊCH VỤ
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="new">BẢO HIỂM</DropdownItem>
                <DropdownItem key="copy">DOANH NGHIỆP</DropdownItem>
                <DropdownItem key="edit">
                  TƯ VẤN CHIẾN LƯỢC & TÁI CẤU TRÚC DN
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
