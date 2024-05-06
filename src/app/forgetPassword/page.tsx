"use client";

import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Page = () => {
  const [email, setEmail] = useState("");

  const forgotPassword = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_API}auth/forgotPassword/${email}`)
      .then((response) => {
        console.log(response);
        toast.success(
          "Lấy lại mật khẩu thành công, vui lòng kiểm tra mail của bạn."
        );
      })
      .catch((error) => {
        toast.error("Lấy lại mất khẩu thất bại");
      });
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex flex-col justify-center items-center pt-32 pb-[142px] bg-custom-bg bg-cover ">
        <div className="bg-white p-20">
          <div className="flex flex-col justify-center items-center mt-51">
            <div className="font-bold text-[17px] border-l-5 border-[#FF0004] pl-5 mb-5">
              <div className="text-3xl">QUÊN MẬT KHẨU</div>
              <div className="text-2xl">
                Để lấy lại mật khẩu của bạn, vui lòng hãy nhập địa chỉ email
              </div>
            </div>

            <div className="pt-10">
              <form>
                <div className="flex flex-wrap md:flex-nowrap gap-4 mb-10 w-[662px]">
                  <Input
                    type="email"
                    label="Email"
                    placeholder="Nhập email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  className="bg-[#F00044] text-white w-full my-4"
                  onClick={(e) => {
                    e.preventDefault();
                    forgotPassword();
                  }}
                >
                  Tạo lại mật khẩu
                </Button>
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
                {/* <div className="flex justify-center">
                <strong>
                  &nbsp;
                  <a href="/sendOTP" className="text- hover:text-[#ff0000]">
                    Vô trang gửi OTP
                  </a>
                </strong>
              </div>
              <div className="flex justify-center">
                <strong>
                  &nbsp;
                  <a
                    href="/forgetPasswordEnterNewPassword"
                    className="text- hover:text-[#ff0000]"
                  >
                    Vô trang khôi phục password
                  </a>
                </strong>
              </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
