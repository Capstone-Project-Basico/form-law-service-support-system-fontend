"use client";

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
import { ContactType } from "@/constants/types/homeType";
import { ToastContainer, toast } from "react-toastify";
import { status } from "@/lib/status";
import { headers } from "next/headers";
import authHeader from "../authHeader/AuthHeader";
import Contact from "../home/Contact";
type ContactsProps = {
  contacts: ContactType[];
  handleDelete: (id: number) => void;
  restoreDelete: (id: number) => void;
  updateStatus: (newStatus: string, id: number) => void;
  handleUpdateSubmit: (data: any) => void;
};

const Contacts: React.FC<ContactsProps> = ({
  contacts,
  handleDelete,
  restoreDelete,
  updateStatus,
  handleUpdateSubmit,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState<ContactType | null>(
    null
  );
  const [contactsList, setContactsList] = useState(contacts);
  // const [selectedStatus, setSelectedStatus] = useState<string | null>("ALL");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
  } = useDisclosure();

  //search
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  // Filter contacts based on search term
  const filteredContacts = contacts.filter((contact) =>
    contact.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //pagination
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 8;

  const pages = Math.ceil(filteredContacts.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredContacts.slice(start, end);
  }, [page, filteredContacts]);

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
        <TableHeader>
          <TableColumn className="bg-[#FF0004] text-white">
            Tên khách hàng
          </TableColumn>
          <TableColumn className="bg-[#FF0004] text-white">Email</TableColumn>
          <TableColumn className="bg-[#FF0004] text-white">SĐT</TableColumn>
          <TableColumn className="bg-[#FF0004] text-white w-[160px]">
            Tình trạng
          </TableColumn>
          <TableColumn className="flex justify-center items-center bg-[#FF0004] text-white">
            Tương tác
          </TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((contact, index) => (
            <TableRow key={index}>
              <TableCell className="font-bold">{contact.fullName}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.phoneNum}</TableCell>
              <TableCell>
                <Select
                  className="max-w-xs"
                  selectedKeys={[contact.status]}
                  onChange={(e) =>
                    updateStatus(e.target.value, contact.contactId)
                  }
                  style={{
                    backgroundColor:
                      contact.status === "TODO" || contact.status === ""
                        ? "#C0C0C0"
                        : "transparent" || contact.status === "DONE"
                        ? "#7CFC00"
                        : "transparent",
                    color: contact.status === "DONE" ? "#00800" : "initial",
                  }}
                >
                  {status.map((stt) => (
                    <SelectItem
                      key={stt.value}
                      value={stt.value}
                      style={{
                        backgroundColor:
                          stt.value === "DONE" ? "#7CFC00" : undefined,
                        color: stt.value === "DONE" ? "#00800" : undefined,
                        display: stt.value !== contact.status ? "" : "none",
                      }}
                    >
                      {stt.statusName}
                    </SelectItem>
                  ))}
                </Select>
              </TableCell>

              {contact.delete === false ? (
                <TableCell className="flex gap-2 items-center  justify-center ">
                  <Button
                    className={`bg-blue-600 text-white ${
                      contact.status === "DONE" ? "hidden" : ""
                    }`}
                    onPress={() => {
                      setSelectedContact(contact);
                      onOpenUpdate();
                    }}
                  >
                    Cập nhật
                  </Button>

                  <Button
                    className={`bg-[#FF0004] text-white ${
                      contact.status === "DONE" ? "hidden" : ""
                    }`}
                    onClick={() => handleDelete(contact.contactId)}
                  >
                    Xóa
                  </Button>

                  <Button
                    className="bg-green-600 text-white"
                    onClick={() => {
                      setSelectedContact(contact);
                      onOpen();
                    }}
                  >
                    Chi tiết
                  </Button>
                </TableCell>
              ) : (
                <TableCell className="flex gap-2 items-center justify-center">
                  <Button
                    className="bg-blue-600 text-white"
                    onClick={() => restoreDelete(contact.contactId)}
                  >
                    Khôi phục
                  </Button>

                  <Button
                    className="bg-green-600 text-white"
                    onClick={() => {
                      setSelectedContact(contact);
                      onOpen();
                    }}
                  >
                    Chi tiết
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* update modal */}
      <Modal isOpen={isOpen} onClose={onClose} hideCloseButton>
        <ModalContent style={{ width: "50%", maxWidth: "500px" }}>
          <ModalHeader className="flex flex-col gap-1 text-white text-2xl font-bold bg-[#FF0004] mb-5">
            Chi tiết
          </ModalHeader>
          <ModalBody>
            {selectedContact && (
              <div className="flex flex-col gap-10">
                <div className="flex flex-row ">
                  <p className="w-40">Họ và tên</p>
                  <p className="pl-10">{selectedContact.fullName}</p>
                </div>

                <div className="flex flex-row ">
                  <p className="w-40">Email</p>
                  <p className="pl-10">{selectedContact.email}</p>
                </div>

                <div className="flex flex-row ">
                  <p className="w-40">SĐT</p>
                  <p className="pl-10">{selectedContact.phoneNum}</p>
                </div>

                <div className="flex flex-row ">
                  <p className="w-40">Kinh doanh ngành</p>
                  <p className="pl-10">{selectedContact.career}</p>
                </div>

                <div className="flex flex-row ">
                  <p className="w-40">Thành phố</p>
                  <p className="pl-10">{selectedContact.city}</p>
                </div>

                <div className="flex flex-row ">
                  <p className="w-40">Thời gian kinh doanh</p>
                  <p className="pl-10">{selectedContact.businessTime}</p>
                </div>

                <div className="flex flex-row ">
                  <p className="w-40">Doanh thu hàng năm</p>
                  <p className="pl-10">{selectedContact.annualRevenue}</p>
                </div>

                <div className="flex flex-row ">
                  <p className="w-40">Cần hỗ trợ pháp lý nào</p>
                  <p className="pl-10">{selectedContact.juridical}</p>
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              className="button-danger bg-[#FF0004] text-white"
              onPress={onClose}
            >
              Đóng
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* update modal */}
      <Modal isOpen={isOpenUpdate} onClose={onCloseUpdate} hideCloseButton>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-white text-2xl font-bold bg-[#FF0004] mb-5">
            Cập nhật đối tác
          </ModalHeader>
          <ModalBody>
            {selectedContact && (
              <form
                id="contact"
                onSubmit={(e) => {
                  console.log(e);
                  e.preventDefault();
                  handleUpdateSubmit(selectedContact);
                  onCloseUpdate();
                }}
              >
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
                  className="py-3"
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
            <Button color="primary" type="submit" form="contact">
              Cập nhật
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Contacts;
