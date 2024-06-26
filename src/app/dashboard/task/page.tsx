"use client";

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
  DatePicker,
  Textarea,
} from "@nextui-org/react";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { TaskType, UserType } from "@/constants/types/homeType";
import authHeader from "@/components/authHeader/AuthHeader";
import { ToastContainer, toast } from "react-toastify";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
  StorageReference,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "@/app/firebase";
import Tasks from "@/components/manage/Task";
import { v4 as uuidv4 } from "uuid";
import { headers } from "next/headers";
import dateConvert from "@/components/dateConvert";
import useUser from "@/components/authHeader/User";
import Loading from "@/components/loading";

const Task = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [tabs, setTabs] = useState(1);
  const [isLoading, setIsLoading] = useState<boolean>();

  //data
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [createBy, setCreateBy] = useState("");
  const todayDate = new Date().toISOString().substring(0, 10);

  const [task, setTask] = useState<TaskType[]>([]);
  const [staffs, setStaffs] = useState<UserType[]>([]);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);

  let newTask = {
    taskName,
    description,
    startDate,
    endDate,
    createBy
  };
  const userInfo = useUser();
  useEffect(() => {
    if (userInfo && userInfo.email) {
      setCreateBy(userInfo.email);
    }
  }, [userInfo]);

  useEffect(() => {
    switch (tabs) {
      case 1:
        fetchTask();
        break;
      case 2:
        fetchDoneTask();
        break;
      case 3:
        fetchDeletedTask();
        break;
      default:
        fetchTask();
        break;
    }
    fetchStaff();
  }, [tabs]);

  //get all items
  const fetchTask = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}task-api/getAllTask`,
        {
          headers: authHeader(),
        }
      );
      setTask(response.data.data.filter((task: TaskType) => task.processStatus !== "ĐÃ HOÀN THÀNH"));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDoneTask = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}task-api/getAllTask`,
        {
          headers: authHeader(),
        }
      );
      setTask(response.data.data.filter((task: TaskType) => task.processStatus === "ĐÃ HOÀN THÀNH"));
    } catch (error) {
      console.error(error);
    }
  };

  //get all deleted items
  const fetchDeletedTask = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}task-api/getAllDeletedTask`,
        {
          headers: authHeader(),
        }
      );
      setTask(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  //get all staffs
  const fetchStaff = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}user/getAllStaffs`,
        {
          headers: authHeader(),
        }
      );
      setStaffs(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  //delete
  const handleDelete = async (id: number) => {
    const isConfirmed = window.confirm(
      "Bạn có chắc muốn xóa công việc này không?"
    );
    if (isConfirmed) {
      try {
        axios
          .delete(
            `${process.env.NEXT_PUBLIC_BASE_API}task-api/deleteTask/${id}`,
            {
              headers: authHeader(),
            }
          )
          .then(() => {
            toast.success("Xóa thành công");
            fetchTask();
          })
          .catch(err => {
            toast.success("Xóa thất bại");
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  //update
  const handleUpdateSubmit = async (selectedTask: any, onClose: () => void) => {
    if (startDate && endDate) {
      let start = new Date(startDate);
      let end = new Date(endDate);

      // Make sure start date is before end date
      if (start >= end) {
        toast.error('Ngày kết thúc phải sau ngày bắt đầu!');
        return;
      }
    }
    try {
      axios
        .put(
          `${process.env.NEXT_PUBLIC_BASE_API}task-api/updateTask/${selectedTask.id}`,
          {
            taskName: selectedTask.taskName,
            description: selectedTask.description,
            startDate: selectedTask.startDate,
            endDate: selectedTask.endDate,
          },
          {
            headers: authHeader(),
          }
        )
        .then((response) => {
          toast.success("Cập nhật thành công");
          fetchTask();
          onClose();
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.log(error);

    }

  };

  const handleTaskAssignSubmit = async (
    selectedTask: any,
    staffId: number,
    endDate: Date
  ) => {
    setIsLoading(true);
    try {
      let dueDate = dateConvert(endDate);

      await axios
        .post(
          `${process.env.NEXT_PUBLIC_BASE_API}taskAssignment/createNewTaskAssignment`,
          {
            taskId: selectedTask.id,
            userId: staffId,
            dueDate: dueDate,
          },
          { headers: authHeader() }
        )
        .then((response) => {
          fetchTask()
          toast.success("Giao việc thành công");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);

  };

  // restore
  const restoreDelete = async (id: number) => {
    try {
      axios
        .put(
          `${process.env.NEXT_PUBLIC_BASE_API}task/restoreTask/${id}`,
          {},
          {
            headers: authHeader(),
          }
        )
        .then((response) => {
          toast.success("Khôi phục thành công");
          fetchDeletedTask();
        });
    } catch (error) {
      console.log(error);
    }
  };

  //add a new task
  const handleSubmit = async (e: FormEvent, onClose: () => void) => {
    e.preventDefault();
    if (startDate && endDate) {
      let start = new Date(startDate);
      let end = new Date(endDate);

      // Make sure start date is before end date
      if (start >= end) {
        toast.error('Ngày kết thúc phải sau ngày bắt đầu!');
        return;
      }
    }
    try {
      axios
        .post(`${process.env.NEXT_PUBLIC_BASE_API}task-api/createNewTask`, newTask, {
          headers: authHeader(),
        })
        .then((response) => {
          setTaskName("");
          setDescription("");
          setStartDate(null);
          setEndDate(null);
          toast.success("Tạo mới thành công");
          onClose();
          fetchTask();
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div className="w-full mt-5 ml-5 mr-5">
      {isLoading && (
        <Loading className="fixed left-0 top-0 z-[100] h-full w-full bg-white bg-opacity-50" />
      )}
      <div className="grid grid-cols-2">
        <Breadcrumbs color="danger" size="lg" className="text-3xl">
          <BreadcrumbItem>
            <p className="text-black font-bold text-3xl ">Quản lí công việc</p>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <p className="text-[#FF0004] font-bold text-3xl">Công việc</p>
          </BreadcrumbItem>
        </Breadcrumbs>

        <div className="flex justify-end">
          <Button
            className="flex justify-end w-[100px] bg-[#FF0004] text-white"
            radius="full"
            onPress={onOpen}
          >
            <FontAwesomeIcon icon={faPlus} />
            Tạo mới
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton>
            <ModalContent>
              {(onClose) => (
                <>
                  <form onSubmit={(e) => handleSubmit(e, onClose)}>
                    <ModalHeader className="flex flex-col gap-1 text-white text-2xl font-bold bg-[#FF0004] mb-5">
                      Thêm công việc
                    </ModalHeader>
                    <ModalBody>
                      <Input
                        isRequired
                        className="font-bold"
                        type="text"
                        label="Tên công việc"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                      />
                      <Textarea
                        isRequired
                        type="text"
                        label="Mô tả"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />

                      <Input
                        isRequired
                        required
                        type="date"
                        label="Ngày bắt đầu"
                        value={startDate ? startDate.substring(0, 10) : ""}
                        onChange={(e) => {
                          const dateValue = e.target.value
                            ? dateConvert(new Date(e.target.value))
                            : null;
                          setStartDate(dateValue);
                          // console.log(e.target.value);
                          // console.log(dateValue?.substring(0, 10));
                        }}
                        min={todayDate}
                        className="form-input"
                      />

                      {/* Ngày kết thúc */}
                      <Input
                        isRequired
                        type="date"
                        label="Ngày kết thúc"
                        value={endDate ? endDate.substring(0, 10) : ""}
                        onChange={(e) => {
                          const dateValue = e.target.value
                            ? dateConvert(new Date(e.target.value))
                            : null;
                          setEndDate(
                            // e.target.value ? new Date(e.target.value) : null
                            dateValue
                          );
                        }}
                        min={todayDate}
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
        </div>
      </div>

      <div className="flex flex-row gap-10 font-bold border-b-1 ">

        <Button
          className={`bg-white ${tabs === 1 && "text-[#FF0004] border-b-2 border-[#FF0004]"
            }`}
          onClick={() => setTabs(1)}
          radius="none"
        >
          TẤT CẢ
        </Button>

        <Button
          className={`bg-white ${tabs === 2 && "text-[#FF0004] border-b-2 border-[#FF0004]"
            }`}
          onClick={() => setTabs(2)}
          radius="none"
        >
          ĐÃ HOÀN THÀNH
        </Button>

        <Button
          className={`bg-white ${tabs === 3 &&
            "text-[#FF0004] border-b-[#FF0004] border-b-2 border-[#FF0004]"
            }`}
          radius="none"
          onClick={() => setTabs(3)}
        >
          KHÔNG SỬ DỤNG
        </Button>

      </div>

      <div>
        <Tasks
          tasks={task}
          staffs={staffs}
          tabs={tabs}
          handleDelete={handleDelete}
          restoreDelete={restoreDelete}
          handleUpdateSubmit={handleUpdateSubmit}
          handleTaskAssignSubmit={handleTaskAssignSubmit}
        />
      </div>
    </div>
  );
};

export default Task;
