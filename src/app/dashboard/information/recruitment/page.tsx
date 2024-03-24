"use client";

import { Recruitment } from "@/constants/types/homeType";
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

const Recruitment = () => {
  const [recruitments, setRecruitments] = useState<Recruitment[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
  } = useDisclosure();
 //data
  const [fullName, serFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [homeTown, setHomeTown] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [position, setPosition] = useState("");
  const [exp, setExp] = useState("");
  const [field, setField] = useState("");
  const [graduate, setGraduate] = useState("");
  const [target , setTarget] = useState("");
  const [workPlace , setWorkPlace] = useState("");
  const [processStatus , setprocessStatus] = useState("");
  
  const [selectedRecruitment, setSelectedRecruitment] = useState<Recruitment | null>(null);

  let newRecruitment = {
    fullName,
    dateOfBirth,
    idNumber,
    homeTown,
    maritalStatus,
    gender,
    email,
    phoneNum,
    position,
    exp,
    field,
    graduate,
    target,
    workPlace,
    processStatus,
  };

  useEffect(() => {
    fetchRecruitments();
  }, []);

  //search
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  // Filter Recruitments based on search term
  const filteredRecruitments = recruitments.filter((recruitment) =>
   recruitment.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
   //get all contact
  const fetchRecruitments = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_API}recruitmentForm/getAllRecruitmentForm`
        );
        setRecruitments(response.data.data);
      
    } catch (error) {
      console.error(error);
    }
  };

  //update
  const handleUpdateSubmit = async () => {
    if (!selectedRecruitment) return; // Check if a Recruitment is selected

    // Example: PUT request to update Recruitment details
    axios
      .put(
        `${process.env.NEXT_PUBLIC_BASE_API}recruitmentForm/updateRecruitmentForm/${selectedRecruitment.id}`,
        {
            fullName : selectedRecruitment.fullName,
            dateOfBirth: selectedRecruitment.dateOfBirth,
            idNumber: selectedRecruitment.id_number,
            homeTown: selectedRecruitment.homeTown,
            gender: selectedRecruitment.gender,
            maritalStatus: selectedRecruitment.maritalStatus,
            email : selectedRecruitment.email,
            phoneNum : selectedRecruitment.phoneNum,
            position: selectedRecruitment.position,
            exp: selectedRecruitment.exp,
            field: selectedRecruitment.field,
            graduate: selectedRecruitment.graduate,
            target: selectedRecruitment.target,
            workPlace: selectedRecruitment.workPlace,
            processStatus: selectedRecruitment.processStatus,
          }  
      )
      .then((response) => {
        fetchRecruitments();
        console.log("Recruitment updated successfully", response);
      })
      .catch((error) => {
        console.error("Failed to update recruitment", error);
      });
  };

  //delete
  const handleDelete = async (recruitmentId: number) => {
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
          `${process.env.NEXT_PUBLIC_BASE_API}recruitmentForm/deleteRecruitmentForm/${recruitmentId}`
        ),
          {
            headers: {
              Authorization: user.data.data.token,
            },
          };

        setRecruitments((prevRecruitments) =>
          prevRecruitments.filter((recruitment) => recruitment.id !== recruitmentId)
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
            <p className="text-[#FF0004] font-bold text-3xl">Tuyển dụng</p>
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
          <TableColumn className="bg-[#FF0004] text-white">
            SĐT
          </TableColumn>
          <TableColumn className="bg-[#FF0004] text-white">
            Email
          </TableColumn>
          <TableColumn className="bg-[#FF0004] text-white">
            Vị trí
          </TableColumn>
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
          </TableColumn>
          <TableColumn className="bg-[#FF0004] text-white">
            Trạng thái
          </TableColumn>
          <TableColumn className="bg-[#FF0004] text-white">
            Tương tác
          </TableColumn>
        </TableHeader>
        <TableBody>
          {filteredRecruitments.map((recruitment, index) => (
            <TableRow key={index}>
              <TableCell>{recruitment.fullName}</TableCell>
              <TableCell>{recruitment.fullName}</TableCell>
              <TableCell>{recruitment.id_number}</TableCell>
              <TableCell>{recruitment.homeTown}</TableCell>
              <TableCell>{recruitment.gender}</TableCell>
              <TableCell>{recruitment.maritalStatus}</TableCell>
              <TableCell>{recruitment.phoneNum}</TableCell>
              <TableCell>{recruitment.email}</TableCell>      
              <TableCell>{recruitment.position}</TableCell>
              <TableCell>{recruitment.exp}</TableCell>
              <TableCell>{recruitment.field}</TableCell>
              <TableCell>{recruitment.graduate}</TableCell>
              <TableCell>{recruitment.target}</TableCell>
              <TableCell>{recruitment.workPlace}</TableCell>
              <TableCell>{recruitment.processStatus}</TableCell>
              
              <TableCell className="flex gap-2 items-center">
                <Button className="bg-[#FF0004] text-white"
                  onPress={() => {
                    setSelectedRecruitment(recruitment);
                    onOpenUpdate();
                  }}
                  >
                  Update</Button>

                <Button className="bg-[#FF0004] text-white"
                  onClick={() => handleDelete(recruitment.id)}
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
            {selectedRecruitment && (
              <form onSubmit={handleUpdateSubmit}>
                <Input
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
                  
                {/* choice date of birth */}
                  <Input
                  type="text"
                  label="Ngày sinh"
                  
                />

                <Input
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

export default Recruitment;
