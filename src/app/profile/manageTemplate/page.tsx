"use client";

import { Template } from "@/constants/types/homeType";
import React, { useEffect, useState } from "react";
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
import { faEye, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useRouter } from "next/navigation";
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
  const getUserFromStorage = () => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
  };

  const user: UserLocal | null = getUserFromStorage();
  const userId = user?.data.data.userId;

  const getAllTemplate = async () => {
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
        setTemplates([res.data.data]);
      });
  };

  useEffect(() => {
    getAllTemplate();
  }, []);

  return (
    <div className="w-[950px] bg-white">
      <h1 className="text-xl font-bold p-3">Biểu mẫu bạn đang sở hữu</h1>
      <div className="grid grid-cols-3 gap-10">
        {templates.map((template, index) => (
          <div key={index} className="">
            <Card
              shadow="sm"
              key={index}
              isPressable
              onPress={() => console.log("item pressed")}
              className="w-72 h-96"
            >
              <CardBody className="group relative">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={template.title}
                  className="w-full object-cover h-[281px]"
                  src={
                    template.fileUrl
                      ? template.fileUrl.startsWith("http")
                        ? template.fileUrl
                        : "/errorImage.png"
                      : "/errorImage.png"
                  }
                />
                <div className="absolute z-10 bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col">
                  <Button className="bg-[#989898] text-white p-2 m-1 hover:bg-[#FF191D]">
                    <FontAwesomeIcon icon={faEye} className="size-4 ml-1" />
                    Xem trước
                  </Button>
                  <Button
                    className="bg-[#989898] text-white p-2 m-1 hover:bg-[#FF191D]"
                    variant="faded"
                    onClick={() =>
                      router.push(
                        `/profile/manageTemplate/use-template/${template.id}`
                      )
                    }
                  >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="size-4 ml-1"
                    />
                    Dùng mẫu
                  </Button>
                </div>
              </CardBody>
              <CardFooter className="flex flex-col items-start">
                <p className="text-default-500">{template.price}</p>
                <b>{template.message}</b>
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
    </div>
  );
};

export default ManageTemplate;
