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
import { usePathname } from "next/navigation";
import { practices } from "@/lib/navbarItems";
import { researchAndPublications, about } from "@/lib/navbarItems";
import { log } from "console";
import axios from "axios";
import { ProfileSidebarItem, User } from "@/constants/types/homeType";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  const [userData, setUserData] = useState<User>();
  const pathname = usePathname();
  // const getUserFromStorage = () => {
  //   if (typeof window !== "undefined") {
  //     const storedUser = localStorage.getItem("user");
  //     return storedUser ? JSON.parse(storedUser) : null;
  //   }
  // };
  const logout = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  const useUserFromStorage = () => {
    const [user, setUser] = useState<UserLocal | null>(null);

    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    }, []);

    return user;
  };

  const user = useUserFromStorage();
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

  console.log(user);
  return (
    <div className={styles.container}>
      <MyNavbar>
        <NavbarBrand>
          <a href="/">
            <Image
              className=" !max-w-60"
              src="/logoBasico.jpg"
              alt="logo"
              width={200}
              height={70}
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

          <NavbarItem>
            <a href="/basicoLawyers">
              <Button className="red-hover-button bg-white" radius="none">
                LUẬT SƯ CỦA BASICO
              </Button>
            </a>
          </NavbarItem>

          <NavbarItem>
            <a href="/template">
              <Button className="red-hover-button bg-white" radius="none">
                BIỂU MẪU
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
        <NavbarContent justify="end" className="w-[165px] h-12">
          {user ? (
            <Dropdown placement="bottom-end" className="w-80">
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
