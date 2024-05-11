"use client";

import React, { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import authHeader from "@/components/authHeader/AuthHeader";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { PackType, ServiceType, TaskType } from "@/constants/types/homeType";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import dateConvert from "@/components/dateConvert";

interface UserLocal {
  data: {
    data: {
      userId: string;
    };
  };
}
const ServicePack = () => {
  const [purchasedPacks, setPurchasedPack] = useState<ServiceType[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<string | null>(null);

  let newTask = {
    taskName,
    description,
    startDate,
  };
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
  }, []);

  const getAllPurchasedPacks = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}orderService/getAllCheckOutFormTemplateDetailByUser/${userId}`,
        {
          headers: authHeader(),
        }
      );
      setPurchasedPack(response.data.data);
    } catch (error) {}
  };

  //send request
  const handleSubmit = async (e: FormEvent, onClose: () => void) => {
    e.preventDefault();

    axios
      .post(
        `${process.env.NEXT_PUBLIC_BASE_API}task-api/createNewTask`,
        newTask,
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        toast.success("Gửi yêu cầu thành công");
        setTaskName("");
        setDescription("");
        setStartDate(null);
        onClose();
      })
      .catch((error) => {
        toast.error("Gửi yêu cầu thất bại!");
        console.log(error);
      });
  };
  return (
    <div className="w-[1350px] bg-white rounded-2xl">
      <ToastContainer />
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold">
          Chọn gói nâng cấp dịch vụ
          <strong>
            &nbsp;BA<span className="text-[#ff0000]">S</span>I
            <span className="text-[#ff0000]">CO&nbsp;</span>
          </strong>
        </h2>
      </div>
      <div className="flex justify-between">
        <Link href="/profile/servicePack/buyServicePack">
          <h1 className="text-[#FF0004]">Mua gói tại đây</h1>
        </Link>
        <div className="flex items-center">
          <p>Số lần gửi yêu cầu còn lại: 5</p>
          <Button className="bg-[#FF0004]" onClick={onOpen}>
            Gửi yêu cầu
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-3 justify-center items-center mt-10 gap-5">
        {purchasedPacks.map((servicePack) => (
          <div
            key={servicePack.itemId}
            className="flex flex-col justify-center items-center bg-white border border-[#FF0004] radius w-[387px] rounded-md"
          >
            <h2 className="text-[28px] font-semibold text-[#FF0004] pt-5">
              {servicePack.itemName}
            </h2>
            {/* <p className="text-xl pt-3">{servicePack.description}</p> */}
            {/* <h1 className="flex text-[28px] bg-[#FF0004] text-white w-full items-center justify-center h-14">
              {servicePack.price.toLocaleString()} VND
            </h1> */}
            <Button className="text-white bg-[#FF0004] my-5" disabled>
              Đang sở hữu
            </Button>
          </div>
        ))}
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton>
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={(e) => handleSubmit(e, onClose)}>
                <ModalHeader className="flex flex-col gap-1 text-white text-2xl font-bold bg-[#FF0004] mb-5">
                  Hộ trợ tư vấn
                </ModalHeader>
                <ModalBody>
                  <Input
                    className="font-bold"
                    type="text"
                    label="Nội dung cần hỗ trợ"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                  />
                  <Input
                    type="text"
                    label="Mô tả"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />

                  <Input
                    isRequired
                    required
                    type="date"
                    label="Ngày luật sư có thể liên hệ"
                    value={startDate ? startDate.substring(0, 10) : ""}
                    onChange={(e) => {
                      const dateValue = e.target.value
                        ? dateConvert(new Date(e.target.value))
                        : null;
                      setStartDate(dateValue);
                      // console.log(e.target.value);
                      // console.log(dateValue?.substring(0, 10));
                    }}
                    className="form-input"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Đóng
                  </Button>
                  <Button color="primary" type="submit">
                    Gửi yêu cầu
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ServicePack;
