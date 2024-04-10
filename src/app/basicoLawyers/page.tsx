"use client";

import HeaderComponent from "@/components/header";
import { UserType } from "@/constants/types/homeType";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const Page = () => {
  const [lawyers, setLawyers] = useState<UserType[]>([]);

  useEffect(() => {
    fetchAllLawyers();
  }, []);

  const fetchAllLawyers = () => {
    try {
      axios
        .get(`${process.env.NEXT_PUBLIC_BASE_API}user/getAllLawyers`)
        .then((response) => {
          setLawyers(response.data.data);
          console.log("luat su o day?" + lawyers);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/* header */}
      <div className="relative w-full h-[300px] ">
        <Image
          className="w-full h-full object-cover"
          alt="bg image"
          src="/doanluasu5_6.jpg"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

        <div className="flex flex-col absolute z-20 inset-0 p-24 text-white mx-[366px] ">
          <div className="min-h-20">
            <div className="text-3xl font-bold text-white">
              LIÊN HỆ VỚI CHÚNG TÔI
            </div>
            <div
              className="text-xl text-white pt-5 font-lora italic opacity-80"
              style={{ letterSpacing: "1px" }}
            >
              BASICO đồng hành với quý khách hàng xây dựng nền tảng kinh doanh
              bền vững.
            </div>
          </div>

          <div className="absolute bottom-0 left-24 right-24 bg-black bg-opacity-60 py-2 px-4 max-w-[250px] ">
            <a href="/" className="text-white font-bold text-sm">
              Basico Law Firm
            </a>
            <span className="text-red-500 font-bold text-sm ml-2">
              › Liên Hệ
            </span>
          </div>
        </div>
      </div>
      {/* body */}
      <div className="flex flex-col justify-center items-center text-black pt-[100px] mx-[366px] w-[1140px]">
        <div className="p-5 bg-[#ddcaad] text-[23px] mb-9 leading-6 ">
          <strong>
            BA<span className="text-[#ff0000]">S</span>I
            <span className="text-[#ff0000]">CO </span>
          </strong>{" "}
          có những luật sư chuyên nghiệp trong lĩnh vực tài chính, ngân hàng và
          được cộng đồng doanh nghiệp thừa nhận như những chuyên gia pháp lý đầu
          ngành
        </div>

        <Image
          src="/gia-sach-lo-hoa.jpg"
          alt=""
          width={1140}
          height={679}
          className="mb-[30px]"
        />

        <div className="mb-9 text-[16px]">
          <p className="mb-[10px]">
            &gt;&gt; Họ là những Luật sư đã từng thành công trong vai trò Giám
            đốc pháp chế, Phó Tổng Giám đốc phụ trách Pháp chế, kiểm soát tuân
            thủ, rủi ro, thành viên Hội đồng Quản trị, Ban Kiểm soát,… tại nhiều
            ngân hàng, công ty chứng khoán, các định chế tài chính và doanh
            nghiệp lớn khác. Đến thời điểm hiện tại, nhiều luật sư của{" "}
            <strong>
              BA<span className="text-[#ff0000]">S</span>I
              <span className="text-[#ff0000]">CO </span>
            </strong>
            vẫn được đánh giá là tác giả của hệ thống quy định nghiệp vụ chủ
            chốt tại nhiều Ngân hàng thuộc top 10 Ngân hàng lớn nhất Việt Nam.
          </p>
          <p className="mb-[10px]">
            &gt;&gt; Họ đã cung cấp giải pháp hữu hiệu cho nhiều giao dịch trọng
            yếu của Khách hàng thuộc các lĩnh vực M&A, giao dịch vốn, chứng
            khoán, bất động sản, thuế và hầu hết các nhu cầu pháp lý từ doanh
            nghiệp.
          </p>
          <p className="mb-[10px]">
            &gt;&gt; Họ được biết đến như những luật sư tranh tụng hàng đầu
            trong những vụ án kinh tế lớn nhất tại Việt Nam thời gian qua.
          </p>
          <p>
            &gt;&gt; Họ tạo nên những dịch vụ pháp lý với đẳng cấp chất lượng
            cao cho Khách hàng của{" "}
            <strong>
              BA<span className="text-[#ff0000]">S</span>I
              <span className="text-[#ff0000]">CO</span>
            </strong>
            .
          </p>
        </div>
        <div className="mb-[35px]">
          <strong>
            BA<span className="text-[#ff0000]">S</span>I
            <span className="text-[#ff0000]">CO </span>
          </strong>{" "}
          còn có đội ngũ cố vấn dày dạn kinh nghiệm, kiến thức thực tế. Họ là
          những chuyên gia đầu ngành trong nhiều mảng nghiệp vụ khác nhau của
          lĩnh vực ngân hàng, tài chính, chứng khoán và đầu tư. Nhiều người đã
          từng giữ những cương vị chủ chốt như Phó Tổng Giám đốc, Giám đốc Khối
          (tín dụng, nguồn vốn), thành viên các Uỷ ban Quản trị rủi ro (Uỷ ban
          Tín dụng, ALCO) tại các Ngân hàng thương mại cổ phần lớn, các công ty
          chứng khoán thuộc nhóm dẫn đầu thị trường tại Việt Nam.
        </div>

        <div className="font-bold text-[26px] mb-5 ">Luật sư BASICO</div>
        <div className="flex justify-center mb-[50px]">
          <div className="w-[60px] h-[6px] bg-[#FF0004]"></div>
        </div>

        <div className="mb-32">
          <div className="flex flex-cols-4 w-full h-[400px] gap-5">
            {lawyers.map((lawyer, index) => (
              <div key={index} className="w-[262px] h-[350px]">
                <div>
                  <Image
                    src={
                      lawyer.avatar
                        ? lawyer.avatar.startsWith("http")
                          ? lawyer.avatar
                          : "/LS_Hai.jpg"
                        : "/LS_Hai.jpg"
                    }
                    alt=""
                    width={262}
                    height={300}
                  />
                  <div className="bg-[#f3f3f3] py-8 pl-5">
                    <h2 className="text-[18px] font-bold">{lawyer.userName}</h2>
                    <p className="text-[15px] text-[#838383]">
                      {lawyer.position}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
