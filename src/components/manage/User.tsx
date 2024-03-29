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
import { User } from "@/constants/types/homeType";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/app/firebase";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import authHeader from "../authHeader/AuthHeader";

type UsersProps = {
  users: User[];
};

const Users: React.FC<UsersProps> = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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
  const rowsPerPage = 8;

  const pages = Math.ceil(filteredUsers.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredUsers.slice(start, end);
  }, [page, filteredUsers]);

  //update
  const handleUpdateSubmit = async () => {
    if (!selectedUser) return; // Check if a partner is selected

    // Example: PUT request to update partner details
    axios
      .put(
        `${process.env.NEXT_PUBLIC_BASE_API}user/${selectedUser.userId}`,
        {
          roleName: selectedUser.roleName,
        },
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        toast.success("Cập nhật thành công");
      })
      .catch((error) => {
        console.error("Failed to update user", error);
      });
  };
 

  //delete
  const handleDelete = async (userId: number) => {
    const isConfirmed = window.confirm(
      "Bạn có chắc muốn xóa người dùng này không?"
    );
    if (isConfirmed) {
      try {
       
        axios
          .delete(
            `${process.env.NEXT_PUBLIC_BASE_API}user/deleteUser/${userId}`,
            {
              headers: authHeader(),
            }
          )
          .then(() => {
            
            toast.success("Xóa thành công");
          })

      } catch (error) {
        console.log(error);
      }
    }
  };

  // restore
  const restoreDelete = async (userId: number) => {
    try {
      axios
        .put(
          `${process.env.NEXT_PUBLIC_BASE_API}user/restoreDelete/${userId}`
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
            Email
          </TableColumn>
          <TableColumn className=" justify-center items-center bg-[#FF0004] text-white">
            Họ và tên
          </TableColumn>
          <TableColumn className=" bg-[#FF0004] text-white">
            SĐT
          </TableColumn>
          <TableColumn className=" bg-[#FF0004] text-white">
            Vai trò
          </TableColumn>
         
          <TableColumn className="flex justify-center items-center bg-[#FF0004] text-white">
            Tương tác
          </TableColumn>

        </TableHeader>
        <TableBody>
          {items.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.userName}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>{user.roleName}</TableCell>
             

                <TableCell className="flex gap-2 items-center  justify-center ">
                  <Button
                    className="bg-[#FF0004] text-white"
                    onPress={() => {
                      setSelectedUser(user);
                      onOpenUpdate();
                    }}
                  >
                    Update
                  </Button>

                  <Button
                    className="bg-[#FF0004] text-white"
                    onClick={() => handleDelete(user.userId)}
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
            Cập nhật người dùng
          </ModalHeader>
          <ModalBody>
            {selectedUser && (
              <form onSubmit={handleUpdateSubmit}>
                <Input
                  type="text"
                  label="Vai trò"
                  value={selectedUser.roleName}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      roleName: e.target.value,
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

export default Users;
