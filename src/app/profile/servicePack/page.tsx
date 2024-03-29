import { Button } from "@nextui-org/react";
import React from "react";

const ServicePack = () => {
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
        <div className="flex flex-col justify-center items-center bg-white border border-[#FF0004] radius w-[387px] rounded-md">
          <h2 className="text-[28px] font-semibold text-[#FF0004] pt-5">
            Basic
          </h2>
          <p className="text-xl pt-3">Được sử dụng 30 biểu mẫu luật</p>
          <p className="text-xl pb-3">Được các luật sư của Basico góp ý </p>
          <h1 className="flex text-[28px] bg-[#FF0004] text-white w-full items-center justify-center h-14">
            30,000Đ cho 1 tháng
          </h1>
          <Button className="text-white bg-[#FF0004] mb-5">Đăng ký</Button>
        </div>
      </div>
    </div>
  );
};

export default ServicePack;
