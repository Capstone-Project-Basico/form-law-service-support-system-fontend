"use client";

import { Template } from "@/constants/types/homeType";
import CardTemplate from "@/sections/CardTemplate";
import { useEffect, useState } from "react";
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

const Page = () => {
  const [templates, setTemplates] = useState<Template[]>([]);

  const getTemplate = async () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_API}formTemplateVersion`)
      .then((response) => {
        setTemplates(response.data.data);
        console.log(response.data.data);
      });
  };

  useEffect(() => {
    getTemplate();
  }, []);

  return (
    // <div className="columns-3 pb-10 gap-10 ">
    //   {(templates || []).map((item: Template, index: number) => (
    //     <CardTemplate key={index} itemDetail={item} />
    //   ))}
    // </div>
    <div className="mx-10 ">
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

      <div className="grid grid-cols-3 mx-56 gap-10">
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
                  alt={template.name}
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
                <p className="text-default-500">{template.price}Đ</p>
                <b>Tên biểu mẫu{template.name}</b>
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
export default Page;
