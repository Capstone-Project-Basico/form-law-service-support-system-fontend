"use client";

import { ProfileSidebarItem, User } from "@/constants/types/homeType";
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";

//type
interface UserLocal {
  data: {
    data: {
      userId: string;
    };
  };
}

const Profile = () => {
  const [userProfile, setUserProfile] = useState<User>();

  const getUserFromStorage = () => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
  };

  const user: UserLocal | null = getUserFromStorage();

  useEffect(() => {
    const getUserById = async () => {
      if (!user) return;
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_API}user/getUserById/${user?.data.data.userId}`
        )
        .then((res) => {
          setUserProfile(res.data.data);
        })
        .catch((error) => {
          console.log("loi roi " + error);
        });
    };

    getUserById();
  }, [user]);

  return (
    <div>
      {/* right */}
      <div className="w-[950px] bg-white rounded-lg">
        <h2>Cài đặt thông tin cá nhân</h2>
        <h2>{userProfile?.email ? userProfile?.email : "no user"}</h2>
      </div>
    </div>
  );
};

export default Profile;
