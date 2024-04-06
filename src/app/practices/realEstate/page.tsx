import HeaderComponent from "@/components/header";
import BasicoMayHelp from "@/components/practices/basicoMayHelp";
import Image from "next/image";

const page = () => {
  return (
    <>
      <HeaderComponent
        title="LĨNH VỰC CHUYÊN MÔN"
        link=" Tư Vấn Bất Động Sản"
      />
      <div className="flex flex-col justify-center items-center bg-white text-black px-[366px] pt-16">
        <h1 className="text-3xl font-bold mb-9">Tư vấn bất động sản</h1>
        <div className="w-[1125px]">
          <p className="font-bold">
            <strong>
              &nbsp;BA<span className="text-[#ff0000]">S</span>I
              <span className="text-[#ff0000]">CO </span>
            </strong>
            là hãng luật tư vấn chuyên nghiệp của nhiều giao dịch lớn về bất
            động sản, xây dựng. Chúng tôi cung cấp các dịch vụ tư vấn chính về
            lĩnh vực này bao gồm:
          </p>
          <ul className="list-disc ml-7">
            <li>
              Tư vấn soạn thảo, đàm phán, ký kết các Hợp đồng hợp tác kinh doanh
              (BCC);
            </li>
            <li>
              Tư vấn soạn thảo, đàm phán, đại diện đàm phán với Cơ quan Nhà
              nước, ký kết các Hợp đồng xây dựng kinh doanh chuyển giao (BOT),
              Hợp đồng xây dựng chuyển giao kinh doanh (BTO), Hợp đồng xây dựng
              chuyển giao (BT), Hợp đồng tổng thầu thiết kế, cung ứng, xây dựng
              (EPC);
            </li>
            <li>
              Tư vấn các vấn đề pháp lý liên quan đến thủ tục đầu tư xây dựng
              công trình bất động sản, đăng ký, thẩm định thiết kế cơ sở Dự án
              đầu tư bất động sản;
            </li>
            <li>
              Tư vấn thành lập doanh nghiệp hoạt động trong lĩnh vực kinh doanh
              bất động sản, dịch vụ bất động sản và xây dựng;
            </li>
            <li>
              Tư vấn đánh giá tình trạng pháp lý của bất động sản, của đối tác
              liên kết đầu tư bất động sản;
            </li>
            <li>
              Tư vấn, soạn thảo, đàm phán các giao dịch chuyển nhượng Dự án,
              công trình, bất động sản. Thiết kế các giải pháp cho những giao
              dịch bất động sản, xây dựng đặc thù như chuyển nhượng các dự án
              khai khoáng… ;
            </li>
            <li>
              Tư vấn soạn thảo, đàm phán, ký kết các hợp đồng liên quan đến bất
              động sản có giá trị lớn;
            </li>
            <li>
              Tư vấn chính sách pháp lý và điều kiện đầu tư bất động sản, điều
              kiện cấp tín dụng, bảo đảm tiền vay, huy động vốn đối với Dự án
              bất động sản;
            </li>
            <li>Tư vấn tái cấu trúc tài chính cho dự án bất động sản;</li>
            <li>
              Phân tích ảnh hưởng chính sách pháp luật tác động đến môi trường
              kinh doanh bất động sản.
            </li>
          </ul>
        </div>

        <Image
          src="/practices/VanphongNgocThuy-1.jpg"
          alt=""
          width={1125}
          height={694}
          className="my-9"
        />

        <div className="w-[1125px]">
          <p className="font-bold mb-[10px]">
            Một số Dự án tiêu biểu có giá trị lớn đã được các Luật sư
            <strong>
              &nbsp;BA<span className="text-[#ff0000]">S</span>I
              <span className="text-[#ff0000]">CO </span>
            </strong>
            trực tiếp thiết kế và là người thương thuyết đàm phán chủ yếu cho
            giao dịch:
          </p>
          <ul className="list-disc ml-7">
            <li>
              Dự án tư vấn hợp tác liên doanh giữa Ngân hàng TMCP Quốc Tế Việt
              Nam (VIB) và Công ty Cơ Khí Ngô Gia Tự để đầu tư xây dựng và kinh
              doanh Tòa nhà VIBBank-NGT tại khu đất 16, Phan Chu Chinh, Hà Nội;
            </li>
            <li>
              Dự án tư vấn hợp tác đầu tư xây dựng và chuyển giao một phần diện
              tích Tòa nhà Sailing Tower 51 Nguyễn Thị Minh Khai, quận 1,TP Hồ
              Chí Minh giữa Ngân hàng TMCP Quốc Tế Việt Nam (VIB) và Tổng Công
              ty Xây dựng số 1 (CC1);
            </li>
            <li>
              Dự án tư vấn hợp tác đầu tư xây dựng và chuyển giao một phần diện
              tích Tòa nhà Sailing Tower 51 Nguyễn Thị Minh Khai, quận 1,TP Hồ
              Chí Minh giữa Công ty Cổ phần Chứng khoán Quốc Tế Việt Nam
              (VISecurities) và Tổng Công ty Xây dựng số 1 (CC1);
            </li>
            <li>
              Dự án tư vấn cho Công ty Dược phẩm Trung ương 1 trong quá trình
              hợp tác đầu tư với Công ty Cổ phần Đầu tư Phát triển Nhà
              Constrexim để xây dựng Khu nhà ở chung cư cao tầng Dược phẩm TW1;
            </li>
            <li>
              Dự án tư vấn cho giao dịch Hợp đồng hợp tác kinh doanh giữa
              Megaland Việt Nam và Constrexim 1 để đầu tư xây dựng Công trình
              Hỗn hợp HH1A và HH1B theo tiêu chuẩn toà nhà văn phòng hạng A tại
              Tây Mỗ, Từ Liêm, thành phố Hà Nội;
            </li>
            <li>Các Dự án tư vấn khác.</li>
          </ul>
        </div>
        <BasicoMayHelp />
      </div>
    </>
  );
};

export default page;
