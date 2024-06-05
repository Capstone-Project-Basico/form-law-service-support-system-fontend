'use client';

import { Category, PostType } from '@/constants/types/homeType';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
} from '@nextui-org/react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { FormEvent, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import authHeader from '@/components/authHeader/AuthHeader';
import Posts from '@/components/manage/Post';
import { Editor } from 'primereact/editor';
import { encodeToBase64 } from '@/utils/base64';
import Swal from 'sweetalert2';

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
  const [searchTerm, setSearchTerm] = useState('');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [categories, setCategories] = useState<Category[]>([]);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [cateId, setCateId] = useState<number | undefined>();
  // const [newPost, setNewPost] = useState<Category>();
  const getUserFromStorage = () => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
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
        fetchPendingPosts();
        break;
      case 3:
        fetchDeletedPosts();
        break;

      default:
        fetchPosts();
        break;
    }
    fetchCategories();
  }, [tabs]);

  const handleEditorChange = (e: any) => {
    // Assuming e.htmlValue contains the actual HTML content from the editor
    const encodedContent = encodeToBase64(e.htmlValue || '');
    setContent(encodedContent);
  };

  //get all
  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}post/findAllActivePost`
      );
      setPost(response.data.data);
    } catch (error) {}
  };

  //get all pending posts
  const fetchPendingPosts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}post/getAllPosts`
      );
      const filteredPosts = response.data.data.filter(
        (post: PostType) =>
          post.processStatus === 'CHỜ DUYỆT' && post.deleted === false
      );
      setPost(filteredPosts);
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
  const handleSubmit = async (e: FormEvent, onClose: () => void) => {
    e.preventDefault();
    try {
      await axios
        .post(`${process.env.NEXT_PUBLIC_BASE_API}post/createPost`, newPost, {
          headers: authHeader(),
        })
        .then((response) => {
          toast.success('Tạo bài viết thành công');
          fetchPosts();
          onOpenChange();
          onClose();
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  //delete
  const handleDelete = async (postId: number) => {
    Swal.fire({
      title: 'Bạn có muốn xóa bài viết này không?',
      showDenyButton: true,
      confirmButtonText: 'Có',
      denyButtonText: `Không`,
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios
            .delete(
              `${process.env.NEXT_PUBLIC_BASE_API}post/deletePost/${postId}`,
              {
                headers: authHeader(),
              }
            )
            .then(() => {
              toast.success('Xóa thành công');
              if (tabs === 1) {
                fetchPosts();
              } else {
                fetchPendingPosts();
              }
            })
            .catch(() => {
              toast.error('Xóa thất bại');
            });
        } catch (error) {
          console.log(error);
        }
      } else if (result.isDenied) {
        Swal.fire('Bạn đã hủy xóa', '', 'error');
        return;
      }
    });
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
          toast.success('Khôi phục thành công');
          fetchDeletedPosts();
        })
        .catch((error) => {
          toast.error('Khôi phục thất bại');
        });
    } catch (error) {
      console.log(error);
    }
  };

  // approve
  const handleApprove = async (postId: number) => {
    try {
      axios
        .put(
          `${process.env.NEXT_PUBLIC_BASE_API}post/approvePost/${postId}`,
          {},
          {
            headers: authHeader(),
          }
        )
        .then((response) => {
          toast.success('Bài viết đã được duyệt');
          fetchPosts();
        })
        .catch((error) => {
          toast.error('Duyệt thất bại');
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
        `${process.env.NEXT_PUBLIC_BASE_API}post/updatePost/${selectedPost.postId}`,
        {
          title: selectedPost.title,
          content: selectedPost.content,
          userId: userId,
          cateId: selectedPost.cateId,
        },
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        toast.success('Cập nhật thành công');
        fetchPendingPosts();
      })
      .catch((error) => {
        toast.error('Thất bại, vui lòng điền đầy đủ thông tin');
        console.error('Failed to update post', error);
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

  // unApprove
  const unApprove = async (id: number) => {
    try {
      axios
        .put(
          `${process.env.NEXT_PUBLIC_BASE_API}post/unApprovePost/${id}`,
          {},
          { headers: authHeader() }
        )
        .then((response) => {
          toast.success('Bạn đã chuyển bài viết này sang chờ duyệt');
          fetchPosts();
        });
    } catch (error) {
      toast.error('Chuyển sang chờ duyệt thất bại');
      console.log(error);
    }
  };
  return (
    <div className="ml-5 mr-5 mt-5 w-full">
      <ToastContainer />
      <div className="grid grid-cols-2">
        <Breadcrumbs color="danger" size="lg" className="text-3xl">
          <BreadcrumbItem>
            <p className="text-3xl font-bold text-black ">Quản lí bài viết</p>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <p className="text-3xl font-bold text-[#FF0004]">Bài viết</p>
          </BreadcrumbItem>
        </Breadcrumbs>

        <div className="flex justify-end">
          <Button
            className="flex w-[100px] justify-end bg-[#FF0004] text-white"
            radius="full"
            onPress={onOpen}
          >
            <FontAwesomeIcon icon={faPlus} />
            Tạo mới
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton>
            <ModalContent className="h-[800px] w-[1200px] max-w-none">
              {(onClose) => (
                <>
                  <form onSubmit={(e) => handleSubmit(e, onClose)}>
                    <ModalHeader className="mb-5 flex flex-col gap-1 bg-[#FF0004] text-2xl font-bold text-white">
                      Thêm bài viết mới
                    </ModalHeader>

                    <ModalBody
                      style={{
                        maxHeight: 'calc(100% - 100px)',
                        overflowY: 'auto',
                      }}
                    >
                      <Input
                        className="pb-5 font-bold"
                        isRequired
                        type="text"
                        label="Tên bài viết"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <Select
                        // items={categories}
                        label="Chọn loại cho bài viết"
                        isRequired
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

                      <h2 className="mt-5 font-bold">Nội dung cho bài viết</h2>
                      <Editor
                        value={content}
                        required
                        onTextChange={(e) => handleEditorChange(e)}
                        style={{ height: '350px' }}
                      />
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Đóng
                      </Button>
                      <Button color="primary" type="submit">
                        Thêm bài viết
                      </Button>
                    </ModalFooter>
                  </form>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>
      <div className="flex flex-row gap-10 border-b-1 font-bold ">
        <div>
          <Button
            className={`bg-white ${
              tabs === 1 && 'border-b-2 border-[#FF0004] text-[#FF0004]'
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
              tabs === 2 && 'border-b-2 border-[#FF0004] text-[#FF0004]'
            }`}
            onClick={() => setTabs(2)}
            radius="none"
          >
            CHỜ DUYỆT
          </Button>
        </div>

        <div>
          <Button
            className={`bg-white ${
              tabs === 3 &&
              'border-b-2 border-[#FF0004] border-b-[#FF0004] text-[#FF0004]'
            }`}
            radius="none"
            onClick={() => setTabs(3)}
          >
            KHÔNG SỬ DỤNG
          </Button>
        </div>
      </div>
      <div>
        <Posts
          posts={post}
          unApprove={unApprove}
          tabs={tabs}
          handleDelete={handleDelete}
          restoreDelete={restoreDelete}
          handleApprove={handleApprove}
          handleUpdateSubmit={handleUpdateSubmit}
          categories={categories}
        />
      </div>
    </div>
  );
};

export default Post;
