"use client";

import { Template } from "@/constants/types/homeType";
import paths from "@/lib/path-link";
import { faEye, faPen, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
} from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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

  const getUserFromStorage = () => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
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

  return (
    <div className="w-[1350px]  p-5 bg-white rounded-xl shadow-lg">
      <h1 className="text-xl font-bold p-3">Biểu mẫu bạn đang sở hữu</h1>
      <div className="grid grid-cols-4">
        {templates.map((template, index) => (
          <div key={index} className="">
            <Card shadow="sm" key={index} isPressable className="w-72 h-96">
              <CardBody className="overflow-hidden group relative">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={template.title}
                  className="w-full object-cover h-[250px]"
                  src="/bieumau.jpg"
                />
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
      </div>
    </div>
  );
};

export default ManageTemplate;
