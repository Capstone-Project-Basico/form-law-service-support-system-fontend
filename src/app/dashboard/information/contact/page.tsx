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
  const [searchTerm, setSearchTerm] = useState("");
  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
  } = useDisclosure();
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
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

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
    fetchContacts();
  }, []);

  //search
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  // Filter contacts based on search term
  const filteredContacts = contacts.filter((contact) =>
    contact.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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

  //update
  const handleUpdateSubmit = async () => {
    if (!selectedContact) return; // Check if a contact is selected

    // Example: PUT request to update contact details
    axios
      .put(
        `${process.env.NEXT_PUBLIC_BASE_API}contact/updateContact/${selectedContact.contactId}`,
        {
            fullName : selectedContact.fullName,
            email : selectedContact.email,
            phoneNum : selectedContact.phoneNum,
            career: selectedContact.career,
            city: selectedContact.city,
            businessTime: selectedContact.businessTime,
            annualRevenue: selectedContact.annualRevenue,
            juridical: selectedContact.juridical,
            status: selectedContact.status,
        }
      )
      .then((response) => {
        fetchContacts();
        console.log("Contact updated successfully", response);
      })
      .catch((error) => {
        console.error("Failed to update contact", error);
      });
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

        axios.delete(
          `${process.env.NEXT_PUBLIC_BASE_API}contact/deleteContact/${contactId}`
        ),
          {
            headers: {
              Authorization: user.data.data.token,
            },
          };

        setContacts((prevContacts) =>
          prevContacts.filter((contact) => contact.contactId !== contactId)
        );
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
            value={searchTerm}
            onChange={handleSearchChange}
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
          {filteredContacts.map((contact, index) => (
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
                <Button className="bg-[#FF0004] text-white"
                  onPress={() => {
                    setSelectedContact(contact);
                    onOpenUpdate();
                  }}
                  >
                  Update</Button>

                <Button className="bg-[#FF0004] text-white"
                  onClick={() => handleDelete(contact.contactId)}
                >
                  Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* update modal */}            
      <Modal isOpen={isOpenUpdate} onClose={onCloseUpdate}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Cập nhật liên hệ
          </ModalHeader>
          <ModalBody>
            {selectedContact && (
              <form onSubmit={handleUpdateSubmit}>
                <Input
                  type="text"
                  label="Họ và tên"
                  value={selectedContact.fullName}
                  onChange={(e) =>
                    setSelectedContact({
                      ...selectedContact,
                      fullName: e.target.value,
                    })
                  }
                />
               
                <Input
                  type="text"
                  label="Email"
                  value={selectedContact.email}
                  onChange={(e) =>
                    setSelectedContact({
                      ...selectedContact,
                      email: e.target.value,
                    })
                  }
                />

                <Input
                  type="text"
                  label="Số điện thoại"
                  value={selectedContact.phoneNum}
                  onChange={(e) =>
                    setSelectedContact({
                      ...selectedContact,
                      phoneNum: e.target.value,
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

export default Contact;
