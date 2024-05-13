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
import {
  ConsultServiceType,
  PackType,
  ServiceType,
  UserLocal,
} from "@/constants/types/homeType";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

const BuyPacks = () => {
  const router = useRouter();
  const [servicePacks, setServicePacks] = useState<ConsultServiceType[]>([]);
  const [selectedPack, setSelectedPack] = useState<
    ConsultServiceType | undefined
  >();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenPayment,
    onOpen: onOpenPayment,
    onClose: onClosePayment,
  } = useDisclosure();
  const [orderId, setOrderId] = useState<string>();
  const [transactionId, setTransactionId] = useState<string>();
  const [isSelectedQR, setIsSelectedQR] = useState(0);

  //data
  const [quantity, setQuantity] = useState(1);
  const [emailUser, setEmailUser] = useState("");
  const itemUUID = uuidv4();

  const getUserFromStorage = () => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
  };

  const user: UserLocal | null = getUserFromStorage();
  const userId = user?.data.data.userId;

  useEffect(() => {
    getUser();
    getAllPacks();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}user/getUserById/${userId}`,
        {
          headers: authHeader(),
        }
      );
      setEmailUser(response.data.data.email);
    } catch (error) {}
  };

  const getAllPacks = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}packageRequestService/getAllPackageRequestService`,
        {
          headers: authHeader(),
        }
      );
      setServicePacks(
        response.data.data.filter(
          (service: ConsultServiceType) =>
            service.deleted === false && service.processStatus === "ĐÃ DUYỆT"
        )
      );
    } catch (error) {}
  };

  //buy pack
  const handleBuy = async (id: string, price: number) => {
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
          cartRequestList: [{ quantity, itemUUID: id, price, emailUser }],
        };
        axios
          .post(
            `${process.env.NEXT_PUBLIC_BASE_API}orderPackageRequestService/createOrderServiceDetail`,
            updatedDataOrder,
            { headers: authHeader() }
          )
          .then((response) => {
            setOrderId(response.data.data.orderId);
            setTransactionId(response.data.data.transactionId);
            onOpenPayment();
          })
          .catch((error) => {
            toast.error("Yêu cầu mua thất bại");
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const payment = () => {
    if (isSelectedQR === 1) {
      payForServiceByCash();
    } else if (isSelectedQR === 2) {
      payForService();
    }
  };

  const payForService = () => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_BASE_API}orderPackageRequestService/payOrderPackageRequestServiceDetailByWallet/${orderId}`,
        {},
        { headers: authHeader() }
      )
      .then((res) => {
        toast.success(`${res.data.data}`);
      })
      .catch((err) => {
        toast.error("Ví của bạn không đủ tiền vui lòng nạp tại ví");
      });
  };

  const payForServiceByCash = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BASE_API}pay/create-payment-link/${transactionId}`,
        {},
        { headers: authHeader() }
      )
      .then((res) => {
        console.log(res.data);
        window.open(res.data.checkoutUrl, "_blank");
      })
      .catch((err) => {
        toast.error("Lỗi thanh toán, vui lòng kiểm tra lại!");
      });
  };

  return (
    <div className="w-[1350px]  p-5 bg-white rounded-xl shadow-lg">
      <ToastContainer />
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-5">
          Chọn gói dịch vụ tư vấn
          <strong>
            &nbsp;BA<span className="text-[#ff0000]">S</span>I
            <span className="text-[#ff0000]">CO&nbsp;</span>
          </strong>
        </h2>
        <p className="text-xl text-center text-gray-700 mb-10 mx-auto max-w-[1000px] whitespace-normal">
          Basico tự hào giới thiệu Gói Dịch Vụ Tư Vấn, được thiết kế để hỗ trợ
          và giải quyết những thách thức mà bạn gặp phải. Với dịch vụ này, chúng
          tôi cung cấp lời khuyên chuyên nghiệp và giải pháp cá nhân hoá, giúp
          bạn xử lý vấn đề một cách hiệu quả. Đăng ký ngay hôm nay để trải
          nghiệm sự hỗ trợ tận tâm từ Basico và khám phá các gói dịch vụ đặc
          biệt của chúng tôi.
        </p>
      </div>

      <div className="grid grid-cols-3 justify-center items-center m-10 gap-5 ">
        {servicePacks.map((servicePack) => (
          <Card
            key={servicePack.packageServiceId}
            className="flex flex-col justify-center items-center bg-white shadow-2xl rounded-lg overflow-hidden border border-gray-300 w-[400px] transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl"
          >
            <h2 className="text-[28px] font-semibold text-[#FF0004] p-5">
              {servicePack.packageRequestServiceName.slice(0, 18)}

            </h2>
            <h1 className="text-2xl bg-gradient-to-r from-black via-gray-800 to-red-600 text-white w-full flex items-center justify-center py-4">
              {servicePack.price.toLocaleString()} VND
            </h1>
            <CardFooter className="flex justify-evenly items-center w-full px-4 py-3 bg-black">
              <Button
                className="text-white bg-green-600 my-5"

                onClick={() => {
                  setSelectedPack(servicePack);
                  onOpen();
                }}
              >
                Chi tiết
              </Button>
              <Button
                className="text-white bg-red-600 rounded-full px-6 py-2 hover:bg-red-800 shadow-md transition-colors duration-300 ease-in-out"
                onClick={() =>
                  handleBuy(servicePack.packageServiceId, servicePack.price)
                }
              >
                Mua gói
              </Button>
            </CardFooter>
          </Card>
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
                    <h1 className="w-72">Tên dịch vụ tư vấn:</h1>
                    <h1 className="flex justify-start font-semibold text-[#FF0004]">
                      {selectedPack?.packageRequestServiceName
                        ? selectedPack?.packageRequestServiceName
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
                    <h1 className="bg-red-500 text-white text-lg font-medium px-6 py-3 rounded-lg cursor-pointer hover:bg-red-600">
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
                    handleBuy(selectedPack.packageServiceId, selectedPack.price)
                  }
                >
                  Mua gói
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* payment */}
      <Modal
        isOpen={isOpenPayment}
        onClose={onClosePayment}
        hideCloseButton
        size="3xl"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-white text-2xl font-bold bg-[#FF0004] mb-5">
            Chọn phương thức thanh toán
          </ModalHeader>
          <ModalBody>
            <div className="flex gap-10">
              <Button
                variant="faded"
                className={`bg-white w-[350px] h-[100px] flex justify-start items-center gap-2 ${
                  isSelectedQR === 1 ? "border-1 border-[#FF0004]" : ""
                }`}
                onClick={() => setIsSelectedQR(1)}
              >
                <Image alt="" src="/wallet/vietqr.png" width={50} height={50} />
                Thanh toán bằng mã QR
              </Button>

              <Button
                variant="faded"
                className={`bg-white w-[350px] h-[100px] flex justify-start items-center gap-2 ${
                  isSelectedQR === 2 ? "border-1 border-[#FF0004]" : ""
                }`}
                onClick={() => setIsSelectedQR(2)}
              >
                <Image alt="" src="/wallet/wallet.png" width={50} height={50} />
                Thanh toán bằng ví của bạn
              </Button>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClosePayment}>
              Đóng
            </Button>
            <Button color="primary" onClick={() => payment()}>
              thanh toán
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default BuyPacks;
