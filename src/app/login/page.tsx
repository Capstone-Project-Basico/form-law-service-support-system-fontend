"use client";

import { Button, Input } from "@nextui-org/react";
import { useState, ChangeEvent, FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faKey } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import Link from "next/link";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

const Page = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  let dataLogin = {
    email: email,
    password: password,
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_API}auth/generateToken`, dataLogin)
      .then((response) => {
        const user = {
          expiration: new Date().getTime() + 1000 * 60 * 25,
          ...response.data.data,
        };
        localStorage.setItem("userData", JSON.stringify(user));
        localStorage.setItem("user", JSON.stringify(response));
        localStorage.setItem(
          "auth-token",
          JSON.stringify(response.data.data.token)
        );
        axios.defaults.headers.common["Authorization"] = `${response}`;

        switch (response.data.data.roleName) {
          case "ROLE_ADMIN":
            router.push("/admin");
            toast.success("Đăng nhập thành công");
            break;
          case "ROLE_MANAGER":
            router.push("/dashboard");
            toast.success("Đăng nhập thành công");
            break;
          case "ROLE_STAFF":
            router.push("/dashboardStaff");
            toast.success("Đăng nhập thành công");
            break;
          case "ROLE_USER":
            router.push("/");
            toast.success("Đăng nhập thành công");
            break;
        }
        setTimeout(() => {
          localStorage.clear();
          toast.success("Hết thời gian đăng nhập");
        }, 6000000);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Sai tên tài khoản hoặc mật khẩu!");
      });
  };

  return (
    <div className="flex flex-col justify-center items-center pt-32 pb-[160px] bg-custom-bg bg-cover ">
      <ToastContainer />

      <div className="bg-white p-20 rounded-2xl">
        <div className="font-bold text-[17px] border-l-5 border-[#FF0004] pl-5 mb-5">
          <div className="text-2xl">Làm việc với các luật sư xuất sắc</div>
          <div className="text-3xl">CÔNG TY LUẬT BASICO CHÀO MỪNG BẠN</div>
        </div>

        <div className="w-[762px] mt-10">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap md:flex-nowrap gap-4 mb-10 w-full">
              <Input
                type="email"
                label="Email"
                size="lg"
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                startContent={
                  <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5" />
                }
              />
            </div>
            <div className="flex w-full">
              <Input
                label="Password"
                size="lg"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                type={isVisible ? "text" : "password"}
              />
            </div>
            <div className="flex justify-end font-bold mt-4">
              <a href="/forgetPassword" className="text- hover:text-[#ff0000]">
                Quên mật khẩu?
              </a>
            </div>
            <div className="flex items-center justify-center">
              <Button
                type="submit"
                size="lg"
                className="bg-[#F00004] text-white w-96 my-4"
              >
                Đăng nhập
              </Button>
            </div>

            <div className="flex justify-center">
              Bạn chưa có tài khoản?{" "}
              <strong>
                &nbsp;
                <a href="/register" className="text- hover:text-[#ff0000]">
                  Đăng ký ngay
                </a>
              </strong>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
