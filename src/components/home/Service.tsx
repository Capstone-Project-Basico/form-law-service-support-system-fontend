import Image from "next/image";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGraduate,
  faUniversity,
  faCoins,
  faChalkboardTeacher,
  faBuilding,
  faIdBadge,
  faBalanceScale,
  faSitemap,
} from "@fortawesome/free-solid-svg-icons";
import { Item } from "@/constants/types/homeType";

const Service = () => {
  const items: Item[] = [
    { 
      icon: faUserGraduate,
      alt: "",
      title: "Dịch vụ luật sư nội bộ",
      
      subtitle:
        "Tư vấn thường xuyên, toàn diện và gắn bó mật thiết với nội bộ doanh nghiệp",
    },
    {
      icon: faUniversity,
      alt: "",
      title: "Ngân hàng và tài chính",
      subtitle: "Sâu sắc trong từng lĩnh vực pháp lý về tài chính, ngân hàng",
    },
    {
      icon: faCoins,
      alt: "",
      title: "Thị trường vốn",
      subtitle:
        "Cung cấp giải pháp pháp lý, quy trình và cấu trúc hợp lý cho mọi giao dịch trên thị trường chứng khoán",
    },
    {
      icon: faChalkboardTeacher,
      alt: "",
      title: "Tư vấn M&A",
      subtitle:
        "Cung cấp giải pháp, cấu trúc giao dịch và bảo đảm pháp lý cho giao dịch M&A trong đa dạng ngành nghề, lĩnh vực kinh doanh",
    },
    {
      icon: faBuilding,
      alt: "",
      title: "Doanh nghiệp",
      subtitle:
        "Cung cấp dịch vụ pháp lý toàn diện cho mọi nhu cầu pháp lý trong hoạt động kinh doanh tại Việt Nam",
    },
    {
      icon: faIdBadge,
      alt: "",
      title: "Tư vấn chiến lược, tái cấu trúc DN",
      subtitle:
        "Đem quy trình hợp lý, kinh nghiệm, giải pháp khắc phục mọi khó khăn về tổ chức hoạt động và kinh doanh cho doanh nghiệp",
    },
    {
      icon: faBalanceScale,
      alt: "",
      title: "Tranh tụng, giải quyết tranh chấp",
      subtitle:
        "Đáp ứng nhu cầu giải quyết tranh chấp, tình huống bất thường của doanh nghiệp với đội ngũ luật sư tên tuổi, kinh nghiệm và sắc bén",
    },
    {
      icon: faSitemap,
      alt: "",
      title: "Các dịch vụ khác",
      subtitle:
        "Phong phú và thực chất, đáp ứng nhu cầu pháp lý toàn diện của cộng đồng doanh nghiệp",
    },
  ];

  return (
    <div className="grid lg:grid-cols-4 px-32 py-28 bg-black">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center text-center px-4 h-72"
        >
          <div className="flex justify-center w-[260px] h-[67px]">
            {item.icon ? (
              <FontAwesomeIcon
                icon={item.icon}
                className="size-10 text-[#ff0004] "
              />
            ) : (
              <Image
                src={item.icon || "/default-image.png"}
                alt={item.alt}
                width={64}
                height={64}
              />
            )}
          </div>
          <div className="pt-4">
            <h2 className="text-[18px] font-bold mb-2 h-[22px]">
              {item.title}
            </h2>
            <p className="text-[16px] h-full">{item.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Service;
