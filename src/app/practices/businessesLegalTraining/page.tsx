import HeaderComponent from "@/components/header";
import Image from "next/image";
import {
  specialists,
  professionalLegals,
  trainingPrograms,
  trainingPrograms2,
} from "@/lib/businessesLegalTraining";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
const page = () => {
  return (
    <>
      <HeaderComponent
        title="LĨNH VỰC CHUYÊN MÔN"
        link="Đào Tạo Pháp Lý Cho Doanh Nghiệp"
      />
      <div className="flex flex-col justify-center items-center mx-[374px] pt-16">
        <div className="text-3xl font-bold mb-9">
          Đào tạo pháp lý cho doanh nghiệp
        </div>
        <p>
          {" "}
          <strong>
            BA<span className="text-[#ff0000]">S</span>I
            <span className="text-[#ff0000]">CO </span>
          </strong>{" "}
          cùng với Công ty Cổ phần Đào tạo Nghiệp vụ Ngân hàng SBankTraining
          triển khai các chương trình đào tạo nghiệp vụ pháp lý cho các ngân
          hàng, định chế tài chính và doanh nghiệp.
        </p>
        <p className="pr-56">
          Các sản phẩm đào tạo luôn bao gồm tổng quan kiến thức pháp lý, các kỹ năng pháp lý và các kinh nghiệm pháp lý cần thiết.
        </p>
        <p>
          Qua mỗi năm đều có hàng nghìn lượt học viên tham gia các khóa học lý
          thú và được đồng cấp chứng nhận tham gia khóa học bởi BASICO và
          SBankTraining.
        </p>

        <Image
          src="/practices/daotaophaplyDN2.jpg"
          alt=""
          width={1125}
          height={532}
        />

        <div className="grid grid-cols-2 justify-start w-full ml-12">
          {/* left */}
          <div>
            <p className="font-bold my-4">
              Nhóm sản phẩm đào tạo về pháp lý nghiệp vụ ngân hàng:
            </p>
            <ul style={{ listStyleType: "unset" }} className="ml-10 ">
              {specialists.map((specialist) => (
                <Link
                  key={specialist.name}
                  href={specialist.link}
                  rel="noopener"
                >
                  <li className="hover:text-[#FF0004]">{specialist.name}</li>
                </Link>
              ))}
            </ul>
            <Image
              src="/practices/dao20tao2011.jpg"
              alt=""
              width={547}
              height={394}
            />
          </div>
          {/* right */}
          <div>
            <p className="font-bold my-4">
              Nhóm sản phẩm đào tạo về pháp lý nghiệp vụ trong kinh doanh:
            </p>
            <ul className="list-disc ml-10">
              {professionalLegals.map((professional) => (
                <Link
                  key={professional.name}
                  rel="noopener"
                  href={professional.link}
                >
                  <li>{professional.name}</li>
                </Link>
              ))}
            </ul>
            <Image
              src="/practices/daotao_DN1.jpg"
              alt=""
              width={547}
              height={528}
            />
          </div>
        </div>

        <h2 className="text-3xl font-bold my-9">
          Công ty Cổ phần Đào tạo Nghiệp vụ Ngân hàng
        </h2>

        <Image src="/SBankTraining.png" alt="" width={245} height={300} />
        <h2 className="my-4 text-[26px] font-bold">
          Dựng nền tảng nghề nghiệp!
        </h2>
        <h3 className="text-[22px]">www.sbanktraining.edu.vn</h3>

        {/* training program */}
        <div className="px-15 mt-11 mb-6 w-[950px]">
          <h1 className="flex justify-center text-3xl font-bold mb-9">
            <strong>
              &nbsp;BA<span className="text-[#ff0000]">S</span>I
              <span className="text-[#ff0000]">CO&nbsp;</span>
            </strong>
            có thể giúp bạn
          </h1>
          <div className="grid grid-cols-2 justify-start items-start bg-[#f1f1f1f1] p-11">
            <ul style={{ listStyleType: "" }}>
              {trainingPrograms.map((item, index) => (
                <li
                  key={index}
                  className="flex flex-row mb-3 hover:text-[#FF0004]"
                >
                  <FontAwesomeIcon
                    icon={faFileAlt}
                    className="size-4 text-[#FF0004] mr-2"
                  />
                  {item.text}
                </li>
              ))}
            </ul>
            {/* 2 */}
            <ul className="px-4">
              {trainingPrograms2.map((item, index) => (
                <li
                  key={index}
                  className="flex flex-row mb-3 px-4 hover:text-[#FF0004]"
                >
                  <FontAwesomeIcon
                    icon={faFileAlt}
                    className="size-4 text-[#FF0004] mr-2"
                  />
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
