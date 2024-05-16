'use client';

import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import authHeader from '@/components/authHeader/AuthHeader';
import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Textarea,
  useDisclosure,
} from '@nextui-org/react';
import {
  ConsultServiceType,
  OrderType,
  PackType,
  ServiceType,
  TaskType,
} from '@/constants/types/homeType';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import dateConvert from '@/components/dateConvert';

interface UserLocal {
  data: {
    data: {
      userId: string;
    };
  };
}
const ServicePack = () => {
  const [purchasedPacks, setPurchasedPack] = useState<OrderType[]>([]);
  const [templatePacks, setTemplatePack] = useState<PackType[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState<string | null>(null);
  const [supportTo, setSupportTo] = useState('');
  const [createBy, setCreateBy] = useState('');
  const [
    orderPackageRequestServiceDetailUUID,
    setOrderPackageRequestServiceDetailUUID,
  ] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const todayDate = new Date().toISOString().substring(0, 10);

  let newTask = {
    taskName,
    description,
    startDate,
    supportTo,
    createBy,
    orderPackageRequestServiceDetailUUID,
  };

  const getUserFromStorage = () => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    }
  };

  const user: UserLocal | null = getUserFromStorage();
  const userId = user?.data.data.userId;

  useEffect(() => {
    getUser();
    getAllPurchasedPacks();
    getAllTemplatePacks();
  }, [userId]);

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}user/getUserById/${userId}`,
        {
          headers: authHeader(),
        }
      );
      setSupportTo(response.data.data.email);
      setCreateBy(response.data.data.email);
    } catch (error) {}
  };

  const getAllPurchasedPacks = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}orderPackageRequestService/getAllCheckOutPackageRequestServiceDetailByUser/${userId}`,
        {
          headers: authHeader(),
        }
      );
      setPurchasedPack(response.data.data || []);
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
        toast.success('Gửi yêu cầu thành công');
        setTaskName('');
        setDescription('');
        setStartDate(null);
        onClose();
      })
      .catch((error) => {
        toast.error('Gửi yêu cầu thất bại!');
        console.log(error);
      });
  };

  //get template packs
  const getAllTemplatePacks = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}orderPackageTemplate/getAllCheckOutPackageTemplateDetailByUser/${userId}`,
        {
          headers: authHeader(),
        }
      );
      console.log(response.data.data);
      setTemplatePack(response.data.data);
    } catch (error) {}
  };

  return (
    <div className="w-[1350px]  rounded-xl bg-white p-5 shadow-lg">
      <ToastContainer />
      <div className="flex flex-col items-center justify-center">
        <h2 className="mb-5 text-3xl font-bold text-gray-900">
          Gói dịch vụ tư vấn
          <strong>
            &nbsp;BA<span className="text-[#ff0000]">S</span>I
            <span className="text-[#ff0000]">CO&nbsp;</span>
          </strong>
        </h2>
        <p className="mx-auto mb-10 max-w-[1000px] whitespace-normal text-center text-xl text-gray-700">
          Cảm ơn bạn đã lựa chọn Basico! Giờ đây, bạn đã có thể tận hưởng các
          dịch vụ đặc biệt và sự hỗ trợ chuyên nghiệp từ chúng tôi. Nếu cần giải
          đáp thắc mắc, hãy liên hệ ngay. Chúc bạn có những trải nghiệm tuyệt
          vời!
        </p>
      </div>
      <div className="flex justify-between">
        <Link href="/servicePack">
          <h1 className="rounded-full bg-red-500 px-6 py-3 font-bold text-white transition duration-300 ease-in-out hover:bg-red-700">
            Mua gói tại đây
          </h1>
        </Link>
        <Link href="/profile/servicePack/requestHistory">
          <h1 className="rounded-full bg-red-500 px-6 py-3 font-bold text-white transition duration-300 ease-in-out hover:bg-red-700">
            Lịch sử gửi yêu cầu
          </h1>
        </Link>
      </div>
      <div className="mt-10 grid grid-cols-3 items-center justify-center gap-5 px-[100px]">
        {purchasedPacks &&
          purchasedPacks.map(
            (servicePack, key) =>
              servicePack.cart &&
              servicePack.cart.length > 0 && (
                <div
                  key={key}
                  className="radius flex w-[320px] flex-col items-center justify-center rounded-md border border-[#FF0004] bg-white"
                >
                  <h2 className="pt-5 text-[28px] font-semibold text-[#FF0004]">
                    {servicePack.cart[0]?.itemName.slice(0, 20)}
                  </h2>
                  <p className="pt-3 text-xl">
                    Lần gửi còn lại:{servicePack.cart[0]?.totalRequest}
                  </p>

                  <Button
                    className="my-5 bg-[#FF0004] text-white"
                    onClick={() => {
                      onOpen();
                      setOrderPackageRequestServiceDetailUUID(
                        servicePack.cart[0].orderDetailUUID
                      );
                    }}
                  >
                    Sử dụng
                  </Button>
                </div>
              )
          )}
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton>
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={(e) => handleSubmit(e, onClose)}>
                <ModalHeader className="mb-5 flex flex-col gap-1 bg-[#FF0004] text-2xl font-bold text-white">
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
                  <Textarea
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
                    value={startDate ? startDate.substring(0, 10) : ''}
                    onChange={(e) => {
                      const dateValue = e.target.value
                        ? dateConvert(new Date(e.target.value))
                        : null;
                      setStartDate(dateValue);
                    }}
                    min={todayDate}
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

      {/* template pack */}
      <div className="mt-16 flex flex-col items-center justify-center">
        <h2 className="mb-5 text-3xl font-bold text-gray-900">
          Gói nâng cấp biểu mẫu
          <strong>
            &nbsp;BA<span className="text-[#ff0000]">S</span>I
            <span className="text-[#ff0000]">CO&nbsp;</span>
          </strong>
        </h2>
        <p className="mx-auto mb-10 max-w-[1000px] whitespace-normal text-center text-xl text-gray-700">
          Để có thể sử dụng một số chức năng đặc biệt, hoặc sử dụng các văn bản
          và hợp đồng tại Basico các bạn phải đăng ký gói dịch vụ, dưới đây là
          các gói dịch vụ với các đặc quyền theo từng gói
        </p>
      </div>
      <div className="mt-10 grid grid-cols-3 items-center justify-center gap-5  px-[100px]">
        {templatePacks &&
          templatePacks.map((servicePack) => (
            <div
              key={servicePack.packageId}
              className="radius flex w-[387px] flex-col items-center justify-center rounded-md border border-[#FF0004] bg-white"
            >
              <h2 className="pt-5 text-[28px] font-semibold text-[#FF0004]">
                {servicePack.packageName}
              </h2>
              <p className="pt-3 text-xl">{servicePack.description}</p>
              <Button className="my-5 bg-[#FF0004] text-white" disabled>
                Đang sở hữu
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ServicePack;
