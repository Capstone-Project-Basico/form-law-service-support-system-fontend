"use client";

import AddTemplate from "@/sections/AddTemplate";
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
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { FormTemplate } from "@/constants/types/FormTemplate";
import authHeader from "@/components/authHeader/AuthHeader";
import Image from "next/image";
import Template from "@/components/manage/Template";

const Page = () => {
  // <div className="flex ">
  //   <AddTemplate />
  // </div>
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [tabs, setTabs] = useState(1);

  //data
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [templates, setTemplates] = useState<FormTemplate[]>([]);
  let newPartner = {
    name,
    link,
  };

  useEffect(() => {
    switch (tabs) {
      case 1:
        fetchTemplates();
        break;
      case 2:
      default:
        fetchTemplates();
    }
  }, [templates]);

  //get all items
  const fetchTemplates = async () => {
    try {
      axios
        .get(`${process.env.BASE_API}formTemplate/getAllFormTemplates`, {
          headers: authHeader(),
        })
        .then((response) => {
          setTemplates(response.data.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  //add a new partner
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    axios
      .post(`${process.env.BASE_API}`, newPartner)

      .then((response) => {
        // setPartners((prevPartners) => [...prevPartners, response.data.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="w-full mt-5 ml-5 mr-5">
      <div className="grid grid-cols-2 pb-5">
        <Breadcrumbs color="danger" size="lg" className="text-3xl">
          <BreadcrumbItem>
            <p className="text-black font-bold text-3xl ">Quản lí thông tin</p>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <p className="text-[#FF0004] font-bold text-3xl">Biểu mẫu</p>
          </BreadcrumbItem>
        </Breadcrumbs>

        <div className="flex justify-end">
          <Button
            className="flex justify-end w-[100px] bg-[#FF0004] text-white"
            radius="full"
            onPress={onOpen}
          >
            <FontAwesomeIcon icon={faPlus} />
            Tạo mới
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <form onSubmit={handleSubmit}>
                    <ModalHeader className="flex flex-col gap-1">
                      Thêm gói dịch vụ
                    </ModalHeader>
                    <ModalBody>
                      <Input
                        type="text"
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <Input
                        type="text"
                        label="Link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                      />
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Đóng
                      </Button>
                      <Button color="primary" onPress={onClose} type="submit">
                        Thêm
                      </Button>
                    </ModalFooter>
                  </form>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
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
          <Button className="bg-white" onClick={() => setTabs(2)} radius="none">
            CHỜ DUYỆT
          </Button>
        </div>
        <div>
          <Button
            className={`bg-white ${
              tabs === 3 &&
              "text-[#FF0004] border-b-[#FF0004] border-b-2 border-[#FF0004]"
            }`}
            radius="none"
            onClick={() => setTabs(3)}
          >
            ĐÃ XÓA
          </Button>
        </div>
      </div>

      <Template templates={templates} />
    </div>
  );
};

export default Page;
