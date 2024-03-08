import HeaderComponent from "@/components/header";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import {
  faBookOpen,
  faNewspaper,
  faGavel,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const page = () => {
  return (
    <>
      <HeaderComponent
        title="NGHIÊN CỨU SÁNG TẠO"
        subTitle="Có hàng nghìn bài viết, báo chí đăng tải, báo chí phỏng vấn, trích dẫn …"
        link="Nghiên Cứu Sáng Tạo"
      />
      <div className="flex flex-cols-3 pt-20 bg-white text-black justify-center items-center gap-4 pb-36">
        {/* 1 */}
        <div className="flex flex-col items-center">
          <div className="text-[26px] font-bold">
            Viết sách pháp lý nghiệp vụ
          </div>
          <Image
            alt=""
            src="/books/HNGN1.png"
            width={358}
            height={248}
            className="py-4"
          />
          <Button className="w-full bg-[#6dab3c] text-white" radius="sm">
            <FontAwesomeIcon icon={faBookOpen} className="size-4 ml-1 " />
            XEM CHI TIẾT
          </Button>
        </div>

        {/* 2 */}
        <div className="flex flex-col items-center">
          <div className="text-[26px] font-bold">
            Bài nghiên cứu trên báo chí
          </div>
          <Image
            alt=""
            src="/books/HNGN1.png"
            width={358}
            height={248}
            className="py-4"
          />
          <Button className="w-full bg-[#6dab3c] text-white" radius="sm">
            <FontAwesomeIcon icon={faNewspaper} className="size-4 ml-1 " />
            XEM CHI TIẾT
          </Button>
        </div>

        {/* 3 */}
        <div className="flex flex-col items-center">
          <div className="text-[26px] font-bold">BASICO Tuần luật</div>
          <Image
            alt=""
            src="/books/HNGN1.png"
            width={358}
            height={248}
            className="py-4"
          />
          <Button className="w-full bg-[#6dab3c] text-white" radius="sm">
            <FontAwesomeIcon icon={faGavel} className="size-4 ml-1 " />
            XEM CHI TIẾT
          </Button>
        </div>
      </div>
    </>
  );
};

export default page;
