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
import { ToastContainer } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import authHeader from "@/components/authHeader/AuthHeader";

const Post = () => {
  const [tabs, setTabs] = useState(1);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    switch (tabs) {
      case 1:
        fetchPosts();
        break;
      case 2:
        console.log("dang cho duyet ne");
        break;
      case 3:
        fetchDeletedPosts();
        break;
      default:
        // fetchPartners();
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
      setPosts(response.data.data);
    } catch (error) {}
  };

  //get all deleted
  const fetchDeletedPosts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}post/getAllDeletedPosts`
      );
      setPosts(response.data.data);
      // setPartners((prevPartners) => [...prevPartners, response.data.data]);
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

  //search
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  // Filter partners based on search term
  const filteredPartners = posts.filter((post) =>
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //pagination
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(filteredPartners.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredPartners.slice(start, end);
  }, [page, filteredPartners]);

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
          <ModalContent className="w-[900px] h-[400px] max-w-none">
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Thêm bài viết mới
                </ModalHeader>
                <ModalBody>
                  <Select
                    items={categories}
                    label="Chọn loại cho bài viết"
                    placeholder="Thể loại"
                    labelPlacement="outside"
                    className="max-w-xs"
                  >
                    {(category) => (
                      <SelectItem
                        key={category.cateId}
                        textValue={category.cateName}
                      >
                        <div className="flex gap-2 items-center">
                          <div className="flex flex-col">
                            <span className="text-small">
                              {category.cateName}
                            </span>
                          </div>
                        </div>
                      </SelectItem>
                    )}
                  </Select>
                  <CKEditor
                    editor={ClassicEditor}
                    data="<p>Thêm nội dung vào đây để tạo bài viết!</p>"
                    onReady={(editor) => {
                      // You can use the editor instance here
                      console.log("Editor is ready to use!", editor);
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      console.log({ event, editor, data });
                    }}
                    onBlur={(event, editor) => {
                      console.log("Blur.", editor);
                    }}
                    onFocus={(event, editor) => {
                      console.log("Focus.", editor);
                    }}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Đóng
                  </Button>
                  <Button color="primary" onPress={onClose} type="submit">
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
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <Table
        aria-label="Example static collection table"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
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
          <TableColumn className=" bg-[#FF0004] text-white">
            Người tạo
          </TableColumn>
          <TableColumn className=" bg-[#FF0004] text-white">Loại</TableColumn>
          <TableColumn className="flex justify-center items-center bg-[#FF0004] text-white">
            Tương tác
          </TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((post, index) => (
            <TableRow key={index}>
              <TableCell>{post.content}</TableCell>
              <TableCell>
                <span style={{ color: post.delete ? "red" : "green" }}>
                  {post.delete ? "Không sử dụng" : "Đang hoạt động"}
                </span>
              </TableCell>
              <TableCell>{post.userName}</TableCell>
              <TableCell>{post.cateName}</TableCell>
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
