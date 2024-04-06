"use client";

import { PostType } from "@/constants/types/homeType";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Breadcrumbs,
  BreadcrumbItem,
  Button,
  Input,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Navbar,
  NavbarContent,
  NavbarItem,
  MenuItem,
} from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const Post = () => {
  const [tabs, setTabs] = useState(1);
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    switch (tabs) {
      case 1:
        fetchPosts();
        break;
      case 2:
        console.log("dang cho duyet ne");
        break;
      case 3:
        // fetchDeletedPartner();
        break;
      default:
        // fetchPartners();
        break;
    }
  }, [tabs]);

  //get all
  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}post/getAllPosts`
      );
      setPosts(response.data.data);
    } catch (error) {}
  };
  return (
    <div className="w-full mt-5 ml-5 mr-5">
      <ToastContainer />

      <div className="grid grid-cols-2">
        <h1 className="text-[#FF0004] font-bold text-3xl">Quản lí bài viết</h1>
      </div>

      <div className="flex flex-row gap-10 font-bold border-b-1 ">
        <div>
          <Button
            className={`bg-white ${
              tabs === 1 && "text-[#FF0004] border-b-2 border-[#FF0004]"
            }`}
            onClick={() => setTabs(1)}
            radius="none"
          >
            TẤT CẢ
          </Button>
        </div>
        <div>
          <Button className="bg-white" onClick={() => setTabs(2)} radius="none">
            CHỜ DUYỆT
          </Button>
        </div>
        <div>
          <Button
            className={`bg-white ${
              tabs === 3 &&
              "text-[#FF0004] border-b-[#FF0004] border-b-2 border-[#FF0004]"
            }`}
            radius="none"
            onClick={() => setTabs(3)}
          >
            ĐÃ XÓA
          </Button>
        </div>
      </div>

      <div>
        <div className="my-10 flex flex-row">
          <Input
            classNames={{
              base: "w-full sm:max-w-[10rem] h-10",
              mainWrapper: "h-full w-96",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20 ",
            }}
            placeholder="Từ khóa tìm kiếm .."
            size="sm"
            type="search"
            radius="none"
            // value={searchTerm}
            // onChange={handleSearchChange}
          />
        </div>
      </div>
      <Table
        aria-label="Example static collection table"
        bottomContent={
          <div className="flex w-full justify-center">
            {/* <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            /> */}
          </div>
        }
      >
        <TableHeader className="">
          <TableColumn className=" bg-[#FF0004] text-white">
            Tên đối tác
          </TableColumn>
          <TableColumn className=" bg-[#FF0004] text-white">
            Trạng thái
          </TableColumn>
          <TableColumn className="flex justify-center items-center bg-[#FF0004] text-white">
            Tương tác
          </TableColumn>
        </TableHeader>
        <TableBody>
          {posts.map((post, index) => (
            <TableRow key={index}>
              <TableCell>{post.content}</TableCell>
              <TableCell>
                <span style={{ color: post.delete ? "red" : "green" }}>
                  {post.delete ? "Không sử dụng" : "Đang hoạt động"}
                </span>
              </TableCell>
              {post.delete === false ? (
                <TableCell className="flex gap-2 items-center  justify-center ">
                  <Button
                    className="bg-blue-600 text-white"
                    // onPress={() => {
                    //   setSelectedPartner(partner);
                    //   onOpenUpdate();
                    // }}
                  >
                    Cập nhật
                  </Button>

                  <Button
                    className="bg-[#FF0004] text-white"
                    // onClick={() => handleDelete(partner.partnerId)}
                  >
                    Xóa
                  </Button>
                </TableCell>
              ) : (
                <TableCell className="flex items-center justify-center">
                  <Button
                    className="bg-blue-600 text-white"
                    // onClick={() => restoreDelete(partner.partnerId)}
                  >
                    Khôi phục
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Post;
