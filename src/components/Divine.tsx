import React from "react";

const Divine = () => {
  return (
    <div>
      <div className="flex flex-row justify-center items-center bg-blue-50 relative">
        {/* div 1 */}
        <div className="bg-red-600 text-white text-right pr-5 pl-44 ">
          <div className="mb-4">DỊCH VỤ PHÁP LÝ</div>
          <p className="mb-4">
            BASICO là ưu tiên lựa chọn số một của nhiều doanh nghiệp dẫn đầu
            trong nhiều ngành nghề, lĩnh vực kinh doanh tại Việt Nam
          </p>
          <button className="border-white border-solid border-2 p-2">
            TÌM HIỂU
          </button>
        </div>
        {/* div 2 */}
        <div className="bg-black text-white pr-44 pl-5">
          <div className="mb-4">HỖ TRỢ DOANH NGHIỆP NHỎ, KHỞI NGHIỆP</div>
          <p className="mb-4">
            BASICO cũng ưu tiên thúc đẩy, đưa cộng đồng doanh nghiệp nhỏ, khởi
            nghiệp bắt kịp nền tảng pháp lý kinh doanh tại Việt Nam
          </p>
          <button className="border-white border-solid border-2 p-2">
            TÌM HIỂU
          </button>
        </div>
      </div>
    </div>
  );
};

export default Divine;
