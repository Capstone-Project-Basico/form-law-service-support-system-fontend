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
  Select,
  SelectItem,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { UserType } from "@/constants/types/homeType";
import { ToastContainer, toast } from "react-toastify";
import authHeader from "../authHeader/AuthHeader";
import { Roles } from "@/lib/roles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
type UsersProps = {
  users: UserType[];
  tabs: number;
  handleDelete: (id: number) => void;
  restoreDelete: (id: number) => void;
  handleUpdateSubmit: (data: any) => void;
};

const Users: React.FC<UsersProps> = ({
  users,
  tabs,
  handleDelete,
  restoreDelete,
  handleUpdateSubmit,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const filteredRoles = Roles.filter((role) => role.value !== "ROLE_ADMIN" && role.value !== "ROLE_MANAGER");

  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
  } = useDisclosure();

  //search
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //pagination
  const [page, setPage] = React.useState(1);
  useEffect(() => {
    setPage(1);
  }, [tabs]);
  const rowsPerPage = 8;

  const pages = Math.ceil(filteredUsers.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredUsers.slice(start, end);
  }, [page, filteredUsers]);

  //export file 
  const exportFile = () => {
    try {
      // axios.get(`${process.env.NEXT_PUBLIC_BASE_API}user/export-to-excel`)
      axios.get(`${process.env.NEXT_PUBLIC_BASE_API}user/export-to-excel`, {
        method: 'GET',
        responseType: 'blob', // important
      })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');

          link.href = url;
          link.setAttribute(
            'download',
            `user${Date.now()}.xlsx`,
          );

          document.body.appendChild(link);
          link.click();

          link.remove();
        })
        .catch((error) => {
          console.log(error);
        })
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <ToastContainer />
      <div>
        <div className="my-10 flex flex-row justify-between">
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
          <div className="">
            {pages > 1 && (
              <div className="flex w-full justify-center">
                <Pagination
                  showControls
                  classNames={{
                    wrapper: 'gap-0 overflow-visible h-8 ',
                    item: 'w-8 h-8 text-small rounded-none bg-transparent',
                    cursor:
                      'bg-gradient-to-b shadow-lg from-default-500 to-default-800 dark:from-default-300 dark:to-default-100 text-white font-bold',
                  }}
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                />
              </div>
            )}
            <div className="flex justify-end items-end w-full">
              <Button className="bg-white text-[#FF0004] border border-[#FF0004] ">
                <FontAwesomeIcon icon={faFileExport} size="2xl" onClick={() => exportFile()} />
              </Button>
            </div>
          </div>
        }
      >
        <TableHeader className="">
          <TableColumn className=" bg-[#FF0004] text-white">Email</TableColumn>
          <TableColumn className=" justify-center items-center bg-[#FF0004] text-white">
            Họ và tên
          </TableColumn>
          <TableColumn className=" bg-[#FF0004] text-white">SĐT</TableColumn>
          <TableColumn className=" bg-[#FF0004] text-white">
            Vai trò
          </TableColumn>
          <TableColumn className=" bg-[#FF0004] text-white">
            Trạng thái
          </TableColumn>

          <TableColumn className="flex justify-center items-center bg-[#FF0004] text-white">
            Tương tác
          </TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((user, index) => (
            <TableRow key={index}>
              <TableCell className="font-bold">{user.email}</TableCell>
              <TableCell>{user.userName}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>
                {Roles.map((role) => (
                  <div key={role.value}>
                    {user.roleName === role.value ? role.roleName : ""}
                  </div>
                ))}
              </TableCell>

              <TableCell>
                <span style={{ color: user.status ? "red" : "green" }}>
                  {user.status ? "Không sử dụng" : "Đang hoạt động"}
                </span>
              </TableCell>

              {user.status === 0 ? (
                <TableCell className="flex gap-2 items-center  justify-center ">
                  <Button
                    className="bg-blue-600 text-white"
                    onPress={() => {
                      setSelectedUser(user);
                      onOpenUpdate();
                    }}
                    isDisabled={user.roleName === "ROLE_ADMIN"}
                  >
                    Cập nhật
                  </Button>

                  <Button
                    className="bg-[#FF0004] text-white"
                    onClick={() => handleDelete(user.userId)}
                    isDisabled={user.roleName === "ROLE_ADMIN" || user.roleName === "ROLE_MANAGER"}
                  >
                    Xóa
                  </Button>
                </TableCell>
              ) : (
                <TableCell className="flex gap-2 items-center justify-center">
                  <Button
                    className="bg-blue-600 text-white"
                    onClick={() => restoreDelete(user.userId)}
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
            Cập nhật người dùng
          </ModalHeader>
          <ModalBody>
            {selectedUser && (
              <form
                id="user"
                onSubmit={(e) => {
                  console.log(e);
                  e.preventDefault();
                  handleUpdateSubmit(selectedUser);
                  onCloseUpdate();
                }}
              >
                <Select
                  label="Chọn vai trò cho người dùng này"
                  labelPlacement="outside"
                  className="font-bold"
                  defaultSelectedKeys={[selectedUser.roleName]}
                  onChange={(e: any) =>
                    setSelectedUser({
                      ...selectedUser,
                      roleName: e.target.value,
                    })
                  }
                >
                  {filteredRoles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.roleName}
                    </SelectItem>
                  ))}
                </Select>
              </form>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onCloseUpdate}>
              Đóng
            </Button>
            <Button color="primary" type="submit" form="user">
              Cập nhật
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Users;
