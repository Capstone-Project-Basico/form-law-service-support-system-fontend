import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
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
import { usePathname } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { Category, PostType } from "@/constants/types/homeType";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/app/firebase";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
const EditorWithNoSSR = dynamic(() => import("@/components/Editor"), {
  ssr: false,
});
type PostsProps = {
  posts: PostType[];
  handleDelete: (id: number) => void;
  restoreDelete: (id: number) => void;
  handleUpdateSubmit: (data: any) => void;
  categories: Category[];
};

const Posts: React.FC<PostsProps> = ({
  posts,
  handleDelete,
  restoreDelete,
  handleUpdateSubmit,
  categories,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
  } = useDisclosure();

  //upload file
  // const [imageUrls, setImageUrls] = useState<string[]>([]);
  // const [imageUrl, setImageUrl] = useState<string>();

  //search
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  // Filter post based on search title
  const filteredPosts = posts.filter((post) =>
    (post.title || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  //pagination
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const pages = Math.ceil(filteredPosts.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredPosts.slice(start, end);
  }, [page, filteredPosts]);

  return (
    <div>
      {/* <ToastContainer /> */}
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
            Tên bài viết
          </TableColumn>
          {/* <TableColumn className=" bg-[#FF0004] text-white">
            Nôi dung
          </TableColumn> */}

          <TableColumn className=" bg-[#FF0004] text-white">
            Người tạo
          </TableColumn>
          <TableColumn className=" bg-[#FF0004] text-white">Loại</TableColumn>
          <TableColumn className=" bg-[#FF0004] text-white">
            Trạng thái
          </TableColumn>
          <TableColumn className="flex justify-center items-center bg-[#FF0004] text-white">
            Tương tác
          </TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((post, index) => (
            <TableRow key={index}>
              <TableCell>
                {post.title ? (
                  post.title
                ) : (
                  <p className="text-[#FF0004]">Bài viết này chưa có tên</p>
                )}
              </TableCell>
              {/* <TableCell>{post.content}</TableCell> */}

              <TableCell>{post.userName}</TableCell>
              <TableCell>{post.cateName}</TableCell>
              <TableCell>
                <span style={{ color: post.deleted ? "red" : "green" }}>
                  {post.deleted ? "Không sử dụng" : "Đang hoạt động"}
                </span>
              </TableCell>
              {post.deleted === false ? (
                <TableCell className="flex gap-2 items-center  justify-center ">
                  <Button
                    className="bg-blue-600 text-white"
                    onPress={() => {
                      setSelectedPost(post);
                      console.log(post);

                      onOpenUpdate();
                    }}
                  >
                    Cập nhật
                  </Button>

                  <Button
                    className="bg-[#FF0004] text-white"
                    onClick={() => handleDelete(post.postId)}
                  >
                    Xóa
                  </Button>
                  <Button
                    className="bg-green-600 text-white"
                    onClick={() => {
                      setSelectedPost(post);
                      onOpen();
                    }}
                  >
                    Chi tiết
                  </Button>
                </TableCell>
              ) : (
                <TableCell className="flex gap-2 items-center justify-center">
                  <Button
                    className="bg-blue-600 text-white"
                    onClick={() => {
                      debugger;
                      restoreDelete(post.postId);
                    }}
                  >
                    Khôi phục
                  </Button>
                  <Button
                    className="bg-green-600 text-white"
                    onClick={() => {
                      setSelectedPost(post);
                      onOpen();
                    }}
                  >
                    Chi tiết
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* detail modal */}
      <Modal isOpen={isOpen} onClose={onClose} hideCloseButton>
        <ModalContent
          style={{ width: "90%", maxWidth: "8000px", height: "90%" }}
        >
          <ModalHeader className="flex flex-col gap-1 text-white text-2xl font-bold bg-[#FF0004] mb-5">
            Chi tiết
          </ModalHeader>
          <ModalBody
            style={{ maxHeight: "calc(100% - 100px)", overflowY: "auto" }}
          >
            {selectedPost && (
              <div className="flex flex-col gap-10">
                <div className="flex flex-row ">
                  <p className="w-40 font-semibold">Tên bài viết:</p>
                  <p className="pl-10">{selectedPost.title}</p>
                </div>

                <div className="flex flex-row ">
                  <p className="w-40 font-semibold">Người tạo:</p>
                  <p className="pl-10">{selectedPost.userName}</p>
                </div>

                <div className="flex flex-row ">
                  <p className="w-40 font-semibold">Loại:</p>
                  <p className="pl-10">{selectedPost.cateName}</p>
                </div>

                <div className="flex flex-col ">
                  <p className="w-40 pb-3 font-semibold">Nội dung:</p>
                  <div
                    className="pl-10 content-div border-2 "
                    dangerouslySetInnerHTML={{
                      __html: selectedPost.content || "",
                    }}
                  ></div>
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              className="button-danger bg-[#FF0004] text-white"
              onPress={onClose}
            >
              Đóng
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* update modal */}
      <Modal isOpen={isOpenUpdate} onClose={onCloseUpdate} hideCloseButton>
        <ModalContent className="w-[12000px] h-[900px] max-w-none">
          <ModalHeader className="flex flex-col gap-1 text-white text-2xl font-bold bg-[#FF0004] mb-5">
            Cập nhật liên hệ
          </ModalHeader>
          <ModalBody
            style={{ maxHeight: "calc(100% - 100px)", overflowY: "auto" }}
          >
            {selectedPost && (
              <form
                id="post"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdateSubmit(selectedPost);
                  onCloseUpdate();
                }}
              >
                <Input
                  className="py-2"
                  type="text"
                  label="Tên bài viết"
                  value={selectedPost.title}
                  onChange={(e) =>
                    setSelectedPost({
                      ...selectedPost,
                      title: e.target.value,
                    })
                  }
                />
                <Select
                  label="Chọn loại cho bài viết"
                  placeholder="Thể loại"
                  labelPlacement="outside"
                  className="font-bold"
                  defaultSelectedKeys={[selectedPost.cateId]}
                  onChange={(e) =>
                    setSelectedPost({
                      ...selectedPost,
                      cateId: e.target.value,
                    })
                  }
                >
                  {categories.map((category) => (
                    <SelectItem key={category.cateId} value={category.cateId}>
                      {category.cateName}
                    </SelectItem>
                  ))}
                </Select>
                <h2 className="font-bold mt-5">Nội dung cho bài viết</h2>
                <EditorWithNoSSR
                  onChange={(data: string) =>
                    setSelectedPost({
                      ...selectedPost,
                      content: data,
                    })
                  }
                  initialData={selectedPost.content}
                />
              </form>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onCloseUpdate}>
              Đóng
            </Button>
            <Button color="primary" type="submit" form="post">
              Cập nhật
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Posts;
