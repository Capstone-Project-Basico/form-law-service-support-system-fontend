import { Button } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

const Wallet = () => {
  return (
    <div className="w-[950px]  bg-white px-10 pt-5 rounded-2xl">
      <h2 className="text-xl font-semibold">Nạp tiền vào tài khoản</h2>
      <p className="text-[14px]">
        Bạn có thể chọn các phương thức thanh toán khả dụng bên dưới
      </p>
      <div className="mt-10 border-black border ">
        <div className="border ">
          <Button className="bg-white flex flex-row h-24">
            <Image src="/wallet/bank.png" alt="" width={50} height={50} />
            <div className="flex flex-col justify-start items-start ml-3">
              <h3 className="text-[18px] font-semibold">
                Chuyển khoản ngân hàng 24/7
              </h3>
              <p>Chuyển khoản ngân hàng online</p>
            </div>
          </Button>
        </div>
        <div className="border ">
          <Button className="bg-white flex flex-row h-24">
            <Image src="/wallet/momo.png" alt="" width={50} height={50} />
            <div className="flex flex-col justify-start items-start ml-3">
              <h3 className="text-[18px] font-semibold">
                Nạp số dư trực tiếp bằng Momo Payment
              </h3>
              <p>Nạp tiền tự động liên kết với Momo</p>
            </div>
          </Button>
        </div>
        <div className="border ">
          <Button className="bg-white flex flex-row h-24">
            <Image src="/wallet/vnpay.png" alt="" width={50} height={50} />
            <div className="flex flex-col justify-start items-start ml-3">
              <h3 className="text-[18px] font-semibold">Thanh toán VNPAY-QR</h3>
              <p>Quét mã QR Pay trên ứng dụng Mobile Banking</p>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
