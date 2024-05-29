"use client";

import HeaderComponent from "@/components/header";
import PostComponent from "@/components/post";
const Page = () => {
  return (
    <>
      <HeaderComponent
        title="BÀI VIẾT NGHIÊN CỨU TRÊN BÁO CHÍ"
        subTitle="Bài viết nghiên cứu trên báo chí của BASICO"
        link="Bài Viết Nghiên Cứu Trên Báo Chí"
      />
      <PostComponent cateName="Bài viết nghiên cứu trên báo chí" />

    </>
  );
};

export default Page;
