"use client";

import HeaderComponent from "@/components/header";
import { PartnerType } from "@/constants/types/homeType";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Page = () => {
  const [partners, setPartners] = useState<PartnerType[]>([]);

  useEffect(() => {
    getAllPartners();
  }, []);

  const getAllPartners = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_API}partner/getAllApprovePartner`)
      .then((response) => {
        setPartners(response.data.data);
      });
  };

  return (
    <>
      <HeaderComponent
        title="KHÁCH HÀNG CỦA CHÚNG TÔI"
        subTitle="BASICO đã trở thành ưu tiên lựa chọn số 1 của rất nhiều ngân hàng và doanh nghiệp."
        link="Khách Hàng Của Chúng Tôi"
      />
      <div className="flex flex-col justify-center items-center bg-white text-black px-[366px] w-[770]">
        <h1 className="text-3xl font-bold mb-9">Khách hàng của chúng tôi</h1>
        <div className="flex flex-col justify-start items-start">
          <p className="pb-[10px]">
            Theo phân loại của chúng tôi, kinh tế Việt Nam đang được vận hành
            với 14 lĩnh vực ngành kinh doanh. Điều đáng tự hào của
            <strong>
              &nbsp;BA<span className="text-[#ff0000]">S</span>I
              <span className="text-[#ff0000]">CO </span>
            </strong>{" "}
            là bạn có thể tìm thấy trong cơ sở khách hàng phong phú của chúng
            tôi những thương hiệu dẫn đầu trong hầu hết lĩnh vực, ngành kinh
            doanh. Đó là những doanh nghiệp đầu ngành, mang lại niềm tự hào cho
            kinh tế Việt Nam. Còn chúng tôi tự hào vì
            <strong>
              &nbsp;BA<span className="text-[#ff0000]">S</span>I
              <span className="text-[#ff0000]">CO </span>
            </strong>{" "}
            được họ lựa chọn với tư cách hãng luật duy nhất phục vụ toàn diện,
            gắn kết chiến lược trên con đường phát triển.
          </p>
          <p className="italic pb-4">Có thể kể đến:</p>
          <ul className="list-disc ml-7 mb-4">
            <li>
              Công ty Cổ phần Du lịch và Văn hóa Suối Tiên (thương hiệu đầu
              ngành du lịch và giải trí);
            </li>
            <li>Tập đoàn Sơn Hà (thương hiệu đầu ngành hàng tiêu dùng);</li>
            <li>
              Công ty Cổ phần Chứng khoán thành phố Hồ Chí Minh (thương hiệu đầu
              ngành dịch vụ tài chính);
            </li>
            <li>
              Ngân hàng TMCP Á Châu (ACB) và Ngân hàng TMCP Phương Đông (OCB) –
              những ngân hàng thuộc top đầu, luôn được đánh giá tốt nhất ở Việt
              Nam và trong khu vực.
            </li>
          </ul>
          <p className="italic">
            Và rất nhiều khách hàng tiêu biểu khác của chúng tôi:
          </p>
        </div>

        <div className="grid grid-cols-5 justify-center items-center gap-5">
          {partners.map((partner) => (
            <div key={partner.partnerId} className="border-1">
              <Link
                href={partner.link}
                className="py-[25px]"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image alt="" src={partner?.avatar} width={200} height={133} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
