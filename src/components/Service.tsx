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
    <div className="flex md:grid md:grid-cols-4 sm:flex-col justify-center items-center ml-80 mr-80 mt-28 mb-28">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center text-center pr-4 pl-4 h-52 w-72"
        >
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
          <h1 className="size-5 font-bold pb-2 w-full">{item.title}</h1>
          <h2 className="size-4 w-full">{item.subtitle}</h2>
        </div>
      ))}
    </div>
  );
};

export default Service;
