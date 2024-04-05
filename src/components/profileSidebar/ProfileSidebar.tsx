"use client";

import React, { useEffect, useState } from "react";
import { Button, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import Image from "next/image";
import { profileSidebar } from "@/lib/profileSidebar";
import Link from "next/link";
import { ProfileSidebarItem, User } from "@/constants/types/homeType";
import { usePathname } from "next/navigation";
import axios from "axios";

interface UserLocal {
  data: {
    data: {
      userId: string;
    };
  };
}

const ProfileSidebar = () => {
  const [profileData, setProfileData] = useState<User>();
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

  useEffect(() => {
    getDataUser();
  }, []);
  return (
    <div className="">
      <div className="flex flex-col w-[387px] gap-2 rounded-lg">
        <div className="bg-white">
          <div className="flex flex-row">
            <Image src="/User-avatar.png" alt="" width={100} height={100} />
            <div>
              <p>Chào mừng bạn,</p>
              <h2>{profileData?.userName}</h2>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-white rounded-lg">
            <Navbar className="flex items-start w-[350px] h-[425px] pt-10">
              <NavbarContent className="flex flex-col gap-8 items-start ">
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
