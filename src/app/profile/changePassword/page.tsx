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
import { ToastContainer, toast } from "react-toastify";

//type
interface UserLocal {
  data: {
    data: {
      userId: string;
    };
  };
}

const ChangePassword = () => {
  const [userChangePassword, setUserChangePassword] = useState<UserType>();
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
          setUserChangePassword(res.data.data);
          setUserName(res.data.data.userName);
          setPhoneNumber(res.data.data.phoneNumber);
        })
        .catch((error) => {
          console.log("loi roi " + error);
        });
    };

    getUserById();
  }, [userId]);

  return (
    <div className="w-[1350px] h-[600px] bg-white rounded-2xl">
      <div className="ml-10 mt-7 w-[1150px]">
        <h2 className="text-xl font-bold mb-7">Thay đổi mật khẩu đăng nhập</h2>
        <h2>Email</h2>
        <div className="flex justify-center items-center  mb-4">
          <Input
            type="text"
            disabled
            variant="faded"
            defaultValue={userChangePassword?.email ?? "hello?"}
          />
        </div>

        <h2>Mật khẩu hiện tại</h2>
        <div className="flex justify-center items-center mb-4">
          <Input
            type="text"
            variant="bordered"
            // defaultValue={userProfile?.userName ?? ""}
            // onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <h2>Mật khẩu mới</h2>
        <div className="flex justify-center items-center mb-4">
          <Input
            className=""
            variant="bordered"
            // defaultValue={userProfile?.userName ?? ""}
            // onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <ul style={{ listStyleType: "unset" }} className="ml-5 mb-7">
          <li>Mật khẩu từ 6 đến 25 kí tự</li>
          <li>Bao gồm chữ hoa, chữ thường và kí hiệu số</li>
        </ul>

        <h2>Nhập lại mật khẩu mới</h2>
        <div className="flex justify-center items-center mb-4">
          <Input
            className=""
            type="text"
            variant="bordered"
            // defaultValue={userProfile?.userName ?? ""}
            // onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <Button className="bg-[#FF0004] text-white mt-7">Lưu</Button>
      </div>
    </div>
  );
};

export default ChangePassword;
