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
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/app/firebase";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";

type TasksProps = {
  tasks: Task[];
};

const Tasks: React.FC<TasksProps> = ({ tasks }) => {
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
        }
      )
      .then((response) => {
        toast.success("Cập nhật thành công");
      })
      .catch((error) => {
        console.error("Failed to update partner", error);
      });
  };
 

  //delete
  const handleDelete = async (id: number) => {
    const isConfirmed = window.confirm(
      "Bạn có chắc muốn xóa công việc này không?"
    );
    if (isConfirmed) {
      try {
        const userString = localStorage.getItem("user"); // Assuming the token is stored with the key "token"
        if (!userString) {
          console.log("No user found");
          return;
        }
        const user = JSON.parse(userString);

        axios
          .delete(
            `${process.env.NEXT_PUBLIC_BASE_API}`
          )
          .then(() => {
            toast.success("Xóa thành công");
          }),
          {
            headers: {
              Authorization: user.data.data.token,
            },
          };

        // setPartners((prevPartners) =>
        //   prevPartners.filter((partner) => partner.partnerId !== partnerId)
        // );
      } catch (error) {
        console.log(error);
      }
    }
  };

  // restore
  const restoreDelete = async (paridtnerId: number) => {
    try {
      axios
        .put(
          `${process.env.NEXT_PUBLIC_BASE_API}`
        )
        .then((response) => {
          toast.success("Khôi phục thành công");
        });
    } catch (error) {
      console.log(error);
    }
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
          <TableColumn className=" bg-[#FF0004] text-white">
            Người đảm nhiệm
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
              <TableCell>{task.description}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{task.email}</TableCell>
              <TableCell>{task.status}</TableCell>
              
          
                <TableCell className="flex gap-2 items-center  justify-center ">
                  <Button
                    className="bg-[#FF0004] text-white"
                    onPress={() => {
                      setSelectedTask(task);
                      onOpenUpdate();
                    }}
                  >
                    Update
                  </Button>

                  <Button
                    className="bg-[#FF0004] text-white"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
             
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
                  label="Name"
                  value={selectedTask.taskName}
                  onChange={(e) =>
                    setSelectedTask({
                      ...selectedTask,
                      taskName: e.target.value,
                    })
                  }
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
