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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [processStatus, setProcessStatus] = useState("");

  const [task, setTask] = useState<TaskType[]>([]);
  let newUser = {
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
