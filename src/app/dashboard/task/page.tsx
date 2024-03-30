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
import { Task } from "@/constants/types/homeType";
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
  const [status, setStatus] = useState("");

  const [tasks, setTasks] = useState<Task[]>([]);
  let newUser = {
    taskName,
    description,
    startDate,
    endDate,
    status,
  };

  const [imageUpload, setImageUpload] = useState<File | null>(null);

  useEffect(() => {
    switch (tabs) {
      case 1:
        fetchTasks();
        break;
      case 2:
        fetchDeletedTask();
        break;
      default:
        fetchTasks();
        break;
    }
  }, [tabs]);

  //get all items
  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}task/getAllTask`
      );
      setTasks(response.data.data);
     
    } catch (error) {
      console.error(error);
    }
  };

  //get all deleted items
  const fetchDeletedTask = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}`
      );
      setTasks(response.data.data);
      
    } catch (error) {
      console.error(error);
    }
  };

  
  return (
    <div className="w-full mt-5 ml-5 mr-5">
      <div className="grid grid-cols-2">
        <Breadcrumbs color="danger" size="lg" className="text-3xl">
          <BreadcrumbItem>
            <p className="text-black font-bold text-3xl ">
              Quản lí công việc
            </p>
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
        <Tasks tasks={tasks} />
      </div>
    </div>
  );
};

export default Task;
