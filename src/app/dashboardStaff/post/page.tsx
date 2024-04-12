"use client";

import { Category, PostType } from "@/constants/types/homeType";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  Pagination,
  Select,
  SelectItem,
} from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import authHeader from "@/components/authHeader/AuthHeader";
import dynamic from "next/dynamic";
import Posts from "@/components/manage/Post";

const EditorWithNoSSR = dynamic(() => import("@/components/Editor"), {
  ssr: false,
});

interface UserLocal {
  data: {
    data: {
      userId: string;
    };
  };
}

const Post = () => {
  const [tabs, setTabs] = useState(1);
  const [post, setPost] = useState<PostType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [categories, setCategories] = useState<Category[]>([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [cateId, setCateId] = useState<number | undefined>();
  // const [newPost, setNewPost] = useState<Category>();
  const getUserFromStorage = () => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
  };

  const user: UserLocal | null = getUserFromStorage();
  const userId = user?.data.data.userId;
  const newPost = {
    title,
    content,
    cateId,
    userId,
  };

  useEffect(() => {
    switch (tabs) {
      case 1:
        fetchPosts();
        break;
      case 2:
        fetchDeletedPosts();
        break;

      default:
        fetchPosts();
        break;
    }
    fetchCategories();
  }, [tabs]);

  //get all
  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}post/getAllPosts`
      );
      setPost(response.data.data);
    } catch (error) {}
  };

  //get all deleted
  const fetchDeletedPosts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}post/getAllDeletedPosts`
      );
      setPost(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  //get all categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}category/getAllCategories`,
        { headers: authHeader() }
      );
      setCategories(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  //add new post
  const handleSubmit = async () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_API}post/createPost`, newPost, {
        headers: authHeader(),
      })
      .then((response) => {
        toast.success("Tạo thành công");
        fetchPosts();
      });
  };

  //delete
  const handleDelete = async (postId: number) => {
    const isConfirmed = window.confirm(
      "Bạn có chắc muốn xóa bài viết này không?"
    );
    if (isConfirmed) {
      try {
        axios
          .delete(
            `${process.env.NEXT_PUBLIC_BASE_API}post/deletePost/${postId}`,
            {
              headers: authHeader(),
            }
          )
          .then(() => {
            toast.success("Xóa thành công");
            fetchPosts();
          }),
          {
            headers: authHeader(),
          };
      } catch (error) {
        console.log(error);
      }
    }
  };

  // restore
  const restoreDelete = async (postId: number) => {
    try {
      axios
        .put(
          `${process.env.NEXT_PUBLIC_BASE_API}post/restorePost/${postId}`,
          {},
          {
            headers: authHeader(),
          }
        )
        .then((response) => {
          toast.success("Khôi phục thành công");
          fetchDeletedPosts();
        });
    } catch (error) {
      console.log(error);
    }
  };

  ///update
  const handleUpdateSubmit = async (selectedPost: any) => {
    // if (!selectedRecruitment) return; // Check if a Recruitment is selected
    // Example: PUT request to update Recruitment details
    axios
      .put(
        `${process.env.NEXT_PUBLIC_BASE_API}post/updatePost/${selectedPost.id}`,
        {
          title: selectedPost.title,
          content: selectedPost.content,
          userId: selectedPost.userId,
          cateId: selectedPost.cateId,
        },
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        toast.success("Cập nhật thành công");
        fetchPosts();
      })
      .catch((error) => {
        console.error("Failed to update post", error);
      });
  };

  //search
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  // Filter partners based on search term
  const filteredPosts = post.filter((post) =>
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //pagination
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(filteredPosts.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredPosts.slice(start, end);
  }, [page, filteredPosts]);

  return (
    <div className="w-full mt-5 ml-5 mr-5">
      <ToastContainer />

      <div className="grid grid-cols-2">
        <h1 className="text-[#FF0004] font-bold text-3xl">Quản lí bài viết</h1>
      </div>
      <div className="flex justify-end">
        <Button
          className="flex justify-end w-[100px] bg-[#FF0004] text-white"
          radius="full"
          onPress={onOpen}
        >
          <FontAwesomeIcon icon={faPlus} />
          Tạo mới
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent className="w-[12000px] h-[900px] max-w-none">
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Thêm bài viết mới
                </ModalHeader>

                <ModalBody
                  style={{ maxHeight: "calc(100% - 100px)", overflowY: "auto" }}
                >
                  <form onSubmit={handleSubmit}>
                    <Input
                      className="font-bold pb-5"
                      type="text"
                      label="Tên bài viết"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <Select
                      // items={categories}
                      label="Chọn loại cho bài viết"
                      placeholder="Thể loại"
                      labelPlacement="outside"
                      className="font-bold"
                      onChange={(event) =>
                        setCateId(Number(event.target.value))
                      }
                    >
                      {categories.map((category) => (
                        <SelectItem
                          key={category.cateId}
                          value={category.cateId}
                        >
                          {category.cateName}
                        </SelectItem>
                      ))}
                    </Select>

                    <h2 className="font-bold mt-5">Nội dung cho bài viết</h2>
                    <EditorWithNoSSR
                      onChange={(data: string) => setContent(data)}
                    />
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Đóng
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      handleSubmit();
                      onClose;
                    }}
                    type="submit"
                  >
                    Thêm
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
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
          <Button
            className={`bg-white ${
              tabs === 2 &&
              "text-[#FF0004] border-b-[#FF0004] border-b-2 border-[#FF0004]"
            }`}
            radius="none"
            onClick={() => setTabs(2)}
          >
            ĐÃ XÓA
          </Button>
        </div>
      </div>

      <div>
        <Posts
          posts={post}
          handleDelete={handleDelete}
          restoreDelete={restoreDelete}
          handleUpdateSubmit={handleUpdateSubmit}
        />
      </div>
    </div>
  );
};

export default Post;
