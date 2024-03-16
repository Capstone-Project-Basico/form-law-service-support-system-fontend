import HeaderComponent from "@/components/header";
import BasicoMayHelp from "@/components/practices/basicoMayHelp";
import Image from "next/image";

const page = () => {
  return (
    <>
      <HeaderComponent title="LĨNH VỰC CHUYÊN MÔN" link="Sở Hữu Trí Tuệ" />
      <div className="flex flex-col justify-center items-center bg-white text-black px-[366px] ">
        <h1 className="text-3xl font-bold mb-9">Sở hữu trí tuệ</h1>
        <p className="w-[1125px]">
          Trong lĩnh vực sở hữu trí tuệ,
          <strong>
            &nbsp;BA<span className="text-[#ff0000]">S</span>I
            <span className="text-[#ff0000]">CO </span>
          </strong>
          cung cấp đến Khách hàng các dịch vụ tư vấn toàn diện cho các đối tượng
          của quyền sở hữu công nghiệp và quyền tác giả.
        </p>
        <Image
          src="/gia-sach-lo-hoa.jpg"
          alt=""
          width={1125}
          height={713}
          className="my-9"
        />
        <div className="w-[1125px]">
          <h2 className="text-[19px] font-bold mb-[10px]">
            Các dịch vụ bao gồm:
          </h2>
          <ul className="list-disc ml-7">
            <li>
              Tư vấn về khả năng được bảo hộ, đăng ký của những đối tượng sở hữu
              công nghiệp và tác phẩm;
            </li>
            <li>
              Tra cứu, cung cấp thông tin liên quan vê đối tượng đăng ký bảo hộ;
            </li>
            <li>Hoàn thiện hồ sơ và tiến hành các thủ tục đăng ký bảo hộ;</li>
            <li>Tư vấn về hiệu lực của văn bằng bảo hộ;</li>
            <li>
              Tư vấn soạn thảo, đàm phán các hợp đồng li-xăng, hợp đồng chuyển
              giao công nghệ, chuyển nhượng quyền sở hữu các đối tượng sở hữu
              trí tuệ;
            </li>
            <li>
              Các dịch vụ về Nhãn hiệu, Nhãn hiệu Tập thể, Tên gọi Xuất xứ và
              chỉ dẫn địa lý;
            </li>
            <li>
              Tư vấn và hỗ trợ khách hàng xây dựng chiến lược phát triển nhãn
              hiệu, thương hiệu;
            </li>
            <li>
              Tư vấn và hỗ trợ khách hàng thực hiện các chiến dịch quảng bá,
              khuyếch trương nhãn hiệu, thương hiệu;
            </li>
            <li>
              Định giá tài sản sở hữu trí tuệ trong các hoạt động chuyển nhượng,
              chuyển giao, góp vốn, cổ phần hoá, thanh lý, phá sản;
            </li>
            <li>Các dịch vụ pháp lý khác về sở hữu trí tuệ.</li>
          </ul>
        </div>
        <p className="my-9">
          Các luật sư của
          <strong>
            &nbsp;BA<span className="text-[#ff0000]">S</span>I
            <span className="text-[#ff0000]">CO </span>
          </strong>
          nhận thức rằng, bất cứ doanh nghiệp nào để tồn tại và phát triển đều
          cần bảo vệ được thương hiệu và những tài sản sở hữu trí tuệ của mình
          trên thị trường. Thông tin làm cơ sở cho mỗi khách hàng nhận biết về
          dịch vụ, về sản phẩm, về tài sản sở hữu trí tuệ của doanh nghiệp và về
          chính doanh nghiệp là tài sản quý giá của mỗi doanh nghiệp. Đó cũng là
          đối tượng xâm hại của những hành vi cạnh tranh bất hợp pháp trên thị
          trường, gây thiệt hại cho các doanh nghiệp có tài sản thuộc sở hữu trí
          tuệ.
        </p>
        <p>
          Với đội ngũ luật sư tranh tụng đầy năng lực, kinh nghiệm và uy tín nổi
          trội,
          <strong>
            &nbsp;BA<span className="text-[#ff0000]">S</span>I
            <span className="text-[#ff0000]">CO </span>
          </strong>
          là hãng luật được nhiều Khách hàng tin cậy trong việc cung cấp dịch vụ
          pháp lý giải quyết tranh chấp, xử lý vi phạm bản quyền về sở hữu trí
          tuệ.
        </p>

        <BasicoMayHelp />
      </div>
    </>
  );
};

export default page;
