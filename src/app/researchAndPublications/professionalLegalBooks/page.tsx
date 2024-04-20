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
        `${process.env.NEXT_PUBLIC_BASE_API}post/findPostByCateName?cateName=Sách pháp lý nghiệp vụ`
      )
      .then((response) => {
        setPosts(response.data.data);
      });
  };
  return (
    <>
      <HeaderComponent
        title="SÁCH PHÁP LÝ NGHIỆP VỤ"
        link=" Sách Pháp Lý Nghiệp Vụ"
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
                <div className="py-2 text-xs">Tháng Mười 16, 2020</div>
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
