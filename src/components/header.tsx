"use client";
import { Header } from "@/constants/types/homeType";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";
import Image from "next/image";

const HeaderComponent = (prop: Header) => {
  return (
    <div className="relative w-full h-[300px]">
      <Image
        className="w-full h-full object-cover"
        alt="bg image"
        src="/headerImage.jpg"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

      <div className="flex flex-col absolute z-20 inset-0 p-24 text-white mx-[366px] ">
        <div className="min-h-20">
          <div className="text-3xl font-bold text-white">{prop.title}</div>
          <div className="text-xl text-white">{prop.subTitle}</div>
        </div>
        <div className="absolute bottom-0 left-24 right-24 bg-black bg-opacity-60 py-2 px-4 whitespace-nowrap overflow-hidden text-ellipsis max-w-[550px] ">
          <Breadcrumbs color="danger">
            <BreadcrumbItem>
              <a href="/">
                <p className="text-white font-bold text-sm ">Basico Law Firm</p>
              </a>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <p className="text-red-500 font-bold text-sm ml-2">
                {prop.link}
              </p>
            </BreadcrumbItem>
          </Breadcrumbs>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
