import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
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
  Pagination,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { Task } from "@/constants/types/homeType";
import { ToastContainer, toast } from "react-toastify";
import authHeader from "../authHeader/AuthHeader";

type TasksProps = {
  tasks: Task[];
  handleDelete:(id: number)=>void;
  restoreDelete:(id: number)=> void;

};

const Tasks: React.FC<TasksProps> = ({ tasks, handleDelete, restoreDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
  } = useDisclosure();
 
  //search
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  // Filter tasks based on search term
  const filteredPartners = tasks.filter((task) =>
    task.taskName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //pagination
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 8;

  const pages = Math.ceil(filteredPartners.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredPartners.slice(start, end);
  }, [page, filteredPartners]);

  //update
  const handleUpdateSubmit = async () => {
    if (!selectedTask) return; // Check if a Task is selected

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
      })
      .catch((error) => {
        console.error("Failed to update partner", error);
      });
  };
 

  return (
    <div>
      <ToastContainer />
      <div>
        <div className="my-10 flex flex-row">
          <Input
            classNames={{
              base: "w-full sm:max-w-[10rem] h-10",
              mainWrapper: "h-full",
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
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader className="">
          <TableColumn className=" bg-[#FF0004] text-white">
            Tên công việc
          </TableColumn>
          <TableColumn className=" justify-center items-center bg-[#FF0004] text-white">
            Mô tả
          </TableColumn>
          <TableColumn className=" bg-[#FF0004] text-white">
            Ngày bắt đầu
          </TableColumn>
          <TableColumn className=" bg-[#FF0004] text-white">
            Ngày kết thúc
          </TableColumn>
          {/* <TableColumn className=" bg-[#FF0004] text-white">
            Người đảm nhiệm
          </TableColumn> */}
          <TableColumn className=" bg-[#FF0004] text-white">
            Tình trạng
          </TableColumn>
          <TableColumn className=" bg-[#FF0004] text-white">
            Trạng thái
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
                {
                  task.endDate
                    ? new Date(task.endDate).toLocaleDateString()
                    : "N/A" // Handle cases where dateOfBirth might not be available or is not a Date object
                }
              </TableCell>
              <TableCell>{task.processStatus}</TableCell>
              <TableCell >
                  <span style={{ color: task.status ? 'red' : 'green' }}>
                  {task.status ? "Không sử dụng" : "Đang hoạt động"}
                  </span>
              </TableCell>
              
              {task.status === 0 ? (
                <TableCell className="flex gap-2 items-center  justify-center ">
                  <Button
                    className="bg-blue-600 text-white"
                    onPress={() => {
                      setSelectedTask(task);
                      onOpenUpdate();
                    }}
                  >
                    Cập nhật
                  </Button>

                  <Button
                    className="bg-[#FF0004] text-white"
                    onClick={() => handleDelete(task.id)}
                  >
                    Xóa
                  </Button>
                </TableCell>
             ) : (
              <TableCell className="flex gap-2 items-center justify-center">
                <Button
                  className="bg-blue-600 text-white"
                  onClick={() => restoreDelete(task.id)}
                >
                  Khôi phục
                </Button>

                
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>

      {/* update modal */}
      <Modal isOpen={isOpenUpdate} onClose={onCloseUpdate}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Cập nhật đối tác
          </ModalHeader>
          <ModalBody>
            {selectedTask && (
              <form onSubmit={handleUpdateSubmit}>
                <Input
                  type="text"
                  label="Tên công việc"
                  value={selectedTask.taskName}
                  onChange={(e) =>
                    setSelectedTask({
                      ...selectedTask,
                      taskName: e.target.value,
                    })
                  }
                  />
                   <Input
                  type="text"
                  label="Mô tả"
                  value={selectedTask.description}
                  onChange={(e) =>
                    setSelectedTask({
                      ...selectedTask,
                      description: e.target.value,
                    })
                  }
                  />
                   
                  <Input
                    type="date"
                    label="Ngày bắt đầu"
                    value={selectedTask && selectedTask.startDate instanceof Date 
                    ? selectedTask.startDate.toISOString().substring(0, 10) 
                    : ''}
                    onChange={(e) =>
                    setSelectedTask({
                    ...selectedTask,
                    startDate: e.target.value ? new Date(e.target.value) : null,
                    } as Task) // Ensure the type is Task when updating state
                    }
                    className="form-input block w-full py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    />

                    <Input
                    type="date"
                    label="Ngày kết thúc"
                    value={selectedTask && selectedTask.endDate instanceof Date 
                    ? selectedTask.endDate.toISOString().substring(0, 10) 
                    : ''}
                    onChange={(e) =>
                    setSelectedTask({
                    ...selectedTask,
                    endDate: e.target.value ? new Date(e.target.value) : null,
                    } as Task) // Ensure the type is Task when updating state
                    }
                    className="form-input block w-full py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    />

                  
              </form>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onCloseUpdate}>
              Đóng
            </Button>
            <Button
              color="primary"
              onPress={() => {
                handleUpdateSubmit();
                onCloseUpdate();
              }}
              type="submit"
            >
              Cập nhật
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Tasks;
