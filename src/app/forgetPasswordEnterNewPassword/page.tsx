'use client';

import { Button, Input } from '@nextui-org/react';
import { useState, ChangeEvent, FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
const Page = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex flex-col items-center justify-center bg-custom-bg bg-cover pb-[97px] pt-32 ">
      <ToastContainer />

      <div className="bg-white p-20">
        <div className="mt-51 flex flex-col items-center justify-center">
          <div className="mb-5 border-l-5 border-[#FF0004] pl-5 text-[17px] font-bold">
            <div className="text-3xl">Tạo lại mật khẩu của bạn</div>
            <div className="text-2xl">
              Đăng nhập ngay để được hỗ trợ pháp lý tốt nhất bởi các luật sư
              xuất sắc
            </div>
          </div>

          <div>
            <form>
              <div className="mb-10 flex w-[662px] flex-wrap gap-4 pt-5 md:flex-nowrap">
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

              <div className="flex w-[662px]">
                <Input
                  label="Password"
                  placeholder="Nhập lại mật khẩu"
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

              <div className="pt-5">
                <Button
                  type="submit"
                  className="my-4 w-full bg-[#F00044] text-white"
                >
                  Tạo mật khẩu mới
                </Button>
              </div>
              <div className="flex justify-center"></div>
              <div className="flex w-full justify-between">
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
