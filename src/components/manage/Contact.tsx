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
import { ContactType } from "@/constants/types/homeType";
import { ToastContainer, toast } from "react-toastify";

type ContactsProps = {
  contacts: ContactType[];
  handleDelete: (id: number) => void;
  restoreDelete: (id: number) => void;
};

const Contacts: React.FC<ContactsProps> = ({ contacts, handleDelete, restoreDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState<ContactType | null>(null);
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


  ///update
  const handleUpdateSubmit = async () => {
    if (!selectedContact) return; // Check if a contact is selected

    // Example: PUT request to update contact details
    axios
      .put(
        `${process.env.NEXT_PUBLIC_BASE_API}contact/updateContact/${selectedContact.contactId}`,
        {
          fullName: selectedContact.fullName,
          email: selectedContact.email,
          phoneNum: selectedContact.phoneNum,
          career: selectedContact.career,
          city: selectedContact.city,
          businessTime: selectedContact.businessTime,
          annualRevenue: selectedContact.annualRevenue,
          juridical: selectedContact.juridical,
          status: selectedContact.status,
        }
      )
      .then((response) => {
        toast.success("Cập nhật thành công");
      })
      .catch((error) => {
        console.error("Failed to update contact", error);
      });
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
          {/* <TableColumn className="bg-[#FF0004] text-white">
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
          </TableColumn> */}
          <TableColumn className="bg-[#FF0004] text-white">
            Tình trạng
          </TableColumn>
          <TableColumn className="bg-[#FF0004] text-white">
            Trạng thái
          </TableColumn>
          <TableColumn className="flex justify-center items-center bg-[#FF0004] text-white">
            Tương tác
          </TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((contact, index) => (
            <TableRow key={index}>
              <TableCell>{contact.fullName}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.phoneNum}</TableCell>
              {/* <TableCell>{contact.career}</TableCell>
              <TableCell>{contact.city}</TableCell>
              <TableCell>{contact.businessTime}</TableCell>
              <TableCell>{contact.annualRevenue}</TableCell>
              <TableCell>{contact.juridical}</TableCell> */}
              <TableCell>{contact.status}</TableCell>


              <TableCell>
                <span style={{ color: contact.delete ? 'red' : 'green' }}>
                  {contact.delete ? "Không sử dụng" : "Đang hoạt động"}
                </span>
              </TableCell>
              {contact.delete === false ? (
                <TableCell className="flex gap-2 items-center  justify-center ">
                  <Button
                    className="bg-blue-600 text-white"
                    onPress={() => {
                      setSelectedContact(contact);
                      onOpenUpdate();
                    }}
                  >
                    Cập nhật
                  </Button>

                  <Button
                    className="bg-[#FF0004] text-white"
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Chi tiết</ModalHeader>
          <ModalBody>
            {selectedContact && (
              <div className="flex flex-row gap-10">
                {/* <p>{selectedContact.fullName}</p> */}
                <div>
                  <p>Họ và tên</p>
                  <p className="py-2">Email</p>
                  <p>SĐT</p>
                  <p className="py-2">Ngành</p>
                  <p>Thành phố</p>
                  <p className="py-2">Thời gian kinh doanh</p>
                  <p>Doanh thu hàng năm </p>
                  <p className="py-2">Cần hỗ trợ pháp lý nào</p>

                </div>
                <div>
                  <p >{selectedContact.fullName}</p>
                  <p className="py-2">{selectedContact.email}</p>
                  <p>{selectedContact.phoneNum}</p>
                  <p className="py-2">{selectedContact.career}</p>
                  <p>{selectedContact.city}</p>
                  <p className="py-2">{selectedContact.businessTime}</p>
                  <p>{selectedContact.annualRevenue}</p>
                  <p className="py-2">{selectedContact.juridical}</p>


                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Đóng
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* update modal */}
      <Modal isOpen={isOpenUpdate} onClose={onCloseUpdate}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Cập nhật đối tác
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

                <Input className="py-3"
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

export default Contacts;
