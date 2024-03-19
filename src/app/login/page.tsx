"use client";

import { Button, Input } from "@nextui-org/react";
import { useState, ChangeEvent, FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Link from "next/link";

const Page = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let dataLogin = {
    email: email,
    password: password,
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_API}auth/generateToken`, dataLogin)
      .then((response) => {
        setTimeout(() => {
          localStorage.setItem("user", JSON.stringify(response));
          axios.defaults.headers.common["Authorization"] = `${response}`;
          switch (response.data.role) {
            case "ROLE_ADMIN":
              <Link href="/dashboard" />;
              break;
            case "ROLE_CUSTOMER":
              <Link href="/" />;
              break;
            default:
              <Link href="/" />;
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center mt-52">
      <div className="font-bold text-[17px] border-l-5 border-[#FF0004] pl-5 mb-5">
        <div className="text-2xl">Làm việc với các luật sư xuất sắc</div>
        <div className="text-3xl">CÔNG TY LUẬT BASICO CHÀO MỪNG BẠN</div>
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap md:flex-nowrap gap-4 mb-10 w-[662px]">
            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex w-[662px]">
            <Input
              label="Password"
              placeholder="Enter your password"
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
              type={isVisible ? "text" : "password"}
            />
          </div>
          <div className="flex justify-end font-bold">Quên mật khẩu</div>
          <Button type="submit" className="bg-[#F00044] text-white w-full my-4">
            Đăng nhập
          </Button>
          <div className="flex justify-center">
            Bạn chưa có tài khoản? <strong>&nbsp;Đăng ký ngay</strong>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
