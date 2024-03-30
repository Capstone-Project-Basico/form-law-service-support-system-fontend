"use client";

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
 
} from "@nextui-org/react";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Contact } from "@/constants/types/homeType";
import Contacts from "@/components/manage/Contact";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";

const Contact = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [tabs, setTabs] = useState(1);
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
  const [contacts, setContacts] = useState<Contact[]>([]);

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
    switch (tabs) {
      case 1:
        fetchContacts();
        break;
      case 2:
        fetchDeletedContact();
        break;
      default:
        fetchContacts();
        break;
    }
  }, [tabs]);

  //get all contact
  const fetchContacts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_API}contact/getAllContact`
        );
        setContacts(response.data.data);
      
    } catch (error) {
      console.error(error);
    }
  };

  //get all deleted items
  const fetchDeletedContact = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}contact/getAllDeletedContact`
      );
      setContacts(response.data.data);
      
    } catch (error) {
      console.error(error);
    }
  };

    //delete
    const handleDelete = async (contactId: number) => {
      const isConfirmed = window.confirm(
        "Bạn có chắc muốn xóa liên hệ này không?"
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
              `${process.env.NEXT_PUBLIC_BASE_API}contact/deleteContact/${contactId}`
            )
            .then(() => {
              toast.success("Xóa thành công");
              fetchContacts()
              
            }),
            {
              headers: {
                Authorization: user.data.data.token,
              },
            };
  
        } catch (error) {
          console.log(error);
        }
      }
    };

  return (
    <div className="w-full mt-5 ml-5 mr-5">
      <div className="grid grid-cols-2">
        <Breadcrumbs color="danger" size="lg" className="text-3xl">
          <BreadcrumbItem>
            <p className="text-black font-bold text-3xl ">
              Quản lí thông tin
            </p>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <p className="text-[#FF0004] font-bold text-3xl">Liên hệ</p>
          </BreadcrumbItem>
        </Breadcrumbs>       
      </div>

      <div className="flex flex-row gap-10 font-bold border-b-1 ">
        <div>
          <Button
            className={`bg-white ${
              tabs === 1 && "text-[#FF0004] border-b-2 border-[#FF0004]"
            }`}
            onClick={() => setTabs(1)}
            radius="none"
          >
            TẤT CẢ
          </Button>
        </div>    
        <div>
          <Button
            className={`bg-white ${
              tabs === 2 &&
              "text-[#FF0004] border-b-[#FF0004] border-b-2 border-[#FF0004]"
            }`}
            radius="none"
            onClick={() => setTabs(2)}
          >
            ĐÃ XÓA
          </Button>
        </div>
      </div>

      <div>
        <Contacts contacts={contacts} handleDelete={handleDelete}/>
      </div>
    </div>
  );
};

export default Contact;
