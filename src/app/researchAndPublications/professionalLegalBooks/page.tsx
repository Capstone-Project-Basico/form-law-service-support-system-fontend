import Image from "next/image";
import {
  faCalendarDays,
  faMagnifyingGlass,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input } from "@nextui-org/react";
import HeaderComponent from "@/components/header";
import Side from "@/components/side";

const page = () => {
  return (
    <>
      <HeaderComponent
        title="SÁCH PHÁP LÝ NGHIỆP VỤ"
        link=" Sách Pháp Lý Nghiệp Vụ"
      />
      <div className="flex flex-rows-2 pt-20 bg-white text-black px-96">
        {/* 1 */}
        <div className="grid grid-cols-4 w-[847px]">
          {/* first book */}
          <div className="px-[15px] w-[196px] h-[492px]">
            <Image
              alt=""
              src="/books/HNGN1.png"
              width={181}
              height={175}
              className="mb-2"
            />
            <h1 className="text-xl font-bold mb-2">Hiểu nghề Giữ nghiệp (1)</h1>
            <p className="text-base">
              HIỂU NGHỀ GIỮ NGHIỆP, CUỐN SÁCH CẦN THIẾT CHO NGHỀ NGÂN HÀNG Nhận
              xét từ những lãnh đạo cấp cao,...
            </p>
            <hr className="mt-6" />
            <div className="flex flex-row items-center m-0 py-[10px]">
              <FontAwesomeIcon icon={faCalendarDays} className="size-4 mx-1" />
              <div className="py-2 text-xs">Tháng Mười 16, 2020</div>
            </div>
            <FontAwesomeIcon icon={faComment} className="size-4 ml-1" />
            <hr />
          </div>

          {/* second book */}
          <div className="px-[15px] w-48 h-[492px]">
            <Image
              alt=""
              src="/books/HNGN2.jpg"
              width={181}
              height={175}
              className="mb-2"
            />
            <h1 className="text-xl font-bold mb-2">Hiểu nghề Giữ nghiệp (2)</h1>
            <p className="text-base">
              30 BÀI HỌC PHÁP LÍ DÀNH CHO NGHỀ TELLER NGÂN HÀNG 1. Giới hạn
              trách nhiệm pháp lý nghề...
            </p>
            <div className="">
              <hr className="mt-6" />
              <div className="flex flex-row  items-center m-0 py-[10px]">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="size-4 mx-1"
                />
                <div className="py-2 text-xs">Tháng Mười 15, 2020</div>
              </div>
              <FontAwesomeIcon icon={faComment} className="size-4 ml-1" />
              <hr />
            </div>
          </div>
        </div>
        {/* 2 */}
        <Side />
      </div>
    </>
  );
};

export default page;
