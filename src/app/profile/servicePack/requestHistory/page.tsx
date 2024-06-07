'use client'

import authHeader from '@/components/authHeader/AuthHeader';
import useUser from '@/components/authHeader/User';
import { TaskType } from '@/constants/types/homeType';
import { Button, Input, Pagination, Progress, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tasks, setTasks] = useState<TaskType[]>([])
  const router = useRouter();
  const userInfo = useUser();
  const [email, setEmail] = useState("")

  useEffect(() => {
    if (userInfo && userInfo.email) {
      setEmail(userInfo.email);
    }
    getTask();
  }, [userInfo])

  const getTask = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}task-api/getAllTask`,
        {
          headers: authHeader(),
        }
      );
      setTasks(response.data.data.filter((task: TaskType) => task.supportTo === email));
      console.log(tasks);

    } catch (error) { }
  };


  //search
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  // Filter tasks based on search term
  const filteredTasks = tasks.filter((task: TaskType) =>
    (task.taskName || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  //pagination
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const pages = Math.ceil(filteredTasks.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredTasks.slice(start, end);
  }, [page, filteredTasks]);

  return (
    <div className="w-[1350px]  p-5 bg-white rounded-xl shadow-lg">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 flex justify-center">
          Danh sách yêu cầu hỗ trợ
        </h2>
        <div className="my-3 flex flex-row">
          <Input
            classNames={{
              base: "w-full sm:max-w-[10rem] h-10",
              mainWrapper: "h-full w-96",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Từ khóa tìm kiếm .."
            size="sm"
            type="search"
            radius="none"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <Table
        aria-label="Example static collection table"
        bottomContent={
          pages > 1 && (
            <div className="flex w-full justify-center">
              <Pagination
                showControls
                classNames={{
                  wrapper: "gap-0 overflow-visible h-8 ",
                  item: "w-8 h-8 text-small rounded-none bg-transparent",
                  cursor:
                    "bg-gradient-to-b shadow-lg from-default-500 to-default-800 dark:from-default-300 dark:to-default-100 text-white font-bold",
                }}
                page={page}
                total={pages}
                onChange={(page: any) => setPage(page)}
              />
            </div>
          )
        }
      >
        <TableHeader className="">
          <TableColumn className=" bg-[#FF0004] text-white">
            Tên công việc
          </TableColumn>
          <TableColumn className=" bg-[#FF0004] text-white">
            Chi tiết
          </TableColumn>
          <TableColumn className=" bg-[#FF0004] text-white">
            Ngày bắt đầu
          </TableColumn>
          <TableColumn className=" bg-[#FF0004] text-white">
            Tiến trình
          </TableColumn>
          <TableColumn className="flex justify-center items-center bg-[#FF0004] text-white">
            Tương tác
          </TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((task, index) => (
            <TableRow key={index}>
              <TableCell>{task.taskName}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>
                {
                  task.startDate
                    ? new Date(task.startDate).toLocaleDateString()
                    : "N/A" // Handle cases where dateOfBirth might not be available or is not a Date object
                }
              </TableCell>

              <TableCell>
                {/* {task.processStatus} */}
                <Progress aria-label="Loading..." value={task.progress} className="max-w-md" />
              </TableCell>

              <TableCell className="flex gap-2 items-center justify-center">
                <Button
                  className="bg-blue-600 text-white"
                  onClick={() => router.push(`requestHistory/taskDetail/${task.id}`)}
                >
                  Chi tiết
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </div >
  )
}

export default Page