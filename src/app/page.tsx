import Image from "next/image";
import Carousel from "../components/Carousel";
import { Divider } from "@nextui-org/react";
import Divine from "@/components/Divine";
import Contact from "@/components/Contact";

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
    <div className="flex flex-col relative">
      <Carousel>
        {slides.map((s) => (
          <Image
            key={s.desc}
            src={s.url}
            alt=""
            fill
            // sizes="(min-width: 768px) 100vw, (min-height: 768px) 100vh"
          />
        ))}
      </Carousel>
      <Divine />
      {/* Lien he */}
      <Contact />
    </div>
  );
}
