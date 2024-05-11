"use client";

import { Template, FormType } from "@/constants/types/homeType";
import HeaderComponent from "@/components/header";
// import CardTemplate from "@/sections/CardTemplate";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  faAngleRight,
  faDollarSign,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
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
  Autocomplete,
  AutocompleteItem,
  useDisclosure,
  ModalFooter,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Checkbox,
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
import axiosClient from "@/lib/axiosClient";
// import userId from "@/components/authHeader/GetUserId";

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
  const [filterValue, setFilterValue] = useState("");
  const [types, setTypes] = useState<FormType[]>([]);
  const [selectTypeId, setSelectTypeId] = useState<number | undefined>();
  const [selectTypeName, setSelectTypeName] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedTemplate, setSelectedTemplate] = useState<Template>();
  const templateRef = useRef<HTMLDivElement>(null);
  const {
    isOpen: isOpenPayment,
    onOpen: onOpenPayment,
    onClose: onClosePayment,
  } = useDisclosure();
  const [orderId, setOrderId] = useState<string>();
  const [transactionId, setTransactionId] = useState<string>();
  const [isSelectedQR, setIsSelectedQR] = useState(0);

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
      });
  };

  const getType = async () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_API}formType/getAllFormTypes`)
      .then((response) => {
        console.log(response);

        setTypes(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getTemplate();
    getType();
  }, []);

  const handleBuy = async (formId: number, price: number) => {
    try {
      if (!user) {
        Swal.fire({
          title: "Bạn chưa đăng nhập, bạn có muốn đăng nhập?",
          showDenyButton: true,
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
          axios
            .post(
              `${process.env.NEXT_PUBLIC_BASE_API}order/createOrderFormTemplateDetail`,
              updatedDataOrder
            )
            .then((response) => {
              setOrderId(response.data.data.orderId);
              setTransactionId(response.data.data.transactionId);
              // Swal.fire({
              //   title: "Vui lòng chọn phương thức thanh toán",
              //   showDenyButton: true,
              //   showCancelButton: true,
              //   confirmButtonText: "Ví",
              //   denyButtonText: `Trực tiếp bằng QR`,
              //   cancelButtonText: "Đóng",
              // }).then((result) => {
              //   if (result.isConfirmed) {
              //     try {
              //       payForTemplate(orderId);
              //     } catch (error) {
              //       Swal.fire(`${error}`, "", "error");
              //     }
              //   } else if (result.isDenied) {
              //     try {
              //       payForTemplateByCash(orderId);
              //     } catch (error) {
              //       Swal.fire(`${error}`, "", "error");
              //     }
              //     return;
              //   }
              // });
              onOpenPayment();
            });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const payment = () => {
    if (isSelectedQR === 1) {
      payForTemplateByCash(orderId);
    } else if (isSelectedQR === 2) {
      payForTemplate(orderId);
    }
  };

  const payForTemplate = (orderId: any) => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_BASE_API}order/payOrderFormTemplateDetailByWallet/${orderId}`,
        {},
        { headers: authHeader() }
      )
      .then((res) => {
        toast.success("Thanh toán thành công");
      })
      .catch((error) => {
        toast.error("Tài khoản không đủ tiền, vui lòng nạp tại ví");
      });
  };

  const payForTemplateByCash = (orderId: any) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BASE_API}pay/create-payment-link/${transactionId}`,
        {},
        { headers: authHeader() }
      )
      .then((res) => {
        console.log(res.data);

        window.open(res.data.checkoutUrl, "_blank");
      });
  };

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filteredTemplates = [...templates];

    if (hasSearchFilter) {
      filteredTemplates = filteredTemplates.filter((temp) =>
        temp.message.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (selectTypeId) {
      filteredTemplates = filteredTemplates.filter(
        (temp) => temp.formTypeId === selectTypeId
      );
    }

    return filteredTemplates;
  }, [templates, hasSearchFilter, selectTypeId, filterValue]);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  //pagination
  const [page, setPage] = useState(1);
  const rowsPerPage = 12;

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems]);

  return (
    <>
      <HeaderComponent title="BIỂU MẪU" link="BIỂU MẪU" />
      <div className="mx-10 my-20">
        <ToastContainer />
        <div className="flex flex-row border-b-1 mb-10 pb-3 w-full">
          <h1 className="flex text-xl font-extrabold border-l-5 border-[#FF0004] pl-5 items-center h-12">
            Biểu mẫu luật uy tín đến từ
            <strong>
              &nbsp;BA<span className="text-[#ff0000]">S</span>I
              <span className="text-[#ff0000]">CO </span>
            </strong>
          </h1>

          <div className="ml-auto flex flex-row justify-center items-end">
            <Autocomplete
              defaultItems={types}
              label="Loại biểu mẫu"
              className="max-w-xs mr-3"
              onSelectionChange={(e: any) => {
                setSelectTypeId(Number(e));
              }}
            >
              {(item: any) => (
                <AutocompleteItem key={item.id}>
                  {item.typeName}
                </AutocompleteItem>
              )}
            </Autocomplete>

            <div className="flex flex-col justify-end items-start w-72">
              <div className="text-[#FF0004] border-b-1 mb-3 w-72">
                Tìm kiếm
              </div>
              <div className="">
                <Input
                  isClearable
                  // className="w-[660px] h-14 sm:max-w-[44%]"
                  classNames={{
                    base: "w-[288px] h-14",

                    inputWrapper: "h-full ",
                  }}
                  placeholder="Tìm tên biểu mẫu"
                  // startContent={<SearchIcon />}
                  value={filterValue}
                  onClear={() => onClear()}
                  onValueChange={onSearchChange}
                />
              </div>
            </div>
          </div>
        </div>
        {items && (
          <div className="grid grid-cols-4 mx-56 gap-10">
            {items.map((template, index) => (
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
                      className="w-full object-cover h-[250px]"
                      src="/bieumau.jpg"
                    />
                    {/* <div className="absolute z-10 bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col">
                      <Button
                        className="bg-[#989898] text-white p-2 m-1 hover:bg-[#FF191D]"
                        onPress={() => {
                          setSelectedTemplate(template);
                          onOpen();
                        }}
                      >
                        <FontAwesomeIcon icon={faEye} className="size-4 ml-1" />
                        Xem trước
                      </Button>
                    </div> */}
                  </CardBody>
                  <CardFooter className="flex flex-col items-start">
                    <p className="text-default-500">
                      {template.price.toLocaleString()} Đ
                    </p>
                    <b className="truncate">{template.message}</b>
                    <div className="flex justify-end items-start w-full gap-2 mt-3">
                      <Button
                        className="bg-[#989898] text-white hover:bg-[#FF191D]"
                        onPress={() => {
                          setSelectedTemplate(template);
                          onOpen();
                        }}
                      >
                        <FontAwesomeIcon icon={faEye} className="size-4" />
                        Xem trước
                      </Button>
                      <Button
                        onClick={() => handleBuy(template.id, template.price)}
                        className="bg-[#FF0004] text-white "
                      >
                        <FontAwesomeIcon
                          icon={faDollarSign}
                          className="size-4 ml-1"
                        />
                        Mua
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        )}
        <div className="flex w-full justify-center items-center mt-10">
          <Pagination
            isCompact
            showControls
            classNames={{
              wrapper: "gap-0 overflow-visible h-8 ",
              item: "w-8 h-8 text-small rounded-none bg-transparent",
              cursor:
                "bg-gradient-to-b shadow-lg from-default-500 to-default-800 dark:from-default-300 dark:to-default-100 text-white font-bold",
            }}
            page={page}
            total={pages}
            onChange={(page: any) => setPage(page)}
          />
        </div>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          size="full"
          className="w-[1100px] h-[800px]"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody className="flex flex-row">
                  <div className="w-[800px] overflow-auto">
                    <div
                      className="content-center min-h-full p-10 border-1 border-black"
                      ref={templateRef}
                    ></div>
                  </div>
                  <div className="w-[300px] gap-10 flex flex-col justify-start items-center">
                    <h1 className="flex justify-start font-semibold text-[#FF0004]">
                      {selectedTemplate?.message
                        ? selectedTemplate?.message
                        : "Biểu mẫu này hiện tại không có tên"}
                    </h1>
                    <div className="flex flex-col gap-3">
                      <Button
                        className="w-80 bg-[#FF0004] text-white"
                        onPress={onClose}
                      >
                        <FontAwesomeIcon icon={faPen} className="size-4 ml-1" />
                        Dùng mẫu này
                      </Button>
                      <Button
                        className="w-full"
                        onPress={onClose}
                        variant="faded"
                      >
                        Đóng lại
                      </Button>
                    </div>
                  </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
        {/* payment modal */}
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
                  <Image
                    alt=""
                    src="/wallet/vietqr.png"
                    width={50}
                    height={50}
                  />
                  Thanh toán bằng mã QR
                </Button>

                <Button
                  variant="faded"
                  className={`bg-white w-[350px] h-[100px] flex justify-start items-center gap-2 ${
                    isSelectedQR === 2 ? "border-1 border-[#FF0004]" : ""
                  }`}
                  onClick={() => setIsSelectedQR(2)}
                >
                  <Image
                    alt=""
                    src="/wallet/wallet.png"
                    width={50}
                    height={50}
                  />
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
    </>
  );
};
export default Page;
