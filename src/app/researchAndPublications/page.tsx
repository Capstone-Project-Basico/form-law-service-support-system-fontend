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
        {/* header */}
    <div className="relative w-full h-[300px] ">
        <Image
        className="w-full h-full object-cover"
        alt="bg image"
        src="/WERNER-RI.jpg"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
    />
    <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
        
    <div className="flex flex-col absolute z-20 inset-0 p-24 text-white mx-[366px] ">
      
      <div className="min-h-20">
        <div className="text-3xl font-bold text-white">LIÊN HỆ VỚI CHÚNG TÔI</div>
        <div className="text-xl text-white">BASICO đồng hành với quý khách hàng xây dựng nền tảng kinh doanh bền vững.</div>
      </div>

      <div className="absolute bottom-0 left-24 right-24 bg-black bg-opacity-60 py-2 px-4 max-w-[250px] " >
        <a href="/" className="text-white font-bold text-sm">Basico Law Firm</a>
      <span className="text-red-500 font-bold text-sm ml-2">› Liên Hệ</span>
    </div>
  </div>
</div>
    {/* body */}
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
