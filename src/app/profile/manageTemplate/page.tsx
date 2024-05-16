'use client';

import Loading from '@/components/loading';
import { Template } from '@/constants/types/homeType';
import axiosClient from '@/lib/axiosClient';
import paths from '@/lib/path-link';
import { faEye, faPen, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const templateRef = useRef<HTMLDivElement>(null);

  const getFile = async (id: number) => {
    // fetch file
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
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_API}order/getAllCheckOutFormTemplateDetailByUser/${userId}`
      )
      .then((response) => {
        const allOrder = response.data.data;
        allOrder.map((order: any) => {
          order.cart.map((item: any) => getTemplate(item.itemId));
        });
      });
  };

  const getTemplate = async (id: number) => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_API}formTemplateVersion/${id}`)
      .then((res) => {
        setTemplates((prevTemplates) => {
          // Check if the template is already in the state
          const isExisting = prevTemplates.some(
            (template) => template.id === res.data.data.id
          );
          if (!isExisting) {
            return [...prevTemplates, res.data.data];
          } else {
            // If the template already exists, return the previous state without adding it again
            return prevTemplates;
          }
        });
      });
  };

  useEffect(() => {
    getAllTemplate();
  }, []);

  useEffect(() => {
    if (selectedTemplate === undefined) return;
    const htmlContentRes = getFile(selectedTemplate?.id);
    htmlContentRes.then((res) => {
      const html = replaceFieldWithValue(res);
      if (templateRef.current) {
        templateRef.current.innerHTML = html;
      }
    });
  }, [selectedTemplate, isOpen]);

  return (
    <div className="w-[1350px] rounded-xl bg-white p-5 shadow-lg">
      <h1 className="p-3 text-xl font-bold">Biểu mẫu bạn đang sở hữu</h1>
      <div className="grid grid-cols-4">
        {templates.map((template, index) => (
          <div key={index} className="p-8">
            <Card shadow="sm" key={index} isPressable className="h-96 w-72">
              <CardBody className="group relative overflow-hidden">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={template.title}
                  className="h-[250px] w-full object-cover"
                  src="/bieumau.jpg"
                />
              </CardBody>
              <CardFooter className="flex flex-col items-start">
                <p className="text-default-500">
                  {template.price.toLocaleString()} Đ
                </p>
                <b className="truncate">{template.message}</b>
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
                      router.push(`${paths.useTemplate.path}/${template.id}`);
                    }}
                    className="bg-green-500 text-white "
                  >
                    <FontAwesomeIcon icon={faPenToSquare} className="size-4" />
                    Dùng mẫu
                  </Button>
                </div>
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
        <Modal
          hideCloseButton
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          size="full"
          className="h-[800px] w-[1100px]"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody className="flex flex-row gap-6 overflow-y-scroll p-6">
                  <div className="w-[800px]">
                    <div
                      className="min-h-full content-center border-1 border-black p-10"
                      ref={templateRef}
                    ></div>
                  </div>
                  <div className="flex w-[300px] flex-col items-center justify-start gap-10">
                    <h1 className="flex justify-start font-semibold text-[#FF0004]">
                      {selectedTemplate?.message
                        ? selectedTemplate?.message
                        : 'Biểu mẫu này hiện tại không có tên'}
                    </h1>
                    <div className="flex flex-col gap-3">
                      <Button
                        className="w-80 bg-[#FF0004] text-white"
                        onPress={onClose}
                      >
                        <FontAwesomeIcon icon={faPen} className="ml-1 size-4" />
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
      </div>
    </div>
  );
};

export default ManageTemplate;
