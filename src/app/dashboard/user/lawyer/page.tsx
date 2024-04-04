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
import { Lawyer } from "@/constants/types/homeType";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
  StorageReference,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "@/app/firebase";
import Lawyers from "@/components/manage/Lawyer";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import authHeader from "@/components/authHeader/AuthHeader";

const Lawyer = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [tabs, setTabs] = useState(1);

  //data
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [url, setUrl] = useState("");
  const [avartar, setAvatar] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [position, setPosition] = useState("");
  const [roleName, setRoleName] = useState("");

  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  let newUser = {
    email,
    avartar,
    url,
    userName,
    phoneNumber,
    introduce,
    position,
    roleName,
  };

  const [imageUpload, setImageUpload] = useState<File | null>(null);

  useEffect(() => {
    switch (tabs) {
      case 1:
        fetchLawyers();
        break;
      case 2:
        fetchDeletedLawyer();
        break;
      default:
        fetchLawyers();
        break;
    }
  }, [tabs]);

  //get all items
  const fetchLawyers = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}user/getAllLawyers`
      );
      setLawyers(response.data.data);
      // setPartners((prevPartners) => [...prevPartners, response.data.data]);
    } catch (error) {
      console.error(error);
    }
  };

  //get all deleted items
  const fetchDeletedLawyer = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}user/getAllDeletedLawyers`
      );
      setLawyers(response.data.data);
      // setPartners((prevPartners) => [...prevPartners, response.data.data]);
    } catch (error) {
      console.error(error);
    }
  };

  //delete
  const handleDelete = async (userId: number) => {
    const isConfirmed = window.confirm(
      "Bạn có chắc muốn xóa người dùng này không?"
    );
    if (isConfirmed) {
      try {
       
        axios
          .delete(
            `${process.env.NEXT_PUBLIC_BASE_API}user/deleteUser/${userId}`,
            {
              headers: authHeader(),
            }
          )
          .then(() => {
            
            toast.success("Xóa thành công");
            fetchLawyers()
          })

      } catch (error) {
        console.log(error);
      }
    }
  };

  // restore
  const restoreDelete = async (userId: number) => {
    try {
      axios
        .put(
          `${process.env.NEXT_PUBLIC_BASE_API}user/restoreDelete/${userId}`,
          {},
          {
            headers: authHeader(),
          }
        )
        .then((response) => {
          toast.success("Khôi phục thành công");
          fetchDeletedLawyer()
        });
    } catch (error) {
      console.log(error);
    }
  };

  
  return (
    <div className="w-full mt-5 ml-5 mr-5">
      <div className="grid grid-cols-2">
        <Breadcrumbs color="danger" size="lg" className="text-3xl">
          <BreadcrumbItem>
            <p className="text-black font-bold text-3xl ">Quản lí người dùng</p>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <p className="text-[#FF0004] font-bold text-3xl">Luật sư</p>
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
        <Lawyers lawyers={lawyers} 
               handleDelete={handleDelete}       
               restoreDelete={restoreDelete}  />    
      </div>
    </div>
  );
};

export default Lawyer;
