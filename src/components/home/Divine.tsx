import React from "react";

const Divine = () => {
  return (
    <div className="">
      <div className="flex lg:flex-row md:flex-col justify-center items-center relative ">
        {/* div 1 */}
        <div className="bg-[#ff0004] text-white text-right pr-5 pl-44 pt-16 pb-16">
          <div className="mb-4 text-2xl font-bold ">DỊCH VỤ PHÁP LÝ</div>
          <p className="mb-4 text-xl">
            BASICO là ưu tiên lựa chọn số một của nhiều doanh nghiệp dẫn đầu
            trong nhiều ngành nghề, lĩnh vực kinh doanh tại Việt Nam
          </p>
          <button className="border-white border-solid border-2 p-2 hover:bg-white hover:text-black">
            TÌM HIỂU
          </button>
        </div>
        {/* div 2 */}
        <div className="bg-black text-white pr-44 pl-5 pt-16 pb-16">
          <div className="mb-4 text-2xl font-bold">
            HỖ TRỢ DOANH NGHIỆP NHỎ, KHỞI NGHIỆP
          </div>
          <p className="mb-4 text-xl">
            BASICO cũng ưu tiên thúc đẩy, đưa cộng đồng doanh nghiệp nhỏ, khởi
            nghiệp bắt kịp nền tảng pháp lý kinh doanh tại Việt Nam
          </p>
          <button className="border-white border-solid border-2 p-2 hover:bg-white hover:text-black">
            TÌM HIỂU
          </button>
        </div>
      </div>
    </div>
  );
};

export default Divine;
