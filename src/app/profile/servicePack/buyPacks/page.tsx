"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import authHeader from "@/components/authHeader/AuthHeader";
import { Button } from "@nextui-org/react";
import { PackType } from "@/constants/types/homeType";

const BuyPacks = () => {
  const [servicePacks, setServicePacks] = useState<PackType[]>([]);

  useEffect(() => {
    getAllPacks();
  });

  const getAllPacks = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}packageTemplate/getAllPackage`,
        {
          headers: authHeader(),
        }
      );
      setServicePacks(response.data.data);
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
      <div className="grid grid-cols-3 justify-center items-center mt-10">
        {servicePacks.map((servicePack) => (
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

export default BuyPacks;
