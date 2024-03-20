"use client";

import { Button, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import {
  faHouse,
  faCircleInfo,
  faChevronLeft,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import { SideNavItem } from "@/constants/types/homeType";
import { sideNavItems } from "@/lib/dashboardNavbar";
import { usePathname } from "next/navigation";
// interface DropdownLinkProps {
//   label: string;
//   href: string;
// }

// const DropdownLink: React.FC<DropdownLinkProps> = ({ label, href }) => {
//   return (
//     <Link href={href}>
//       <p className="flex flex-row items-center gap-2 text-2xl text-white hover:text-red-500">
//         {label}
//       </p>
//     </Link>
//   );
// };

const Sidebar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <Navbar className="flex items-start bg-[#2B2B2B] text-white w-[395px] h-[795px] pt-10">
      <NavbarContent className="flex flex-col gap-8 items-start ">
        <NavbarItem className="text-xl">
          {/* <Link href="/dashboard" className="flex flex-row items-center gap-10">
            {
              <FontAwesomeIcon
                icon={faHouse}
                className="w-7 h-7 text-[#FF0004]"
              />
            }
            Trang chủ
          </Link>
        </NavbarItem>
        <NavbarItem className="text-xl relative">
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex flex-row items-center gap-10"
          >
            {
              <FontAwesomeIcon
                icon={faCircleInfo}
                className="w-7 h-7 text-[#FF0004]"
              />
            }
            Quản lí thông tin
            <FontAwesomeIcon
              icon={dropdownOpen ? faChevronDown : faChevronLeft}
              className="w-7 h-7 text-[#FF0004]"
            />
            {dropdownOpen && (
              <div className="absolute top-full left-0 bg-[#2B2B2B] w-full">
                <DropdownLink href="/dashboard" label="Liên hệ" />
                <DropdownLink href="/dashboard" label="Liên hệ" />
              </div>
            )}
          </div> */}
          <div className="flex flex-col space-y-2 md:px-6">
            {sideNavItems.map((item, idx) => {
              return <MenuItem key={idx} item={item} />;
            })}
          </div>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Sidebar;

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className="">
      {item.subMenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded-lg w-full justify-between hover:text-[#FF0004] ${
              pathname.includes(item.path) ? "bg-[#2B2B2B]" : ""
            }`}
          >
            <div className="flex flex-row space-x-4 items-center">
              {item.icon}
              <span className="font-semibold text-xl flex">{item.title}</span>
            </div>

            <div className={`${subMenuOpen ? "-rotate-90" : ""} flex`}>
              <FontAwesomeIcon icon={faChevronLeft} className="pl-4 w-7 h-7" />
            </div>
          </button>

          {subMenuOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-4 ">
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`${
                      subItem.path === pathname
                        ? "font-bold text-[#FF0004]"
                        : ""
                    }`}
                  >
                    <span className="hover:text-[#FF0004]">
                      {subItem.title}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:text-[#FF0004]${
            item.path === pathname ? "bg-[#2B2B2B]" : ""
          }`}
        >
          {item.icon}
          <span className="font-semibold text-xl flex">{item.title}</span>
        </Link>
      )}
    </div>
  );
};
