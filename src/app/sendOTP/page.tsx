'use client';

import axiosClient from '@/lib/axiosClient';
import { Button, Input } from '@nextui-org/react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FetchUser />
    </Suspense>
  );
};

const FetchUser = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = searchParams.get('user');

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
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center bg-custom-bg bg-cover pb-[97px] pt-32">
      <ToastContainer />
      <div className="rounded-2xl bg-white p-20">
        <div className="mt-51 flex flex-col items-center justify-center">
          <div className="mb-5 border-l-5 border-[#FF0004] pl-5 text-[17px] font-bold">
            <div className="text-3xl">NHẬP MÃ XÁC NHẬN</div>
            <div className="text-2xl">
              Để xác nhận tài khoản của bạn, hãy nhập mã{' '}
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
                  type="button"
                  className="border-#ff0000 text-#ff0000 my-4 w-full border bg-[white]"
                  onPress={() => {
                    axiosClient
                      .get('auth/resendVerificationCode/' + user)
                      .then(() => {
                        toast.success('Đã gửi mã xác nhận');
                      })
                      .catch(() => {
                        toast.error('Gửi mã xác nhận thất bại');
                      });
                  }}
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
