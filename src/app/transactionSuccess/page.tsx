"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { Button } from "@nextui-org/react";
import { faArrowLeft, faHome } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center gap-5 my-[199px]">
      <FontAwesomeIcon
        icon={faCircleCheck}
        className="size-32 text-green-600 mb-10"
      />
      <div className="text-5xl font-semibold">Cảm ơn!</div>
      <div className="text-3xl font-semibold">Mua hàng thành công!</div>
      <div className="flex gap-5">
        <Button
          className="flex flex-row justify-center items-center bg-white border-[#FF0004] text-[#FF0004] hover:bg-[#FF0004] hover:text-white"
          variant="bordered"
          onClick={() => router.push("/")}
        >
          <FontAwesomeIcon icon={faHome} className="size-5 mr-3" />
          <p>Trờ về trang chủ</p>
        </Button>
        <Button
          className="flex flex-row justify-center items-center bg-white border-[#FF0004] text-[#FF0004] hover:bg-[#FF0004] hover:text-white"
          variant="bordered"
          onClick={() => router.push("/template")}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="size-5 mr-3" />
          <p>Trờ về trang biểu mẫu</p>
        </Button>
      </div>
    </div>
  );
};

export default Page;
