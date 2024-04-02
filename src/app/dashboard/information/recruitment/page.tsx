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
import { Recruitment } from "@/constants/types/homeType";
import Recruitments from "@/components/manage/Recruitment";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import authHeader from "@/components/authHeader/AuthHeader";

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

  const [recruitment, setRecruitment] = useState<Recruitment[]>([]);

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

  useEffect(() => {
    switch (tabs) {
      case 1:
        fetchRecruitment();
        break;
      case 2:
        fetchDeletedRecruitment();
        break;
      default:
        fetchRecruitment();
        break;
    }
  }, [tabs]);

  //get all contact
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

  //get all deleted items
  const fetchDeletedRecruitment = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}recruitmentForm/getAllDeletedRecruitmentForm`
      );
      setRecruitment(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  //delete
  const handleDelete = async (id: number) => {
    const isConfirmed = window.confirm(
      "Bạn có chắc muốn xóa tuyển dụng này không?"
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
            `${process.env.NEXT_PUBLIC_BASE_API}recruitmentForm/deleteRecruitmentForm/${id}`,
            {
              headers: authHeader(),
            }
          )
          .then(() => {
            toast.success("Xóa thành công");
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
            <p className="text-black font-bold text-3xl ">Quản lí thông tin</p>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <p className="text-[#FF0004] font-bold text-3xl">Tuyển dụng</p>
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
        <Recruitments recruitments={recruitment} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

export default Recruitment;
