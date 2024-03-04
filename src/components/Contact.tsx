import { Button } from "@nextui-org/react";
import Image from "next/image";
import {
  faUserGroup,
  faBalanceScaleLeft,
  faBookMedical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Contact = () => {
  return (
    <div className="flex lg:flex-row sm:flex-col justify-center bg-white p-16 ">
      <div className="p-4">
        <Image alt="" src="/lienhe.jpg" width={555} height={379} />
      </div>
      <div className="text-black m-3 text-xl" style={{ width: "555px" }}>
        <div className="pt-0 border-l-8 border-[#FF0004] p-5 mb-12 h-16">
          <h4>Làm việc với luật sư xuất sắc</h4>
          <h2 className="text-2xl font-bold pb-16">
            CÔNG TY LUẬT BASICO CHÀO MỪNG BẠN
          </h2>
        </div>
        <p className="mb-9">
          Với các luật sư và đội ngũ chuyên gia pháp lý rất giỏi, cùng nền tảng
          kinh nghiệm kiến thức đa dạng, phong phú, chúng tôi sẽ giúp được nhu
          cầu pháp lý hiện nay của bạn.
        </p>
        <div className="flex flex-row h-20 justify-between ">
          {/* 1 */}
          <div className="flex flex-row items-center">
            <FontAwesomeIcon
              icon={faUserGroup}
              className="size-16 text-[#FF0004]"
            />
            <p className="pl-3">Kinh nghiệm phong phú</p>
          </div>
          {/* 2 */}
          <div className="flex flex-row items-center">
            <FontAwesomeIcon
              icon={faBalanceScaleLeft}
              className="size-16 text-[#FF0004]"
            />
            <p className="pl-3">Kiến thức chuyên sâu</p>
          </div>
          {/* 3 */}
          <div className="flex flex-row items-center">
            <FontAwesomeIcon
              icon={faBookMedical}
              className="size-16 text-[#ff0004]"
            />
            <p className="pl-3">Giải pháp thực chất</p>
          </div>
        </div>
        <Button
          className="bg-white border border-[#ff0004] text-[#ff0004] hover:bg-[#ff0004] hover:text-white"
          radius="none"
        >
          LIÊN HỆ
        </Button>
      </div>
    </div>
  );
};

export default Contact;
