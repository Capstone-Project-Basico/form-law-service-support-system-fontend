import HeaderComponent from "@/components/header";
import BasicoMayHelp from "@/components/practices/basicoMayHelp";
import { faCircleDot } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

const page = () => {
  const items = [
    { text: "Giao dịch bảo hiểm và Tái bảo hiểm" },
    { text: "Sản phẩm bảo hiểm" },
  ];

  const items2 = [
    { text: "Quy trình kinh doanh của các công ty bảo hiểm" },
    { text: "Tranh chấp bảo hiểm" },
    { text: "Bồi thường bảo hiểm" },
  ];
  return (
    <>
      <HeaderComponent
        title="LĨNH VỰC CHUYÊN MÔN"
        subTitle=""
        link="Bảo Hiểm"
      />
      <div className="flex flex-col justify-center items-center text-black pt-[82px]">
        <h2 className="text-3xl font-bold mb-[35px]">Bảo hiểm</h2>
        <Image
          src="/practices/insurance-law.jpg"
          alt=""
          width={727}
          height={272}
          className="mb-8"
        />
        <div className="w-[1125px] flex flex-col gap-8">
          <p>
            Thị trường kinh doanh bảo hiểm tại Việt Nam đang phát triển nhanh
            với sự cạnh tranh lớn của các doanh nghiệp kinh doanh bảo hiểm.{" "}
            <br /> Bằng kinh nghiệm và năng lực tư vấn pháp lý của mình,
            <strong>
              &nbsp;BA<span className="text-[#ff0000]">S</span>I
              <span className="text-[#ff0000]">CO </span>
            </strong>{" "}
            đã giúp nhiều công ty bảo hiểm hoàn thiện các sản phẩm kinh doanh,
            quy trình nghiệp vụ.
            <strong>
              &nbsp;BA<span className="text-[#ff0000]">S</span>I
              <span className="text-[#ff0000]">CO </span>
            </strong>{" "}
            cũng tham gia thẩm định, thiết kế các mẫu biễu hợp đồng giao dịch
            phục vụ hoạt động kinh doanh bảo hiểm. Một trong những dự án tư vấn
            tiêu biểu của{" "}
            <strong>
              BA<span className="text-[#ff0000]">S</span>I
              <span className="text-[#ff0000]">CO </span>
            </strong>{" "}
            trong lĩnh vực này: Dự án tư vấn Hoàn thiện hệ thống mẫu biểu trong
            các lĩnh vực kinh doanh bảo hiểm cho Tổng Công ty Cổ phần Bảo hiểm
            Quân đội (MIC) được{" "}
            <strong>
              BA<span className="text-[#ff0000]">S</span>I
              <span className="text-[#ff0000]">CO </span>
            </strong>{" "}
            thực hiện hoàn tất năm 2013.
          </p>
          <p>
            Năm 2019,{" "}
            <strong>
              BA<span className="text-[#ff0000]">S</span>I
              <span className="text-[#ff0000]">CO </span>
            </strong>{" "}
            thực hiện hoàn tất Dự án tư vấn Thỏa thuận độc quyền phân phối các
            sản phẩm bảo hiểm qua kênh ngân hàng (bancassurance) giữa Ngân hàng
            TMCP Phương Đông (OCB) và Công ty TNHH Bảo hiểm Nhân thọ Generali
            Việt Nam. Đây là một điểm nhấn trong số các dự án tư vấn của{" "}
            <strong>
              BA<span className="text-[#ff0000]">S</span>I
              <span className="text-[#ff0000]">CO </span>
            </strong>
            cho các giao dịch kinh doanh trong lĩnh vực bảo hiểm tại Việt Nam.
          </p>
        </div>
        <Image
          src="/practices/Luatsu_Hai.jpg"
          alt=""
          width={960}
          height={623}
          className="my-9"
        />
        <p className="w-[1125px]">
          Với đội ngũ luật sư tranh tụng nổi bật về kinh nghiệm, uy tín,{" "}
          <strong>
            BA<span className="text-[#ff0000]">S</span>I
            <span className="text-[#ff0000]">CO </span>
          </strong>
          cũng hỗ trợ hiệu quả cho khách hàng trong hàng loạt vụ việc tranh chấp
          về bảo hiểm. Qua nhiều năm,{" "}
          <strong>
            BA<span className="text-[#ff0000]">S</span>I
            <span className="text-[#ff0000]">CO </span>
          </strong>{" "}
          được nhiều doanh nghiệp kinh doanh bảo hiểm tin dùng, lựa chọn là hãng
          luật cung cấp dịch vụ tranh tụng giải quyết tranh chấp.
        </p>
        {/* dich vu lien quan */}
        <div className="mt-[50px] mb-4 text-3xl font-bold">
          Dịch vụ pháp lý liên quan
        </div>
        <div className="grid grid-cols-2 justify-start">
          <ul style={{ listStyleType: "" }} className="w-[560px] px-[15px]">
            {items.map((item, index) => (
              <li
                key={index}
                className="flex flex-row mb-3 hover:text-[#FF0004]"
              >
                <FontAwesomeIcon
                  icon={faCircleDot}
                  className="size-4 text-[#FF0004] mr-2"
                />
                {item.text}
              </li>
            ))}
          </ul>
          {/* 2 */}
          <ul className="px-8">
            {items2.map((item, index) => (
              <li
                key={index}
                className="flex flex-row mb-3 px-4 hover:text-[#FF0004]"
              >
                <FontAwesomeIcon
                  icon={faCircleDot}
                  className="size-4 text-[#FF0004] mr-2"
                />
                {item.text}
              </li>
            ))}
          </ul>
        </div>
        <BasicoMayHelp />
      </div>
    </>
  );
};

export default page;
