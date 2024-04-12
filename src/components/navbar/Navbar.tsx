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
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { practices } from "@/lib/navbarItems";
import { researchAndPublications, about } from "@/lib/navbarItems";
import { log } from "console";
import axios from "axios";
import { ProfileSidebarItem, UserType } from "@/constants/types/homeType";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface UserLocal {
  data: {
    data: {
      userId: string;
    };
  };
}
const MENU = [
  { name: "LUẬT SƯ CỦA BASICO", path: "/basicoLawyers" },
  { name: "BIỂU MẪU", path: "/template" },
  { name: "LIÊN HỆ", path: "/contactUs" },
  { name: "TUYỂN DỤNG", path: "/Recruitment" },
];

const Navbar = () => {
  const [serviceDropdownVisible, setServiceDropdownVisible] = useState(false);
  const [researchDropdownVisible, setResearchDropdownVisible] = useState(false);
  const [aboutDropdownVisible, setAboutDropdownVisible] = useState(false);
  const [userData, setUserData] = useState<UserType>();
  const pathname = usePathname();
  const router = useRouter();

  // const getUserFromStorage = () => {
  //   if (typeof window !== "undefined") {
  //     const storedUser = localStorage.getItem("user");
  //     return storedUser ? JSON.parse(storedUser) : null;
  //   }
  // };
  const logout = () => {
    router.push("/login");
    window.localStorage.clear();
    // window.location.reload();
  };

  const getUserFromStorage = () => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
  };

  const user: UserLocal | null = getUserFromStorage();
  const userId = user?.data.data.userId;

  useEffect(() => {
    const getUserById = async () => {
      if (!user) return;
      axios
        .get(`${process.env.NEXT_PUBLIC_BASE_API}user/getUserById/${userId}`)
        .then((res) => {
          setUserData(res.data.data);
        })
        .catch((error) => {
          console.log("loi roi " + error);
        });
    };

    getUserById();
  }, [userId]);
  return (
    <div className={styles.container}>
      <MyNavbar
        maxWidth="full"
        isBordered
        className="border px-8 pb-1"
        style={{ borderColor: "rgba(255, 0, 4, 0.1)" }}
      >
        <NavbarBrand>
          <a href="/">
            <Image
              className=" !max-w-60 "
              src="/logoBasico.jpg"
              alt="logo"
              width={300}
              height={100}
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
                <Button
                  className={styles.hoverButton}
                  radius="none"
                  onClick={() => {
                    router.push("/practices");
                  }}
                >
                  <div
                    // href="/practices"
                    className={`link ${
                      pathname.includes("/practices") ? "text-[#e74c3c]" : ""
                    } `}
                  >
                    DỊCH VỤ
                  </div>
                </Button>
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
                <div
                  className={`link ${
                    pathname === "/researchAndPublications" ? "isActive" : ""
                  }`}
                  color="secondary"
                >
                  <Button
                    className={styles.hoverButton}
                    radius="none"
                    onClick={() => router.push("/researchAndPublications")}
                  >
                    NGHIÊN CỨU SÁNG TẠO
                  </Button>
                </div>
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
                <div
                  className={`link ${pathname === "/about" ? "isActive" : ""}`}
                  color="secondary"
                >
                  <Button
                    className={styles.hoverButton}
                    radius="none"
                    onClick={() => router.push("/about")}
                  >
                    GIỚI THIỆU
                  </Button>
                </div>
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
          {MENU.map((item) => {
            return (
              <NavbarItem key={item.name}>
                <div
                  className={`link ${pathname === item.path ? "isActive" : ""}`}
                  color="secondary"
                >
                  <Button
                    className={styles.hoverButton}
                    radius="none"
                    onClick={() => router.push(item.path)}
                  >
                    {item.name}
                  </Button>
                </div>
              </NavbarItem>
            );
          })}

          {/* <NavbarItem>
            <a href="/contactUs">
              <Button className="red-hover-button bg-white" radius="none">
                LIÊN HỆ
              </Button>
            </a>
          </NavbarItem>
          <NavbarItem>
            <a href="/Recruitment">
              <Button className="red-hover-button bg-white" radius="none">
                TUYỂN DỤNG
              </Button>
            </a>
          </NavbarItem> */}
        </NavbarContent>

        {/* login */}
        <NavbarContent justify="end" className="w-[165px] h-5">
          {user ? (
            <Dropdown placement="bottom-end" className="w-80">
              <DropdownTrigger className="h-14">
                <Avatar
                  style={{ height: "60px" }}
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name="Jason Hughes"
                  size="lg"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <h2 className="font-semibold">{userData?.userName}</h2>
                </DropdownItem>
                <DropdownItem key="profile" className="bg-[#F2F2F2]">
                  <Link href="/profile" className="text-black">
                    Cài đặt thông tin cá nhân
                  </Link>
                </DropdownItem>
                <DropdownItem key="changePassword" className="bg-[#F2F2F2]">
                  <Link href="/profile/changePassword" className="text-black">
                    Đổi mật khẩu
                  </Link>
                </DropdownItem>
                <DropdownItem key="wallet" className="bg-[#F2F2F2]">
                  <Link href="/profile/wallet" className="text-black">
                    Ví của bạn
                  </Link>
                </DropdownItem>
                <DropdownItem key="manageTemplate" className="bg-[#F2F2F2]">
                  <Link href="/profile/manageTemplate" className="text-black">
                    Quản lí biểu mẫu
                  </Link>
                </DropdownItem>
                <DropdownItem key="servicePack" className="bg-[#F2F2F2]">
                  <Link href="/profile/servicePack" className="text-black">
                    Gói dịch vụ
                  </Link>
                </DropdownItem>
                <DropdownItem key="transactionHistory" className="bg-[#F2F2F2]">
                  <Link
                    href="/profile/transactionHistory"
                    className="text-black"
                  >
                    Lịch sử giao dịch
                  </Link>
                </DropdownItem>
                <DropdownItem key="logout" color="danger">
                  <div
                    className="flex flex-row  items-center gap-3"
                    onClick={() => logout()}
                  >
                    <FontAwesomeIcon icon={faRightFromBracket} />
                    <p>Đăng xuất</p>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <NavbarItem className="hidden lg:flex gap-2">
              <Button
                as={Link}
                href="/login"
                variant="bordered"
                className="bg-white text-[#FF0004] border-[#FF0004] hover:bg-red-200 hover:text-[#FF0004] font-bold"
              >
                Đăng nhập
              </Button>

              <Button
                as={Link}
                href="/register"
                variant="bordered"
                className="bg-[#FF0004] text-white border-[#FF0004] font-bold"
              >
                Đăng ký
              </Button>
            </NavbarItem>
          )}
        </NavbarContent>
      </MyNavbar>
    </div>
  );
};

export default Navbar;

const MenuItem = ({ item }: { item: ProfileSidebarItem }) => {
  const pathname = usePathname();

  return (
    <div>
      <Link
        href={item.path}
        className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:text-[#FF0004] ${
          item.path === pathname ? "text-[#FF0004]" : ""
        }`}
      >
        {item.icon}
        <span className="font-semibold text-xl flex">{item.title}</span>
      </Link>
    </div>
  );
};
