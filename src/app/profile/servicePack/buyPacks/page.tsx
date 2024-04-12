"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import authHeader from "@/components/authHeader/AuthHeader";
import { Button } from "@nextui-org/react";
import { PackType, UserLocal } from "@/constants/types/homeType";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

const BuyPacks = () => {
  const router = useRouter();
  const [servicePacks, setServicePacks] = useState<PackType[]>([]);

  const getUserFromStorage = () => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
  };

  const user: UserLocal | null = getUserFromStorage();
  const userId = user?.data.data.userId;

  useEffect(() => {
    getAllPacks();
  }, []);

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

  //buy pack
  const handleBuy = async (packageId: string, price: number) => {
    try {
      if (!user) {
        Swal.fire({
          title: "Bạn chưa đăng nhập, bạn có muốn đăng nhập?",
          showDenyButton: true,
          // showCancelButton: true,
          confirmButtonText: "Có",
          denyButtonText: `Không`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            // Swal.fire("Saved!", "", "success");
            router.push("/login");
          } else if (result.isDenied) {
            Swal.fire("Bạn cần đăng nhập để sử dụng tính năng này", "", "info");
            return;
          }
        });
        return;
      } else {
        // setItemId(formId);
        const updatedDataOrder = {
          userId,
          packageId,
        };
        axios
          .post(
            `${process.env.NEXT_PUBLIC_BASE_API}orderPackageTemplate/createOrderPackageTemplateDetail`,
            updatedDataOrder
          )
          .then((response) => {
            const orderId = response.data.data;
            Swal.fire({
              title: "Bạn có chấp nhận thanh toán",
              showDenyButton: true,
              // showCancelButton: true,
              confirmButtonText: "Có",
              denyButtonText: `Không`,
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                payForTemplate(orderId);
              } else if (result.isDenied) {
                Swal.fire("Vui lòng thanh toán để sử dụng", "", "info");
                return;
              }
            });
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const payForTemplate = (orderId: string) => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_BASE_API}orderPackageTemplate/payOrderPackageTemplateDetail/${orderId}`,
        {},
        { headers: authHeader() }
      )
      .then((res) => {
        toast.success(`${res.data.data}`);
      });
  };

  return (
    <div className="w-[950px]">
      <ToastContainer />
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
      <div className="grid grid-cols-3 justify-center items-center mt-10 gap-20">
        {servicePacks.map((servicePack) => (
          <div
            key={servicePack.packageId}
            className="flex flex-col justify-center items-center bg-white border border-[#FF0004] radius w-[320px] rounded-md"
          >
            <h2 className="text-[28px] font-semibold text-[#FF0004] pt-5">
              {servicePack.packageName}
            </h2>
            <p className="text-xl pt-3">{servicePack.description}</p>
            <h1 className="flex text-[28px] bg-[#FF0004] text-white w-full items-center justify-center h-14">
              {servicePack.price} cho 1 tháng
            </h1>
            <Button
              className="text-white bg-[#FF0004] my-5"
              onClick={() =>
                handleBuy(servicePack.packageId, servicePack.price)
              }
            >
              Đăng ký
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyPacks;
