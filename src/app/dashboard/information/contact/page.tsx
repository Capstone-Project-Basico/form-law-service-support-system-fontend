"use client";

import { Contact } from "@/constants/types/homeType";
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
} from "@nextui-org/react";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

const Contact = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

 //data
  const [fullName, serFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [career, setCareer] = useState("");
  const [city, setCity] = useState("");
  const [businessTime, setBusinessTime] = useState("");
  const [annualRevenue, setAnnualRevenue] = useState("");
  const [juridical , setJuridical] = useState("");
  const [status , setStatus] = useState("");

  let newContact = {
    fullName,
    email,
    phoneNum,
    career,
    city,
    businessTime,
    annualRevenue,
    juridical,
    status,
  };

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_API}contact/getAllContact`
        );
        console.log(response.data);
        setContacts(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchContacts();
  }, []);
 
  return (
    <div className="w-full mt-5 ml-5 mr-5">
      <div className="grid grid-cols-2">
        <Breadcrumbs color="danger" size="lg" className="text-3xl">
          <BreadcrumbItem>
            <p className="text-black font-bold text-3xl ">
              Quản lí thông tin đối tác
            </p>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <p className="text-[#FF0004] font-bold text-3xl">Liên hệ</p>
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
            SĐT
          </TableColumn>
          <TableColumn className="bg-[#FF0004] text-white">
            Ngành
          </TableColumn>
          <TableColumn className="bg-[#FF0004] text-white">
            Thành phố
          </TableColumn>
          <TableColumn className="bg-[#FF0004] text-white">
            Thời gian kinh doanh
          </TableColumn>
          <TableColumn className="bg-[#FF0004] text-white">
            Damh thu hàng năm
          </TableColumn>
          <TableColumn className="bg-[#FF0004] text-white">
            Pháp lý
          </TableColumn>
          <TableColumn className="bg-[#FF0004] text-white">
            Trạng thái
          </TableColumn>
          <TableColumn className="bg-[#FF0004] text-white">
            Tương tác
          </TableColumn>
        </TableHeader>
        <TableBody>
          {contacts.map((contact, index) => (
            <TableRow key={index}>
              <TableCell>{contact.fullName}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.phoneNum}</TableCell>      
              <TableCell>{contact.career}</TableCell>
              <TableCell>{contact.city}</TableCell>
              <TableCell>{contact.businessTime}</TableCell>
              <TableCell>{contact.annualRevenue}</TableCell>
              <TableCell>{contact.juridical}</TableCell>
              <TableCell>{contact.status}</TableCell>
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


export default Contact;
