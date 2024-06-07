'use client';

import { Button, Input } from '@nextui-org/react';
import { useState, ChangeEvent, FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faEyeSlash,
  faKey,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import Link from 'next/link';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import Loading from '@/components/loading';

const Page = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [isVisibleRepeat, setIsVisibleRepeat] = useState(false);
  const toggleVisibilityRepeat = () => setIsVisibleRepeat(!isVisibleRepeat);
  const [disableButton, setDisableButton] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Check if both passwords are entered
    if (!password || !repeatPassword) {
      toast.error('Vui lòng điền vào đầy đủ!');
      return;
    }
    // Check if passwords match
    if (password !== repeatPassword) {
      toast.error('Mật khẩu xác nhận phải trùng với mật khẩu mới!');
      return;
    }

    if (password.length < 6 || password.length > 25) {
      toast.error('Mật khẩu mới tối thiểu 6 kí tự và tối đa 25 kí tự!');
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
      toast.success('Vui lòng nhập mã xác nhận');

      //save user to local storage
      localStorage.setItem('verifyEmail', email);
      router.push('/sendOTP?user=' + email);
    } catch (error) {
      console.error(error);
      toast.error('Đăng ký thất bại, Vui lòng thử lại.');
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-custom-bg bg-cover pb-[90px] pt-16 ">
      <ToastContainer />
      {isLoading && (
        <Loading className="fixed left-0 top-0 z-[100] h-full w-full bg-white bg-opacity-50" />
      )}
      <div className="rounded-2xl bg-white p-20">
        <div className="mt-50 flex flex-col items-center justify-center">
          <div className="mb-5 border-l-5 border-[#FF0004] pl-5 text-[17px] font-bold">
            <div className="text-2xl">Làm việc với các luật sư xuất sắc</div>
            <div className="text-3xl">CÔNG TY LUẬT BASICO CHÀO MỪNG BẠN</div>
          </div>

          <div>
            <form onSubmit={handleSubmit}>
              <div className="mb-10 flex w-[662px] flex-wrap gap-4 md:flex-nowrap">
                <Input
                  type="username"
                  label="Họ và Tên"
                  placeholder="Nhập họ và tên"
                  onChange={(e: any) => setUserName(e.target.value)}
                  startContent={
                    <FontAwesomeIcon icon={faUser} className="h-5 w-5" />
                  }
                />
              </div>
              <div className="mb-10 flex w-[662px] flex-wrap gap-4 md:flex-nowrap">
                <Input
                  type="email"
                  label="Email"
                  placeholder="Nhập email"
                  onChange={(e: any) => setEmail(e.target.value)}
                  startContent={
                    <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5" />
                  }
                />
              </div>

              <div className="mb-10 flex w-[662px] flex-wrap gap-4 md:flex-nowrap">
                <Input
                  label="Password"
                  placeholder="Nhập mật khẩu"
                  onChange={(e: any) => setPassword(e.target.value)}
                  type={isVisible ? 'text' : 'password'}
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
                />
              </div>

              <div className="flex w-[662px] pb-5">
                <Input
                  label="Repeat Password"
                  placeholder="Nhập lại mật khẩu"
                  onChange={(e: any) => setRepeatPassword(e.target.value)}
                  startContent={
                    <FontAwesomeIcon icon={faKey} className="h-5 w-5" />
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
                  type={isVisibleRepeat ? 'text' : 'password'}
                />
              </div>

              <Button
                isDisabled={disableButton}
                type="submit"
                className="my-4 w-full bg-[#FF0004] text-white"
              >
                Đăng ký
              </Button>
              <div className="flex justify-center">
                Bạn đã có tài khoản?{' '}
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
