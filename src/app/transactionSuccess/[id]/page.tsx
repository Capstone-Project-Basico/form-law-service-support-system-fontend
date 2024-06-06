"use client";

import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { Button } from "@nextui-org/react";
import { faArrowLeft, faHome } from "@fortawesome/free-solid-svg-icons";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import authHeader from "@/components/authHeader/AuthHeader";

const Page = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    console.log(params.id);
    transactionSuccess(params.id);
  });

  const transactionSuccess = (id: string) => {
    try {
      axios
        .put(
          `${process.env.NEXT_PUBLIC_BASE_API}transaction/transactionSuccess/${id}`,
          {},
          { headers: authHeader() }
        )
        .then((res) => { });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5 my-[199px]">
      <FontAwesomeIcon
        icon={faCircleCheck}
        className="size-32 text-[#FF0004] mb-10"
      />
      <div className="text-5xl font-semibold">Cảm ơn!</div>
      <div className="text-3xl font-semibold">Thanh toán thành công!</div>
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
