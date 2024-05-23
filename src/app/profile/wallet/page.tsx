"use client";

import authHeader from "@/components/authHeader/AuthHeader";
import { UserLocal } from "@/constants/types/homeType";
import { Accordion, AccordionItem, Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import React, { FormEvent, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Wallet = () => {
  const [walletError, setWalletError] = useState<boolean>();
  const [walletId, setWalletId] = useState("");
  const [maxBalance, setMaxBalance] = useState();
  const [money, setMoney] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  //data
  const [fullName, setFullName] = useState('');
  const [bankNumber, setBankNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [balance, setBalance] = useState<Number>();

  let requestWithdrawal = {
    walletId,
    fullName,
    bankNumber,
    bankName,
    balance
  };

  const getUserFromStorage = () => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
  };

  const user: UserLocal | null = getUserFromStorage();
  const userId = user?.data.data.userId;

  const getWallet = () => {
    if (!user) return;

    // setWalletError(null);
    try {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_API}wallet/getWalletByUser/${userId}`
        )
        .then((response) => {
          setWalletId(response.data.data.walletId);
          setMaxBalance(response.data.data.balance)
          setWalletError(true);
        })
        .catch((error) => {
          setWalletError(false);
        });
    } catch (error) {
      console.log(error);
      setWalletError(false);
    }
  };

  useEffect(() => {
    getWallet();
  }, []);

  const checkRequest = () => {
    if (walletError) {
      requestRecharge(walletId);
    } else {
      axios
        .post(`${process.env.NEXT_PUBLIC_BASE_API}wallet/createWallet`, {
          userId,
        })
        .then((response) => {
          requestRecharge(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const requestRecharge = (id: string) => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_BASE_API}wallet/requestRechargeWallet/${id}?balance=${money}`,
        {},
        { headers: authHeader() }
      )
      .then((response) => {
        rechargeByCash(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const rechargeByCash = (orderId: string) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BASE_API}pay/create-payment-link/${orderId}`,
        {},
        { headers: authHeader() }
      )
      .then((res) => {
        console.log(res.data);

        window.open(res.data.checkoutUrl, "_blank");
      });
  };

  const handleSubmit = async (e: FormEvent, onClose: () => void) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BASE_API}request-withdrawal/createNewRequest`,
        requestWithdrawal,
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        toast.success('Gửi yêu cầu thành công');
        setFullName('');
        setBankNumber('');
        setBankName('');
        setBalance(0);
        onClose();
      })
      .catch((error) => {
        toast.error('Gửi yêu cầu thất bại!');
        console.log(error);
      });
  };

  return (
    <div className="w-[1350px]  p-5 bg-white rounded-xl shadow-lg">
      <ToastContainer />
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl font-semibold">Nạp tiền vào tài khoản</h2>
          <p className="text-[14px]">
            Bạn có thể chọn các phương thức thanh toán khả dụng bên dưới
          </p>
        </div>
        <Button
          disabled={!walletError}
          onClick={() => onOpen()}
          className="bg-[#FF0004] text-white"
        >
          Yêu cầu rút tiền
        </Button>
      </div>
      <div className="mt-10 border-black border ">
        <div className="border w-full">
          <Button
            className="bg-white flex flex-row items-center justify-between h-24 w-full"
            disabled
          >
            <Image src="/wallet/bank.png" alt="" width={50} height={50} />
            <div className="flex flex-col justify-start items-start ml-3  w-full">
              <h3 className="text-[18px] font-semibold">
                Chuyển khoản ngân hàng 24/7
              </h3>
              <p>Chuyển khoản ngân hàng online</p>
            </div>
            <h1 className="font-bold text-[#FF0004]">Đang phát triển</h1>
          </Button>
        </div>
        <div className="border w-full">
          <Button
            className="bg-white flex flex-row items-center justify-between h-24 w-full"
            disabled
          >
            <Image src="/wallet/momo.png" alt="" width={50} height={50} />
            <div className="flex flex-col justify-start items-start ml-3 w-full">
              <h3 className="text-[18px] font-semibold">
                Nạp số dư trực tiếp bằng Momo Payment
              </h3>
              <p>Nạp tiền tự động liên kết với Momo</p>
            </div>
            <h1 className="font-bold text-[#FF0004]">Đang phát triển</h1>
          </Button>
        </div>
        <div className="border w-full">
          <Accordion selectionMode="multiple">
            <AccordionItem
              key="1"
              aria-label="Chung Miller"
              startContent={
                <div className="bg-white flex flex-row justify-start h-full w-full">
                  <Image
                    src="/wallet/vietqr.png"
                    alt=""
                    width={50}
                    height={50}
                  />
                </div>
              }
              subtitle="Quét mã QR trên ứng dụng Mobile Banking"
              title={
                <h3 className="text-[18px] font-semibold">
                  Thanh toán trực tiếp bằng VIETQR
                </h3>
              }
            >
              <div className="flex items-start justify-start gap-3 h-full">
                <Input
                  isRequired
                  variant="bordered"
                  className="w-96"
                  type="number"
                  label="Nhập số tiền"
                  min={2000}
                  onChange={(e: any) => setMoney(e.target.value)}
                ></Input>
                <Button
                  className="bg-[#FF0004] h-14 text-white"
                  onClick={() => checkRequest()}
                  disabled={!money || Number(money) < 2000}
                >
                  Nạp tiền
                </Button>
              </div>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton>
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={(e) => handleSubmit(e, onClose)}>
                <ModalHeader className="mb-5 flex flex-col gap-1 bg-[#FF0004] text-2xl font-bold text-white">
                  Yêu cầu rút tiền
                </ModalHeader>
                <ModalBody>
                  <Input
                    isRequired
                    className="font-bold"
                    type="text"
                    label="Tên tài khoản"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  <Input
                    isRequired
                    type="text"
                    label="Tên ngân hàng"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                  />
                  <Input
                    isRequired
                    type="text"
                    label="Số tài khoản"
                    value={bankNumber}
                    onChange={(e) => setBankNumber(e.target.value)}
                  />
                  <Input
                    isRequired
                    type="number"
                    label="Số tiền muốn rút"
                    value={balance?.toString()}
                    onChange={(e) => setBalance(Number(e.target.value))}
                    min={10000}
                    max={maxBalance}
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

export default Wallet;
