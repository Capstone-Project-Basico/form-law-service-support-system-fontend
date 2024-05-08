"use client";

import { Button, Input } from "@nextui-org/react";
import { useState, ChangeEvent, FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
const Page = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col justify-center items-center pt-32 pb-[97px] bg-custom-bg bg-cover ">
      <ToastContainer />

      <div className="bg-white p-20">
        <div className="flex flex-col justify-center items-center mt-51">
          <div className="font-bold text-[17px] border-l-5 border-[#FF0004] pl-5 mb-5">
            <div className="text-3xl">Tạo lại mật khẩu của bạn</div>
            <div className="text-2xl">
              Đăng nhập ngay để được hỗ trợ pháp lý tốt nhất bởi các luật sư
              xuất sắc
            </div>
          </div>

          <div>
            <form>
              <div className="flex flex-wrap md:flex-nowrap gap-4 mb-10 w-[662px] pt-5">
                <Input
                  type="password"
                  label="Password"
                  placeholder="Nhập mật khẩu"
                  onChange={(e: any) => setPassword(e.target.value)}
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
                  onChange={(e: any) => setPassword(e.target.value)}
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

              <div className="pt-5">
                <Button
                  type="submit"
                  className="bg-[#F00044] text-white w-full my-4"
                >
                  Tạo mật khẩu mới
                </Button>
              </div>
              <div className="flex justify-center"></div>
              <div className="flex justify-between w-full">
                <strong>
                  <a href="/login" className="text- hover:text-[#ff0000]">
                    Quay lại đăng nhập
                  </a>
                </strong>
                <strong>
                  <a href="/register" className="text- hover:text-[#ff0000]">
                    Đăng ký tài khoản mới
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
