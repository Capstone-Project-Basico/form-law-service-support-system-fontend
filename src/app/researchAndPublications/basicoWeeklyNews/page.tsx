import HeaderComponent from "@/components/header";
import { faCalendarDays, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const page = () => {
  return (
    <>
      <HeaderComponent
        title="LĨNH VỰC CHUYÊN MÔN"
        link=" Dịch Vụ Luật Sư Nội Bộ"
      />
      <div className="flex flex-rows-2 pt-20 bg-white text-black px-96">
        {/* 1 */}
        <div className="grid grid-cols-4 w-[847px]">
          {/* first book */}
          <div className="px-[15px] w-[196px] h-[492px]">
            <h1 className="text-xl font-bold mb-2">
              BASICO Tuần luật 2018-25 – Nguy an toàn mạng.
            </h1>
            <p className="text-base">
              Luật An ninh mạng sắp sửa trình làng, sau một thời gian ngắn mang
              nặng đẻ đau, thi nhau nhấn nút, đừ...
            </p>
            <hr className="mt-6" />
            <div className="flex flex-row items-center m-0 py-[10px]">
              <FontAwesomeIcon icon={faCalendarDays} className="size-4 mx-1" />
              <div className="py-2 text-xs">Tháng Sáu 20, 2020</div>
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
