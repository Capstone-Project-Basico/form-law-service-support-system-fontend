import HeaderComponent from "@/components/header";
import { faCalendarDays, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <>
      <HeaderComponent
        title="BÀI VIẾT NGHIÊN CỨU TRÊN BÁO CHÍ"
        subTitle="Bài viết nghiên cứu trên báo chí của BASICO"
        link="Bài Viết Nghiên Cứu Trên Báo Chí"
      />
      <div className="flex flex-rows-2 pt-20 bg-white text-black px-96">
        {/* 1 */}
        <div className="grid grid-cols-4 w-[847px]">
          {/* first book */}
          <div className="px-[15px] w-[196px] h-[492px]">
            <Image
              alt=""
              src="/researchArticles/QHTV.jpg"
              width={181}
              height={175}
              className="mb-2"
            />
            <h1 className="text-xl font-bold mb-2">VAY TIỀN, MƯỢN TIỀN</h1>
            <p className="text-base">
              Chủ đề trợ giúp pháp lý đầu tiên trong năm 2021 của BASICO trên
              sóng Truyền hình Quốc hội.Các câu hỏ...
            </p>
            <hr className="mt-6" />
            <div className="flex flex-row items-center m-0 py-[10px]">
              <FontAwesomeIcon icon={faCalendarDays} className="size-4 mx-1" />
              <div className="py-2 text-xs">Tháng Hai 3, 2021</div>
            </div>
            <FontAwesomeIcon icon={faComment} className="size-4 ml-1" />
            <hr />
          </div>

          {/* second book */}
          <div className="px-[15px] w-48 h-[492px]"></div>
        </div>
      </div>
    </>
  );
};

export default page;
