'use client';

import { Button, Input } from '@nextui-org/react';
import { useState, ChangeEvent, FormEvent, use, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter, useSearchParams } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = searchParams.get('user');
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formValues: { [key: string]: string } = {};

    formData.forEach((value, key) => {
      formValues[key] = value.toString();
    });

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API}auth/verifyUser?email=${user}&code=${formValues.code}`
      );
      toast.success('Xác nhận thành công');
      router.push('/login');
    } catch (error) {
      toast.error('Mã xác nhận không chính xác');
    }
  };

  useEffect(() => {
    if (!user) {
      toast.error('Không tìm thấy email');
      router.push('/login');
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-[#f3f3f3] pb-[97px] pt-32">
      <ToastContainer />
      <div className="bg-white p-20">
        <div className="mt-51 flex flex-col items-center justify-center">
          <div className="mb-5 border-l-5 border-[#FF0004] pl-5 text-[17px] font-bold">
            <div className="text-3xl">NHẬP MÃ XÁC NHẬN</div>
            <div className="text-2xl">
              Để xác nhận tài khoản của bạn, hãy nhập mã gồm 5 chữ{' '}
            </div>
            <div className="text-2xl">
              mà chúng tôi gữi đến địa chỉ email của bạn
              <div>{user}</div>
            </div>
          </div>

          <div className="pt-5">
            <form onSubmit={handleSubmit}>
              <div className="mb-10 flex w-[662px] flex-col flex-wrap gap-6 md:flex-nowrap">
                <input name="email" type="hidden" value={user || ''} />
                <Input
                  name="code"
                  variant="bordered"
                  type="text"
                  label="Mã xác nhận"
                  placeholder="Mã xác nhận"
                />
              </div>

              <Button
                type="submit"
                className="my-4 w-full bg-[#F00044] text-white"
              >
                Tiếp
              </Button>
              <div className="">
                <Button
                  type="submit"
                  className="border-#ff0000 text-#ff0000 my-4 w-full border bg-[white]"
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
