"use client";

import React from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperCore, { Navigation } from "swiper/core";
import { Navigation } from "swiper/modules";
import { images } from "@/lib/images";

import "swiper/css";
import "swiper/css/navigation";
import "./Carousel.css";

const Carousel = () => {
  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      loop={true}
      className="h-auto w-full"
    >
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <div style={{ position: "relative", width: "100vw", height: "64vh" }}>
            <Image
              src={img.src}
              alt={img.alt}
              layout="fill"
              objectFit="cover"
            />
            {/* <p>{img.desc}</p> */}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
