"use client";

import { PostType } from "@/constants/types/homeType";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

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
    <div
      className="pl-10 content-div border-2 "
      dangerouslySetInnerHTML={{
        __html: post?.content || "",
      }}
    ></div>
  );
};

export default Page;
