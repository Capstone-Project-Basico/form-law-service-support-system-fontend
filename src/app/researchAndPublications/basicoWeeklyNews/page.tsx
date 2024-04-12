"use client";

import Image from "next/image";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "@nextui-org/react";
import HeaderComponent from "@/components/header";
import Side from "@/components/side";
import { useEffect, useState } from "react";
import axios from "axios";
import { PostType } from "@/constants/types/homeType";
import { useRouter } from "next/navigation";

const Page = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const router = useRouter();
  useEffect(() => {
    getAllPosts();
  }, []);
  const getAllPosts = () => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_API}post/findPostByCateName?cateName=Basico tuần luật`
      )
      .then((response) => {
        setPosts(response.data.data);
      });
  };
  return (
    <>
      <HeaderComponent
        title="LĨNH VỰC CHUYÊN MÔN"
        link=" Dịch Vụ Luật Sư Nội Bộ"
      />
      <div className="flex flex-rows-2 pt-20 bg-white text-black px-80">
        <div className="grid grid-cols-4 w-[847px]">
          {posts.map((post) => (
            <Card
              isPressable
              key={post.postId}
              className="px-[15px] w-[196px] h-[300px]"
              onClick={() => router.push(`/post/${post.postId}`)}
            >
              <Image
                alt=""
                src="/anhnen.jpg"
                width={196}
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
                <div className="py-2 text-xs">Tháng Sáu 20, 2020</div>
              </div>
              <FontAwesomeIcon icon={faComment} className="size-4 ml-1" />
              <hr />
            </Card>
          ))}
        </div>
        <Side />
      </div>
    </>
  );
};

export default Page;
