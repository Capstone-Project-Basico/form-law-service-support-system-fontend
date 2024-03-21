"use client";

import { Button, Input } from "@nextui-org/react";
import { useState, ChangeEvent, FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [username, setUsername] = useState ("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const router = useRouter();

  let dataRegister = {
    username: username,
    email: email,
    password: password,
    repeatPassword: repeatPassword,
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_API}auth/registerNewUser`, dataRegister)
      .then((response) => {
        router.push("/login");
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
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
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap md:flex-nowrap gap-4 mb-10 w-[662px]">
            <Input 
              type="email"
              label="Email"
              placeholder="Nhập email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap md:flex-nowrap gap-4 mb-10 w-[662px]">
            <Input 
              type="password"
              label="Password"
              placeholder="Nhập mật khẩu"
              onChange={(e) => setPassword(e.target.value)}
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
          
          
          <div className="flex w-[662px]">
            <Input
              label="Password"
              placeholder="Nhạp lại mật khẩu"
              onChange={(e) => setRepeatPassword(e.target.value)}
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
              type={isVisible ? "text" : "password"}
            />
          </div>

          
        
          <Button type="submit" className="bg-[#F00044] text-white w-full my-4">
            Đăng ký
          </Button>
          <div className="flex justify-center">
            Hoặc đăng ký bằng
          </div>
          <div className="login-social-list">
            <a id="login-with-google" ></a>  
            <a id="login-with-facebook" ></a> 
          </div>
          <div className="flex justify-center">
            Bạn đã có tài khoản? <strong>&nbsp;<a href="/login" className="text- hover:text-[#ff0000]">Đăng nhập ngay</a></strong>
          </div>
          <div className="flex justify-center">
           <strong>&nbsp;<a href="/registerOTP" className="text- hover:text-[#ff0000]">Vô trang register OTP</a></strong>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
