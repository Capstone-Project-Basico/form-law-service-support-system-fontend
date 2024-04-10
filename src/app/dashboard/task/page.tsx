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
} from "@nextui-org/react";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { TaskType } from "@/constants/types/homeType";
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

const Task = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [tabs, setTabs] = useState(1);

  //data
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [processStatus, setProcessStatus] = useState("");

  const [task, setTask] = useState<TaskType[]>([]);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
  let newTask = {
    taskName,
    description,
    startDate,
    endDate,
    processStatus,
  };

  const [imageUpload, setImageUpload] = useState<File | null>(null);

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
  }, [tabs]);

  //get all items
  const fetchTask = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}task/getAllTask`,
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
        `${process.env.NEXT_PUBLIC_BASE_API}task/getAllDeletedTask`,
        {
          headers: authHeader(),
        }
      );
      setTask(response.data.data);
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
          .delete(`${process.env.NEXT_PUBLIC_BASE_API}task/deleteTask/${id}`, {
            headers: authHeader(),
          })
          .then(() => {
            toast.success("Xóa thành công");
            fetchTask();
          }),
          {
            headers: authHeader(),
          };

        // setPartners((prevPartners) =>
        //   prevPartners.filter((partner) => partner.partnerId !== partnerId)
        // );
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
        `${process.env.NEXT_PUBLIC_BASE_API}task/updateTask/${selectedTask.id}`,
        {
          taskName: selectedTask.taskName,
          description: selectedTask.description,
          startDate: selectedTask.startDate,
          endDate: selectedTask.endDate,
          processStatus: selectedTask.processStatus,
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
        console.error("Failed to update partner", error);
      });
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
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_API}task/createNewTask`, newTask, {
        headers: authHeader(),
      })
      .then((response) => {
        setTask((prevTasks) => [...prevTasks, response.data.data]);
        toast.success("tạo mới thành công");
        fetchTask();
      })
      .catch((error) => {
        console.log(error);
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
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <form onSubmit={handleSubmit}>
                    <ModalHeader className="flex flex-col gap-1">
                      Thêm đối tác
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
                        type="date"
                        label="Ngày bắt đầu"
                        value={
                          startDate
                            ? startDate.toISOString().substring(0, 10)
                            : ""
                        }
                        onChange={(e) =>
                          setStartDate(
                            e.target.value ? new Date(e.target.value) : null
                          )
                        }
                        className="form-input"
                      />
                      {/* Ngày kết thúc */}
                      <Input
                        type="date"
                        label="Ngày kết thúc"
                        value={
                          endDate ? endDate.toISOString().substring(0, 10) : ""
                        }
                        onChange={(e) =>
                          setEndDate(
                            e.target.value ? new Date(e.target.value) : null
                          )
                        }
                        className="form-input"
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
            ĐÃ XÓA
          </Button>
        </div>
      </div>

      <div>
        <Tasks
          tasks={task}
          handleDelete={handleDelete}
          restoreDelete={restoreDelete}
          handleUpdateSubmit={handleUpdateSubmit}
        />
      </div>
    </div>
  );
};

export default Task;
