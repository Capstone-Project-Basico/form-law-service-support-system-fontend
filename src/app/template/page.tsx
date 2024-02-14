"use client";

import { Template } from "@/constants/types/homeType";
import CardTemplate from "@/sections/CardTemplate";
import { useEffect, useState } from "react";

const Page = () => {
  const [templates, setTemplates] = useState<Template[]>([]);

  const getTemplate = async () => {
    const res = await fetch(
      "https://demo-production-b43a.up.railway.app/file/files"
    );
    const data = await res.json();
    setTemplates(data);
  };

  useEffect(() => {
    getTemplate();
  }, []);

  return (
    <div>
      {(templates || []).map((item: Template, index: number) => (
        <CardTemplate key={index} itemDetail={item} />
      ))}
    </div>
  );
};
export default Page;
