import HeaderComponent from "@/components/header";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GoogleMaps } from "@/components/ui/GoogleMaps";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";
import { ToastContainer, toast } from "react-toastify";

const page = () => {
  return (
    <>
      {/* <div className="flex flex-col justify-center items-center pt-32 pb-[97px] ">
      <ToastContainer /> */}
      <div className="bg-white py-10 pt-32 pb-[510px]">
        <div className="  max-w-6xl mx-auto flex justify-between items-center">
          {/* Phần bên trái */}
          <div className="flex flex-col items-center space-y-5">
            <h1 className="text-3xl font-bold text-gray-800">
              THAM GIA ỨNG TUYỂN
            </h1>
            <button className="bg-[#419641] text-white px-6 py-3 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50">
              NHẤN VÀO ĐÂY
            </button>
          </div>

          {/* Phần bên phải */}
          <div className="space-y-3 bg-white p-4 ">
            <div className="text-center pb-">
              <h2 className="text-3xl pb-3 font-semibold text-gray-800">
                <strong>
                  BA<span className="text-[#ff0000]">S</span>I
                  <span className="text-[#ff0000]">CO </span>
                </strong>{" "}
                tìm kiếm nhân sự
              </h2>
            </div>
            <div className="pl-4 pr-10 py-2 rounded-lg bg-gray-100 shadow-inner">
              <div className="flex items-center space-x-2">
                <span className="text-red-500">✔</span>
                <p className="text-gray-800">
                  01 Khát vọng trở thành luật sư giỏi
                </p>
              </div>
            </div>
            <div className="pl-4 pr-10 py-2 rounded-lg bg-gray-100 shadow-inner">
              <div className="flex items-center space-x-2">
                <span className="text-red-500">✔</span>
                <p className="text-gray-800 text-3">
                  02 Hiểu, tin tưởng và muốn góp sức chinh phục các mục tiêu của
                  BASICO
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
