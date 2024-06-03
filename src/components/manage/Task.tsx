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
  Autocomplete,
  AutocompleteItem,
  Progress,
} from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { TaskType, UserType } from "@/constants/types/homeType";
import { ToastContainer, toast } from "react-toastify";
import authHeader from "../authHeader/AuthHeader";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import dateConvert from "../dateConvert";

type TasksProps = {
  tasks: TaskType[];
  staffs: UserType[];
  tabs: number;
  handleDelete: (id: number) => void;
  restoreDelete: (id: number) => void;
  handleUpdateSubmit: (data: any, onClose: any) => void;
  handleTaskAssignSubmit: (data: any, staffId: number, date: Date) => void;
};

const Tasks: React.FC<TasksProps> = ({
  tasks,
  staffs,
  tabs,
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
  const router = useRouter();

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
  useEffect(() => {
    setPage(1);
  }, [tabs]);
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

  const handleTaskSelect = (task: TaskType) => {
    const modifiedTask = {
      ...task,
      startDate: task.startDate ? dateConvert(new Date(task.startDate)) : null,
      endDate: task.endDate ? dateConvert(new Date(task.endDate)) : null,
    };
    setSelectedTask(modifiedTask);
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
              onChange={(page: any) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader className="">
          <TableColumn className=" bg-[#FF0004] text-white">
            Tên công việc
          </TableColumn>
          <TableColumn className=" bg-[#FF0004] text-white">
            Ngày bắt đầu
          </TableColumn>
          <TableColumn className=" bg-[#FF0004] text-white">
            Ngày kết thúc
          </TableColumn>
          <TableColumn className=" bg-[#FF0004] text-white">
            Tình trạng
          </TableColumn>
          <TableColumn className=" justify-center items-center bg-[#FF0004] text-white">
            Tiến độ
          </TableColumn>
          <TableColumn className="flex justify-center items-center bg-[#FF0004] text-white">
            Tương tác
          </TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((task, index) => (
            <TableRow key={index}>
              <TableCell className="font-bold">{task.taskName}</TableCell>
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
                <Progress aria-label="Loading..." value={task.progress} className="max-w-md" />
              </TableCell>

              {task.deleted === false ? (task.processStatus === "ĐÃ HOÀN THÀNH" ?
                (
                  <TableCell className="flex gap-2 items-center justify-center">
                    <Button
                      className="bg-blue-600 text-white"
                      onClick={() => {
                        router.push(`task/taskDetail/${task.id}`);
                      }}
                    >
                      Chi tiết
                    </Button>
                  </TableCell>

                ) : (
                  <TableCell className="flex gap-2 items-center  justify-center ">
                    <Button
                      className="bg-blue-600 text-white"
                      onPress={() => {
                        handleTaskSelect(task);
                        onOpenUpdate();
                      }}
                    >
                      Cập nhật
                    </Button>

                    <Button
                      className="bg-yellow-600 text-white"
                      onClick={() => {
                        setSelectedTask(task);
                        onOpenTaskAssign();
                      }}
                    >
                      Giao việc
                    </Button>
                    <Button
                      className="bg-green-600 text-white"
                      onClick={() => {
                        router.push(`task/taskDetail/${task.id}`);
                      }}
                    >
                      Chi tiết
                    </Button>
                    <Button
                      className="bg-[#FF0004] text-white"
                      onClick={() => handleDelete(task.id)}
                    >
                      Xóa
                    </Button>
                  </TableCell>
                )
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
                  handleUpdateSubmit(selectedTask, onCloseUpdate);
                  // onCloseUpdate();
                }}
              >
                <Input
                  isRequired
                  type="text"
                  label="Tên công việc"
                  value={selectedTask.taskName}
                  onChange={(e: any) =>
                    setSelectedTask({
                      ...selectedTask,
                      taskName: e.target.value,
                    })
                  }
                />
                <Input
                  isRequired
                  className="pt-3 pb-3"
                  type="text"
                  label="Mô tả"
                  value={selectedTask.description}
                  onChange={(e: any) =>
                    setSelectedTask({
                      ...selectedTask,
                      description: e.target.value,
                    })
                  }
                />

                <Input
                  isRequired
                  type="date"
                  label="Ngày bắt đầu"
                  value={
                    selectedTask
                      ? selectedTask?.startDate?.toString().substring(0, 10)
                      : ""
                  }
                  onChange={
                    (e: any) =>
                      setSelectedTask({
                        ...selectedTask,
                        startDate: e.target.value
                          ? dateConvert(new Date(e.target.value))
                          : null,
                      } as TaskType) // Ensure the type is Task when updating state
                  }
                  className="form-input block w-full py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />

                <Input
                  isRequired
                  type="date"
                  label="Ngày kết thúc"
                  value={
                    selectedTask
                      ? selectedTask?.endDate?.toString().substring(0, 10)
                      : ""
                  }
                  onChange={
                    (e: any) =>
                      setSelectedTask({
                        ...selectedTask,
                        endDate: e.target.value
                          ? dateConvert(new Date(e.target.value))
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
                  console.log(e);

                  if (staffId !== undefined) {
                    // Ensure staffId is not undefined
                    handleTaskAssignSubmit(
                      selectedTask,
                      staffId,
                      selectedTask.endDate
                    );
                    onCloseTaskAssign();
                  } else {
                    toast.error("Vui lòng chọn nhân viên"); // Providing user feedback if staffId is undefined
                  }
                }}
              >
                <Autocomplete
                  isRequired
                  defaultItems={staffs}
                  placeholder="Chọn nhân viên ở đây"
                  // defaultSelectedKey="cat"
                  className="max-w-xs"
                  onSelectionChange={(e: any) => {
                    setStaffId(Number(e));
                    // console.log(e);
                  }}
                >
                  {(item: any) => (
                    <AutocompleteItem key={item.userId}>
                      {item.userName}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
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
    </div>
  );
};

export default Tasks;
