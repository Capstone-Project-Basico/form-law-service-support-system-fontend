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

const Task = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [tabs, setTabs] = useState(1);
  //data
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [processStatus, setProcessStatus] = useState("");

  const [task, setTask] = useState<TaskType[]>([]);
  const [staffs, setStaffs] = useState<UserType[]>([]);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
  let newTask = {
    taskName,
    description,
    startDate,
    endDate,
  };

  useEffect(() => {
    switch (tabs) {
      case 1:
        fetchTask();
        break;
      case 2:
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
      setTask(response.data.data);
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
          }),
          {
            headers: authHeader(),
          };
      } catch (error) {
        console.log(error);
      }
    }
  };

  //update
  const handleUpdateSubmit = async (selectedTask: any) => {
    //if (!selectedTask) return; // Check if a Task is selected

    // Example: PUT request to update Task details
    axios
      .put(
        `${process.env.NEXT_PUBLIC_BASE_API}task-api/updateTask/${selectedTask.id}`,
        {
          taskName: selectedTask.taskName,
          description: selectedTask.description,
          startDate: selectedTask.startDate,
          endDate: selectedTask.endDate,
          // processStatus: selectedTask.processStatus,
        },
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        toast.success("Cập nhật thành công");
        fetchTask();
      })
      .catch((error) => {
        toast.error("Cập nhật thất bại");
        console.error("Failed to update partner", error);
      });
  };

  const handleTaskAssignSubmit = async (
    selectedTask: any,
    staffId: number,
    endDate: Date
  ) => {
    try {
      let dueDate = dateConvert(endDate);

      axios
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
          toast.success("Giao việc thành công");
        });
    } catch (error) {
      toast.error("Giao việc thất bại");
    }
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

    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_API}task/createNewTask`, newTask, {
        headers: authHeader(),
      })
      .then((response) => {
        setTaskName("");
        setDescription("");
        setStartDate(null);
        setEndDate(null);
        setProcessStatus("");

        setTask((prevTasks) => [...prevTasks, response.data.data]);
        toast.success("Tạo mới thành công");
        onClose();
        fetchTask();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Tạo mới thất bại");
      });
  };

  return (
    <div className="w-full mt-5 ml-5 mr-5">
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
                        className="font-bold"
                        type="text"
                        label="Tên công việc"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                      />
                      <Input
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
            KHÔNG SỬ DỤNG
          </Button>
        </div>
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
