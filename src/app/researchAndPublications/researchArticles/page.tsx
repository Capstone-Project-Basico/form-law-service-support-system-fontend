"use client";

import HeaderComponent from "@/components/header";
import Side from "@/components/side";
import { PostType } from "@/constants/types/homeType";
import { faCalendarDays, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const router = useRouter();
  useEffect(() => {
    getAllPosts();
  }, []);
  const getAllPosts = () => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_API}post/findPostByCateName?cateName=Bài viết nghiên cứu báo chí`
      )
      .then((response) => {
        setPosts(response.data.data);
      });
  };
  return (
    <>
      <HeaderComponent
        title="BÀI VIẾT NGHIÊN CỨU TRÊN BÁO CHÍ"
        subTitle="Bài viết nghiên cứu trên báo chí của BASICO"
        link="Bài Viết Nghiên Cứu Trên Báo Chí"
      />
      <div className="flex flex-rows-2 pt-20 bg-white text-black px-20">
        <Side />
        <div className="grid grid-cols-4 w-[1100px] gap-10">
          {posts.map((post) => (
            <Card
              isPressable
              key={post.postId}
              className="px-[15px] w-[250px] h-[330px]"
              onClick={() => router.push(`/post/${post.postId}`)}
            >
              <Image
                alt=""
                src="/anhnen.jpg"
                width={250}
                height={175}
                className="mb-2"
              />
              <h1 className="text-xl font-bold mb-2">{post.title}</h1>
              <hr className="mt-6" />
              <div className="flex flex-row items-center m-0 py-[10px]">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="size-4 mx-1"
                />
                <div className="py-2 text-xs">Tháng Hai 3, 2021</div>
              </div>
              <FontAwesomeIcon icon={faComment} className="size-4 ml-1" />
              <hr />
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
