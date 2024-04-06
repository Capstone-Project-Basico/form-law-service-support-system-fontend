import HeaderComponent from "@/components/header";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <>
      {/* header */}
    <div className="relative w-full h-[300px] ">
        <Image
        className="w-full h-full object-cover"
        alt="bg image"
        src="/slide_banlamviec.jpg"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
    />
    <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
        
    <div className="flex flex-col absolute z-20 inset-0 p-24 text-white mx-[366px] ">
      
      <div className="min-h-20">
        <div className="text-3xl font-bold text-white ">LIÊN HỆ VỚI CHÚNG TÔI</div>
        <div className="text-xl text-white pt-5 font-lora italic opacity-80"style={{ letterSpacing: '1px' }}>Tư vấn thường xuyên, toàn diện và gắn bó mật thiết với nội bộ doanh nghiệp</div>
      </div>

      <div className="absolute bottom-0 left-24 right-24 bg-black bg-opacity-60 py-2 px-4 max-w-[250px] " >
        <a href="/" className="text-white font-bold text-sm">Basico Law Firm</a>
      <span className="text-red-500 font-bold text-sm ml-2">› Liên Hệ</span>
    </div>
  </div>
</div>
    {/* body */}
      <div className="flex flex-col justify-center items-center bg-white text-black pt-[82px] pb-36">
        <div className="text-[23px] mb-9">
          <strong>
            &nbsp;BA<span className="text-[#ff0000]">S</span>I
            <span className="text-[#ff0000]">CO </span>
          </strong>
          cung cấp dịch vụ pháp lý đa dạng, toàn diện, trên mọi lĩnh vực hoạt
          động kinh doanh chính.
        </div>
        {/* 1---------------------3 service ---------------------------------1*/}
        <div className="flex flex-cols-3  pb-10">
          <div className="w-[380px] h-[367px] px-4">
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

          <div className="w-[380px] h-[367px] px-4">
            <Image
              alt=""
              src="/practices/Anhdaidien_taichinh2.jpg"
              width={360}
              height={240}
            ></Image>
            <div className="text-[17px] font-bold mb-[10px] pt-6">
              <a href="practices/bankAndFinance">Ngân hàng và tài chính</a>
            </div>
            <div>
                BASICO được biết đến với tư cách hãng luật sâu sắc về nghiệp vụ ngân hàng. 
                Chúng tôi trợ giúp pháp lý cho các ngân hàng, tổ chức tín dụng trong mọi lĩnh

            </div>
          </div>

          <div className="w-[380px] h-[367px] px-4">
            <Image
              alt=""
              src="/practices/Anhdaidien_thitruongvon-3.jpg"
              width={360}
              height={240}
            ></Image>
            <div className="text-[17px] font-bold mb-[10px] pt-6">
              <a href="practices/capitalMarkets">Thị trường vốn</a>
            </div>
            <div>
                Trong lĩnh vực thị trường vốn, đội ngũ luật sư và chuyên gia pháp lý, 
                kinh tế của BASICO sử dụng các thế mạnh về kinh nghiệm, kiến thức hiểu biết chuyên
            </div>
          </div>         
        </div>

         {/* 2---------------------3 service ---------------------------------2*/}
        <div   className="flex flex-cols-3 pb-14">
          <div className="w-[380px] h-[367px] px-4 ">
            <Image
              alt=""
              src="/practices/Anhdaidien_tvbh.jpg"
              width={360}
              height={240}
            ></Image>
            <div className="text-[17px] font-bold mb-[10px] pt-6">
              <a href="practices/insurrance">Bảo hiểm</a>
            </div>
            <div>
            Bảo hiểm là một vấn đề rất đáng được quan tâm. Thế nhưng, cá nhân cũng như 
            các Doanh nghiệp vẫn còn hoài nghi hay chưa hiểu rõ về các loại hình bảo hiểm.
            </div>
          </div>

          <div className="w-[380px] h-[367px] px-4">
            <Image
              alt=""
              src="/practices/Anhdaidien_doanhnghiep2.jpg"
              width={360}
              height={240}
            ></Image>
            <div className="text-[17px] font-bold mb-[10px] pt-6">
              <a href="practices/corporate">Dịch vụ pháp lý Doanh nghiệp</a>
            </div>
            <div>
              BASICO cung cấp dịch vụ pháp lý toàn diện cho nhu cầu hoạt động kinh doanh 
              tại Việt Nam và có cơ sở khách hàng đa dạng từ các tập đoàn doanh nghiệp

            </div>
          </div>

          <div className="w-[380px] h-[367px] px-4">
            <Image
              alt=""
              src="/practices/Tuvan-HD-giaodich-NH-1.jpg"
              width={360}
              height={240}
            ></Image>
            <div className="text-[17px] font-bold mb-[10px] pt-6">
              <a href="practices/StrategicAndCorporateRestructuring">Tư vấn chiến lược và Tái cấu trúc doanh nghiệp</a>
            </div>
            <div>
            Khi tư vấn cho các tập đoàn, doanh nghiệp, doanh nhân lớn trong các 
            giao dịch mua bán, sáp nhập doanh nghiệp, chúng tôi luôn chú trọng đến yếu tố
            </div>
          </div>
        </div>

        {/* 3---------------------3 service ---------------------------------3*/}
        <div   className="flex flex-cols-3 pb-10">
          <div className="w-[380px] h-[367px] px-4">
            <Image
              alt=""
              src="/practices/Anhdaidien_tuvanMA_new.jpg"
              width={360}
              height={240}
            ></Image>
            <div className="text-[17px] font-bold mb-[10px] pt-6">
              <a href="practices/mergersAndAcquisitions">Tư vấn M&A</a>
            </div>
            <div>
            Khi tư vấn cho các tập đoàn, doanh nghiệp, doanh nhân lớn trong 
            các giao dịch mua bán, sáp nhập doanh nghiệp, chúng tôi luôn chú trọng đến yếu tố
            </div>
          </div>

          <div className="w-[380px] h-[367px] px-4">
            <Image
              alt=""
              src="/practices/Anhdaidien_tranhtung.jpg"
              width={360}
              height={240}
            ></Image>
            <div className="text-[17px] font-bold mb-[10px] pt-6">
              <a href="practices/litigationAndDisputeResolution">Tranh tụng và Giải quyết tranh chấp</a>
            </div>
            <div>
            Đội ngũ Luật sư của BASICO có chuyên môn đa dạng, năng 
            lực và kinh nghiệm phong phú, đã thụ lý và giải quyết hầu hết các thể loại tranh chấp kinh doanh

            </div>
          </div>

          <div className="w-[380px] h-[367px] px-4">
            <Image
              alt=""
              src="/practices/Anhdaidien_daotaophaply.jpg"
              width={360}
              height={240}
            ></Image>
            <div className="text-[17px] font-bold mb-[10px] pt-6">
              <a href="practices/businessesLegalTraining">Đào tạo pháp lý cho doanh nghiệp</a>
            </div>
            <div>
            BASICO cùng với Công ty Cổ phần Đào tạo Nghiệp vụ Ngân hàng 
            SBankTraining triển khai các chương trình đào tạo nghiệp vụ pháp lý cho các ngân hàng, định
            </div>
          </div>
        </div>
        
        {/* 4---------------------3 service ---------------------------------4*/}
        <div   className="flex flex-cols-3 pb-10">
          <div className="w-[380px] h-[367px] px-4">
            <Image
              alt=""
              src="/practices/Anhdaidien_tuvanBDS4.jpg"
              width={360}
              height={240}
            ></Image>
            <div className="text-[17px] font-bold mb-[10px] pt-6">
              <a href="practices/realEstate">Tư vấn bất động sản</a>
            </div>
            <div>
            BASICO là hãng luật tư vấn chuyên nghiệp của nhiều giao dịch 
            lớn về bất động sản, xây dựng. Chúng tôi cung cấp các dịch vụ tư vấn chính về lĩnh vực này
            </div>
          </div>

          <div className="w-[380px] h-[367px] px-4">
            <Image
              alt=""
              src="/practices/Anhdaidien_LD.jpg"
              width={360}
              height={240}
            ></Image>
            <div className="text-[17px] font-bold mb-[10px] pt-6">
              <a href="practices/labour">lao động</a>
            </div>
            <div>
            Pháp luật lao động quy định quyền và nghĩa vụ của người lao 
            động và của người sử dụng lao động, các tiêu chuẩn lao động, các nguyên tắc sử dụng và quản

            </div>
          </div>

          <div className="w-[380px] h-[367px] px-4">
            <Image
              alt=""
              src="/practices/Anhdaidien_sohuutritue-1.jpg"
              width={360}
              height={240}
            ></Image>
            <div className="text-[17px] font-bold mb-[10px] pt-6">
              <a href="practices/intellectualProperty">Sở hữu trí tuệ</a>
            </div>
            <div>
            Trong lĩnh vực sở hữu trí tuệ, BASICO cung cấp đến Khách hàng 
            các dịch vụ tư vấn toàn diện cho các đối tượng của quyền sở hữu công nghiệp và quyền tác
            </div>
          </div>
        </div>
          {/* 5---------------------3 service ---------------------------------5*/}
          <div   className="flex flex-cols-3">
          <div className="w-[380px] h-[367px] px-4">
            <Image
              alt=""
              src="/practices/Anhdaidien_thue_taichinh.jpg"
              width={360}
              height={240}
            ></Image>
            <div className="text-[17px] font-bold mb-[10px] pt-6">
              <a href="practices/realEstate">CNTT & Truyền thông</a>
            </div>
            <div>
            Ngoài các lĩnh vực chuyên môn về Luật, chúng tôi có đội ngũ kỹ sư tin học từng là chuyên gia của các công ty phần mềm lớn. Chúng tôi tư vấn, triển khai
            </div>
          </div>

          <div className="w-[380px] h-[367px] px-4">
            <Image
              alt=""
              src="/practices/Anhdaidien_Thue_TC_DN.jpg"
              width={360}
              height={240}
            ></Image>
            <div className="text-[17px] font-bold mb-[10px] pt-6">
              <a href="practices/tax">Thuế, Tài chính doanh nghiệp</a>
            </div>
            <div>
            BASICO được cộng đồng doanh nghiệp Việt Nam biết đến rộng rãi với vai trò của một hãng luật đã trợ giúp pháp lý thành công cho nhiều doanh nghiệp trong

            </div>
          </div>

        
        </div>
        
        
      </div>
    </>
  );
};

export default page;
