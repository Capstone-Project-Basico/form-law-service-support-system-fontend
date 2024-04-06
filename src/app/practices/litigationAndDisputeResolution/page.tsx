import HeaderComponent from "@/components/header";
import BasicoMayHelp from "@/components/practices/basicoMayHelp";
import Image from "next/image";

const page = () => {
  return (
    <>
      <HeaderComponent
        title="LĨNH VỰC CHUYÊN MÔN"
        link="Tranh Tụng Và Giải Quyết Tranh Chấp"
      />
      <div className="flex flex-col justify-center items-center bg-white text-black px-[366px] pt-16">
        <h1 className="text-3xl font-bold mb-9">
          Tranh tụng và Giải quyết tranh chấp
        </h1>
        <p className="p-4 bg-[#cbdbd8] w-[810px] text-[15px] mb-9">
          Đội ngũ Luật sư của
          <strong>
            &nbsp;BA<span className="text-[#ff0000]">S</span>I
            <span className="text-[#ff0000]">CO </span>
          </strong>
          có chuyên môn đa dạng, năng lực và kinh nghiệm phong phú, đã thụ lý và
          giải quyết hầu hết các thể loại tranh chấp kinh doanh thương mại phát
          sinh tại Việt Nam.
        </p>
        <div className="grid grid-cols-2">
          <div>
            <Image
              src="/practices/daiannganhang.jpg"
              alt=""
              width={547}
              height={410}
            />
          </div>
          <div>
            <p className="font-bold">
              Các dịch vụ chủ yếu của chúng tôi bao gồm:
            </p>
            <ul className="list-disc ml-7">
              <li>
                Tư vấn các vấn đề pháp lý, đánh giá hiện trạng, đề xuất giải
                pháp tối ưu cho Khách hàng trong các giao dịch có nguy cơ xung
                đột lợi ích dẫn đến tranh chấp.
              </li>
              <li>
                Cung cấp luật sư, chuyên gia đàm phán để thương lượng, hòa giải,
                làm trung gian hòa giải các tranh chấp.
              </li>
              <li>
                Tư vấn hoàn thiện các thủ tục, tiến hành các quy trình khiếu
                nại, khởi kiện để giải quyết tranh chấp.
              </li>
              <li>
                Đại diện cho Khách hàng trước Tòa án, Trọng tài trong nước,
                Trọng tài nước ngoài, các cơ quan quản lý Nhà nước, các tổ chức,
                cá nhân trong quá trình giải quyết tranh chấp.
              </li>
              <li>
                Cử luật sư tranh tụng tại Tòa án, Trọng tài trong và ngoài nước
                để bảo vệ quyền lợi cho Khách hàng.
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-row justify-start items-start mt-9 gap-[30px]">
          {/* left */}
          <div className="w-[770px]">
            <p className="text-[#0000ff] text-[18px] mb-4">
              Kinh nghiệm ấn tượng của BASICO:
            </p>
            <p>
              Các luật sư của
              <strong>
                &nbsp;BA<span className="text-[#ff0000]">S</span>I
                <span className="text-[#ff0000]">CO </span>
              </strong>
              có mặt trong hầu hết các vụ án kinh tế lớn nhất tại Việt Nam trong
              thời gian qua:
            </p>
            <ul className="list-disc ml-7">
              <li>
                Đại án Huỳnh Thị Huyền Như lừa đảo ngân hàng, tổng giá trị cho
                vay hơn 4000 tỷ đồng: Luật sư
                <strong>
                  &nbsp;BA<span className="text-[#ff0000]">S</span>I
                  <span className="text-[#ff0000]">CO </span>
                </strong>
                tham gia bảo vệ quyền và lợi ích hợp pháp cho Ngân hàng TMCP Nam
                Việt, Công ty Cổ phần Chứng khoán Phương Đông và bào chữa cho
                một bị cáo là Giám đốc Quan hệ Khách hàng của ngân hàng..
              </li>
              <li>
                Đại án “Bầu” Kiên lừa đảo chiếm đoạt tài sản, kinh doanh trái
                phép, trốn thuế, cố ý làm trái quy định về quản lý kinh tế gây
                hậu quả nghiêm trọng: Luật sư
                <strong>
                  &nbsp;BA<span className="text-[#ff0000]">S</span>I
                  <span className="text-[#ff0000]">CO </span>
                </strong>
                tham gia bảo vệ quyền và lợi ích hợp pháp cho Ngân hàng TMCP Á
                Châu..
              </li>
              <li>
                Đại án nghìn tỷ tại VDB Đăk Lăk, Đắc Nông: Luật sư
                <strong>
                  &nbsp;BA<span className="text-[#ff0000]">S</span>I
                  <span className="text-[#ff0000]">CO </span>
                </strong>
                quản lý toàn bộ phương án tranh trụng từ giai đoạn tiền tố tụng
                cho đến kết thúc phiên tòa phúc thẩm, bảo vệ thành công và thu
                hồi số tiền hơn 529 tỷ đồng về cho Ngân hàng TMCP Phương Đông
                (OCB).
              </li>
              <li>
                Đại án VNCB với số tiền thiệt hại kỷ lục 9.000 tỷ đồng: Luật sư
                <strong>
                  &nbsp;BA<span className="text-[#ff0000]">S</span>I
                  <span className="text-[#ff0000]">CO </span>
                </strong>
                bào chữa cho ông Phạm Công Danh – nguyên Chủ tịch HĐQT Ngân hàng
                TMCP Xây dựng Việt Nam (VNCB).
              </li>
              <li>
                Thông qua việc cung cấp các dịch vụ luật sư nội bộ, dịch vụ tư
                vấn xử lý rủi ro cho các ngân hàng, BASICO đã tư vấn giải quyết
                hằng trăm vụ việc phát sinh rủi ro bất thường, ảnh hưởng đến sự
                an toàn tín dụng của ngân hàng;
              </li>
              <li>
                Luật sư của
                <strong>
                  &nbsp;BA<span className="text-[#ff0000]">S</span>I
                  <span className="text-[#ff0000]">CO </span>
                </strong>
                cũng thành công trong hàng loạt vụ án tranh chấp kinh doanh
                thương mại, bảo vệ thành công cho nhiều doanh nghiệp, tập đoàn
                của Việt Nam.
              </li>
            </ul>
          </div>
          {/* right */}
          <div className="w-[385px] mt-11">
            <Image
              src="/practices/Tranh-tung-1.png"
              alt=""
              width={355}
              height={211}
            />
            <Image
              src="/practices/tranhtung2.jpg"
              alt=""
              width={355}
              height={207}
            />
          </div>
        </div>
        <BasicoMayHelp />
      </div>
    </>
  );
};

export default page;
