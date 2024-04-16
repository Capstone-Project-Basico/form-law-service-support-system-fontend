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
import { TaskType, UserType } from "@/constants/types/homeType";
import { ToastContainer, toast } from "react-toastify";
import authHeader from "../authHeader/AuthHeader";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";

type TasksProps = {
  tasks: TaskType[];
  staffs: UserType[];
  handleDelete: (id: number) => void;
  restoreDelete: (id: number) => void;
  handleUpdateSubmit: (data: any) => void;
  handleTaskAssignSubmit: (data: any, staffId: number) => void;
};

const Tasks: React.FC<TasksProps> = ({
  tasks,
  staffs,
  handleDelete,
  restoreDelete,
  handleUpdateSubmit,
  handleTaskAssignSubmit,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [staffId, setStaffId] = useState<number | undefined>();
  const [visible, setVisible] = useState(false);
  const footerContent = (
    <div>
      <Button
        onClick={() => setVisible(false)}
        className="bg-white text-[#FF0004] border-[#FF0004] border"
      >
        Đóng
      </Button>
      <Button
        onClick={() => {
          if (staffId !== undefined) {
            handleTaskAssignSubmit(selectedTask, staffId);
            setVisible(false);
          } else {
            console.error("Staff ID is undefined");
          }
        }}
        className="bg-[#FF0004] text-white"
      >
        Xác nhận
      </Button>
    </div>
  );
  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
  } = useDisclosure();

  const {
    isOpen: isOpenTaskAssign,
    onOpen: onOpenTaskAssign,
    onClose: onCloseTaskAssign,
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

  const selectedStaffTemplate = (option: any, props: any) => {
    if (option) {
      return (
        <div className="flex align-items-center flex-col">
          <div className="font-semibold">{option.userName}</div>
          <div>{option.email}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const staffOptionTemplate = (option: any) => {
    return (
      <div className="flex align-items-center flex-col">
        <div className="font-semibold">{option.userName}</div>
        <div>{option.email}</div>
      </div>
    );
  };

  return (
    <div>
      <ToastContainer />

      <div>
        <div className="my-10 flex flex-row">
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
              <TableCell>
                <span style={{ color: task.status ? "red" : "green" }}>
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
                    className="bg-green-600 text-white"
                    // onClick={() => {
                    //   setSelectedTask(task);
                    //   onOpenTaskAssign();
                    // }}
                    onClick={() => {
                      setSelectedTask(task);
                      setVisible(true);
                    }}
                  >
                    Giao việc
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
      <Modal isOpen={isOpenUpdate} onClose={onCloseUpdate} hideCloseButton>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-white text-2xl font-bold bg-[#FF0004] mb-5">
            Cập nhật công việc
          </ModalHeader>
          <ModalBody>
            {selectedTask && (
              <form
                id="task"
                onSubmit={(e) => {
                  console.log(e);
                  e.preventDefault();
                  handleUpdateSubmit(selectedTask);
                  onCloseUpdate();
                }}
              >
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
                  className="pt-3 pb-3"
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
                  value={
                    selectedTask && selectedTask.startDate instanceof Date
                      ? selectedTask.startDate.toISOString().substring(0, 10)
                      : ""
                  }
                  onChange={
                    (e) =>
                      setSelectedTask({
                        ...selectedTask,
                        startDate: e.target.value
                          ? new Date(e.target.value)
                          : null,
                      } as TaskType) // Ensure the type is Task when updating state
                  }
                  className="form-input block w-full py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />

                <Input
                  type="date"
                  label="Ngày kết thúc"
                  value={
                    selectedTask && selectedTask.endDate instanceof Date
                      ? selectedTask.endDate.toISOString().substring(0, 10)
                      : ""
                  }
                  onChange={
                    (e) =>
                      setSelectedTask({
                        ...selectedTask,
                        endDate: e.target.value
                          ? new Date(e.target.value)
                          : null,
                      } as TaskType) // Ensure the type is Task when updating state
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
            <Button color="primary" type="submit" form="task">
              Cập nhật
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* task assign modal */}
      <Modal
        isOpen={isOpenTaskAssign}
        onClose={onCloseTaskAssign}
        hideCloseButton
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-white text-2xl font-bold bg-[#FF0004] mb-5">
            Giao việc cho nhân viên
          </ModalHeader>
          <ModalBody>
            {selectedTask && (
              <form
                id="task"
                onSubmit={(e) => {
                  console.log(e);
                  e.preventDefault();
                  // handleTaskAssignSubmit(selectedTask);
                  onCloseTaskAssign();
                }}
              >
                <Dropdown
                  value={selectedStaff}
                  onChange={(e) => {
                    console.log("Dropdown change:", e.value);
                    setSelectedStaff(e.value);
                  }}
                  options={staffs}
                  optionLabel="email"
                  placeholder="Nhân viên"
                  filter
                  className="w-full md:w-14rem"
                />
              </form>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onCloseTaskAssign}>
              Đóng
            </Button>
            <Button color="primary" type="submit" form="task">
              Cập nhật
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Dialog
        header={<h1 className="bg-[#FF0004] pt-0">Giao việc</h1>}
        visible={visible}
        onHide={() => setVisible(false)}
        modal
        footer={footerContent}
        className="bg-white border w-[400px] h-96 rounded-lg"
      >
        <div className="card flex justify-content-center">
          <Dropdown
            value={selectedStaff}
            onChange={(e) => {
              setStaffId(e.value.userId);
              setSelectedStaff(e.value);
            }}
            options={staffs}
            optionLabel="email"
            placeholder="Chọn nhân viên"
            filter
            valueTemplate={selectedStaffTemplate}
            itemTemplate={staffOptionTemplate}
            className="w-96 h-10 md:w-14rem mt-10 border flex justify-center items-center"
          />
        </div>
      </Dialog>
    </div>
  );
};

export default Tasks;
