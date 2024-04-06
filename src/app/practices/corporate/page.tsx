import HeaderComponent from "@/components/header";
import BasicoMayHelp from "@/components/practices/basicoMayHelp";
import Image from "next/image";

const page = () => {
  return (
    <>
      <HeaderComponent
        title="LĨNH VỰC CHUYÊN MÔN"
        link="Dịch Vụ Pháp Lý Doanh Nghiệp"
      />
      <div className="flex flex-col justify-center items-center pt-16">
        <div className="text-3xl font-bold mb-9">
          Dịch vụ pháp lý Doanh nghiệp
        </div>
        <div className="grid grid-cols-2 px-[374px] gap-[30px]">
          {/* left */}
          <div>
            <p className="mb-9 text-[17px]">
              Từ thực tiễn môi trường kinh doanh,{" "}
              <strong>
                BA<span className="text-[#ff0000]">S</span>I
                <span className="text-[#ff0000]">CO </span>
              </strong>{" "}
              đã phát triển và cung cấp tới các tập đoàn, doanh nghiệp Việt Nam
              và doanh nghiệp nước ngoài hơn 50 nhóm dịch vụ pháp lý thuộc các
              lĩnh vực như: Tư vấn đầu tư; tư vấn quản trị doanh nghiệp; tư vấn
              tái cấu trúc doanh nghiệp; tư vấn quản lý tài chính doanh nghiệp;
              tư vấn quản trị lao động; tư vấn quản lý văn bản doanh nghiệp; tư
              vấn các hợp đồng, giao dịch; tư vấn xử lý bất thường trong hoạt
              động kinh doanh và các dịch vụ pháp lý khác cho doanh nghiệp.
            </p>
            <Image
              src="/about.jpg"
              alt=""
              width={547}
              height={365}
              className="mb-[30px]"
            />
            <p className="mb-[10px]">
              Với kinh nghiệm và trình độ chuyên môn sâu trong các lĩnh vực pháp
              luật và kinh doanh của các Luật sư,{" "}
              <strong>
                BA<span className="text-[#ff0000]">S</span>I
                <span className="text-[#ff0000]">CO </span>
              </strong>{" "}
              có nhiều kinh nghiệm sát cánh cùng các doanh nghiệp, là đối tác
              tin cậy của nhiều doanh nghiệp và nhà đầu tư hàng đầu tại Việt
              Nam.
            </p>
            <p className="mb-[10px]">
              Một số dự án đa dạng trong các lĩnh vực được giới thiệu để ghi
              nhận giá trị gia tăng của chúng tôi dành cho Khách hàng:
            </p>
            <ul style={{ listStyleType: "unset" }}>
              <li>
                Dự án Tư vấn hoàn thiện cơ cấu tổ chức và nghiệp vụ kinh doanh
                cho Công ty Cổ phần Quản lý quỹ Đầu tư Đỏ (Red Capital);
              </li>
              <li>
                Dự án Tư vấn xây dựng hệ thống mẫu biểu kinh doanh bảo hiểm cho
                Công ty Cổ phần Bảo hiểm Quân đội (MIC);
              </li>
              <li>
                Dự án tư vấn cho Tổng Công ty Cổ phần Bảo hiểm Toàn Cầu (GIC)
                trả bảo hiểm cho người thụ hưởng liên quan đến dự án thủy điện
                Sông Bung 2, tỉnh Quảng Nam;
              </li>
              <li>
                Dự án Tư vấn hoàn thiện mẫu hợp đồng giao dịch và hệ thống quy
                trình nghiệp vụ cho Công ty Cổ phần Chứng khoán YUANTA Việt Nam;
              </li>
              <li>
                Dự án Tư vấn tái cấu trúc và xây dựng Hệ thống tổng thể các quy
                trình nghiệp vụ cho Công ty Cổ phần Chứng khoán Globalmind
                Capital;
              </li>
            </ul>
          </div>
          {/* right */}
          <div>
            <ul style={{ listStyleType: "unset" }}>
              <li>
                Dự án tư vấn Định chế hóa quản trị điều hành Công ty TNHH Chứng
                khoán CIMB – Vinashin (CIMB-Vinashin);
              </li>
              <li>
                Dự án Tư vấn định chế hóa các vấn đề cơ cấu tổ chức Bộ máy điều
                hành của Công ty Cổ phần Chứng khoán Châu Á (ASC);
              </li>
              <li>
                Dự án tư vấn tái cấu trúc chi tiết và hoàn thiện cơ chế pháp lý
                quản trị điều hành cho CTCP Quốc tế Sơn Hà (Tập đoàn Sơn Hà);
              </li>
              <li>
                Dự án xây dựng Đề án chiến lược phát triển đến năm 2017, tầm
                nhìn đến năm 2022 cho Viện Thiết kế, Bộ Quốc phòng (DCCD);
              </li>
              <li>
                Dự án tư vấn định chế hóa bộ máy quản trị điều hành cho Công ty
                Cổ phần Du lịch và Thương mại Dân Chủ (chủ sở hữu khách sạn 5
                sao Hotel de L’Opera Ha Noi);
              </li>
              <li>
                Dự án tư vấn tái cấu trúc chi tiết và hoàn thiện cơ chế pháp lý
                quản trị điều hành, nghiệp vụ cho Công ty Cổ phần Mạng thanh
                toán VINA (PAYNET);
              </li>
              <li>
                Dự án tư vấn Quản lý chi phí lao động hợp lý, hợp pháp cho Công
                ty Cổ phần Phát triển Hạ tầng Khu Công nghiệp Tây Ninh (INDECO);
              </li>
              <li>
                Tư vấn Công ty Cổ phần Đầu tư Sao Phương Nam trong giao dịch cho
                vay hợp vốn nhằm phục vụ nhu cầu đầu tư dự án resort;
              </li>
              <li>
                Tư vấn giao dịch phát hành trái phiếu của Tập đoàn Đất Xanh; Tập
                đoàn FLC.
              </li>
              <li>Và nhiều dự án khác.</li>
            </ul>
            <p className="flex justify-center mb-[10px]">
              Slogan đã gắn liền hoạt động và sự phát triển của
              <strong>
                &nbsp;BA<span className="text-[#ff0000]">S</span>I
                <span className="text-[#ff0000]">CO&nbsp;</span>
              </strong>
              là
            </p>
            <p className="font-bold flex justify-center mb-9">
              “Dựng nền tảng doanh nghiệp!”
            </p>
            <Image
              src="/practices/toadam_ls_Hai.jpg"
              alt=""
              width={547}
              height={357}
              className="mb-[30px]"
            />
            <p className="px-4 italic">
              Luật sư Trần Minh Hải, Giám đốc Điều hành
              <strong>
                &nbsp;BA<span className="text-[#ff0000]">S</span>I
                <span className="text-[#ff0000]">CO&nbsp;</span>
              </strong>
              nói chuyện với các doanh nhân trong Buổi Tọa đàm về Luật Doanh
              nghiệp 2014
            </p>
          </div>
        </div>
        <div className="flex justify-center p-[10px] text-[17px] mt-5 bg-[#f7dfcd] w-[1190px]">
          Với kinh nghiệm và trình độ chuyên môn sâu của mình,
          <strong>
            &nbsp;BA<span className="text-[#ff0000]">S</span>I
            <span className="text-[#ff0000]">CO&nbsp;</span>
          </strong>
          là đối tác tư vấn tin cậy của cộng đồng doanh nghiệp tại Việt Nam
        </div>

        <BasicoMayHelp />
      </div>
    </>
  );
};

export default page;
