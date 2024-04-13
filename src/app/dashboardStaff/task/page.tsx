"use client";

import authHeader from "@/components/authHeader/AuthHeader";
import { TaskType, UserLocal } from "@/constants/types/homeType";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

import StaffTasks from "@/components/staff/StaffTasks";

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

  const getUserFromStorage = () => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
  };

  const user: UserLocal | null = getUserFromStorage();
  const userId = user?.data.data.userId;

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
        `${process.env.NEXT_PUBLIC_BASE_API}taskAssignment/getTaskAssignmentById/${userId}`,
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
            <p className="text-[#FF0004] font-bold text-3xl">
              Công việc của bạn
            </p>
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
        <StaffTasks
          tasks={task ? task : []}
          handleDelete={handleDelete}
          restoreDelete={restoreDelete}
          handleUpdateSubmit={handleUpdateSubmit}
        />
      </div>
    </div>
  );
};

export default Task;
