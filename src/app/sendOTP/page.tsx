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
    <div className="flex flex-col justify-center items-center pt-32 pb-[97px] bg-[#f3f3f3]">
      <ToastContainer />
      <div className="bg-white p-20">
        <div className="flex flex-col justify-center items-center mt-51">
          <div className="font-bold text-[17px] border-l-5 border-[#FF0004] pl-5 mb-5">
            <div className="text-3xl">NHẬP MÃ XÁC NHẬN</div>
            <div className="text-2xl">
              Để xác nhận tài khoản của bạn, hãy nhập mã gồm 5 chữ{" "}
            </div>
            <div className="text-2xl">
              mà chúng tôi gưi đến địa chỉ email của bạn{" "}
            </div>
          </div>

          <div className="pt-5">
            <form>
              <div className="flex flex-wrap md:flex-nowrap gap-4 mb-10 w-[662px]">
                <Input
                  type=""
                  placeholder="Mã xác nhận"
                  onChange={(e: any) => setEmail(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                className="bg-[#F00044] text-white w-full my-4"
              >
                Tiếp
              </Button>
              <div className="">
                <Button
                  type="submit"
                  className="border border-#ff0000 bg-[white] text-#ff0000 w-full my-4"
                >
                  Tôi không nhận được mã
                </Button>
              </div>
              <div className="flex justify-center">
                <strong>
                  <a href="/login" className="text- hover:text-[#ff0000]">
                    Quay lại đăng nhập
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
