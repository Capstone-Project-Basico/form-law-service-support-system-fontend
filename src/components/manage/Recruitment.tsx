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
import { RecruitmentType } from "@/constants/types/homeType";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/app/firebase";
import Image from "next/image";
import Link from "next/link";
import { status } from "@/lib/status";
import { ToastContainer, toast } from "react-toastify";
import authHeader from "../authHeader/AuthHeader";
import PaginationCustom from "../pagination";

type RecruitmentsProps = {
  recruitments: RecruitmentType[];
  tabs: number;
  handleDelete: (id: number) => void;
  restoreDelete: (id: number) => void;
  updateStatus: (newStatus: string, id: number) => void;
  handleUpdateSubmit: (data: any) => void;
};

const Recruitments: React.FC<RecruitmentsProps> = ({
  recruitments,
  tabs,
  handleDelete,
  restoreDelete,
  updateStatus,
  handleUpdateSubmit,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecruitment, setSelectedRecruitment] =
    useState<RecruitmentType | null>(null);
  const [recruitmentssList, setRecruitmentssList] = useState(recruitments);
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
  useEffect(() => {
    setPage(1);
  }, [tabs]);
  const rowsPerPage = 8;

  const pages = Math.ceil(filteredRecruitments.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredRecruitments.slice(start, end);
  }, [page, filteredRecruitments]);

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
          pages > 1 && (
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
                onChange={(page: any) => setPage(page)}
              />
            </div>
          )
        }
      >
        <TableHeader>
          <TableColumn className="bg-[#FF0004] text-white">
            Họ và tên ứng viên
          </TableColumn>
          <TableColumn className="bg-[#FF0004] text-white">
            Ngày sinh
          </TableColumn>

          <TableColumn className="bg-[#FF0004] text-white">
            Giới tính
          </TableColumn>

          <TableColumn className="bg-[#FF0004] text-white">SĐT</TableColumn>
          <TableColumn className="bg-[#FF0004] text-white">Email</TableColumn>

          <TableColumn className="bg-[#FF0004] text-white">
            Tình trạng
          </TableColumn>

          <TableColumn className="flex justify-center items-center bg-[#FF0004] text-white">
            Tương tác
          </TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((recruitment, index) => (
            <TableRow key={index}>
              <TableCell className="font-bold">
                {recruitment.fullName}
              </TableCell>
              <TableCell>
                {
                  recruitment.dateOfBirth
                    ? new Date(recruitment.dateOfBirth).toLocaleDateString()
                    : "N/A" // Handle cases where dateOfBirth might not be available or is not a Date object
                }
              </TableCell>
              <TableCell>{recruitment.gender}</TableCell>
              <TableCell>{recruitment.phoneNum}</TableCell>
              <TableCell>{recruitment.email}</TableCell>
              <TableCell>
                <Select
                  className="max-w-xs"
                  selectedKeys={[recruitment.processStatus]}
                  onChange={(e: any) =>
                    updateStatus(e.target.value, recruitment.id)
                  }
                  style={{
                    backgroundColor:
                      recruitment.processStatus === "TODO" ||
                        recruitment.processStatus === ""
                        ? "#C0C0C0"
                        : "transparent" || recruitment.processStatus === "DONE"
                          ? "#7CFC00"
                          : "transparent",
                    color:
                      recruitment.processStatus === "DONE"
                        ? "#00800"
                        : "initial",
                  }}
                >
                  {status
                    // .filter((stt) => stt.value !== contact.status)
                    .map((stt) => (
                      <SelectItem
                        key={stt.value}
                        value={stt.value}
                        style={{
                          backgroundColor:
                            stt.value === "DONE" ? "#7CFC00" : undefined,
                          color: stt.value === "DONE" ? "#00800" : undefined,
                          display:
                            stt.value !== recruitment.processStatus
                              ? ""
                              : "none",
                        }}
                      >
                        {stt.statusName}
                      </SelectItem>
                    ))}
                </Select>
              </TableCell>

              {recruitment.deleted === false ? (
                <TableCell className="flex gap-2 items-center  justify-center ">
                  <Button
                    className={`bg-blue-600 text-white ${recruitment.processStatus === "DONE" ? "hidden" : ""
                      }`}
                    onPress={() => {
                      setSelectedRecruitment(recruitment);
                      onOpenUpdate();
                    }}
                  >
                    Cập nhật
                  </Button>

                  <Button
                    className={`bg-[#FF0004] text-white ${recruitment.processStatus === "DONE" ? "hidden" : ""
                      } `}
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

      {/* detail modal */}
      <Modal isOpen={isOpen} onClose={onClose} hideCloseButton>
        <ModalContent
          style={{ width: "50%", maxWidth: "500px", height: "70%" }}
        >
          <ModalHeader className="flex flex-col gap-1 text-white text-2xl font-bold bg-[#FF0004] mb-5">
            Chi tiết
          </ModalHeader>
          <ModalBody
            style={{ maxHeight: "calc(100% - 100px)", overflowY: "auto" }}
          >
            {selectedRecruitment && (
              <div className="flex flex-col gap-10">
                <div className="flex flex-row ">
                  <p className="w-40">Họ và tên ứng viên</p>
                  <p className="pl-10">{selectedRecruitment.fullName}</p>
                </div>

                <div className="flex flex-row ">
                  <p className="w-40">Ngày sinh</p>
                  <p className="pl-10">
                    {selectedRecruitment.dateOfBirth
                      ? new Date(
                        selectedRecruitment.dateOfBirth
                      ).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>

                <div className="flex flex-row ">
                  <p className="w-40">Quê quán</p>
                  <p className="pl-10">{selectedRecruitment.homeTown}</p>
                </div>

                <div className="flex flex-row ">
                  <p className="w-40">Giới tính</p>
                  <p className="pl-10">{selectedRecruitment.gender}</p>
                </div>

                <div className="flex flex-row ">
                  <p className="w-40">Tình trạng hôn nhân</p>
                  <p className="pl-10">{selectedRecruitment.maritalStatus}</p>
                </div>

                <div className="flex flex-row ">
                  <p className="w-40">SĐT</p>
                  <p className="pl-10">{selectedRecruitment.phoneNum}</p>
                </div>

                <div className="flex flex-row ">
                  <p className="w-40">Email</p>
                  <p className="pl-10">{selectedRecruitment.email}</p>
                </div>

                <div className="flex flex-row ">
                  <p className="w-40">CCCD hoặc CMND</p>
                  <p className="pl-10">{selectedRecruitment.id_number}</p>
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
            Cập nhật tuyển dụng
          </ModalHeader>
          <ModalBody>
            {selectedRecruitment && (
              <form
                id="recruitment"
                onSubmit={(e) => {
                  console.log(e);
                  e.preventDefault();
                  handleUpdateSubmit(selectedRecruitment);
                  onCloseUpdate();
                }}
              >
                <Input
                  className="py-2"
                  type="text"
                  label="Họ và tên"
                  value={selectedRecruitment.fullName}
                  onChange={(e: any) =>
                    setSelectedRecruitment({
                      ...selectedRecruitment,
                      fullName: e.target.value,
                    })
                  }
                />

                <Input
                  type="date"
                  label="Ngày sinh"
                  value={
                    selectedRecruitment &&
                      selectedRecruitment.dateOfBirth instanceof Date
                      ? selectedRecruitment.dateOfBirth
                        .toISOString()
                        .substring(0, 10)
                      : ""
                  }
                  onChange={
                    (e: any) =>
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
                  onChange={(e: any) =>
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
                  onChange={(e: any) =>
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
                  onChange={(e: any) =>
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
                  onChange={(e: any) =>
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
                  onChange={(e: any) =>
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
                  onChange={(e: any) =>
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
            <Button color="primary" type="submit" form="recruitment">
              Cập nhật
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Recruitments;
