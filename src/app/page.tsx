"use client";
import Image from "next/image";
import Carousel from "../components/home/Carousel";
import Divine from "@/components/home/Divine";
import Contact from "@/components/home/Contact";
import Customer from "@/components/home/Customer";
import Service from "@/components/home/Service";
import Request from "@/components/home/Request";

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
