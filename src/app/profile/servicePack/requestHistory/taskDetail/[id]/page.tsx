"use client";

import authHeader from "@/components/authHeader/AuthHeader";
import {
  ChildTaskType,
  TaskAssignmentType,
  TaskType,
  UserLocal,
} from "@/constants/types/homeType";
import {
  useDisclosure
} from "@nextui-org/react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Timeline } from 'primereact/timeline';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import Image from "next/image";
interface TimelineEvent {
  status?: string;
  date?: string;
  icon?: string;
  color?: string;
  image?: string;
}

const TaskDetail = () => {
  const [tabs, setTabs] = useState(1);
  const params = useParams<{ id: string }>();
  const [task, setTask] = useState<TaskType>();
  const router = useRouter();

  const getUserFromStorage = () => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
  };

  const user: UserLocal | null = getUserFromStorage();
  const userId = user?.data.data.userId;

  useEffect(() => {
    fetchTask();
  }, [tabs]);

  const fetchTask = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}task-api/getTaskById/${params.id}`,
        {
          headers: authHeader(),
        }
      );
      setTask(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const events: TimelineEvent[] = [
    { status: 'Đã nhận được', date: '15/10/2020 10:30', icon: 'pi pi-pencil', color: '#9C27B0', image: '/Bat-tay.jpg' },
  ];
  if (task && task.processStatus === "ĐÃ PHÂN CÔNG") {
    events.push({ status: 'Đang xử lí', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7', image: '/inProcess.png' });
  }
  if (task && task.processStatus === "ĐÃ HOÀN THÀNH") {
    events.push({ status: 'Đang xử lí', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7', image: '/inProcess.png' });
    events.push({ status: 'Đã hoàn thành', date: '15/10/2020 16:15', icon: 'pi pi-check', color: '#FF9800', image: '/done.jpg' });
  }

  const customizedMarker = (item: TimelineEvent) => {
    return (
      <span className="flex items-center justify-center text-white z-10 shadow rounded-full size-8 mx-3" style={{ backgroundColor: item.color }}>
        <i className={item.icon}></i>
      </span>
    );
  };

  const customizedContent = (item: TimelineEvent) => {
    return (
      <Card title={item.status} subTitle={item.date} className="p-3">
        {item.image && <Image src={item.image} alt={item.image} width={200} height={200} className="shadow-1" />}
        <p>{task?.description}</p>
      </Card>
    );
  };
  return (
    <div className="w-[1350px]  p-5 bg-white rounded-xl shadow-lg">
      <div>
        <Button
          className="text-white bg-red-500 hover:bg-red-700 font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out"
          onClick={() => router.push("/profile/servicePack/requestHistory")}
        >
          Trở về danh sách gửi
        </Button>
      </div>
      <div className="card">
        <Timeline value={events} align="alternate" className="customized-timeline" marker={customizedMarker} content={customizedContent} />
      </div>
    </div>
  );
};

export default TaskDetail;
