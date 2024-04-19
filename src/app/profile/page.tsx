"use client";

import { ProfileSidebarItem, UserType } from "@/constants/types/homeType";
import {
  Button,
  Input,
  Navbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import authHeader from "@/components/authHeader/AuthHeader";

//type
interface UserLocal {
  data: {
    data: {
      userId: string;
    };
  };
}

const Profile = () => {
  const [userProfile, setUserProfile] = useState<UserType>();
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  let data = {
    userName: userName,
    phoneNumber: phoneNumber,
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
          setUserProfile(res.data.data);
          setUserName(res.data.data.userName);
          setPhoneNumber(res.data.data.phoneNumber);
        })
        .catch((error) => {
          console.log("loi roi " + error);
        });
    };

    getUserById();
  }, [userId]);

  //update user profile
  const handleSubmit = async () => {
    if (!userProfile) return; // Check if a partner is selected

    axios
      .put(
        `${process.env.NEXT_PUBLIC_BASE_API}user/updateProfile/${userProfile.userId}`,
        data,
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        setIsEditing(false);
        console.log("Cập nhật thông tin thành công", response);
      })
      .catch((error) => {
        console.error("Cập nhật thông tin thất bại", error);
      });
  };

  return (
    <div>
      {/* right */}
      <div className="w-[1350px] h-full bg-white rounded-2xl">
        <h2 className="text-xl font-bold ml-10 pt-10">
          Cài đặt thông tin cá nhân
        </h2>
        {userProfile ? (
          <div className="ml-10 mt-7">
            <h2>Họ và tên</h2>
            <div className="flex justify-center items-center w-[883px] mb-4">
              <Input
                className=""
                disabled={!isEditing}
                type="text"
                variant="bordered"
                defaultValue={userProfile?.userName ?? ""}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <h2>Số điện thoại</h2>
            <div className="flex justify-center items-center w-[883px] mb-4">
              <Input
                type="number"
                disabled={!isEditing}
                variant="bordered"
                defaultValue={userProfile?.phoneNumber?.toString() ?? 0}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <h2>Email</h2>
            <div className="flex justify-center items-center w-[883px] mb-4">
              <Input
                type="text"
                disabled
                variant="faded"
                defaultValue={userProfile?.email ?? "hello?"}
              />
            </div>
          </div>
        ) : (
          <div>Vui lòng đăng nhập</div>
        )}
        {!isEditing ? (
          <Button
            className="bg-[#FF0004] text-white ml-10"
            onClick={() => setIsEditing(true)}
          >
            Cập nhật thông tin
          </Button>
        ) : (
          <div>
            <Button
              className="bg-[#FF0004] text-white ml-10"
              onClick={() => handleSubmit()}
            >
              Xác nhận
            </Button>
            <Button
              className="bg-[#FF0004] text-white ml-10"
              onClick={() => setIsEditing(false)}
            >
              Hủy
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
