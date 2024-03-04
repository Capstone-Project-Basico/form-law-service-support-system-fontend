import Image from "next/image";
import Carousel from "../components/Carousel";
import Divine from "@/components/Divine";
import Contact from "@/components/Contact";
import Customer from "@/components/Customer";
import Service from "@/components/Service";
import Request from "@/components/Request";

export default function Home() {
  return (
    <div className="flex flex-col relative">
      <Carousel />

      <Divine />
      {/* Lien he */}
      <Contact />
      {/* Dich vu */}
      <Service />
      {/* KHÁCH HÀNG CỦA CHÚNG TÔI */}
      <Customer />
      {/* YÊU CẦU HỖ TRỢ PHÁP LÝ */}
      <Request />
    </div>
  );
}
