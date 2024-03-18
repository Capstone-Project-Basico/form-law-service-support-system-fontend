import HeaderComponent from "@/components/header";
import BasicoMayHelp from "@/components/practices/basicoMayHelp";
import Image from "next/image";

const page = () => {
  return (
    <>
      <HeaderComponent title="LĨNH VỰC CHUYÊN MÔN" link="Tư Vấn M&A" />
      <div className="flex flex-col justify-center items-center bg-white text-black px-[366px] ">
        <h1 className="text-3xl font-bold">Tư vấn M&A</h1>
        <p className="w-[1125px] my-9">
          Khi tư vấn cho các tập đoàn, doanh nghiệp, doanh nhân lớn trong các
          giao dịch mua bán, sáp nhập doanh nghiệp, chúng tôi luôn chú trọng đến
          yếu tố chiến lược của các giải pháp tư vấn nhằm bảo đảm cho Khách hàng
          của mình sẽ đạt được các mục tiêu tức thì và tiếp tục có những lợi
          thế, tiềm năng dài hạn về quản trị doanh nghiệp, quản lý tài chính,
          quản lý tài sản.
        </p>
        <Image
          src="/practices/Tuvan_MA2.jpg"
          alt=""
          width={1125}
          height={698}
          className="mb-[30px]"
        />
        <div className="grid grid-cols-2 w-[1125px] gap-[30px]">
          {/* left */}
          <div>
            <p className="pb-[10px]">
              Trong lĩnh vực này, các dịch vụ tư vấn chủ yếu của
              <strong>
                &nbsp;BA<span className="text-[#ff0000]">S</span>I
                <span className="text-[#ff0000]">CO </span>
              </strong>
              dành cho Khách hàng bao gồm:
            </p>
            <ul className="list-disc pl-7 pb-9">
              <li>Tư vấn tìm kiếm đối tác M&A;</li>
              <li>Tư vấn đánh giá pháp lý M&A;</li>
              <li>
                Tư vấn, soạn thảo, đàm phán Hợp đồng và các tài liệu trong giao
                dịch mua bán, chuyển nhượng cổ phần, phần vốn góp;
              </li>
              <li>
                Tư vấn nắm quyền quản trị, điều hành doanh nghiệp mục tiêu cho
                các doanh nhân;
              </li>
              <li>
                Tư vấn, soạn thảo, đàm phán tài liệu giao dịch cho các mục tiêu
                thâu tóm quyền quản trị, điều hành doanh nghiệp.
              </li>
            </ul>
            <p className="mb-[10px]">
              Một số dự án tiêu biểu đại diện những lĩnh vực phát sinh giao dịch
              M&A mà
              <strong>
                &nbsp;BA<span className="text-[#ff0000]">S</span>I
                <span className="text-[#ff0000]">CO </span>
              </strong>
              và các Luật sư của chúng tôi đã tiến hành:
            </p>
            <ul className="list-disc pl-7">
              <li>
                Giao dịch M&A giữa một ngân hàng và một doanh nghiệp Nhà nước cổ
                phần hóa để hợp tác đầu tư xây dựng Tòa nhà CornerStone, 16 Phan
                Chu Trinh, Hoàn Kiếm, Hà Nội;
              </li>
              <li>
                Giao dịch M&A giữa một Công ty Tài chính với một Công ty Bất
                động sản cho Dự án hợp tác đầu tư xây dựng Toà nhà D2 Giảng Võ,
                phường Giảng Võ, quận Ba Đình, Hà Nội;
              </li>
              <li>
                Giao dịch M&A Dự án hợp nhất giữa Công ty cổ phần chứng khoán
                Đại Tây Dương (OSC) và Công ty cổ phần Chứng khoán Quốc tế
                (VIS);
              </li>
              <li>
                Giao dịch M&A chuyển nhượng cổ phần trọng yếu giữa các cổ đông
                trọng yếu của Ngân hàng Phát triển TP Hồ Chí Minh (HDBank);
              </li>
            </ul>
          </div>
          {/* right */}
          <div>
            <ul style={{ listStyleType: "unset" }} className="ml-7 mb-9">
              <li>
                Giao dịch M&A chào bán cổ phần trọng yếu cho Nhà đầu tư chiến
                lược của Ngân hàng TMCP Phương Đông (OCB);
              </li>
              <li>
                Giao dịch M&A chuyển nhượng cổ phần trọng yếu giữa các cổ đông
                trọng yếu của Ngân hàng TMCP Quốc Tế Việt Nam (VIB);
              </li>
              <li>
                Dự án tư vấn chuyển nhượng vốn góp tại Công ty Tài chính TNHH
                Một thành viên Công nghiệp Tàu thủy (VFC);
              </li>
              <li>
                Dự án tư vấn mua lại cổ phần của cổ đông làm cổ phiếu quỹ cho
                Công ty Cổ phần Quản lý Quỹ Đầu tư Việt Nam (VFM);
              </li>
              <li>
                Nhiều giao dịch M&A chuyển nhượng công ty mục tiêu là các doanh
                nghiệp Nhà nước cổ phần hóa, công ty cổ phần, công ty 100% vốn
                nước ngoài
              </li>
            </ul>
            <Image src="/yeucauhotro.jpg" alt="" width={547} height={338} />
          </div>
        </div>
        <BasicoMayHelp />
      </div>
    </>
  );
};

export default page;
