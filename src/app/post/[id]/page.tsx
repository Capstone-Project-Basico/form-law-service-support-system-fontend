"use client";

import Side from "@/components/side";
import { PostType } from "@/constants/types/homeType";
import { decodeFromBase64 } from "@/utils/base64";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Slide } from "react-toastify";
import HeaderComponent from "@/components/header";

const Page = () => {
  const params = useParams<{ id: string }>();
  const [post, setPost] = useState<PostType>();

  useEffect(() => {
    fetchPost(Number(params.id));
  }, []);

  //get post
  const fetchPost = async (id: number) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}post/getPostById/${id}`
      );
      setPost(response.data.data);
    } catch (error) {}
  };

  return (
    <>
      <HeaderComponent title="" link=" " />
      <div className="flex mt-10 ml-5">
        <Side />

        <div
          className="pl-10 content-div   w-[900px] mb-10"
          dangerouslySetInnerHTML={{
            __html: decodeFromBase64(post?.content) || "",
          }}
        ></div>
      </div>
    </>
  );
};

export default Page;
