'use client';

import { Button, Input } from '@nextui-org/react';
import { useState, ChangeEvent, FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faKey } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import axiosClient from '@/lib/axiosClient';

const Page = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        localStorage.setItem('userData', JSON.stringify(user));
        localStorage.setItem('user', JSON.stringify(response));
        localStorage.setItem(
          'auth-token',
          JSON.stringify(response.data.data.token)
        );
        axios.defaults.headers.common['Authorization'] = `${response}`;

        switch (response.data.data.roleName) {
          case 'ROLE_ADMIN':
            router.push('/admin');
            toast.success('Đăng nhập thành công');
            break;
          case 'ROLE_MANAGER':
            router.push('/dashboard');
            toast.success('Đăng nhập thành công');
            break;
          case 'ROLE_STAFF':
            router.push('/dashboardStaff');
            toast.success('Đăng nhập thành công');
            break;
          case 'ROLE_CUSTOMER':
            router.push('/');
            toast.success('Đăng nhập thành công');
            break;
        }
        setTimeout(() => {
          localStorage.clear();
          toast.success('Hết thời gian đăng nhập');
        }, 6000000);
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 400) {
          const errorMessage = (error.response?.data as { message: string })
            ?.message;
          if (errorMessage === 'User is not verified yet') {
            toast.error(
              'Tài khoản chưa được xác thực, vui lòng kiểm tra email của bạn!'
            );
            axiosClient.get('auth/resendVerificationCode/' + email);
            setTimeout(() => {
              router.push('/sendOTP?user=' + email);
            }, 2000);
          } else {
            toast.error('Sai tên tài khoản hoặc mật khẩu!');
          }
        }

        console.log(error.response);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center bg-custom-bg bg-cover pb-[160px] pt-32 ">
      <ToastContainer />
      <div className="rounded-2xl bg-white p-20">
        <div className="mb-5 border-l-5 border-[#FF0004] pl-5 text-[17px] font-bold">
          <div className="text-2xl">Làm việc với các luật sư xuất sắc</div>
          <div className="text-3xl">CÔNG TY LUẬT BASICO CHÀO MỪNG BẠN</div>
        </div>

        <div className="mt-10 w-[762px]">
          <form onSubmit={handleSubmit}>
            <div className="mb-10 flex w-full flex-wrap gap-4 md:flex-nowrap">
              <Input
                type="email"
                label="Email"
                size="lg"
                placeholder="Nhập email"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                startContent={
                  <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5" />
                }
              />
            </div>
            <div className="flex w-full">
              <Input
                label="Password"
                size="lg"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
                startContent={
                  <FontAwesomeIcon icon={faKey} className="h-5 w-5" />
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
                        className="pointer-events-none text-2xl text-default-400"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        className="pointer-events-none text-2xl text-default-400"
                      />
                    )}
                  </button>
                }
                type={isVisible ? 'text' : 'password'}
              />
            </div>
            <div className="mt-4 flex justify-end font-bold">
              <a href="/forgetPassword" className="text- hover:text-[#ff0000]">
                Quên mật khẩu?
              </a>
            </div>
            <div className="flex items-center justify-center">
              <Button
                type="submit"
                size="lg"
                className="my-4 w-96 bg-[#F00004] text-white"
              >
                Đăng nhập
              </Button>
            </div>

            <div className="flex justify-center">
              Bạn chưa có tài khoản?{' '}
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
