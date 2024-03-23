import { Button } from "@nextui-org/react";
import Image from "next/image";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Request = () => {
  return (
    <div className="grid lg:grid-cols-2 sm:grid-row bg-[#ff0004] justify-center items-center">
      {/* 1 */}
      <div className="flex flex-col justify-center items-center text-white p-4">
        <h1 className="text-2xl font-bold mb-10">YÊU CẦU HỖ TRỢ PHÁP LÝ</h1>
        <h2 className="text-xl pt-10 mb-10">
          Bạn gặp vấn đề? Hãy hỏi Luật sư BASICO
        </h2>
        <div className="text-xl">
          <h3 className="pt-5 mb-4">Tại Hà Nội: 024-3732.6646</h3>
          <h3>Tại Sài Gòn: 028-3826.8343</h3>
        </div>
        <Button
          className="border-white text-white text-xl pt-15 pb-15 hover:text-black hover:bg-white"
          variant="bordered"
          radius="none"
        >
          <a href="/contactUs">GỬI YÊU CẦU</a>
          <FontAwesomeIcon icon={faAngleRight} className="size-4" />
        </Button>
      </div>
      {/* 2 */}
      <div className="">
        <Image
          alt=""
          src="/yeucauhotro.jpg"
          width={951}
          height={436}
          className=" "
        />
      </div>
    </div>
  );
};

export default Request;
