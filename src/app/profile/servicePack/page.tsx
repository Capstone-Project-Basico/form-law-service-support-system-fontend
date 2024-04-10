"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import authHeader from "@/components/authHeader/AuthHeader";
import { Button } from "@nextui-org/react";
import { PackType } from "@/constants/types/homeType";
import Link from "next/link";

interface UserLocal {
  data: {
    data: {
      userId: string;
    };
  };
}
const ServicePack = () => {
  const [purchasedPacks, setPurchasedPack] = useState<PackType[]>([]);

  const getUserFromStorage = () => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
  };

  const user: UserLocal | null = getUserFromStorage();
  const userId = user?.data.data.userId;

  useEffect(() => {
    getAllPurchasedPacks();
  });

  const getAllPurchasedPacks = async () => {
    try {
      const response = await axios.get(
        `${process.env.BASE_API}orderPackageTemplate/getAllCheckOutPackageTemplateDetailByUser/${userId}`,
        {
          headers: authHeader(),
        }
      );
      setPurchasedPack(response.data.data);
    } catch (error) {}
  };
  return (
    <div className="w-[950px]">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold">
          Chọn gói nâng cấp dịch vụ
          <strong>
            &nbsp;BA<span className="text-[#ff0000]">S</span>I
            <span className="text-[#ff0000]">CO&nbsp;</span>
          </strong>
        </h2>
        <p className="text-xl">
          Để có thể sử dụng một số chức năng đặc biệt, hoặc sử dụng các văn bản
          và hợp đồng tại Basico các bạn phải đăng ký gói dịch vụ, dưới đây là
          các gói dịch vụ với các đặc quyền theo từng gói
        </p>
      </div>
      <Link href="/profile/servicePack/buyPacks">
        <h1 className="text-[#FF0004]">Mua gói tại đây</h1>
      </Link>
      <div className="grid grid-cols-3 justify-center items-center mt-10 gap-5">
        {purchasedPacks.map((servicePack) => (
          <div
            key={servicePack.packageId}
            className="flex flex-col justify-center items-center bg-white border border-[#FF0004] radius w-[387px] rounded-md"
          >
            <h2 className="text-[28px] font-semibold text-[#FF0004] pt-5">
              {servicePack.packageName}
            </h2>
            <p className="text-xl pt-3">{servicePack.description}</p>
            <h1 className="flex text-[28px] bg-[#FF0004] text-white w-full items-center justify-center h-14">
              {servicePack.price} cho 1 tháng
            </h1>
            <Button className="text-white bg-[#FF0004] my-5">Đăng ký</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicePack;
