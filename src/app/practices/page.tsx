import HeaderComponent from "@/components/header";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <>
      <HeaderComponent
        title="DỊCH VỤ"
        subTitle="Tư vấn thường xuyên, toàn diện và gắn bó mật thiết với nội bộ doanh nghiệp"
        link="Dịch Vụ"
      />
      <div className="flex flex-col justify-center items-center bg-white text-black pt-[82px] pb-36">
        <div className="text-[23px] mb-9">
          <strong>
            &nbsp;BA<span className="text-[#ff0000]">S</span>I
            <span className="text-[#ff0000]">CO </span>
          </strong>
          cung cấp dịch vụ pháp lý đa dạng, toàn diện, trên mọi lĩnh vực hoạt
          động kinh doanh chính.
        </div>
        {/* ---------------------3 service ---------------------------------*/}
        <div className="flex flex-cols-3">
          <div className="w-[360px] h-[367px] px-4">
            <Image
              alt=""
              src="/practices/retainerService.jpg"
              width={360}
              height={240}
            ></Image>
            <div className="text-[17px] font-bold mb-[10px] pt-6">
              <a href="practices/retainerService">Dịch vụ Luật sư nội bộ</a>
            </div>
            <div>
              Dịch vụ tư vấn pháp luật thường xuyên, trong đó BASICO đóng vai
              trò như một hãng luật nằm trong nội bộ doanh nghiệp để phục vụ mọi
              nhu cầu pháp lý
            </div>
          </div>

          <div className="w-[360px] h-[367px] px-4">
            <Image
              alt=""
              src="/practices/retainerService.jpg"
              width={360}
              height={240}
            ></Image>
            <div className="text-[17px] font-bold mb-[10px] pt-6">
              <a href="practices/retainerService">Ngân hàng và tài chính</a>
            </div>
            <div>
                BASICO được biết đến với tư cách hãng luật sâu sắc về nghiệp vụ ngân hàng. 
                Chúng tôi trợ giúp pháp lý cho các ngân hàng, tổ chức tín dụng trong mọi lĩnh

            </div>
          </div>

          <div className="w-[360px] h-[367px] px-4">
            <Image
              alt=""
              src="/practices/retainerService.jpg"
              width={360}
              height={240}
            ></Image>
            <div className="text-[17px] font-bold mb-[10px] pt-6">
              <a href="practices/retainerService">Thị trường vốn</a>
            </div>
            <div>
                Trong lĩnh vực thị trường vốn, đội ngũ luật sư và chuyên gia pháp lý, 
                kinh tế của BASICO sử dụng các thế mạnh về kinh nghiệm, kiến thức hiểu biết chuyên
            </div>
          </div>         
        </div>

         {/* ---------------------3 service ---------------------------------*/}
        <div   className="flex flex-cols-3">
          <div className="w-[360px] h-[367px] px-4">
            <Image
              alt=""
              src="/practices/retainerService.jpg"
              width={360}
              height={240}
            ></Image>
            <div className="text-[17px] font-bold mb-[10px] pt-6">
              <a href="practices/retainerService">Dịch vụ Luật sư nội bộ</a>
            </div>
            <div>
              Dịch vụ tư vấn pháp luật thường xuyên, trong đó BASICO đóng vai
              trò như một hãng luật nằm trong nội bộ doanh nghiệp để phục vụ mọi
              nhu cầu pháp lý
            </div>
          </div>

          <div className="w-[360px] h-[367px] px-4">
            <Image
              alt=""
              src="/practices/retainerService.jpg"
              width={360}
              height={240}
            ></Image>
            <div className="text-[17px] font-bold mb-[10px] pt-6">
              <a href="practices/retainerService">Ngân hàng và tài chính</a>
            </div>
            <div>
                BASICO được biết đến với tư cách hãng luật sâu sắc về nghiệp vụ ngân hàng. 
                Chúng tôi trợ giúp pháp lý cho các ngân hàng, tổ chức tín dụng trong mọi lĩnh

            </div>
          </div>

          <div className="w-[360px] h-[367px] px-4">
            <Image
              alt=""
              src="/practices/retainerService.jpg"
              width={360}
              height={240}
            ></Image>
            <div className="text-[17px] font-bold mb-[10px] pt-6">
              <a href="practices/retainerService">Thị trường vốn</a>
            </div>
            <div>
                Trong lĩnh vực thị trường vốn, đội ngũ luật sư và chuyên gia pháp lý, 
                kinh tế của BASICO sử dụng các thế mạnh về kinh nghiệm, kiến thức hiểu biết chuyên
            </div>
          </div>
        </div>
        
        
      </div>
    </>
  );
};

export default page;
