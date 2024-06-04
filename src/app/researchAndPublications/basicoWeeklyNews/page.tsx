"use client";

import HeaderComponent from "@/components/header";
import PostComponent from "@/components/post";

const Page = () => {

  return (
    <>
      <HeaderComponent
        title="LĨNH VỰC CHUYÊN MÔN"
        link=" Dịch Vụ Luật Sư Nội Bộ"
      />
      <PostComponent cateName="BASICO tuần luật" />
    </>
  );
};

export default Page;
