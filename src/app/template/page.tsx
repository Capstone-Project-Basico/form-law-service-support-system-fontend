'use client';

import HeaderComponent from '@/components/header';
import { FormType } from '@/constants/types/homeType';
// import CardTemplate from "@/sections/CardTemplate";
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import authHeader from '@/components/authHeader/AuthHeader';
import { FormTemplate } from '@/constants/types/FormTemplate';
import axiosClient from '@/lib/axiosClient';
import {
  faBasketShopping,
  faDollarSign,
  faEye,
  faPen,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  useDisclosure,
} from '@nextui-org/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
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
  const [templates, setTemplates] = useState<FormTemplate[]>([]);
  const [filterValue, setFilterValue] = useState('');
  const [types, setTypes] = useState<FormType[]>([]);
  const [selectTypeId, setSelectTypeId] = useState<number | undefined>();
  const [selectTypeName, setSelectTypeName] = useState('');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedTemplate, setSelectedTemplate] = useState<FormTemplate>();
  const templateRef = useRef<HTMLDivElement>(null);
  const [walletError, setWalletError] = useState<boolean>();

  const {
    isOpen: isOpenPayment,
    onOpen: onOpenPayment,
    onClose: onClosePayment,
  } = useDisclosure();
  const [orderId, setOrderId] = useState<string>();
  const [transactionId, setTransactionId] = useState<string>();
  const [isSelectedQR, setIsSelectedQR] = useState(0);

  const getUserFromStorage = () => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
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
  const [checkoutForm, setCheckoutForm] = useState<CheckoutForm[]>();

  const getFile = async (id: number) => {
    // fetch file
    const res = await axiosClient
      .get('formTemplateVersion/download/' + id, {
        responseType: 'blob',
      })
      .catch((error) => {
        toast.error('Không thể tải file');
        return;
      });
    if (!res) return;
    const file = new Blob([res.data]);

    const form = new FormData();
    form.append('file', file);

    const converterURL = process.env.NEXT_PUBLIC_CONVERTER_API;
    if (!converterURL) {
      console.error('Converter API is not defined');
      return 'Server error';
    }
    const htmlRes = await axiosClient.post(converterURL, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const html = htmlRes.data;
    return html;
  };

  function replaceFieldWithValue(htmlContent: string) {
    // Regex to find the pattern <<key**value>>
    const regex = /\{\{([^*]+)\*\*([^}]+)\}\}/g;

    const result = htmlContent.replace(regex, (match, fieldName, fieldType) => {
      if (fieldName) {
        return `<span>...</span>`;
      }

      return ` `;
    });

    return result;
  }

  const getTemplate = async () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_API}formTemplate`)
      .then((response) => {
        const listForm: FormTemplate[] = response.data.data;
        // only status ACTIVE
        const listFormActive = listForm.filter(
          (form) => form.latestVersion?.status === 'ACTIVE'
        );
        setTemplates(listFormActive);
      });
  };

  const getAllCheckOutForm = async () => {
    try {
      if (!userId) return;
      const res = await axiosClient.get(
        `order/getAllCheckOutFormTemplateDetailByUser/${userId}`
      );
      const allOrder = res.data;
      setCheckoutForm(allOrder);
    } catch (error) {
      console.log(error);
    }
  };

  const getQuantity = (itemId: number) => {
    if (!checkoutForm) return 0;
    let quantity = 0;
    checkoutForm.map((order) => {
      order.cart.map((item) => {
        if (item.itemId === itemId) {
          quantity += item.quantity;
        }
      });
    });
    return quantity;
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

  const handleBuy = async (formId: number, price: number) => {
    try {
      if (!user) {
        Swal.fire({
          title: 'Bạn chưa đăng nhập, bạn có muốn đăng nhập?',
          showDenyButton: true,
          confirmButtonText: 'Có',
          confirmButtonColor: '#00BB00',
          denyButtonText: `Không`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            // Swal.fire("Saved!", "", "success");
            router.push('/login');
          } else if (result.isDenied) {
            Swal.fire('Bạn cần đăng nhập để sử dụng tính năng này', '', 'info');
            return;
          }
        });
        return;
      } else {
        if (formId === -1 || price === -1) {
          toast.error('Yêu cầu mua thất bại');
          return;
        }
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
              onOpenPayment();
            });
        }
      }
    } catch (error) {
      toast.error('Yêu cầu mua thất bại');
      console.log(error);
    }
  };
  const payment = () => {
    if (isSelectedQR === 1) {
      payForTemplateByCash();
    } else if (isSelectedQR === 2) {
      payForTemplate();
    }
  };

  const payForTemplate = () => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_BASE_API}order/payOrderFormTemplateDetailByWallet/${orderId}`,
        {},
        { headers: authHeader() }
      )
      .then((res) => {
        onClosePayment();
        toast.success('Thanh toán thành công');
      })
      .catch((error) => {
        toast.error('Tài khoản không đủ tiền, vui lòng nạp tại ví');
      });
  };

  const payForTemplateByCash = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BASE_API}pay/create-payment-link/${transactionId}`,
        {},
        { headers: authHeader() }
      )
      .then((res) => {
        console.log(res.data);

        window.open(res.data.checkoutUrl, '_blank');
      })
      .catch((err) => {
        toast.error('Lỗi thanh toán, vui lòng kiểm tra lại!');
      });
  };

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filteredTemplates = [...templates];

    if (hasSearchFilter) {
      filteredTemplates = filteredTemplates.filter((temp) =>
        temp.title.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (selectTypeId) {
      filteredTemplates = filteredTemplates.filter(
        (temp) => temp.latestVersion?.formTypeId === selectTypeId
      );
    }

    return filteredTemplates;
  }, [templates, hasSearchFilter, selectTypeId, filterValue]);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue('');
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

  useEffect(() => {
    getWallet();
    getTemplate();
    getType();
    getAllCheckOutForm();
  }, []);

  const getWallet = () => {
    if (!user) return;
    try {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_API}wallet/getWalletByUser/${userId}`
        )
        .then((response) => {
          setWalletError(false);
        })
        .catch((error) => {
          setWalletError(true);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedTemplate?.latestVersion === undefined) return;
    if (!isOpen) return;
    const htmlContentRes = getFile(selectedTemplate.latestVersion?.id);
    htmlContentRes.then((res) => {
      if (!res) return;
      const html = replaceFieldWithValue(res);
      if (templateRef.current) {
        templateRef.current.innerHTML = html;
      }
    });
  }, [selectedTemplate, isOpen]);

  return (
    <>
      <HeaderComponent title="BIỂU MẪU" link="BIỂU MẪU" />
      <div className="mx-10 my-20">
        <ToastContainer />
        <div className="mb-10 flex w-full flex-row border-b-1 pb-3">
          <h1 className="flex h-12 items-center border-l-5 border-[#FF0004] pl-5 text-xl font-extrabold">
            Biểu mẫu luật uy tín đến từ
            <strong>
              &nbsp;BA<span className="text-[#ff0000]">S</span>I
              <span className="text-[#ff0000]">CO </span>
            </strong>
          </h1>

          <div className="ml-auto flex flex-row items-end justify-center">
            <Autocomplete
              defaultItems={types}
              label="Loại biểu mẫu"
              className="mr-3 max-w-xs"
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

            <div className="flex w-72 flex-col items-start justify-end">
              <div className="mb-3 w-72 border-b-1 text-[#FF0004]">
                Tìm kiếm
              </div>
              <div className="">
                <Input
                  isClearable
                  // className="w-[660px] h-14 sm:max-w-[44%]"
                  classNames={{
                    base: 'w-[288px] h-14',

                    inputWrapper: 'h-full ',
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
          <div className="mx-56 grid grid-cols-4 gap-10">
            {items.map((template, index) => (
              <div key={index} className="">
                <Card
                  shadow="md"
                  key={index}
                  isPressable={false}
                  onPress={() => console.log('item pressed')}
                  className="h-96 w-72"
                >
                  <CardBody className="group relative overflow-hidden p-0">
                    <Image
                      shadow="sm"
                      radius="lg"
                      width="100%"
                      alt={template.title}
                      className="h-[250px] w-full object-cover"
                      src="/bieumau.jpg"
                    />
                  </CardBody>
                  <CardFooter className="flex flex-col items-start pt-4">
                    <p className="text-default-500">
                      {template.latestVersion?.price?.toLocaleString()} Đ
                    </p>
                    <b className="h-10 w-52 truncate">{template.title}</b>
                    <div className="mt-3 flex w-full items-start justify-end gap-2">
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
                        onClick={() =>
                          handleBuy(
                            template.latestVersion?.id ?? -1,
                            template.latestVersion?.price ?? -1
                          )
                        }
                        className="bg-[#FF0004] text-white "
                      >
                        <FontAwesomeIcon
                          icon={faBasketShopping}
                          className="ml-1 size-4"
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
        <div className="mt-10 flex w-full items-center justify-center">
          <Pagination
            isCompact
            showControls
            classNames={{
              wrapper: 'gap-0 overflow-visible h-8 ',
              item: 'w-8 h-8 text-small rounded-none bg-transparent',
              cursor:
                'bg-gradient-to-b shadow-lg from-default-500 to-default-800 dark:from-default-300 dark:to-default-100 text-white font-bold',
            }}
            page={page}
            total={pages}
            onChange={(page: any) => setPage(page)}
          />
        </div>
        <Modal
          hideCloseButton
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          size="full"
          className="h-[800px] w-[1200px]"
        >
          <ModalContent>
            {(onClose) => {
              let quantity = 0;
              if (selectedTemplate?.latestVersion?.id)
                quantity = getQuantity(selectedTemplate?.latestVersion?.id);

              return (
                <>
                  <ModalBody className="flex flex-row gap-6 rounded-2xl p-6">
                    <div
                      className="h-[755px]  overflow-y-scroll border-1 border-black p-10"
                      style={{ minWidth: '800px', maxWidth: '1000px' }}
                    >
                      <div
                        className="min-h-full content-center  "
                        ref={templateRef}
                      ></div>
                    </div>
                    <div className="flex w-[300px] flex-col items-center justify-start gap-10">
                      <h1 className="flex justify-start text-2xl font-semibold">
                        {selectedTemplate?.title
                          ? selectedTemplate?.title
                          : 'Biểu mẫu này hiện tại không có tên'}
                      </h1>
                      {/* description */}
                      <h3>
                        <span className="font-semibold">Mô tả:</span>{' '}
                        {selectedTemplate?.description
                          ? selectedTemplate?.description
                          : 'Biểu mẫu này hiện tại không có mô tả'}
                      </h3>
                      {/* quantity */}
                      <h3>
                        {quantity !== 0 && (
                          <>
                            <span className="font-semibold">Số lượng:</span>{' '}
                            {quantity}
                          </>
                        )}
                      </h3>

                      <div className="flex flex-col gap-3">
                        <Button
                          className="w-80 bg-[#FF0004] text-white"
                          onPress={() => {
                            handleBuy(
                              selectedTemplate?.latestVersion?.id ?? -1,
                              selectedTemplate?.latestVersion?.price ?? -1
                            );
                            onClose();
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faBasketShopping}
                            className="ml-1 size-4"
                          />
                          Mua mẫu này
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
              );
            }}
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
            <ModalHeader className="mb-5 flex flex-col gap-1 bg-[#FF0004] text-2xl font-bold text-white">
              Chọn phương thức thanh toán
            </ModalHeader>
            <ModalBody>
              <div className="flex gap-10">
                <Button
                  variant="faded"
                  className={`flex h-[100px] w-[350px] items-center justify-start gap-2 bg-white ${isSelectedQR === 1 ? 'border-1 border-[#FF0004]' : ''
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
                  className={`flex h-[100px] w-[350px] items-center justify-start gap-2 bg-white ${isSelectedQR === 2 ? 'border-1 border-[#FF0004]' : ''
                    }`}
                  onClick={() => setIsSelectedQR(2)}
                  disabled={walletError}
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
