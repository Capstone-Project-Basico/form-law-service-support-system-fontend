"use client";

import { Template } from "@/constants/types/homeType";
import HeaderComponent from "@/components/header";
// import CardTemplate from "@/sections/CardTemplate";
import { useEffect, useState } from "react";

import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { GoogleMaps } from "@/components/ui/GoogleMaps";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Button,
  Input,
  CardFooter,
  Pagination,
} from "@nextui-org/react";
import Link from "next/link";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import authHeader from "@/components/authHeader/AuthHeader";

interface UserLocal {
  data: {
    data: {
      userId: string;
    };
  };
}
const Page = () => {
  const router = useRouter();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [wallet, setWallet] = useState<boolean | null>(null);

  const getUserFromStorage = () => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
  };

  const user: UserLocal | null = getUserFromStorage();
  const userId = user?.data.data.userId;

  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(1);
  const [itemId, setItemId] = useState(0);
  const [dataOrder, setDataOrder] = useState({
    userId,
    cartRequestList: [{ itemId, quantity, price }],
  });

  const getTemplate = async () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_API}formTemplateVersion`)
      .then((response) => {
        setTemplates(response.data.data);
        console.log(response.data.data);
      });
  };

  const getWallet = () => {
    setWallet(null);
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_API}wallet/getWalletByUser/${userId}`
      )
      .then((response) => {
        setWallet(true);
      })
      .catch((error) => {
        console.error("Error fetching wallet:", error);
        setWallet(false);
      });
  };

  useEffect(() => {
    getTemplate();
    getWallet();
  }, []);

  const handleBuy = async (formId: number, price: number) => {
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
          cartRequestList: [{ itemId: formId, quantity, price }],
        };
        {
          wallet
            ? axios
                .post(
                  `${process.env.NEXT_PUBLIC_BASE_API}order/createOrderFormTemplateDetail`,
                  updatedDataOrder
                )
                .then((response) => {
                  const orderId = response.data.data;
                  Swal.fire({
                    title: "Bạn có chấp nhận thanh toán",
                    showDenyButton: true,
                    confirmButtonText: "Có",
                    denyButtonText: `Không`,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      try {
                        payForTemplate(orderId);
                      } catch (error) {
                        Swal.fire(`${error}`, "", "error");
                      }
                    } else if (result.isDenied) {
                      Swal.fire("Vui lòng thanh toán để sử dụng", "", "info");
                      return;
                    }
                  });
                })
            : axios
                .post(
                  `${process.env.NEXT_PUBLIC_BASE_API}order/createOrderFormTemplateDetail`,
                  updatedDataOrder
                )
                .then((response) => {
                  const orderId = response.data.data;
                  payForTemplateByCash(orderId);
                });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const payForTemplate = (orderId: string) => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_BASE_API}order/payOrderFormTemplateDetailByWallet/${orderId}`,
        {},
        { headers: authHeader() }
      )
      .then((res) => {
        toast.success(`${res.data.data}`);
      });
  };

  const payForTemplateByCash = (orderId: string) => {
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
  return (
    <>
      <HeaderComponent title="BIỂU MẪU" link="BIỂU MẪU" />

      <div className="mx-10 my-20">
        <ToastContainer />
        <div className="flex flex-row border-b-1 mb-10 pb-3 w-full">
          <h1 className="flex text-xl font-extrabold border-l-5 border-[#FF0004] pl-5 items-center h-12">
            Biểu mẫu
          </h1>

          <div className="ml-auto flex flex-col justify-end items-start w-72">
            <div className="text-[#FF0004] border-b-1 mb-3 w-72">Tìm kiếm</div>
            <div className="">
              <Input
                classNames={{
                  base: "w-full sm:max-w-[10rem] h-10 ",
                  mainWrapper: "h-full w-72",
                  input: "text-small",
                  inputWrapper:
                    "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20 ",
                }}
                placeholder="Từ khóa tìm kiếm .."
                size="sm"
                type="search"
                radius="none"
                // value={searchTerm}
                // onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
        {templates && (
          <div className="grid grid-cols-4 mx-56 gap-10">
            {templates.map((template, index) => (
              <div key={index} className="">
                <Card
                  shadow="sm"
                  key={index}
                  isPressable={false}
                  onPress={() => console.log("item pressed")}
                  className="w-72 h-96"
                >
                  <CardBody className="group relative overflow-hidden">
                    <Image
                      shadow="sm"
                      radius="lg"
                      width="100%"
                      alt={template.title}
                      className="w-full object-cover h-[281px]"
                      // src={
                      //   template.fileUrl
                      //     ? template.fileUrl.startsWith("http")
                      //       ? template.fileUrl
                      //       : "/errorImage.png"
                      //     : "/errorImage.png"
                      // }
                      src="/bieumau.jpg"
                    />
                    <div className="absolute z-10 bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col">
                      {/* <Button className="bg-[#989898] text-white p-2 m-1 hover:bg-[#FF191D]">
                      <FontAwesomeIcon icon={faEye} className="size-4 ml-1" />
                      Xem trước
                    </Button>
                    {/* <Button
                      className="bg-[#989898] text-white p-2 m-1 hover:bg-[#FF191D]"
                      variant="faded"
                    >
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="size-4 ml-1"
                      />
                      Dùng mẫu
                    </Button> */}
                    </div>
                  </CardBody>
                  <CardFooter className="flex flex-col items-start">
                    <p className="text-default-500">
                      {template.price.toLocaleString()} Đ
                    </p>
                    <p className="truncate">{template.message}</p>
                    <Button
                      onClick={() => handleBuy(template.id, template.price)}
                      className="bg-[#FF0004] text-white h-12 rounded-full"
                    >
                      Mua
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
            <div className="flex w-full justify-center">
              {/* <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          /> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Page;
