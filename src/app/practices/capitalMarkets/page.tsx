import HeaderComponent from "@/components/header";
import BasicoMayHelp from "@/components/practices/basicoMayHelp";
import Image from "next/image";
import { customers } from "@/lib/customers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
const page = () => {
  return (
    <>
      <HeaderComponent
        title="LĨNH VỰC CHUYÊN MÔN"
        subTitle=""
        link="Thị Trường Vốn"
      />
      <div className="flex flex-col justify-center items-center bg-white text-black pt-[82px] mx-[374px]">
        <h2 className="text-3xl font-bold mb-9">Thị trường vốn </h2>
        <div className="grid grid-cols-2 gap-[30px]">
          {/* left div */}
          <div className="">
            <p>
              Trong lĩnh vực thị trường vốn,
              <strong>
                &nbsp;BA<span className="text-[#ff0000]">S</span>I
                <span className="text-[#ff0000]">CO </span>
              </strong>{" "}
              có thế mạnh về đội ngũ Luật sư, chuyên gia pháp lý, chuyên gia
              kinh tế.
            </p>
            <p>
              Với các lợi thế về chuyên môn và kinh nghiệm của mình,
              <strong>
                &nbsp;BA<span className="text-[#ff0000]">S</span>I
                <span className="text-[#ff0000]">CO </span>
              </strong>{" "}
              chú trọng cung cấp các dịch vụ pháp lý toàn diện trên thị trường
              vốn tại Việt Nam
            </p>
            <Image
              src="/practices/thitruongvon3.jpg"
              alt=""
              width={547}
              height={518}
            />
            <h2 className="font-bold">
              <strong>
                &nbsp;BA<span className="text-[#ff0000]">S</span>I
                <span className="text-[#ff0000]">CO </span>
              </strong>
              chú trọng cung cấp các dịch vụ pháp lý chính dưới đây:
            </h2>
            <ul style={{ listStyleType: "unset" }}>
              <li>
                Tư vấn Dự án cổ phần hóa doanh nghiệp Nhà nước; dự án phát hành
                cổ phiếu, trái phiếu, trái phiếu chuyển đổi; dự án phát hành
                chứng khoán ra công chúng;
              </li>
              <li>
                Tư vấn quy trình và giải pháp toàn diện trong việc định giá lại
                tài sản doanh nghiệp;
              </li>
              <li>
                Tư vấn các giao dịch mua bán cổ phần có giá trị lớn giữa các
                doanh nghiệp, doanh nhân, định chế tài chính;
              </li>
              <li>
                Tư vấn các giao dịch mua bán chứng khoán nợ và các sản phẩm
                chứng khoán phái sinh giữa các doanh nghiệp, doanh nhân, định
                chế tài chính;
              </li>
              <li>
                Tư vấn bảo vệ và xử lý các vướng mắc pháp lý cho các nhà đầu tư
                trên thị trường chứng khoán;
              </li>
              <li>
                Tư vấn quy trình và giải pháp toàn diện cho các hình thức đầu tư
                vốn nhàn rỗi có thời hạn từ nước ngoài vào Việt Nam;
              </li>
              <li>
                Tư vấn thường xuyên cho hoạt động của các quỹ đầu tư, công ty
                quản lý quỹ;
              </li>
              <li>
                Tư vấn các giải pháp nâng cao khả năng quản trị thực tế của các
                quỹ đầu tư trong các doanh nghiệp, dự án mục tiêu;
              </li>
              <li>
                Tư vấn cho nhà đầu tư giải quyết các tranh chấp hợp đồng dịch vụ
                với các công ty chứng khoán (không nằm trong danh sách xung đột
                quyền lợi – thuộc nhóm công ty mà BASICO cung cấp dịch vụ Luật
                sư nội bộ).
              </li>
              <li>
                Dịch vụ pháp lý cho công ty Chứng khoán, công ty Quản lý Quỹ
              </li>
              <li>Kiện tụng về Chứng khoán</li>
            </ul>
          </div>
          {/* right div */}
          <div>
            <p>
              Hằng năm, BASICO tư vấn thành công cho hàng loạt giao dịch phát
              hành trái phiếu giá trị lớn của các tập đoàn, doanh nghiệp. Đây là
              thế mạnh của BASICO do hãng luật chúng tôi luôn nhận được sự tin
              cậy đặc biệt từ các định chế tài chính trên thị trường vốn Việt
              Nam. Dưới đây là những khách hàng tiêu biểu của hãng luật chúng
              tôi:
            </p>
            <ul className="list-disc">
              {customers.map((customer) => (
                <li
                  key={customer.name}
                  className="flex flex-cow items-center gap-3"
                >
                  <FontAwesomeIcon icon={faCircle} className="w-2 h-2" />
                  {customer.name}
                  <Image
                    src={customer.src}
                    alt={customer.alt}
                    width={60}
                    height={40}
                  />
                </li>
              ))}
            </ul>
            <Image
              src="/practices/thitruongvon-1.jpg"
              alt=""
              width={547}
              height={518}
            />
          </div>
        </div>
        <BasicoMayHelp />
      </div>
    </>
  );
};

export default page;
