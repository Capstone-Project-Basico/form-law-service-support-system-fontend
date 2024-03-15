"use client";

import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import HeaderComponent from "@/components/header";
import BasicoMayHelp from "@/components/practices/basicoMayHelp";

const Page = () => {
  const items = [
    { text: "Ngân hàng và tài chính" },
    { text: "Thị trường vốn" },
    { text: "Bảo hiểm" },
    { text: "Tư vấn chiến lược và Tái cấu trúc DN" },
    { text: "Đào tạo pháp lý cho doanh nghiệp" },
    { text: "Tư vấn M&A" },
  ];

  const items2 = [
    { text: "Tranh tụng và Giải quyết tranh chấp" },
    { text: "Sở hữu trí tuệ" },
    { text: "Tư vấn bất động sản" },
    { text: "Lao động" },
    { text: "Thuế" },
    { text: "CNTT & Truyền thông" },
  ];

  return (
    <div>
      {/* header for service */}
      <HeaderComponent
        title="LĨNH VỰC CHUYÊN MÔN"
        link=" Dịch Vụ Luật Sư Nội Bộ"
      />
      <div className="flex flex-col justify-center items-center bg-white text-black px-[366px] pt-20">
        <h1 className="text-3xl font-bold mb-9">Dịch vụ Luật sư nội bộ</h1>
        <Image
          className="mb-8"
          alt=""
          src="/practices/luat-su-noi-bo.jpg"
          height={434}
          width={727}
        />

        <div className="grid grid-cols-2 ">
          {/* 1 */}
          <div className="pr-4" style={{ width: "547px" }}>
            <h1 className="mb-5 text-xl">
              Dịch vụ Luật sư nội bộ là một sản phẩm tư vấn thường xuyên của
              <strong>
                &nbsp;BA<span className="text-[#ff0000]">S</span>I
                <span className="text-[#ff0000]">CO </span>
              </strong>
              dành cho Khách hàng, với kết cấu gồm 6 dịch vụ cơ bản:
            </h1>
            <p className="pl-10 mb-5">
              1. Tư vấn pháp lý, giao dịch trong kinh doanh;
            </p>
            <p className="pl-10 mb-5">2. Tư vấn xử lý vấn đề bất thường;</p>
            <p className="pl-10 mb-5">
              3. Tư vấn quản lý quy trình nghiệp vụ kinh doanh;
            </p>
            <p className="pl-10 mb-5">
              4. Cung cấp dữ liệu pháp lý cho hoạt động doanh nghiệp;
            </p>
            <p className="pl-10 mb-5">5. Tập huấn pháp luật định kỳ;</p>
            <p className="pl-10 mb-5">
              6. Tư vấn VIP (dành riêng cho lãnh đạo doanh nghiệp).
            </p>

            <div className="mb-9">
              <h1 className="mb-5 text-xl">
                Dịch vụ Luật sư nội bộ đã được{" "}
                <strong>
                  &nbsp;BA<span className="text-[#ff0000]">S</span>I
                  <span className="text-[#ff0000]">CO </span>
                </strong>
                cung cấp cho Khách hàng doanh nghiệp thuộc những lĩnh vực hoạt
                động khác nhau, trong đó:
              </h1>

              <h1 className="mb-3">
                <span className="text-[#0000FF] font-bold">
                  Thuộc lĩnh vực chứng khoán
                </span>
                , các khách hàng tiêu biểu sử dụng dịch vụ Luật sư nội bộ của
                BASICO ổn định trong nhiều năm qua gồm có:
              </h1>
              <ul style={{ listStyleType: "circle" }} className="pl-10">
                <li>Hệ thống Ngân hàng TMCP Á Châu</li>
                <li>Hệ thống Ngân hàng TMCP Phương Đông</li>
                <li>Hệ thống Ngân hàng TMCP Sài Gòn – Hà Nội</li>
                <li>Hệ thống Ngân hàng TMCP Việt Nam Thịnh Vượng</li>
                <li>Công ty Tài chính Cổ phần Tín Việt</li>
                <li>Tổ chức Tài chính Vi mô Tình Thương</li>
                <li>
                  Công ty TNHH MTV Kiều hối Ngân hàng TMCP Ngoại thương Việt Nam
                </li>
                <li>Và nhiều ngân hàng, chi nhánh ngân hàng khác.</li>
              </ul>
            </div>

            <div className="bg-[#e9f5f8] p-5">
              <div>
                <h1 className="font-bold mb-2">
                  Với một mức phí dịch vụ ổn định, Khách hàng nhận về các giá
                  trị gia tăng:
                </h1>
                <li>
                  Quản lý tốt hơn chi phí hoạt động do{" "}
                  <strong>
                    &nbsp;BA<span className="text-[#ff0000]">S</span>I
                    <span className="text-[#ff0000]">CO </span>
                  </strong>
                  sẽ đóng vai trò như một Phòng, Ban pháp chế nội bộ của doanh
                  nghiệp
                </li>
                <li>Hưởng hiệu quả thực chất hơn về chất lượng tư vấn</li>
                <li>Phòng vệ tốt hơn rủi ro pháp lý</li>
                <li>
                  Nhận các ưu đãi khi sử dụng các dịch vụ pháp lý khác của{" "}
                  <strong>
                    &nbsp;BA<span className="text-[#ff0000]">S</span>I
                    <span className="text-[#ff0000]">CO </span>
                  </strong>
                  .
                </li>
              </div>
            </div>
          </div>
          {/* 2 */}
          <div className="pl-4">
            <h1 className="mb-3">
              <span className="text-[#0000FF] font-bold">
                Thuộc lĩnh vực chứng khoán
              </span>
              , các Khách hàng tiêu biểu gồm có:
            </h1>
            <ul style={{ listStyleType: "unset" }} className="mt-4 mb-4 pl-6">
              <li>CTCP Chứng khoán TP Hồ Chí Minh</li>
              <li>CTCP Chứng khoán KIS</li>
              <li>CTCP Chứng khoán Tân Việt </li>
              <li>CTCP Chứng khoán Phương Đông</li>
              <li>CTCP Chứng khoán Quốc Tế Việt Nam</li>
              <li>Công ty TNHH Chứng khoán Đông Á </li>
              <li>Công ty TNHH Chứng khoán ACB</li>
              <li>CTCP Chứng khoán Globalmind Capital</li>
              <li>CTCP Chứng khoán YUANTA Việt Nam</li>
              <li>CTCP Quản lý quỹ Đầu tư Đỏ </li>
              <li>Và nhiều định chế tài chính khác trong lĩnh vực.</li>
            </ul>
            <h1 className="mb-3">
              <span className="text-[#0000FF] font-bold">
                Thuộc lĩnh vực doanh nghiệp
              </span>
              , Khách hàng tiêu biểu trong nhiều ngành nghề của
              <strong>
                &nbsp;BA<span className="text-[#ff0000]">S</span>I
                <span className="text-[#ff0000]">CO </span>
              </strong>
              gồm có:
            </h1>
            <li>CTCP Quốc tế Sơn Hà</li>
            <li>CTCP Du lịch Văn hóa Suối Tiên</li>
            <li>Tổng Công ty Hàng hải Việt Nam</li>
            <li>CTCP Thương mại Dầu khí Cửu Long</li>
            <li>CTCP Tập đoàn Nhựa Đông Á</li>
            <li>CTCP SAM Holdings </li>
            <li>CTCP Tập đoàn Capella </li>
            <li>Công ty TNHH MTV Thương mại Dầu khí Đồng Tháp</li>
            <li>CTCP Đầu tư Phát triển Việt Hương</li>
            <li>Công ty TNHH Sucafina Việt Nam</li>
            <li>CTCP Cáp – Nhựa Vĩnh Khánh </li>
            <li>Và nhiều doanh nghiệp khác</li>
          </div>
        </div>

        <BasicoMayHelp />
      </div>
    </div>
  );
};

export default Page;
