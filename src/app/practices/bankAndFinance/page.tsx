import HeaderComponent from "@/components/header";
import Image from "next/image";
import BasicoMayHelp from "@/components/practices/basicoMayHelp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDot } from "@fortawesome/free-regular-svg-icons";

const page = () => {
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
    <>
      <HeaderComponent
        title="LĨNH VỰC CHUYÊN MÔN"
        link="Ngân Hàng Và Tài Chính"
      />
      <div className="flex flex-col justify-center items-center text-black pt-[82px] w-[1125px] mx-[389px]">
        <h2 className="text-3xl font-bold mb-9">Ngân hàng và tài chính</h2>
        <div className="">
          <strong>
            &nbsp;BA<span className="text-[#ff0000]">S</span>I
            <span className="text-[#ff0000]">CO </span>
          </strong>
          được biết đến với tư cách hãng luật sâu sắc về nghiệp vụ ngân hàng.
          Chúng tôi trợ giúp pháp lý cho các ngân hàng, tổ chức tín dụng trong
          mọi lĩnh vực hoạt động liên quan đến pháp luật. Chúng tôi cũng cung
          cấp các dịch vụ pháp lý toàn diện cho doanh nghiệp trong các giao dịch
          liên quan đến lĩnh vực ngân hàng.
        </div>
        <Image
          src="/gia-sach-lo-hoa.jpg"
          alt=""
          width={1125}
          height={670}
          className="mb-[30px]"
        />
        <div className="flex flex-row">
          {/* left */}
          <div className="w-[547px]">
            <div className="pb-[10px]">
              Năm 2010, BASICO trở thành hãng luật nằm trong danh sách ưu tiên
              lựa chọn của Hong leong Bank Việt Nam.
            </div>
            <div className="pb-[10px]">
              Năm 2011, BASICO trở thành hãng luật duy nhất tại Việt Nam được
              Ngân hàng Phương Đông (OCB) lựa chọn làm hãng luật cung cấp dịch
              vụ Luật sư nội bộ cho Hội đồng Quản trị và Ban Điều hành trong
              điều hành toàn bộ hệ thống ngân hàng. Qua hơn 6 năm hợp tác, Ban
              lãnh đạo OCB luôn ghi nhận BASICO đã và đang đóng góp ấn tượng vào
              việc kiểm soát rủi ro pháp lý tạo nên những thành quả phát triển
              của OCB suốt thời gian qua.
            </div>
            <div className="pb-[10px]">
              Năm 2015, BASICO ký Thỏa thuận hợp tác toàn diện với Ngân hàng Đầu
              tư Phát triển Việt Nam (BIDV).
            </div>
            <div className="pb-[10px]">
              Từ năm 2016 tới nay, BASICO chính thức trở thành hãng luật duy
              nhất được Ngân hàng Á Châu (ACB) lựa chọn để cung cấp dịch vụ Luật
              sư nội bộ cho Hội đồng Quản trị và Ban lãnh đạo ngân hàng.
            </div>
            <div className="pb-[10px]">
              Năm 2018, Ngân hàng TMCP Việt Nam Thịnh Vượng (VPBank) gia nhập
              vào nhóm Khách hàng là Hội sở ngân hàng sử dụng dịch vụ Luật sư
              nội bộ của BASICO.
            </div>
            <div className="pb-[10px]">
              Gắn bó với ngành Ngân hàng trong mọi lĩnh vực nghiệp vụ, BASICO đã
              triển khai hàng loạt dự án pháp lý, góp phần hỗ trợ sự phát triển
              nghiệp vụ của các ngân hàng với một số dự án tiêu biểu:
            </div>
            <ul style={{ listStyleType: "unset" }} className="pl-7">
              <li>
                Dự án tư vấn tái cấu trúc ngân hàng cho Ngân hàng TMCP Phương
                Đông (OCB);
              </li>
              <li>
                Dự án tư vấn xây dựng hệ thống mẫu biểu và các hợp đồng hợp tác
                giữa OCB và đối tác trong lĩnh vực kinh doanh bất động sản;
              </li>
              <li>
                Dự án tư vấn xây dựng hệ thống định chế khung và Hệ thống mẫu
                biểu về nghiệp vụ tín dụng, bảo đảm tiền vay cho OCB;
              </li>
              <li>
                Dự án tư vấn xây dựng hệ thống mẫu biểu về nghiệp vụ tín dụng,
                bảo đảm tiền vay cho Ngân hàng TMCP Quân Đội (MB);
              </li>
              <li>
                Dự án tư vấn xây dựng hệ thống Phân định trách nhiệm trong
                nghiệp vụ tín dụng cho OCB;
              </li>
              <li>
                Dự án tư vấn cho Ban Trù bị thành lập Ngân hàng Hong Leong Bank
                Việt Nam;
              </li>
              <li>
                Dự án tư vấn xây dựng hệ thống mẫu biểu sản phẩm phái sinh hoán
                đổi lãi suất cho Ngân hàng MB;
              </li>
            </ul>
          </div>
          {/* right */}
          <div className="flex flex-col w-[547px]">
            <Image
              src="/practices/thoathuanhoptac.jpg"
              alt=""
              width={547}
              height={336}
              className="mb-[30px]"
            />
            <ul style={{ listStyleType: "unset" }} className="pl-7">
              <li>
                Dự án tập huấn toàn diện về pháp luật tài chính, ngân hàng của
                Việt Nam cho cán bộ nhân viên Tập đoàn Hong Leong Bank Malaysia
                tại Kuala Lumpur, Malaysia;
              </li>
              <li>
                Dự án tư vấn tái cấu trúc và xây dựng Hệ thống tổng thể các quy
                trình nghiệp vụ ngân hàng cho Ngân hàng TMCP Hải Hưng (nay là
                Ngân hàng TMCP Đại Dương – Ocean Bank);
              </li>
              <li>
                Dự án tư vấn xây dựng Hệ thống định chế khung và Hệ thống mẫu
                biểu về nghiệp vụ tín dụng, bảo đảm tiền vay cho Ngân hàng TMCP
                Phương Tây (Western Bank);
              </li>
              <li>
                Dự án tư vấn Cấu trúc tổ chức, xây dựng Hệ thống tổng thể các
                quy trình nghiệp vụ ngân hàng và tư vấn thường xuyên cho Ban Trù
                bị thành lập Ngân hàng TMCP Công nghiệp Việt Nam (InBank);
              </li>
              <li>
                Dự án hoàn thiện tổng thể hệ thống nghiệp vụ quy trình cho Công
                ty Tài chính Bưu điện (PTFinance);
              </li>
              <li>
                Dự án tư vấn xây dựng hệ thống quy trình nghiệp vụ tín dụng và
                Hệ thống mẫu biểu nghiệp vụ tín dụng, bảo đảm tiền vay cho CFC
                (nay là Vietcredit);
              </li>
              <li>
                Dự án đào tạo nghiệp vụ tín dụng cho hệ thống Ngân hàng
                Vietcombank, ACB;
              </li>
              <li>Các dự án khác…</li>
            </ul>
          </div>
        </div>
        <div className="mt-[50px] mb-4 text-3xl font-bold">
          Dịch vụ pháp lý liên quan
        </div>
        <div className="grid grid-cols-2 justify-start items-center">
          <ul style={{ listStyleType: "" }}>
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
