"use client";

import {
  ProfileSidebarItem,
  UserLocal,
  UserType,
} from "@/constants/types/homeType";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faKey } from "@fortawesome/free-solid-svg-icons";

const ChangePassword = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [isVisibleNew, setIsVisibleNew] = useState(false);
  const toggleVisibilityNew = () => setIsVisibleNew(!isVisibleNew);
  const [isVisibleRepeat, setIsVisibleRepeat] = useState(false);
  const toggleVisibilityRepeat = () => setIsVisibleRepeat(!isVisibleRepeat);

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
          console.log(res.data.data);
        })
        .catch((error) => {
          console.log("loi roi " + error);
        });
    };

    getUserById();
  }, [userId]);

  return (
    <div>
      <ToastContainer />
      <div className="w-[1350px] h-[600px] bg-white rounded-2xl">
        <div className="ml-10 w-[1150px]">
          <h2 className="text-xl font-bold mb-7">
            Thay đổi mật khẩu đăng nhập
          </h2>
          <h2>Email</h2>
          <div
            className="flex justify-center items-center mb-4"
            key={userChangePassword?.email}
          >
            <Input
              type="text"
              disabled
              variant="faded"
              defaultValue={userChangePassword?.email}
            />
          </div>

          <h2>Mật khẩu hiện tại</h2>
          <div className="flex justify-center items-center mb-4">
            <Input
              type={isVisible ? "text" : "password"}
              variant="bordered"
              startContent={
                <FontAwesomeIcon icon={faKey} className="w-5 h-5" />
              }
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <FontAwesomeIcon
                      icon={faEye}
                      className="text-2xl text-default-400 pointer-events-none"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faEyeSlash}
                      className="text-2xl text-default-400 pointer-events-none"
                    />
                  )}
                </button>
              }
            />
          </div>

          <h2>Mật khẩu mới</h2>
          <div className="flex justify-center items-center mb-4">
            <Input
              className=""
              variant="bordered"
              type={isVisibleNew ? "text" : "password"}
              startContent={
                <FontAwesomeIcon icon={faKey} className="w-5 h-5" />
              }
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibilityNew}
                >
                  {isVisibleNew ? (
                    <FontAwesomeIcon
                      icon={faEye}
                      className="text-2xl text-default-400 pointer-events-none"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faEyeSlash}
                      className="text-2xl text-default-400 pointer-events-none"
                    />
                  )}
                </button>
              }
            />
          </div>
          <ul style={{ listStyleType: "unset" }} className="ml-5 mb-7">
            <li>Mật khẩu từ 6 đến 25 kí tự</li>
            <li>Bao gồm chữ hoa, chữ thường và kí hiệu số</li>
          </ul>

          <h2>Nhập lại mật khẩu mới</h2>
          <div className="flex justify-center items-center mb-4">
            <Input
              type={isVisibleRepeat ? "text" : "password"}
              variant="bordered"
              startContent={
                <FontAwesomeIcon icon={faKey} className="w-5 h-5" />
              }
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibilityRepeat}
                >
                  {isVisibleRepeat ? (
                    <FontAwesomeIcon
                      icon={faEye}
                      className="text-2xl text-default-400 pointer-events-none"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faEyeSlash}
                      className="text-2xl text-default-400 pointer-events-none"
                    />
                  )}
                </button>
              }
            />
          </div>
          <Button className="bg-[#FF0004] text-white mt-7">Lưu</Button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
