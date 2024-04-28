"use client";

import React, { useEffect, useState } from "react";
import { Button, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import Image from "next/image";
import { profileSidebar } from "@/lib/profileSidebar";
import Link from "next/link";
import {
  ProfileSidebarItem,
  UserType,
  WalletType,
} from "@/constants/types/homeType";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faPlus } from "@fortawesome/free-solid-svg-icons";

interface UserLocal {
  data: {
    data: {
      userId: string;
    };
  };
}

const ProfileSidebar = () => {
  const [profileData, setProfileData] = useState<UserType>();
  const [wallet, setWallet] = useState<WalletType>();
  const [walletError, setWalletError] = useState<string | null>(null);
  const router = useRouter();

  const getUserFromStorage = () => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
  };

  const user: UserLocal | null = getUserFromStorage();
  const userId = user?.data.data.userId;

  const getDataUser = () => {
    try {
      axios
        .get(`${process.env.NEXT_PUBLIC_BASE_API}user/getUserById/${userId}`)
        .then((response) => {
          setProfileData(response.data.data);
        });
    } catch (error) {}
  };

  const getWallet = () => {
    setWalletError(null);
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_API}wallet/getWalletByUser/${userId}`
      )
      .then((response) => {
        setWallet(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching wallet:", error);
        setWalletError(
          "Failed to fetch wallet details. Please try again later."
        );
      });
  };

  useEffect(() => {
    getDataUser();
    getWallet();
  }, []);

  return (
    <div className="">
      <div className="flex flex-col w-[387px] gap-2 ">
        <div className="bg-white rounded-2xl">
          <div className="flex flex-row">
            <Image src="/User-avatar.png" alt="" width={100} height={100} />
            <div>
              <p>Chào mừng bạn,</p>
              <h2 className="font-bold">{profileData?.userName}</h2>
              <Button
                className="border bg-[#F2F2F2]"
                onClick={() => router.push("/profile/wallet")}
              >
                <FontAwesomeIcon
                  icon={faCirclePlus}
                  className="size-5 text-[#FF0004]"
                />
                {walletError ? 0 : wallet?.balance.toLocaleString()} VNĐ
              </Button>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-white rounded-2xl ">
            <Navbar className="flex items-start w-[350px] h-[425px] pt-10 rounded-2xl">
              <NavbarContent className="flex flex-col gap-8 items-start">
                <NavbarItem className="text-xl">
                  <div className="flex flex-col space-y-2 ">
                    {profileSidebar.map((item, idx) => {
                      return <MenuItem key={idx} item={item} />;
                    })}
                  </div>
                </NavbarItem>
              </NavbarContent>
            </Navbar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;

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
