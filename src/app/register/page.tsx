"use client";

import { Button, Input } from "@nextui-org/react";
import { useState, ChangeEvent, FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faKey,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import Link from "next/link";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

const Page = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [isVisibleRepeat, setIsVisibleRepeat] = useState(false);
  const toggleVisibilityRepeat = () => setIsVisibleRepeat(!isVisibleRepeat);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Check if both passwords are entered
    if (!password || !repeatPassword) {
      toast.error("Vui lòng điền vào đầy đủ!");
      return;
    }
    // Check if passwords match
    if (password !== repeatPassword) {
      toast.error("Mật khẩu xác nhận phải trùng với mật khẩu mới!");
      return;
    }

    if (password.length < 6 || password.length > 25) {
      toast.error("Mật khẩu mới tối thiểu 6 kí tự và tối đa 25 kí tự!");
      return;
    }
    let dataRegister = {
      userName: userName,
      email: email,
      password: password,
    };

    // Try to register the user
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API}auth/registerNewUser`,
        dataRegister
      );
      router.push("/login");
      toast.success("Đăng ký thành công!");
    } catch (error) {
      console.error(error);
      toast.error("Đăng ký thất bại, Vui lòng thử lại.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center pt-16 pb-[90px] bg-custom-bg bg-cover ">
      <ToastContainer />
      <div className="bg-white p-20 rounded-2xl">
        <div className="flex flex-col justify-center items-center mt-50">
          <div className="font-bold text-[17px] border-l-5 border-[#FF0004] pl-5 mb-5">
            <div className="text-2xl">Làm việc với các luật sư xuất sắc</div>
            <div className="text-3xl">CÔNG TY LUẬT BASICO CHÀO MỪNG BẠN</div>
          </div>

          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap md:flex-nowrap gap-4 mb-10 w-[662px]">
                <Input
                  type="username"
                  label="Họ và Tên"
                  placeholder="Nhập họ và tên"
                  onChange={(e: any) => setUserName(e.target.value)}
                  startContent={
                    <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
                  }
                />
              </div>
              <div className="flex flex-wrap md:flex-nowrap gap-4 mb-10 w-[662px]">
                <Input
                  type="email"
                  label="Email"
                  placeholder="Nhập email"
                  onChange={(e: any) => setEmail(e.target.value)}
                  startContent={
                    <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5" />
                  }
                />
              </div>

              <div className="flex flex-wrap md:flex-nowrap gap-4 mb-10 w-[662px]">
                <Input
                  label="Password"
                  placeholder="Nhập mật khẩu"
                  onChange={(e: any) => setPassword(e.target.value)}
                  type={isVisible ? "text" : "password"}
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

              <div className="flex w-[662px] pb-5">
                <Input
                  label="Repeat Password"
                  placeholder="Nhập lại mật khẩu"
                  onChange={(e: any) => setRepeatPassword(e.target.value)}
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
                  type={isVisibleRepeat ? "text" : "password"}
                />
              </div>

              <Button
                type="submit"
                className="bg-[#FF0004] text-white w-full my-4"
              >
                Đăng ký
              </Button>
              <div className="flex justify-center">
                Bạn đã có tài khoản?{" "}
                <strong>
                  &nbsp;
                  <a href="/login" className="text- hover:text-[#ff0000]">
                    Đăng nhập ngay
                  </a>
                </strong>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
