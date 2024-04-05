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
import { RecruitmentType } from "@/constants/types/homeType";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/app/firebase";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import authHeader from "../authHeader/AuthHeader";

type RecruitmentsProps = {
  recruitments: RecruitmentType[];
  handleDelete: (id: number) => void;
  restoreDelete: (id: number) => void;
};

const Recruitments: React.FC<RecruitmentsProps> = ({
  recruitments,
  handleDelete,
  restoreDelete,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecruitment, setSelectedRecruitment] =
    useState<RecruitmentType | null>(null);
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
  // Filter Recruitments based on search term
  const filteredRecruitments = recruitments.filter((recruitment) =>
    recruitment.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //pagination
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const pages = Math.ceil(filteredRecruitments.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredRecruitments.slice(start, end);
  }, [page, filteredRecruitments]);

  ///update
  const handleUpdateSubmit = async () => {
    if (!selectedRecruitment) return; // Check if a Recruitment is selected

    // Example: PUT request to update Recruitment details
    axios
      .put(
        `${process.env.NEXT_PUBLIC_BASE_API}recruitmentForm/updateRecruitmentForm/${selectedRecruitment.id}`,
        {
          fullName: selectedRecruitment.fullName,
          dateOfBirth: selectedRecruitment.dateOfBirth,
          id_number: selectedRecruitment.id_number,
          homeTown: selectedRecruitment.homeTown,
          gender: selectedRecruitment.gender,
          maritalStatus: selectedRecruitment.maritalStatus,
          email: selectedRecruitment.email,
          phoneNum: selectedRecruitment.phoneNum,
          position: selectedRecruitment.position,
          exp: selectedRecruitment.exp,
          field: selectedRecruitment.field,
          graduate: selectedRecruitment.graduate,
          target: selectedRecruitment.target,
          workPlace: selectedRecruitment.workPlace,
          processStatus: selectedRecruitment.processStatus,
        },
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        toast.success("Cập nhật thành công");
      })
      .catch((error) => {
        console.error("Failed to update recruitment", error);
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
            Ngày sinh
          </TableColumn>
          <TableColumn className="bg-[#FF0004] text-white">
            CMND,CCCD
          </TableColumn>
          <TableColumn className="bg-[#FF0004] text-white">
            Quê quán
          </TableColumn>
          <TableColumn className="bg-[#FF0004] text-white">
            Giới tính
          </TableColumn>
          <TableColumn className="bg-[#FF0004] text-white">
            Tình trạng hôn nhân
          </TableColumn>
          <TableColumn className="bg-[#FF0004] text-white">SĐT</TableColumn>
          <TableColumn className="bg-[#FF0004] text-white">Email</TableColumn>
          {/* <TableColumn className="bg-[#FF0004] text-white">Vị trí</TableColumn>
          <TableColumn className="bg-[#FF0004] text-white">
            Kinh nghiệm
          </TableColumn>
          <TableColumn className="bg-[#FF0004] text-white">
            Lĩnh vực
          </TableColumn>
          <TableColumn className="bg-[#FF0004] text-white">
            Tốt nghiệp
          </TableColumn>
          <TableColumn className="bg-[#FF0004] text-white">
            Mục tiêu
          </TableColumn>
          <TableColumn className="bg-[#FF0004] text-white">
            Nơi làm việc
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
          {items.map((recruitment, index) => (
            <TableRow key={index}>
              <TableCell>{recruitment.fullName}</TableCell>
              <TableCell>
                {
                  recruitment.dateOfBirth
                    ? new Date(recruitment.dateOfBirth).toLocaleDateString()
                    : "N/A" // Handle cases where dateOfBirth might not be available or is not a Date object
                }
              </TableCell>

              <TableCell>{recruitment.id_number}</TableCell>
              <TableCell>{recruitment.homeTown}</TableCell>
              <TableCell>{recruitment.gender}</TableCell>
              <TableCell>{recruitment.maritalStatus}</TableCell>
              <TableCell>{recruitment.phoneNum}</TableCell>
              <TableCell>{recruitment.email}</TableCell>
              {/* <TableCell>{recruitment.position}</TableCell>
              <TableCell>{recruitment.exp}</TableCell>
              <TableCell>{recruitment.field}</TableCell>
              <TableCell>{recruitment.graduate}</TableCell>
              <TableCell>{recruitment.target}</TableCell>
              <TableCell>{recruitment.workPlace}</TableCell> */}
              <TableCell>{recruitment.processStatus}</TableCell>

              <TableCell>
                <span style={{ color: recruitment.deleted ? "red" : "green" }}>
                  {recruitment.deleted ? "Không sử dụng" : "Đang hoạt động"}
                </span>
              </TableCell>
              {recruitment.deleted === false ? (
                <TableCell className="flex gap-2 items-center  justify-center ">
                  <Button
                    className="bg-blue-600 text-white"
                    onPress={() => {
                      setSelectedRecruitment(recruitment);
                      onOpenUpdate();
                    }}
                  >
                    Cập nhật
                  </Button>

                  <Button
                    className="bg-[#FF0004] text-white"
                    onClick={() => handleDelete(recruitment.id)}
                  >
                    Xóa
                  </Button>

                  <Button
                    className="bg-green-600 text-white"
                    onClick={() => {
                      setSelectedRecruitment(recruitment);
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
                    onClick={() => restoreDelete(recruitment.id)}
                  >
                    Khôi phục
                  </Button>

                  <Button
                    className="bg-green-600 text-white"
                    onClick={() => {
                      setSelectedRecruitment(recruitment);
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
            {selectedRecruitment && (
              <div className="flex flex-row gap-10">
                {/* <p>{selectedRecruitment.fullName}</p> */}
                <div className="">
                  <p className="py-2">Họ và tên</p>
                  <p>Ngày sinh</p>
                  <p className="py-2">Quê quán</p>
                  <p>Giới tính</p>
                  <p className="py-2">Tình trạng hôn nhân</p>
                  <p>SĐT</p>
                  <p className="py-2">Email</p>
                  <p>Vị trí</p>
                  <p className="py-2">Kinh nghiệm</p>
                  <p>Lĩnh vực</p>
                  <p className="py-2">Tốt nghiệp</p>
                  <p>Mục tiêu</p>
                  <p className="py-2">Chổ làm việc</p>
                  <p>CCCD hoặc CMND</p>
                </div>
                <div>
                  <p className="py-2">{selectedRecruitment.fullName}</p>
                  {selectedRecruitment.dateOfBirth
                    ? new Date(
                        selectedRecruitment.dateOfBirth
                      ).toLocaleDateString()
                    : "N/A"}
                  <p className="py-2">{selectedRecruitment.homeTown}</p>
                  <p>{selectedRecruitment.gender}</p>
                  <p className="py-2">{selectedRecruitment.maritalStatus}</p>
                  <p>{selectedRecruitment.phoneNum}</p>
                  <p className="py-2">{selectedRecruitment.email}</p>
                  <p>{selectedRecruitment.position}</p>
                  <p className="py-2">{selectedRecruitment.exp}</p>
                  <p>{selectedRecruitment.field}</p>
                  <p className="py-2">{selectedRecruitment.graduate}</p>
                  <p>{selectedRecruitment.target}</p>
                  <p className="py-2">{selectedRecruitment.workPlace}</p>
                  <p>{selectedRecruitment.id_number}</p>
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
            Cập nhật liên hệ
          </ModalHeader>
          <ModalBody>
            {selectedRecruitment && (
              <form onSubmit={handleUpdateSubmit}>
                <Input
                  className="py-2"
                  type="text"
                  label="Họ và tên"
                  value={selectedRecruitment.fullName}
                  onChange={(e) =>
                    setSelectedRecruitment({
                      ...selectedRecruitment,
                      fullName: e.target.value,
                    })
                  }
                />

                <Input
                  type="date"
                  label="Ngày bắt đầu"
                  value={
                    selectedRecruitment &&
                    selectedRecruitment.dateOfBirth instanceof Date
                      ? selectedRecruitment.dateOfBirth
                          .toISOString()
                          .substring(0, 10)
                      : ""
                  }
                  onChange={
                    (e) =>
                      setSelectedRecruitment({
                        ...selectedRecruitment,
                        dateOfBirth: e.target.value
                          ? new Date(e.target.value)
                          : null,
                      } as RecruitmentType) // Ensure the type is Task when updating state
                  }
                  className="form-input block w-full py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />

                <Input
                  className="py-3"
                  type="text"
                  label="CMND, CCCD hoặc giấy tờ khác tương đương"
                  value={selectedRecruitment.id_number}
                  onChange={(e) =>
                    setSelectedRecruitment({
                      ...selectedRecruitment,
                      id_number: e.target.value,
                    })
                  }
                />

                <Input
                  className="py-3"
                  type="text"
                  label="Quê quán"
                  value={selectedRecruitment.homeTown}
                  onChange={(e) =>
                    setSelectedRecruitment({
                      ...selectedRecruitment,
                      homeTown: e.target.value,
                    })
                  }
                />

                {/* multiple choice */}
                <Input
                  type="text"
                  label="Giới tính"
                  value={selectedRecruitment.gender}
                  onChange={(e) =>
                    setSelectedRecruitment({
                      ...selectedRecruitment,
                      gender: e.target.value,
                    })
                  }
                />

                {/* multiple choice */}
                <Input
                  className="py-3"
                  type="text"
                  label="Tình trạng hôn nhân"
                  value={selectedRecruitment.maritalStatus}
                  onChange={(e) =>
                    setSelectedRecruitment({
                      ...selectedRecruitment,
                      maritalStatus: e.target.value,
                    })
                  }
                />

                <Input
                  type="text"
                  label="Số điện thoại"
                  value={selectedRecruitment.phoneNum}
                  onChange={(e) =>
                    setSelectedRecruitment({
                      ...selectedRecruitment,
                      phoneNum: e.target.value,
                    })
                  }
                />

                <Input
                  className="py-3"
                  type="text"
                  label="Email"
                  value={selectedRecruitment.email}
                  onChange={(e) =>
                    setSelectedRecruitment({
                      ...selectedRecruitment,
                      email: e.target.value,
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

export default Recruitments;
