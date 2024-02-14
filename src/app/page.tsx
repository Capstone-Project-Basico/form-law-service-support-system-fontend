import Image from "next/image";
import Carousel from "../components/slide/Carousel";
import { Divider } from "@nextui-org/react";

export default function Home() {
  const slides = [
    {
      desc: "Home",
      url: "/slide1.jpg",
    },
    {
      desc: "Home2",
      url: "/slide2.jpg",
    },
    {
      desc: "Home3",
      url: "/slide3.jpg",
    },
  ];
  return (
    <div className="flex flex-col relative ">
      {/* slide */}
      <div className="flex min-w-9 min-h-48">
        {/* <Carousel>
          {slides.map((s) => (
            <Image
              key={s.desc}
              src={s.url}
              alt=""
              fill
              // sizes="(min-width: 768px) 100vw, (min-height: 768px) 100vh"
            />
          ))}
        </Carousel> */}
        <Image src="/slide1.jpg" alt="" fill className="relative" />
        hello
      </div>
      {/* divine */}
      <div className="flex justify-center items-center bg-blue-50 pt-10">
        <div className="h-full bg-red-600 text-white text-right pr-5 pl-44">
          <div className="mb-4">DỊCH VỤ PHÁP LÝ</div>
          <p className="mb-4">
            BASICO là ưu tiên lựa chọn số một của nhiều doanh nghiệp dẫn đầu
            trong nhiều ngành nghề, lĩnh vực kinh doanh tại Việt Nam
          </p>
          <button className="border-white border-solid border-2 p-2">
            TÌM HIỂU
          </button>
          {/* 2 */}
        </div>
        <div className="bg-black text-white pr-48 pl-5">
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

      {/* Lien he */}
      <div>Lien he</div>
    </div>
  );
}
