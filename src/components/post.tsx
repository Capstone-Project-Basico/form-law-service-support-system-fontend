"use client";

import Side from "@/components/side";
import { Category, PostType, UserLocal } from "@/constants/types/homeType";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card } from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import authHeader from "./authHeader/AuthHeader";
import Swal from "sweetalert2";

type TasksProps = {
    cateName: string;
};

const PostComponent: React.FC<TasksProps> = ({ cateName }) => {
    const [posts, setPosts] = useState<PostType[]>([]);
    const router = useRouter();

    const getUserFromStorage = () => {
        if (typeof window !== "undefined") {
            const storedUser = localStorage.getItem("user");
            return storedUser ? JSON.parse(storedUser) : null;
        }
    };

    const user: UserLocal | null = getUserFromStorage();
    const userId = user?.data.data.userId;

    //data
    const [categoryId, setCategoryId] = useState();

    const data = {
        userId,
        categoryId
    }
    useEffect(() => {
        getCateId();
        getAllPosts();
    }, []);

    const getAllPosts = () => {
        try {
            axios
                .get(
                    `${process.env.NEXT_PUBLIC_BASE_API}post/findPostByCateName?cateName=${cateName}`
                )
                .then((response) => {
                    setPosts(response.data.data);
                }).catch((error) => { });
        } catch (error) {
            console.log(error);

        }

    };

    const getCateId = () => {
        try {
            axios
                .get(
                    `${process.env.NEXT_PUBLIC_BASE_API}category/getAllCategories`
                )
                .then((response) => {
                    const category = response.data.data.filter((category: Category) => category.cateName === cateName)
                    setCategoryId(category[0].cateId)
                }).catch((error) => { });
        } catch (error) {
            console.log(error);

        }
    }

    const likePost = () => {
        try {
            if (!user) {
                Swal.fire({
                    text: 'Bạn chưa đăng nhập, bạn có muốn đăng nhập?',
                    showDenyButton: true,
                    confirmButtonText: 'Có',
                    confirmButtonColor: '#00BB00',
                    denyButtonText: `Không`,
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.push('/login');
                    } else if (result.isDenied) {
                        Swal.fire('Bạn cần đăng nhập để sử dụng tính năng này', '', 'info');
                        return;
                    }
                });
                return;
            } else {
                axios.put(`${process.env.NEXT_PUBLIC_BASE_API}userCategory/likeCategory`,
                    data,
                    { headers: authHeader() }
                )
                    .then((response) => {
                        toast.success("Bạn sẽ nhận được thông báo liên quan đến nội dung này");
                    })
                    .catch((error) => {
                        toast.error("Đã xảy ra lỗi vui lòng kiểm tra lại sau!");
                    });

            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi vui lòng kiểm tra lại sau!");
        }
    }


    const dislikePost = () => {

    }

    return (
        <>
            <ToastContainer />
            <div className="flex pt-20 bg-white text-black px-20">
                <Side />
                <div className="grid grid-cols-4 w-[1100px] gap-10">
                    {posts.map((post) => (
                        <Card
                            isPressable
                            key={post.postId}
                            className="px-[15px] w-[250px] h-[300px]"
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
                                <div className="py-2 text-xs">Tháng Sáu 20, 2020</div>
                            </div>
                            <FontAwesomeIcon icon={faComment} className="size-4 ml-1" />
                            <hr />
                        </Card>
                    ))}
                </div>
                <Button
                    variant="faded"
                    className="bg-white border-[#FF0004] text-[#FF0004]"
                    onClick={() => likePost()}
                >
                    Yêu thích <FontAwesomeIcon icon={faHeart} />
                </Button>
            </div>
        </>
    );
};

export default PostComponent;
