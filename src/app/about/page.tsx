import HeaderComponent from "@/components/header";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard, faBusinessTime } from "@fortawesome/free-solid-svg-icons";
import { faAngellist } from "@fortawesome/free-brands-svg-icons";

const page = () => {
  return (
    <>
      <HeaderComponent
        title="GIỚI THIỆU"
        subTitle="BASICO là hãng Luật đã thành danh trong lĩnh vực Ngân hàng, Chứng khoán và Đầu tư."
        link="Giới Thiệu"
      />
      <div className=" text-black py-[100px] mx-[366px]">
        {/* Về BASICO */}
        <div className="grid grid-cols-2 ">
          <div className="px-4">
            <div className="font-bold text-[26px] border-l-5 border-[#FF0004] pl-5 mb-11">
              Về BASICO
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="pb-9">
                <strong>
                  BA<span className="text-[#ff0000]">S</span>I
                  <span className="text-[#ff0000]">CO </span>
                </strong>
                là tên giao dịch, được trích xuất từ tên gọi “
                <strong>BA</strong>
                NKING –
                <strong>
                  <span className="text-[#ff0000]">&nbsp;S</span>
                </strong>
                ECURITIES – <strong>I</strong>
                NVESTMENT LAW
                <strong>
                  <span className="text-[#ff0000]">CO</span>
                </strong>
                MPANY”.
                <strong>
                  &nbsp;BA<span className="text-[#ff0000]">S</span>I
                  <span className="text-[#ff0000]">&nbsp;CO </span>
                </strong>
                được thành lập từ tháng 7 năm 2008 với ý chí và tâm huyết của
                những luật sư chuyên nghiệp về lĩnh vực ngân hàng.
              </div>
              <Image
                src="/about.jpg"
                alt="about"
                width={555}
                height={370}
                className="mb-8"
              />
              <div className="font-bold text-[22px] mb-3">
                MỤC TIÊU CỦA{" "}
                <strong>
                  BA<span className="text-[#ff0000]">S</span>I
                  <span className="text-[#ff0000]">CO </span>
                </strong>
              </div>
              <div className="text-[16px]">
                <strong>1. </strong> Trở thành sự lựa chọn số 1 trong việc cung
                cấp các dịch vụ tư vấn pháp lý, giải pháp pháp lý toàn diện cho
                các ngân hàng, công ty chứng khoán và các định chế tài chính.
              </div>
              <div className="text-[16px]">
                <strong>2. </strong> Trở thành sự lựa chọn hiển nhiên của cộng
                đồng doanh nghiệp trong việc cung cấp các dịch vụ pháp lý, giúp
                doanh nghiệp có nền tảng pháp lý vững chắc trong thiết lập cơ
                cấu tổ chức, hoạt động nghiệp vụ, giao dịch kinh doanh phù hợp
                với Pháp luật và chuẩn mực quốc tế.
              </div>
            </div>
          </div>
          {/* 2 */}
          <div className="px-4 ">
            <div className="bg-[#dd3333] font-bold text-white text-[22px] py-5 px-[30px] mt-[70px] mb-9 leading-8">
              BASICO LÀ HÃNG LUẬT ĐÃ THÀNH DANH TRONG LĨNH VỰC NGÂN HÀNG, CHỨNG
              KHOÁN VÀ ĐẦU TƯ.
            </div>
            <div className="leading-8 text-[17px]">
              Là một hãng luật có sự đầu tư chiều sâu nghiệp vụ chuyên môn với
              nhiều Luật sư sáng lập được biết đến như những chuyên gia đầu
              ngành của lĩnh vực tài chính ngân hàng,{" "}
              <strong>
                BA<span className="text-[#ff0000]">S</span>I
                <span className="text-[#ff0000]">CO </span>
              </strong>{" "}
              đã là ưu tiên lựa chọn số một của rất nhiều ngân hàng, định chế
              tài chính, doanh nghiệp trong các lĩnh vực giao dịch thị trường
              vốn, ngân hàng, chứng khoán, M&A, đầu tư trái phiếu, bất động sản,
              quản trị doanh nghiệp, tài chính doanh nghiệp, hoạt động đầu tư…
            </div>
            <div className="bg-[#dd3333] text-white text-[21px] p-[30px] mb-9 mt-9 leading-[1.8rem]">
              Slogan của BASICO: <strong>“Dựng nền tảng doanh nghiệp!”</strong>{" "}
              Khẳng định quan điểm của chúng tôi: Thành công của mọi sự phát
              triển đều từ yếu tố nền tảng. Định hướng phát triển của BASICO là
              cùng với các doanh nghiệp xây dựng nền tảng kinh doanh với việc
              cung cấp các dịch vụ pháp lý thực dụng, đa dạng, và chuyên sâu cho
              cộng đồng doanh nghiệp Việt Nam.
            </div>
          </div>
        </div>
        <div className="font-bold text-[26px] border-l-5 border-[#FF0004] pl-5 mb-12">
          Cống hiến
        </div>
        <div className="mb-9">
          Vì nỗ lực đóng góp tích cực nhiều năm cho sự hoàn thiện môi trường
          pháp luật kinh doanh tại Việt Nam và sự phát triển nghề luật sư tại
          Việt Nam, BASICO đã được Liên đoàn Luật sư Việt Nam và Sở Tư pháp
          thành phố Hà Nội ghi nhận.
        </div>
        <div className="flex flex-row">
          <Image
            src="/bangkhen/BangKhen1.jpg"
            alt="bangkhen"
            width={555}
            height={370}
            className="mb-8"
          />
          <Image
            src="/bangkhen/BangKhen2.jpg"
            alt="bangkhen2"
            width={555}
            height={370}
            className="mb-8"
          />
        </div>
        <div className="font-bold text-[26px] border-l-5 border-[#FF0004] pl-5 mb-12">
          Vì sao bạn nên chọn BASICO?
        </div>
        <div className="flex flex-row">
          <div>
            <div className="flex flex-row w-[553px] h-[74px] mb-6">
              <div className="flex size-[70px] bg-[#FF0004] border-[#FF0004] border-2 text-white justify-center items-center rounded hover:bg-white hover:text-[#FF0004]">
                <FontAwesomeIcon icon={faIdCard} className="size-9" />
              </div>
              <div className="font-bold text-[18px] pl-8">
                UY TÍN, TRÁCH NHIỆM
              </div>
            </div>
            <div className="flex flex-row w-[553px] h-[74px] mb-6">
              <div className="flex size-[70px] bg-[#FF0004] border-[#FF0004] border-2 text-white justify-center items-center rounded hover:bg-white hover:text-[#FF0004]">
                <FontAwesomeIcon icon={faBusinessTime} className="size-9" />
              </div>
              <div className="font-bold text-[18px] pl-8">
                CHÍNH XÁC, ĐÚNG HẸN
              </div>
            </div>
            <div className="flex flex-row w-[553px] h-[74px]">
              <div className="flex size-[70px] bg-[#FF0004] border-[#FF0004] border-2 text-white justify-center items-center rounded hover:bg-white hover:text-[#FF0004]">
                <FontAwesomeIcon icon={faAngellist} className="size-9" />
              </div>
              <div className="font-bold text-[18px] pl-8">
                GIẢI PHÁP TRỌN VẸN
              </div>
            </div>
          </div>
          <Image
            src="/Bat-tay.jpg"
            alt="battay"
            width={555}
            height={328}
            className="mb-8"
          />
        </div>
      </div>
    </>
  );
};

export default page;
