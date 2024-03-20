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


  

  return (
    <div className="flex flex-col justify-center items-center mt-51">
      <div className="font-bold text-[17px] border-l-5 border-[#FF0004] pl-5 mb-5">
        <div className="text-3xl">QUÊN MẬT KHẨU</div>
        <div className="text-2xl">Để lấy lại mật khẩu của bạn, vui lòng hãy nhập địa chỉ email</div>
      </div>

      <div>
        <form >
          <div className="flex flex-wrap md:flex-nowrap gap-4 mb-10 w-[662px]">
            <Input
              type="email"
              label="Email"
              placeholder="Nhập email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
         
          
          <Button type="submit" className="bg-[#F00044] text-white w-full my-4">
            Tạo lại mật khẩu
          </Button>
          <div className="flex justify-center">
            
          </div>
          <div className="flex justify-center">
              <strong>&nbsp;<a href="/login" className="text- hover:text-[#ff0000]">Quay lại đăng nhập</a></strong>
              <strong>&nbsp;<a href="/register" className="text- hover:text-[#ff0000]">Đăng ký tài khoản mới</a></strong>
          </div>
          <div className="flex justify-center">
           <strong>&nbsp;<a href="/forgetPasswordEnterNewPassword" className="text- hover:text-[#ff0000]">Vô trang khôi phục password</a></strong>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
