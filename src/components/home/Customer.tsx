import { Button } from "@nextui-org/react";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { bankImages } from "@/lib/bankImages";
import Image from "next/image";

const Customer = () => {
  return (
    <div className="grid grid-cols-7 bg-white text-black justify-center items-center pt-24 pb-16 pl-80 pr-80">
      {/* 1 */}
      <div className="col-span-2 flex flex-col">
        <h1 className="border-l-8 border-[#ff0004] p-5 mb-12 text-2xl font-bold">
          KHÁCH HÀNG CỦA CHÚNG TÔI
        </h1>
        <p className="text-xl">
          Theo phân loại của chúng tôi, kinh tế Việt Nam đang được vận hành với
          14 lĩnh vực ngành kinh doanh. Điều đáng tự hào của BASICO là bạn có
          thể tìm thấy trong cơ sở khách hàng phong phú của chúng tôi những
          thương hiệu dẫn đầu trong hầu hết lĩnh vực, ngành kinh doanh. Đó là
          những doanh nghiệp đầu ngành, mang lại niềm tự hào cho kinh tế Việt
          Nam. Còn chúng tôi tự hào vì BASICO được họ lựa chọn với tư cách hãng
          luật duy nhất phục vụ toàn diện, gắn kết chiến lược trên con đường
          phát triển…
        </p>
        <Button className="bg-white text-red-500 py-2 px-4 inline-flex items-center justify-start hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          <a href="/about/ourClients">XEM THÊM</a>
          <FontAwesomeIcon icon={faChevronCircleRight} className="size-4" />
        </Button>
      </div>
      {/* 2 */}
      <div className="col-span-5 grid grid-cols-5 ">
        {bankImages.map((img, index) => (
          <div key={index} className="w-36 h-24 relative pt-6 pb-6">
            <Image
              src={img.src}
              alt={img.alt}
              layout="fill"
              objectFit="cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customer;
