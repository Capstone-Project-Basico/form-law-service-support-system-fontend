import HeaderComponent from "@/components/header";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GoogleMaps } from "@/components/ui/GoogleMaps";

const page = () => {
  return (
    <>
      <HeaderComponent
        title="LIÊN HỆ VỚI CHÚNG TÔI"
        subTitle="BASICO đồng hành với quý khách hàng xây dựng nền tảng kinh doanh bền vững."
        link="Liên Hệ"
      />
      <div className="flex flex-col justify-center items-center bg-white text-black px-[366px]">
        <h1 className="text-2xl font-bold mb-11">
          CÔNG TY LUẬT TNHH NGÂN HÀNG - CHỨNG KHOÁN - ĐẦU TƯ
        </h1>
        <div className="flex flex-row gap-[30px]">
          {/* left */}
          <div>
            <div>
              <h2 className="text-[22px] w-[750px] mt-[25px] mb-[15px]">
                <strong>
                  BA<span className="text-[#ff0000]">S</span>I
                  <span className="text-[#ff0000]">CO </span>
                </strong>{" "}
                HÀ NỘI
              </h2>
              <p className="mb-[15px]">
                <strong>Địa chỉ: </strong>
                Số 286, Phố Ngọc Thụy, Phường Ngọc Thụy, Quận Long Biên, Hà Nội.
              </p>
              <p className="mb-[15px]">
                <strong>ĐT: </strong> 024-3732.6646
              </p>
              <p className="mb-[15px]">
                <strong>E-mail: </strong> anh.nn@basico.com.vn
              </p>
            </div>
            <div>
              <h2 className="text-[22px] w-[750px] mt-[25px] mb-[15px]">
                <strong>
                  BA<span className="text-[#ff0000]">S</span>I
                  <span className="text-[#ff0000]">CO </span>
                </strong>{" "}
                SÀI GÒN
              </h2>
              <p className="mb-[15px]">
                <strong>Địa chỉ: </strong>
                2.01 – 2.02, Cao ốc GALAXY, số 09, Nguyễn Khoái, Phường 1, Quận
                4, TP Hồ Chí Minh
              </p>
              <p className="mb-[15px]">
                <strong>ĐT: </strong> 028-3826.8343
              </p>
              <p className="mb-[15px]">
                <strong>E-mail: </strong> hai.tm@basico.com.vn
              </p>
            </div>

            <Button
              className="bg-white border border-[#FF0004] text-[#FF0004] hover:bg-[#FF0004] hover:text-[#FF0004]"
              radius="none"
            >
              GỬI YÊU CẦU
              <FontAwesomeIcon icon={faAngleRight} className="size-4 ml-1" />
            </Button>
          </div>
          {/* right */}
          <div>
            <Image
              src="/contact/Galaxy-9-Building.jpg"
              alt=""
              width={360}
              height={423}
            />
          </div>
        </div>
        <p className="pt-[50px] text-[70px]">
          <strong>
            BA<span className="text-[#ff0000]">S</span>I
            <span className="text-[#ff0000]">CO </span>
          </strong>
        </p>
        <p className="text-2xl pt-[30px] pb-[30px]">
          Dựng nền tảng doanh nghiệp!
        </p>

        <GoogleMaps />
      </div>
    </>
  );
};

export default page;
