 "use client";

import { User } from "@/constants/types/homeType";
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
} from "@nextui-org/react";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

const User = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

 //data
  const [username, serUsername] = useState("");
  const [email, serEmail] = useState("");
  const [roleName, setRoleName] = useState("");
  const [status, setStatus] = useState("");

  let newContact = {
    username,
    email,
    roleName,
    status,
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_API}user/getAllUsers`
        );
        console.log(response.data);
        setUsers(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);


  return (
    <div className="w-full mt-5 ml-5 mr-5">
      <div className="grid grid-cols-2">
        <Breadcrumbs color="danger" size="lg" className="text-3xl">
          <BreadcrumbItem>
            <p className="text-black font-bold text-3xl ">
              Quản lý người dùng
            </p>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <p className="text-[#FF0004] font-bold text-3xl">Người dùng</p>
          </BreadcrumbItem>
        </Breadcrumbs>
        
      </div>
      <div>
        <div className="my-10 flex flex-row">
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[10rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Từ khóa tìm kiếm"
            size="sm"
            type="search"
            radius="none"
          />
          <Button className="bg-[#FF0004] text-white ml-3" radius="none">
            Tìm kiếm
          </Button>
        </div>
      </div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn className="bg-[#FF0004] text-white">
            Họ và Tên
          </TableColumn>
          <TableColumn className="bg-[#FF0004] text-white">
            Email
          </TableColumn>
          <TableColumn className="bg-[#FF0004] text-white">
            Vai trò
          </TableColumn>
          <TableColumn className="bg-[#FF0004] text-white">
            Trạng thái
          </TableColumn>
          <TableColumn className="bg-[#FF0004] text-white">
            Tương tác
          </TableColumn>
          
          
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.roleName}</TableCell>      
              <TableCell>{user.status}</TableCell>
             
              <TableCell className="flex gap-2 items-center">
                <Button>Update</Button>
                <Button>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};


export default User;
