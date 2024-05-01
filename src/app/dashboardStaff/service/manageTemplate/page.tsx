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
  Spinner,
  getKeyValue,
} from "@nextui-org/react";
import axios from "axios";
import React, { FormEvent, Key, useCallback, useEffect, useState } from "react";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { FormTemplate } from "@/constants/types/FormTemplate";
import authHeader from "@/components/authHeader/AuthHeader";
import Image from "next/image";
import Template from "@/components/manageStaff/Template";
import { useRouter } from "next/navigation";
import axiosClient from "@/lib/axiosClient";

const Page = () => {
  const router = useRouter();
  const [tabs, setTabs] = useState(1);
  const [templates, setTemplates] = useState<FormTemplate[]>([]);
  const [formTemplateVersions, setFormTemplateVersions] = React.useState<
    FormTemplateVersion[]
  >([]);

  useEffect(() => {
    // switch (tabs) {
    //   case 1:
    //     fetchTemplates();
    //     break;
    //   case 2:
    //   default:
    //     fetchTemplates();
    // }
    const getData = async () => {
      // Fetch data
      const res = await axiosClient.get("formTemplateVersion");
      setFormTemplateVersions(res.data);
    };
    getData();
  }, []);

  //get all items
  const fetchTemplates = async () => {
    try {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_API}formTemplate/getAllFormTemplates`,
          {
            headers: authHeader(),
          }
        )
        .then((response) => {
          setTemplates(response.data.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Version",
      dataIndex: "versionNumber",
      key: "versionNumber",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Thông báo",
      dataIndex: "message",
      key: "message",
    },
    // {
    //   title: 'File Url',
    //   dataIndex: 'fileUrl',
    //   key: 'fileUrl',
    // },
    {
      title: "Tải xuống",
      key: "download",
    },
    {
      title: "Sử dụng",
      key: "use",
    },
  ];

  const renderCell = useCallback(
    (item: FormTemplateVersion, columnKey: Key) => {
      switch (columnKey) {
        case "download":
          return (
            <a
              href={
                process.env.NEXT_PUBLIC_BASE_API +
                "formTemplateVersion/download/" +
                item.id
              }
            >
              Tải xuống
            </a>
          );
        case "use":
          return (
            <Link href={`/dashboard/template/use-template/${item.id}`}>
              Sử dụng
            </Link>
          );
        case "status":
          return item.status === "STANDARDIZED" ? (
            <span className="text-green-500">Chuẩn hóa</span>
          ) : (
            <span className="text-red-500">Chưa chuẩn hóa</span>
          );
        default:
        // return getKeyValue(item, columnKey);
      }
    },
    []
  );

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
            onClick={() => router.push("/dashboard/template/add-template")}
          >
            <FontAwesomeIcon icon={faPlus} />
            Tạo mới
          </Button>
        </div>
      </div>

      <div className="flex flex-row gap-10 font-bold border-b-1 ">
        {/* <div>
          <Button
            className={`bg-white ${
              tabs === 1 && "text-[#FF0004] border-b-2 border-[#FF0004]"
            }`}
            onClick={() => setTabs(1)}
            radius="none"
          >
            TẤT CẢ
          </Button>
        </div> */}
        {/* <div>
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
            KHÔNG SỬ DỤNG
          </Button>
        </div> */}
      </div>

      <div className="w-full h-[40rem]">
        <Table
          isHeaderSticky
          classNames={{
            base: " max-h-[40rem] ",
            table: " overflow-scroll",
          }}
        >
          <TableHeader columns={columns} className="text-white">
            {(column) => (
              <TableColumn className="bg-primary text-white" key={column.key}>
                {column.title}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            loadingContent={<Spinner label="Loading..." />}
            items={formTemplateVersions}
          >
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => {
                  return <TableCell>{renderCell(item, columnKey)}</TableCell>;
                }}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
