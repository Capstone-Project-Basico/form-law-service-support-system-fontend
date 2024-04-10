"use client";

import { PostCategory } from "@/constants/types/homeType";
import {
  faChevronRight,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { postSidebars } from "@/lib/postSide";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Side = () => {
  const [postCategories, setPostCategories] = useState<PostCategory[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    getAllPostCategories();
  }, []);

  const getAllPostCategories = () => {
    try {
      axios
        .get(`${process.env.BASE_API}category/getAllCategories`)
        .then((response) => {
          setPostCategories(response.data.data);
        });
    } catch (error) {}
  };

  return (
    <div className="px-4 w-[345px]">
      <div className="flex flex-row border mb-10">
        <input
          type="text"
          placeholder="Tìm kiếm ..."
          className="px-4 py-2 bg-[#00000008] w-[262px]"
        />
        <Button radius="none" className="bg-[#FF0004] text-white">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="size-4" />
        </Button>
      </div>

      <div className="font-bold text-[17px] border-l-5 border-[#FF0004] pl-5 mb-5">
        CHUYÊN MỤC
      </div>
      <div className="mb-10">
        {postSidebars.map((category) => (
          <div key={category.title}>
            <Link
              href={category.link}
              className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:text-[#FF0004] ${
                category.link === pathname ? "text-[#FF0004]" : ""
              }`}
            >
              <div className="flex flex-row items-center py-3">
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="size-3 mx-1 text-[#FF0004]"
                />
                <p className="pl-[18px]">{category.title}</p>
              </div>
            </Link>
            <hr />
          </div>
        ))}
        {/* 
        <div className="flex flex-row items-center py-3">
          <FontAwesomeIcon
            icon={faChevronRight}
            className="size-3 mx-1 text-[#FF0004]"
          />
          <p className="pl-[18px] hover:text-[#FF0004] cursor-pointer">
            BASICO tuần luật
          </p>
        </div>
        <hr />

        <div className="flex flex-row items-center py-3">
          <FontAwesomeIcon
            icon={faChevronRight}
            className="size-3 mx-1 text-[#FF0004]"
          />
          <p className="pl-[18px] text-[#FF0004] cursor-pointer">
            Sách pháp lý nghiệp vụ
          </p>
        </div>
        <hr />

        <div className="flex flex-row items-center py-3">
          <FontAwesomeIcon
            icon={faChevronRight}
            className="size-3 mx-1 text-[#FF0004]"
          />
          <p className="pl-[18px] hover:text-[#FF0004] cursor-pointer">
            Tư liệu ảnh
          </p>
        </div>
        <hr />

        <div className="flex flex-row items-center py-3">
          <FontAwesomeIcon
            icon={faChevronRight}
            className="size-3 mx-1 text-[#FF0004]"
          />
          <p className="pl-[18px] hover:text-[#FF0004] cursor-pointer">
            Tư liệu film ảnh
          </p>
        </div>
        <hr />

        <div className="flex flex-row items-center py-3">
          <FontAwesomeIcon
            icon={faChevronRight}
            className="size-3 mx-1 text-[#FF0004]"
          />
          <p className="pl-[18px] hover:text-[#FF0004] cursor-pointer">
            Tư liệu video
          </p>
        </div> */}
      </div>

      {/* calender */}
      <div className="mb-10">
        <div className="font-bold text-[17px] border-l-5 border-[#FF0004] pl-5 mb-5">
          LỊCH
        </div>
        <div>THÁNG BA 2024</div>
      </div>

      {/* new post */}
      <div>
        <div className="font-bold text-[17px] border-l-5 border-[#FF0004] pl-5 mb-5">
          BÀI VIẾT MỚI
        </div>
        <div>Chuc mung nam moi</div>
      </div>
    </div>
  );
};

export default Side;
