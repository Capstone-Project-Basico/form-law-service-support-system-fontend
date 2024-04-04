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
import { Lawyer } from "@/constants/types/homeType";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/app/firebase";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import authHeader from "../authHeader/AuthHeader";

type LawyersProps = {
  lawyers: Lawyer[];
  handleDelete: (id: number)=> void;
  restoreDelete: (id: number)=> void;
};

const Lawyers: React.FC<LawyersProps> = ({ 
  lawyers,
  handleDelete,
  restoreDelete,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
  } = useDisclosure();

  const imagesListRef = ref(storage, "lawyers/");
  

  //search
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  // Filter Lawyers based on search term
  const filteredLawyers = lawyers.filter((lawyer) =>
    lawyer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //pagination
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(filteredLawyers.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredLawyers.slice(start, end);
  }, [page, filteredLawyers]);

  //update
  const handleUpdateSubmit = async () => {
    if (!selectedLawyer) return; // Check if a Lawyer is selected

    // Example: PUT request to update Lawyer details
    axios
      .put(
        `${process.env.NEXT_PUBLIC_BASE_API}user/updateProfile/${selectedLawyer.userId}`,
        {
          userName: selectedLawyer.userName,
          avatar: selectedLawyer.avatar,
          phoneNumber: selectedLawyer.phoneNumber,
          url: selectedLawyer.url,
          position: selectedLawyer.position,
          introduce: selectedLawyer.introduce,
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
 
  //upload update file
  const uploadUpdateFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    // First, check if the files array is not null and has at least one file
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]; // Safely access the first file

      // Create a unique file name for the storage to avoid name conflicts
      const uniqueFileName = `lawyers/${file.name}-${uuidv4()}`;
      const storageRef = ref(storage, uniqueFileName);

      const uploadTask = uploadBytesResumable(storageRef, file); // Start the file upload

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Optional: monitor upload progress
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error("Upload failed", error);
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);

            if (!selectedLawyer) {
              console.error("No Lawyer selected for update.");
              return;
            }

            // Update the state with the new avatar URL
            setSelectedLawyer({
              ...selectedLawyer,
              avatar: downloadURL,
            });

            // Optionally: Update the Lawyer's information in the database or state here
            // This might involve calling an API endpoint or updating local state
          });
        }
      );
    } else {
      console.error("No file selected for upload.");
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
          <TableColumn className=" bg-[#FF0004] text-white">
            Hình ảnh
          </TableColumn>
          <TableColumn className=" justify-center items-center bg-[#FF0004] text-white">
            Họ và tên
          </TableColumn>
          <TableColumn className=" bg-[#FF0004] text-white">
            SĐT
          </TableColumn>
          {/* <TableColumn className=" bg-[#FF0004] text-white">
            Đường dẫn Facebook
          </TableColumn>
          <TableColumn className=" bg-[#FF0004] text-white">
            Chức vụ
          </TableColumn>
          <TableColumn className=" bg-[#FF0004] text-white">
            Giới thiệu
          </TableColumn>
          <TableColumn className=" bg-[#FF0004] text-white">
            Vai trò
          </TableColumn> */}
          <TableColumn className=" bg-[#FF0004] text-white">
            Trạng thái
          </TableColumn>
                 
                 
          <TableColumn className="flex justify-center items-center bg-[#FF0004] text-white">
            Tương tác
          </TableColumn>

        </TableHeader>
        <TableBody>
          {items.map((lawyer, index) => (
            <TableRow key={index}>
              <TableCell>{lawyer.email}</TableCell>
              <TableCell>
                {
                  <Image
                    src={
                      lawyer.avatar
                        ? lawyer.avatar.startsWith("http")
                          ? lawyer.avatar
                          : `/${lawyer.avatar}`
                        : "/errorImage.png"
                    }
                    alt=""
                    width={100}
                    height={100}
                  />
                }
              </TableCell>
              <TableCell>{lawyer.userName}</TableCell>
              <TableCell>{lawyer.phoneNumber}</TableCell>
              {/* <TableCell>{lawyer.url}</TableCell>
              <TableCell>{lawyer.position}</TableCell>
              <TableCell>{lawyer.introduce}</TableCell>
              <TableCell>{lawyer.roleName}</TableCell> */}
              <TableCell>
                  <span style={{ color: lawyer.status ? 'red' : 'green' }}>
                  {lawyer.status ? "Không sử dụng" : "Đang hoạt động"}
                  </span>
              </TableCell>

              {lawyer.status === 0 ? (
                <TableCell className="flex gap-2 items-center  justify-center ">
                  <Button
                    className="bg-blue-600 text-white"
                    onPress={() => {
                      setSelectedLawyer(lawyer);
                      onOpenUpdate();
                    }}
                  >
                    Update
                  </Button>

                  <Button
                    className="bg-[#FF0004] text-white"
                    onClick={() => handleDelete(lawyer.userId)}
                  >
                    Delete
                  </Button>
                  <Button
                    className="bg-green-600 text-white"
                    onClick={() => {
                      setSelectedLawyer(lawyer);
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
                  onClick={() => restoreDelete(lawyer.userId)}
                >
                  Khôi phục
                </Button>
                <Button
                    className="bg-green-600 text-white"
                    onClick={() => {
                      setSelectedLawyer(lawyer);
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
        <ModalContent style={{ width: '90%', maxWidth: '900px' }}>
          <ModalHeader className="flex flex-col gap-1">Chi tiết</ModalHeader>
          <ModalBody>
            {selectedLawyer && (
              <div className="flex flex-row gap-10">
                
                <div className="">
                  <p className="py-2">Email</p>
                  <p  className="py-2">Hình ảnh</p>
                  <p className="py-28">Họ và tên</p>
                  
                  <p >SĐT</p>
                  <p>Đường dẫn Facebook</p>
                  <p className="py-2">Chức vụ</p>
                  <p>Giới thiệu</p>
                  <p className="py-2">Vai trò</p>
                 
                </div>
                <div>
                  <p  className="py-2">{selectedLawyer.email}</p>
                 
                  <p>{
                  <Image
                    src={
                      selectedLawyer.avatar
                        ? selectedLawyer.avatar.startsWith("http")
                          ? selectedLawyer.avatar
                          : `/${selectedLawyer.avatar}`
                        : "/errorImage.png"
                    }
                    alt=""
                    width={100}
                    height={100}
                  />
                  }
                  
                  </p>
                  <p className="py-5">{selectedLawyer.userName}</p>
                  <p  >{selectedLawyer.phoneNumber}</p>
                  <p>{selectedLawyer.position}</p>
                  <p >{selectedLawyer.introduce}</p>
                  <p>{selectedLawyer.roleName}</p>
                  
                 
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
            Cập nhật người dùng
          </ModalHeader>
          <ModalBody>
            {selectedLawyer && (
              <form onSubmit={handleUpdateSubmit}>
                <Input
                  type="text"
                  label="Tên luật sư"
                  value={selectedLawyer.userName}
                  onChange={(e) =>
                    setSelectedLawyer({
                      ...selectedLawyer,
                      userName: e.target.value,
                    })
                  }
                />

                <input
                  className="py-3"
                  type="file"
                  onChange={(e) => uploadUpdateFile(e)}
                />
                <Input
                  type="text"
                  label="SĐT"
                  value={selectedLawyer.phoneNumber}
                  onChange={(e) =>
                    setSelectedLawyer({
                      ...selectedLawyer,
                      phoneNumber: e.target.value,
                    })
                  }
                />

                <Input
                  type="text"
                  label="Đường dẫn Facebook"
                  value={selectedLawyer.url}
                  onChange={(e) =>
                    setSelectedLawyer({
                      ...selectedLawyer,
                      url: e.target.value,
                    })
                  }
                />
                <Input
                  type="text"
                  label="Chức vụ"
                  value={selectedLawyer.position}
                  onChange={(e) =>
                    setSelectedLawyer({
                      ...selectedLawyer,
                      position: e.target.value,
                    })
                  }
                />
                <Input
                  type="text"
                  label="Giới thiệu"
                  value={selectedLawyer.introduce}
                  onChange={(e) =>
                    setSelectedLawyer({
                      ...selectedLawyer,
                      introduce: e.target.value,
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

export default Lawyers;
