import Image from "next/image";
import { useState } from "react";

const Page = () => {
  return (
    <div className="relative w-full h-[800px]">
      <Image
        src="/hinhmanager.png"
        alt="Background image"
        layout="fill"
        objectFit="cover" // Thử thay đổi giá trị này nếu cần
        quality={100} // Đặt chất lượng ảnh, giá trị từ 1-100
      />
    </div>
  );
};

export default Page;
