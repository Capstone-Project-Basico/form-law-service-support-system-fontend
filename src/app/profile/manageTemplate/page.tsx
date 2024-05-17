'use client';

import Loading from '@/components/loading';
import { FormTemplate } from '@/constants/types/FormTemplate';
import {
  OrderTemplatePackType,
  OrderType,
  Template,
} from '@/constants/types/homeType';
import axiosClient from '@/lib/axiosClient';
import paths from '@/lib/path-link';
import { faEye, faPen, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
interface UserLocal {
  data: {
    data: {
      userId: string;
    };
  };
}
const ManageTemplate = () => {
  const router = useRouter();
  const [templates, setTemplates] = useState<FormTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<FormTemplate>();
  const [selectedTemplateFromPack, setSelectedTemplateFromPack] =
    useState<FormTemplateVersion>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenFromPack,
    onOpen: onOpenFromPack,
    onOpenChange: onOpenChangeFromPack,
  } = useDisclosure();
  const [checkoutForm, setCheckoutForm] = useState<CheckoutForm[]>();
  const templateRef = useRef<HTMLDivElement>(null);
  const [templatePack, setTemplatePack] = useState<FormTemplateVersion[]>([]);

  const getFile = async (id: number) => {
    try {
      const res = await axiosClient.get('formTemplateVersion/download/' + id, {
        responseType: 'blob',
      });
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
    } catch (error) {
      toast.error('Lỗi khi lấy dữ liệu');
    }
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

  const getUserFromStorage = () => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    }
  };

  const user: UserLocal | null = getUserFromStorage();
  const userId = user?.data.data.userId;

  const getAllTemplate = async (): Promise<void> => {
    try {
      const allTemplate: FormTemplate[] = (
        await axiosClient.get('formTemplate')
      ).data;
      const allCheckout: CheckoutForm[] = (
        await axiosClient.get(
          'order/getAllCheckOutFormTemplateDetailByUser/' + userId
        )
      ).data;

      const templates = allTemplate.filter((template: FormTemplate) => {
        const isBought = allCheckout.some((checkout: CheckoutForm) =>
          checkout.cart.some(
            (item: CartItem) => item.itemId === template.latestVersion?.id
          )
        );
        if (isBought) return template;
      });
      setTemplates(templates);
    } catch (error) {
      toast.error('Lỗi khi lấy dữ liệu');
      console.error(error);
    }
  };

  const getAllCheckOutForm = async () => {
    try {
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

  const getAllTemplateFromPack = async () => {
    try {
      const res = await axiosClient.get(
        `orderPackageTemplate/getAllFormTemplateCheckedOut/${userId}`
      );
      const allTemplate = res.data;
      console.log(allTemplate);

      setTemplatePack(allTemplate);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTemplate();
    getAllCheckOutForm();
    getAllTemplateFromPack();
  }, []);

  useEffect(() => {
    if (
      selectedTemplate === undefined ||
      selectedTemplate.latestVersion?.id === undefined || // Check if id is undefined
      isOpen === false // Check if modal is open
    )
      return;
    const htmlContentRes = getFile(selectedTemplate.latestVersion?.id);
    htmlContentRes.then((res) => {
      if (!res) return;
      const html = replaceFieldWithValue(res);
      if (templateRef.current) {
        templateRef.current.innerHTML = html;
      }
    });
  }, [selectedTemplate, isOpen]);

  //for template from pack
  useEffect(() => {
    if (
      selectedTemplateFromPack === undefined ||
      selectedTemplateFromPack?.id === undefined || // Check if id is undefined
      isOpenFromPack === false // Check if modal is open
    )
      return;
    const htmlContentRes = getFile(selectedTemplateFromPack?.id);
    htmlContentRes.then((res) => {
      if (!res) return;
      const html = replaceFieldWithValue(res);
      if (templateRef.current) {
        templateRef.current.innerHTML = html;
      }
    });
  }, [selectedTemplateFromPack, isOpenFromPack]);

  return (
    <div className="w-[1350px] rounded-xl bg-white p-5 shadow-lg">
      <ToastContainer />
      <h1 className="p-3 text-xl font-bold">Biểu mẫu bạn đang sở hữu</h1>
      <div className="grid grid-cols-4">
        {templates.map((template, index) => {
          if (
            template.latestVersion === undefined ||
            template.latestVersion.price === undefined ||
            template.latestVersion.id === undefined
          ) {
            return;
          }
          return (
            <div key={index} className="p-8">
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
                      onClick={() => {
                        router.push(
                          `${paths.useTemplate.path}/${template.latestVersion?.id}`
                        );
                      }}
                      className="bg-green-500 text-white "
                    >
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="size-4"
                      />
                      Dùng mẫu
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          );
        })}
      </div>
      <div>
        <h1 className="p-3 text-xl font-bold">Biểu mẫu trong gói</h1>
        <div className="grid grid-cols-4">
          {templatePack.map((template, index) => {
            // if (
            //   template.latestVersion === undefined ||
            //   template.latestVersion.price === undefined ||
            //   template.latestVersion.id === undefined
            // ) {
            //   return;
            // }
            return (
              <div key={index} className="p-8">
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
                      alt={template.message}
                      className="h-[250px] w-full object-cover"
                      src="/bieumau.jpg"
                    />
                  </CardBody>
                  <CardFooter className="flex flex-col items-start pt-4">
                    <p className="text-default-500">
                      {template?.price?.toLocaleString()} Đ
                    </p>
                    <b className="h-10 w-52 truncate">{template.message}</b>
                    <div className="mt-3 flex w-full items-start justify-end gap-2">
                      <Button
                        className="bg-[#989898] text-white hover:bg-[#FF191D]"
                        onPress={() => {
                          setSelectedTemplateFromPack(template);
                          onOpenFromPack();
                        }}
                      >
                        <FontAwesomeIcon icon={faEye} className="size-4" />
                        Xem trước
                      </Button>
                      <Button
                        // onClick={() => {
                        //   router.push(
                        //     `${paths.useTemplate.path}/${template.latestVersion?.id}`
                        //   );
                        // }}
                        className="bg-green-500 text-white "
                      >
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          className="size-4"
                        />
                        Dùng mẫu
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            );
          })}
        </div>

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
                        className="min-h-full content-center "
                        ref={templateRef}
                      ></div>
                    </div>
                    <div className="flex w-[300px] flex-col items-center justify-start gap-10">
                      <h1 className="flex justify-start text-2xl font-semibold">
                        {selectedTemplate?.title
                          ? selectedTemplate?.title
                          : 'Biểu mẫu này hiện tại không có tên'}
                      </h1>
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
                          onPress={onClose}
                        >
                          <FontAwesomeIcon
                            icon={faPen}
                            className="ml-1 size-4"
                          />
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
              );
            }}
          </ModalContent>
        </Modal>

        {/* Fromm pack */}
        <Modal
          hideCloseButton
          isOpen={isOpenFromPack}
          onOpenChange={onOpenChangeFromPack}
          size="full"
          className="h-[800px] w-[1200px]"
        >
          <ModalContent>
            {(onClose) => {
              let quantity = 0;
              if (selectedTemplateFromPack?.id)
                quantity = getQuantity(selectedTemplateFromPack?.id);

              return (
                <>
                  <ModalBody className="flex flex-row gap-6 rounded-2xl p-6">
                    <div
                      className="h-[755px]  overflow-y-scroll border-1 border-black p-10"
                      style={{ minWidth: '800px', maxWidth: '1000px' }}
                    >
                      <div
                        className="min-h-full content-center "
                        ref={templateRef}
                      ></div>
                    </div>
                    <div className="flex w-[300px] flex-col items-center justify-start gap-10">
                      <h1 className="flex justify-start text-2xl font-semibold">
                        {selectedTemplateFromPack?.message
                          ? selectedTemplateFromPack?.message
                          : 'Biểu mẫu này hiện tại không có tên'}
                      </h1>
                      {/* <h3>
                        <span className="font-semibold">Mô tả:</span>{' '}
                        {selectedTemplateFromPack?.description
                          ? selectedTemplateFromPack?.description
                          : 'Biểu mẫu này hiện tại không có mô tả'}
                      </h3> */}
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
                          onPress={onClose}
                        >
                          <FontAwesomeIcon
                            icon={faPen}
                            className="ml-1 size-4"
                          />
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
              );
            }}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default ManageTemplate;
