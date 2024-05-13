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
import { usePathname, useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
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
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const router = useRouter();

  let data = {
    oldPassword,
    newPassword,
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Check if both passwords are entered
    if (!newPassword || !repeatPassword) {
      toast.error("Vui lòng điền vào đầy đủ!");
      return;
    }
    // Check if passwords match
    if (newPassword !== repeatPassword) {
      toast.error("Mật khẩu xác nhận phải trùng với mật khẩu mới!");
      return;
    }

    if (newPassword.length < 6 || newPassword.length > 25) {
      toast.error("Mật khẩu mới tối thiểu 6 kí tự và tối đa 25 kí tự!");
      return;
    }

    // Try to register the user
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_API}user/changePassword/${userId}`,
        data,
        {
          headers: authHeader(),
        }
      );
      router.push("/login");
      toast.success("Bạn đã đổi mật khẩu thành công");
    } catch (error) {
      console.error(error);
      toast.error("Sai mật khẩu hiện tại, mời bạn kiểm tra lại!");
    }
  };
  return (
    <div>
      <ToastContainer />
      <div className="w-[1350px]  p-5 bg-white rounded-xl shadow-lg">
        <div className="ml-10 w-[1150px] pt-10">
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
          <form onSubmit={handleSubmit}>
            <h2>Mật khẩu hiện tại</h2>
            <div className="flex justify-center items-center mb-4">
              <Input
                type={isVisible ? "text" : "password"}
                variant="bordered"
                onChange={(e) => setOldPassword(e.target.value)}
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
                onChange={(e) => setNewPassword(e.target.value)}
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

            <h2>Nhập lại mật khẩu mới</h2>
            <div className="flex justify-center items-center mb-4">
              <Input
                type={isVisibleRepeat ? "text" : "password"}
                variant="bordered"
                onChange={(e) => setRepeatPassword(e.target.value)}
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
            <Button className="bg-[#FF0004] text-white mt-7" type="submit">
              Lưu
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
