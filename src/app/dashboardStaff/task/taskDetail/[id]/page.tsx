"use client";

import authHeader from "@/components/authHeader/AuthHeader";
import {
  ChildTaskType,
  TaskAssignmentType,
  TaskType,
  UserLocal,
} from "@/constants/types/homeType";
import {
  Accordion,
  AccordionItem,
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
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPlus } from "@fortawesome/free-solid-svg-icons";
import ChildTasks from "@/components/staff/ChildTasks";
import { useParams } from "next/navigation";
import dateConvert from "@/components/dateConvert";
import Link from "next/link";

const TaskDetail = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenDetail,
    onOpen: onOpenDetail,
    onClose: onCloseDetail,
  } = useDisclosure();
  const [tabs, setTabs] = useState(1);
  const params = useParams<{ id: string }>();
  const [taskAssignment, setTaskAssignment] = useState<TaskAssignmentType>();
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
    fetchAssignTask();
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

  const fetchAssignTask = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}taskAssignment/getTaskAssignmentById/${params.id}`,
        {
          headers: authHeader(),
        }
      );
      setTaskAssignment(response.data.data);
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
      title: "Bạn đã hoàn thành nhiệm vụ này?",
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

  //add a new child task
  const handleSubmit = async (e: FormEvent, onClose: () => void) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BASE_API}taskParent/createNewTaskParent`,
        newChildTask,
        { headers: authHeader() }
      )
      .then((response) => {
        toast.success("tạo mới thành công");
        onClose();
        fetchDetailTasks();
      })
      .catch((error) => {
        toast.error("Tạo mới thất bại");
        console.log(error);
      });
  };

  return (
    <div className="w-full mt-5 ml-5 mr-5">
      <div className="grid grid-cols-2">
        <Breadcrumbs color="danger" size="lg" className="text-3xl w-[1000px]">
          <BreadcrumbItem>
            <Link href="/dashboardStaff/task/">
              <p className="text-black font-bold text-3xl">Quản lí công việc</p>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <p className="text-[#FF0004] font-bold text-3xl">
              Chi tiết công việc
            </p>
          </BreadcrumbItem>
        </Breadcrumbs>
        <div className="flex justify-end gap-3">
          <Button
            className="flex justify-end w-[180px] bg-[#FF0004] text-white"
            radius="full"
            onPress={onOpenDetail}
          >
            <FontAwesomeIcon icon={faEye} />
            Xem nhiệm vụ chính
          </Button>
          <Button
            className="flex justify-end w-[100px] bg-[#FF0004] text-white"
            radius="full"
            onPress={onOpen}
          >
            <FontAwesomeIcon icon={faPlus} />
            Tạo mới
          </Button>
        </div>
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
            ĐANG LÀM
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
            ĐÃ LÀM XONG
          </Button>
        </div>
      </div>

      <div>
        <ChildTasks tasks={task ? task : []} completeTask={completeTask} />
      </div>

      {/* create new */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton>
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={(e) => handleSubmit(e, onClose)}>
                <ModalHeader className="flex flex-col gap-1 text-white text-2xl font-bold bg-[#FF0004] mb-5">
                  Thêm nhiệm vụ
                </ModalHeader>
                <ModalBody>
                  <Input
                    isRequired
                    className="font-bold"
                    type="text"
                    label="Tên nhiệm vụ"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                  />
                  <Input
                    type="text"
                    label="Chi tiết"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <Input
                    isRequired
                    type="date"
                    label="Ngày bắt đầu"
                    value={startDate ? startDate.substring(0, 10) : ""}
                    onChange={(e) => {
                      const dateValue = e.target.value
                        ? dateConvert(new Date(e.target.value))
                        : null;
                      setStartDate(dateValue);
                    }}
                    className="form-input"
                  />
                  <Input
                    type="date"
                    label="Ngày kết thúc"
                    value={endDate ? endDate.substring(0, 10) : ""}
                    onChange={(e) => {
                      const dateValue = e.target.value
                        ? dateConvert(new Date(e.target.value))
                        : null;
                      setEndDate(dateValue);
                    }}
                    className="form-input"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Đóng
                  </Button>
                  <Button color="primary" type="submit">
                    Thêm
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* view detail  */}
      <Modal
        isOpen={isOpenDetail}
        onClose={onCloseDetail}
        hideCloseButton
        size="5xl"
      >
        <ModalContent>
          {(onCloseDetail) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-white text-2xl font-bold bg-[#FF0004] mb-5">
                Chi tiết nhiệm vụ chính
              </ModalHeader>
              <ModalBody>
                <div className="gap-10 flex flex-col justify-start items-start text-2xl">
                  <div className="flex">
                    <h1 className="min-w-72">Tên nhiệm vụ:</h1>
                    <h1 className="flex justify-start font-semibold text-[#FF0004]">
                      {taskAssignment?.taskName
                        ? taskAssignment?.taskName
                        : "Nhiệm vụ này hiện không có tên"}
                    </h1>
                  </div>

                  <div className="flex">
                    <h1 className="min-w-72">Chi tiết nhiệm vụ:</h1>
                    <h1 className="flex justify-start font-semibold text-[#FF0004] max-h-64 overflow-auto">
                      {taskAssignment?.taskDescription}
                    </h1>
                  </div>

                  <div className="flex">
                    <h1 className="min-w-72">Ngày đáo hạn:</h1>
                    <h1 className="flex justify-start font-semibold text-[#FF0004]">
                      {taskAssignment?.dueDate.substring(0, 10)}
                    </h1>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onCloseDetail}>
                  Đóng
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default TaskDetail;