"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import authHeader from "@/components/authHeader/AuthHeader";
import {
  Button,
  Card,
  CardFooter,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { PackType, UserLocal } from "@/constants/types/homeType";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BuyPacks = () => {
  const router = useRouter();
  const [servicePacks, setServicePacks] = useState<PackType[]>([]);
  const [selectedPack, setSelectedPack] = useState<PackType | undefined>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
    } catch (error) { }
  };

  //buy pack
  const handleBuy = async (packageId: string, price: number) => {
    try {
      if (!user) {
        Swal.fire({
          text: "Bạn chưa đăng nhập, bạn có muốn đăng nhập?",
          showDenyButton: true,
          // showCancelButton: true,
          confirmButtonText: "Có",
          confirmButtonColor: '#00BB00',
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
              text: "Bạn có chấp nhận thanh toán",
              showDenyButton: true,
              confirmButtonText: "Có",
              confirmButtonColor: '#00BB00',
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
    <div className="w-[1350px]  p-5 bg-white rounded-xl shadow-lg">
      <ToastContainer />
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-5">
          Chọn gói nâng cấp dịch vụ
          <strong>
            &nbsp;BA<span className="text-[#ff0000]">S</span>I
            <span className="text-[#ff0000]">CO&nbsp;</span>
          </strong>
        </h2>
        <p className="text-xl text-center text-gray-700 mb-10 mx-auto max-w-[1000px] whitespace-normal">
          Để có thể sử dụng một số chức năng đặc biệt, hoặc sử dụng các văn bản
          và hợp đồng tại Basico các bạn phải đăng ký gói dịch vụ, dưới đây là
          các gói dịch vụ với các đặc quyền theo từng gói
        </p>
      </div>
      <div className="grid grid-cols-3 gap-5 justify-center items-center m-10">
        {servicePacks.map((servicePack) => (
          <div
            key={servicePack.packageId}
            className="flex flex-col justify-center items-center bg-white shadow-2xl rounded-lg overflow-hidden border border-gray-300 w-[400px] transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl"
          >
            <h2 className="text-2xl text-center font-bold text-gray-900 py-4 px-5">
              {servicePack.packageName}
            </h2>
            <h1 className="text-2xl bg-gradient-to-r from-black via-gray-800 to-red-600 text-white w-full flex items-center justify-center py-4">
              {servicePack.price.toLocaleString()} VND
            </h1>
            <div className="flex justify-evenly items-center w-full px-4 py-3 bg-black">
              <button
                className="text-white bg-red-600 rounded-full px-6 py-2 hover:bg-red-800 shadow-md transition-colors duration-300 ease-in-out"
                onClick={() => {
                  setSelectedPack(servicePack);
                  onOpen();
                }}
              >
                Chi tiết
              </button>
              <button
                className="text-white bg-red-600 rounded-full px-6 py-2 hover:bg-red-800 shadow-md transition-colors duration-300 ease-in-out"
                onClick={() =>
                  handleBuy(servicePack.packageId, servicePack.price)
                }
              >
                Mua gói
              </button>
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton
        size="5xl"
        className=""
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-3xl">
                Thông tin gói dịch vụ
              </ModalHeader>
              <ModalBody className="flex flex-row">
                <div className="gap-10 flex flex-col justify-start items-start text-2xl">
                  <div className="flex">
                    <h1 className="w-72">Tên của gói dịch vụ:</h1>
                    <h1 className="flex justify-start font-semibold text-[#FF0004]">
                      {selectedPack?.packageName
                        ? selectedPack?.packageName
                        : "Biểu mẫu này hiện tại không có tên"}
                    </h1>
                  </div>

                  <div className="flex">
                    <h1 className="min-w-72">Chi tiết gói:</h1>
                    <h1 className="flex justify-start font-semibold text-[#FF0004] max-h-64 overflow-auto">
                      {selectedPack?.description}
                    </h1>
                  </div>

                  <div className="flex">
                    <h1 className="w-72">Giá gói:</h1>
                    <h1 className="flex justify-start font-semibold text-[#FF0004]">
                      {selectedPack?.price.toLocaleString()} VND
                    </h1>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Đóng
                </Button>
                <Button
                  className="text-white bg-[#FF0004]"
                  onClick={() =>
                    selectedPack &&
                    handleBuy(selectedPack.packageId, selectedPack.price)
                  }
                >
                  Mua gói
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default BuyPacks;
