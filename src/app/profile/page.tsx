"use client";

import { User } from "@/constants/types/homeType";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

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
  }, []);

  return (
    <div className="bg-[#F2F2F2]">
      <div className="flex justify-center gap-10 pt-20 pb-20">
        {/* left */}
        <div className="flex flex-col w-[387px] gap-10">
          <div className="bg-white ">
            <Image src="/User-avatar.png" alt="" width={100} height={100} />
            <p>Chào mừng bạn</p>
            <h2></h2>
          </div>
          <div>
            <div className="bg-white ">Cài đặt thông tin cá nhân</div>
          </div>
        </div>
        {/* right */}
        <div className="w-[950px] bg-white">
          <h2>Cài đặt thông tin cá nhân</h2>
          <h2>{userProfile?.email ? userProfile?.email : "no user"}</h2>
        </div>
      </div>
    </div>
  );
};

export default Profile;
