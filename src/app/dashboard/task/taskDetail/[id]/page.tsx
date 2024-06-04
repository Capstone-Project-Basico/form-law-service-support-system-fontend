"use client";

import authHeader from "@/components/authHeader/AuthHeader";
import {
  ChildTaskType,
  CommentDataType,
  TaskAssignmentType,
  TaskType,
  UserLocal,
  UserType,
} from "@/constants/types/homeType";
import {
  Accordion,
  AccordionItem,
  Avatar,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPaperPlane, faPlus } from "@fortawesome/free-solid-svg-icons";
import ChildTasks from "@/components/manage/ChildTasks";
import { useParams } from "next/navigation";
import dateConvert from "@/components/dateConvert";
import Link from "next/link";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import useUser from "@/components/authHeader/User";

const TaskDetail = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenComment,
    onOpen: onOpenComment,
    onOpenChange: onOpenChangeComment,
  } = useDisclosure();
  const [tabs, setTabs] = useState(1);
  const params = useParams<{ id: string }>();
  const [mainTask, setMainTask] = useState<TaskType>();
  const [assignmentTask, setAssignmentTask] = useState<TaskAssignmentType[]>([]);
  const userInfo = useUser();

  //comment data
  const [commentsData, setCommentsData] = useState<CommentDataType[]>([]);
  const [comment, setComment] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const newCommentData = {
    comment,
    userEmail,
    taskId: params.id
  }
  //data
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [createBy, setCreateBy] = useState("");
  const [supportTo, setSupportTo] = useState("");
  // const [belongToTask, setBelongToTask] = useState("");

  const [task, setTask] = useState<ChildTaskType[]>([]);
  const [selectedTask, setSelectedTask] = useState<ChildTaskType | null>(null);
  let newChildTask = {
    taskName,
    description,
    startDate,
    endDate,
    createBy,
    supportTo,
    belongToTask: params.id,
  };

  const getUserFromStorage = () => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
  };

  const user: UserLocal | null = getUserFromStorage();
  const userId = user?.data.data.userId;

  useEffect(() => {
    if (userInfo && userInfo.email) {
      setUserEmail(userInfo.email);
    }
  }, [userInfo]);

  useEffect(() => {
    fetchTask();
    fetchAssignmentTask();
    switch (tabs) {
      case 1:
        fetchDetailTasks();
        break;
      case 2:
        fetchDoneDetailTasks();
        break;
      default:
        fetchDetailTasks();
        break;
    }
  }, [tabs]);

  useEffect(() => {
    getAllCommentByTaskId();
  }, [])

  //comment handling
  const getAllCommentByTaskId = () => {
    try {
      axios.get(`${process.env.NEXT_PUBLIC_BASE_API}taskComment/findAllTaskCommentByTask/${params.id}`,
        { headers: authHeader() }
      ).then((response) => {
        setCommentsData(response.data.data)
      })
        .catch((error) => {
          toast.error("Có lỗi xảy ra, vui lòng kiểm tra lại!")
        });
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng kiểm tra lại!");
    }
  }

  const handleComment = () => {
    try {
      axios.post(`${process.env.NEXT_PUBLIC_BASE_API}taskComment/createNewComment`,
        newCommentData,
        { headers: authHeader() }
      ).then((response) => {
        getAllCommentByTaskId();
      })
        .catch((error) => {
          toast.error("Có lỗi xảy ra, vui lòng kiểm tra lại!")
        });
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng kiểm tra lại!");
    }
  }

  //get all tasks
  const fetchTask = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}task-api/getTaskById/${params.id}`,
        {
          headers: authHeader(),
        }
      );
      setMainTask(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  //filter task assignments

  const fetchAssignmentTask = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}taskAssignment/getAllTaskAssignment`,
        {
          headers: authHeader(),
        }
      );
      setAssignmentTask(response.data.data.filter((task: TaskAssignmentType) => task.taskId === Number(params.id)));
      console.log(assignmentTask);

    } catch (error) {
      console.error(error);
    }
  };
  //get all items
  const fetchDetailTasks = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}taskParent/getTaskParentsByTaskId/${params.id}`,
        {
          headers: authHeader(),
        }
      );
      setTask(
        response.data.data.filter(
          (task: ChildTaskType) => task.processStatus === "CHƯA PHÂN CÔNG"
        )
      );
    } catch (error) {
      console.error(error);
    }
  };
  //fetch all done tasks
  const fetchDoneDetailTasks = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}taskParent/getTaskParentsByTaskId/${params.id}`,
        {
          headers: authHeader(),
        }
      );
      setTask(
        response.data.data.filter(
          (task: ChildTaskType) => task.processStatus === "ĐÃ HOÀN THÀNH"
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  // done
  const completeTask = async (id: number) => {
    Swal.fire({
      text: "Bạn đã hoàn thành nhiệm vụ này?",
      showDenyButton: true,
      confirmButtonText: "Có",
      denyButtonText: `Không`,
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios
            .put(
              `${process.env.NEXT_PUBLIC_BASE_API}taskParent/completeTaskParent/${id}`,
              {},
              {
                headers: authHeader(),
              }
            )
            .then((response) => {
              toast.success("Bạn đã hoàn thành 1 việc");
              fetchDetailTasks();
            });
        } catch (error) {
          console.log(error);
        }
      } else if (result.isDenied) {
        Swal.fire("Tiếp tục làm công việc này", "", "error");
        return;
      }
    });
  };

  return (
    <div className="w-full mt-5 ml-5 mr-5">
      <div className="grid grid-cols-2">
        <Breadcrumbs color="danger" size="lg" className="text-3xl w-[1000px]">
          <BreadcrumbItem>
            <Link href="/dashboard/task/">
              <p className="text-black font-bold text-3xl">Quản lí công việc</p>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <p className="text-[#FF0004] font-bold text-3xl">
              Chi tiết công việc
            </p>
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="flex justify-end gap-3">
        <Button
          className="flex justify-end w-[100px] bg-green-600 text-white"
          radius="full"
          onPress={onOpenComment}
        >
          <FontAwesomeIcon icon={faComment} />
          Bình luận
        </Button>
      </div>
      <Accordion defaultExpandedKeys={["2"]}>
        <AccordionItem
          key="2"
          title={<div className="font-bold bg-gray-300 rounded-md h-full w-96">Nhiệm vụ chính</div>}
        >
          <div className="gap-10 flex flex-col justify-start items-start text-2xl">
            <div className="flex">
              <h1 className="min-w-72">Tên nhiệm vụ:</h1>
              <h1 className="flex justify-start font-semibold text-[#FF0004]">
                {mainTask?.taskName
                  ? mainTask?.taskName
                  : "Nhiệm vụ này hiện không có tên"}
              </h1>
            </div>

            <div className="flex">
              <h1 className="min-w-72">Chi tiết nhiệm vụ:</h1>
              <h1 className="flex justify-start font-semibold text-[#FF0004] max-h-64 overflow-auto">
                {mainTask?.description}
              </h1>
            </div>

            <div className="flex">
              <h1 className="min-w-72">Người cần hỗ trợ:</h1>
              <h1 className="flex justify-start font-semibold text-[#FF0004]">
                {mainTask?.supportTo}
              </h1>
            </div>
            <div className="flex">
              <h1 className="min-w-72">Người chịu trách nhiệm:</h1>
              <h1 className="flex justify-start font-semibold text-[#FF0004]">
                {assignmentTask && assignmentTask[0]?.email}
              </h1>
            </div>

          </div>
        </AccordionItem>
      </Accordion>
      <div className="flex flex-row gap-10 font-bold border-b-1 ">
        <div>
          <Button
            className={`bg-white ${tabs === 1 && "text-[#FF0004] border-b-2 border-[#FF0004]"
              }`}
            onClick={() => setTabs(1)}
            radius="none"
          >
            ĐANG LÀM
          </Button>
        </div>

        <div>
          <Button
            className={`bg-white ${tabs === 2 &&
              "text-[#FF0004] border-b-[#FF0004] border-b-2 border-[#FF0004]"
              }`}
            radius="none"
            onClick={() => setTabs(2)}
          >
            ĐÃ LÀM XONG
          </Button>
        </div>
      </div>

      <div>
        <ChildTasks tasks={task ? task : []} completeTask={completeTask} />
      </div>

      {/* comment modal*/}
      <Modal isOpen={isOpenComment} onOpenChange={onOpenChangeComment} size="5xl">
        <ModalContent>
          <ModalHeader className="flex justify-center items-center">Tất cả bình luận</ModalHeader>

          {/* <div className="m-10"> */}
          <div className="gap-10 flex flex-col justify-start items-start border-1 max-h-[500px] p-10">
            <div className="overflow-auto w-full">
              {commentsData
                ? commentsData.map((data, key) => (
                  <div key={key} className="my-5 flex ">
                    <Avatar
                      // style={{ height: "20px" w}}
                      isBordered
                      as="button"
                      className="transition-transform h-10 w-10 ml-1 mr-5"
                      name="Jason Hughes"
                      size="lg"
                      src={
                        data?.avatar ? data?.avatar :
                          "/User-avatar.png"
                      }
                    />
                    <div className="flex flex-col bg-[#d8dce2] rounded-lg px-2">
                      <h1 className="font-bold">
                        {data?.userName}
                      </h1>
                      <p>
                        {data.comment}
                      </p>
                    </div>
                  </div>
                ))
                : <div className="flex justify-center items-center m-20">Hiện tại chưa có bình luận</div>}
            </div>
            <div className="flex max-h-full w-full px-5 justify-end">
              <Input className="" label="Bình luận về nhiệm vụ này" onChange={(e) => setComment(e.target.value)}></Input>
              <div>
                <Button onClick={() => handleComment()} className="h-full">
                  <FontAwesomeIcon icon={faPaperPlane} className="text-2xl" />
                </Button>
              </div>
            </div>
          </div>
          {/* </div> */}

        </ModalContent>
      </Modal>
    </div>
  );
};

export default TaskDetail;
