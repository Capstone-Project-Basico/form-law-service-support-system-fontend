"use client";
import { Header } from "@/constants/types/homeType";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";
import Image from "next/image";

const HeaderComponent = (prop: Header) => {
  return (
    <div className="relative h-[300px] mb-20">
      <Image
        className="w-full h-[300px] -z-10"
        alt="bg image"
        src="/headerImage.jpg"
        width="0"
        height="0"
        sizes="100vw"
        objectFit="cover"
      />

      <div className="flex flex-col absolute inset-0 p-24 text-white mx-[366px] ">
        <div className="min-h-20">
          <div className="text-3xl font-bold text-white">{prop.title}</div>
          <div className="text-xl text-white">{prop.subTitle}</div>
        </div>
        <div className="mt-16 bg-[#0000008a] py-4 pl-10 pr-8 w-[600px]">
          <Breadcrumbs color="danger">
            <BreadcrumbItem>
              <a href="/">
                <p className="text-white font-bold ">Basico Law Firm</p>
              </a>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <p className="text-[#FF0004] font-bold text-[14px]">
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
