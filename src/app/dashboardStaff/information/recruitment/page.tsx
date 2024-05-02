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
import { RecruitmentType } from "@/constants/types/homeType";
import Recruitments from "@/components/manageStaff/Recruitment";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import authHeader from "@/components/authHeader/AuthHeader";

interface UserLocal {
  data: {
    data: {
      userId: string;
    };
  };
}

const Recruitment = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [tabs, setTabs] = useState(1);
  //data
  const [fullName, serFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [id_number, setIdNumber] = useState("");
  const [homeTown, setHomeTown] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [position, setPosition] = useState("");
  const [exp, setExp] = useState("");
  const [field, setField] = useState("");
  const [graduate, setGraduate] = useState("");
  const [target, setTarget] = useState("");
  const [workPlace, setWorkPlace] = useState("");
  const [processStatus, setprocessStatus] = useState("");

  const [recruitment, setRecruitment] = useState<RecruitmentType[]>([]);
  // const [selectedRecruitment, setSelectedRecruitment] =
  // useState<RecruitmentType | null>(null);

  let newRecruitment = {
    fullName,
    dateOfBirth,
    id_number,
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

  const getUserFromStorage = () => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
  };

  const user: UserLocal | null = getUserFromStorage();

  useEffect(() => {
    switch (tabs) {
      case 1:
        fetchRecruitment();
        break;

      default:
        fetchRecruitment();
        break;
    }
  }, [tabs]);

  //get all Recruitment
  const fetchRecruitment = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}recruitmentForm/getAllRecruitmentForm`
      );
      setRecruitment(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  ///update
  const handleUpdateSubmit = async (selectedRecruitment: any) => {
    // if (!selectedRecruitment) return; // Check if a Recruitment is selected
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
        fetchRecruitment();
      })
      .catch((error) => {
        console.error("Failed to update recruitment", error);
      });
  };

  return (
    <div className="w-full mt-5 ml-5 mr-5">
      <div className="grid grid-cols-2">
        <Breadcrumbs color="danger" size="lg" className="text-3xl">
          <BreadcrumbItem>
            <p className="text-black font-bold text-3xl ">Quản lí thông tin</p>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <p className="text-[#FF0004] font-bold text-3xl">Tuyển dụng</p>
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>

      {/* <div className="flex flex-row gap-10 font-bold border-b-1 "></div> */}

      <div>
        <Recruitments
          recruitments={recruitment}
          handleUpdateSubmit={handleUpdateSubmit}
        />
      </div>
    </div>
  );
};

export default Recruitment;
