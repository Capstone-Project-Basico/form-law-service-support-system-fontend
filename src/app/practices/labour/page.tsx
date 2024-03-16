import HeaderComponent from "@/components/header";
import BasicoMayHelp from "@/components/practices/basicoMayHelp";
import Image from "next/image";

const page = () => {
  return (
    <>
      <HeaderComponent title="LĨNH VỰC CHUYÊN MÔN" link="Lao Động" />
      <div className="flex flex-col justify-center items-center bg-white text-black px-[366px] ">
        <h1 className="text-3xl font-bold mb-9">Lao động</h1>
        <p className="w-[1125px] font-bold">
          Quản trị lao động hiệu quả đóng vai trò là một trong những nhân tố
          chính quyết định sự thành công đối với các doanh nghiệp. Tuy nhiên,
          đây lại là một hoạt động phức tạp và thực tế phát sinh nhiều vướng mắc
          pháp lý.
        </p>

        <Image
          src="/practices/cap-lam-viec.jpg"
          alt=""
          width="1125"
          height="725"
          className="my-9"
        />
        <div className="w-[1125px] mb-9">
          <p className="mb-[10px]">
            <strong>
              &nbsp;BA<span className="text-[#ff0000]">S</span>I
              <span className="text-[#ff0000]">CO </span>
            </strong>
            cung cấp dịch vụ pháp lý toàn diện giúp doanh nghiệp quản lý được
            rủi ro trong quá trình sử dụng nhân sự. Chúng tôi giúp nhiều doanh
            nghiệp chuẩn hóa các quy định, quy trình về quản trị lao động, quản
            lý các thỏa thuận về lao động, đào tạo nghề, quản lý các chính sách
            về tiền thưởng, cổ phiếu thưởng. Chúng tôi cũng giúp các doanh
            nghiệp xử lý dứt điểm thành công các tranh chấp lao động trong công
            ty.
          </p>
          <p>
            <strong>
              &nbsp;BA<span className="text-[#ff0000]">S</span>I
              <span className="text-[#ff0000]">CO </span>
            </strong>
            đã triển khai hàng loạt dự án tư vấn về quản lý lao động cho Khách
            hàng là các hệ thống ngân hàng, các định chế tài chính, các công ty
            chứng khoán, các tập đoàn lớn, các doanh nghiệp các định chế tài
            chính, doanh nghiệp như: Ngân hàng TMCP Phương Đông (OCB), Ngân hàng
            TMCP Á Châu (ACB), Công ty Cổ phần Chứng khoán TP Hồ Chí Minh (HSC),
            Tập đoàn Quốc Tế Sơn Hà, Công ty Cổ phần Phát triển Hạ tầng Khu Công
            nghiệp Tây Ninh, Công ty Cổ phần Đầu tư Sản xuất Lê Trần,..
          </p>
        </div>
        <div className="w-[1125px] flex flex-col justify-start items-start">
          <p className="flex justify-center items-start font-bold mb-[10px]">
            <strong>
              &nbsp;BA<span className="text-[#ff0000]">S</span>I
              <span className="text-[#ff0000]">CO </span>
            </strong>
            có rất nhiều kinh nghiệm trong tư vấn pháp lý quản lý lao động qua
            việc triển khai các dự án tư vấn đa dạng:
          </p>
          <ul className="list-disc ml-7">
            <li>
              Dự án Tư vấn thiết kế mẫu Hợp đồng lao động cho nhiều ngân hàng,
              tập đoàn và doanh nghiệp;
            </li>
            <li>
              Dự án Tư vấn soạn thảo, đăng ký Nội quy lao động, Thỏa ước lao
              động tập thể cho nhiều ngân hàng, tập đoàn và doanh nghiệp;
            </li>
            <li>
              Dự án Tư vấn soạn thảo Quy chế tiền lương, Quy chế nhân viên, hệ
              thống các quy định, quy trình khác về quản lý nhân sự trong doanh
              nghiệp cho nhiều ngân hàng, tập đoàn và doanh nghiệp;
            </li>
            <li>
              Dự án Tư vấn xây dựng Quy chế phân cấp quản lý nội bộ đối với các
              chức danh quản lý, điều hành doanh nghiệp cho nhiều ngân hàng, tập
              đoàn và doanh nghiệp…
            </li>
            <li>
              Dự án Tư vấn quản lý chi phí lao động hợp lý hợp pháp cho nhiều
              ngân hàng, tập đoàn và doanh nghiệp;
            </li>
            <li>
              Các vụ việc xử lý kỷ luật lao động và giải quyết tranh chấp lao
              động cho nhiều cho nhiều ngân hàng, tập đoàn và doanh nghiệp…
            </li>
          </ul>
        </div>
        <BasicoMayHelp />
      </div>
    </>
  );
};

export default page;
