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
  Pagination,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { PackType, UserLocal } from "@/constants/types/homeType";
import authHeader from "@/components/authHeader/AuthHeader";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";

const Pack = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [tabs, setTabs] = useState(1);
  const [packs, setPacks] = useState<PackType[]>([]);
  const [templates, setTemplates] = React.useState<FormTemplateVersion[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPartner, setSelectedPartner] = useState<PackType | null>(null);

  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
  } = useDisclosure();

  //data
  const [packageName, setPackageName] = useState("");
  const [price, setPrice] = useState<Number | undefined>();
  const [description, setDescription] = useState("");
  const [listItem, setListItem] = useState<
    { itemId: string; quantity: number }[]
  >([]);

  const handleSelectionChange = (selected: any) => {
    console.log(selected.target.value);
    const selectedIds = selected.target.value.split(",");
    const newItems = selectedIds.map((id: number) => ({
      itemId: id,
      quantity: 5, // Set the quantity to 5 for each selected template
    }));

    setListItem(newItems);
  };

  const getUserFromStorage = () => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
  };

  const user: UserLocal | null = getUserFromStorage();
  const userId = user?.data.data.userId;

  let newPack = {
    packageName,
    price,
    description,
    listItem,
    userId,
  };

  useEffect(() => {
    fetchTemplates();
    switch (tabs) {
      case 1:
        fetchPacks();
        break;
      case 2:
        fetchPendingPacks();
        break;
      case 3:
        fetchDeletedTemplatePack();
        break;

      default:
        fetchPacks();
        break;
    }
  }, [tabs]);

  //get all items
  const fetchPacks = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}packageTemplate/getAllPackage`
      );
      setPacks(response.data.data.filter((pack: PackType) => pack.deleted === false && pack.itemPackageList.length > 0 && pack.processStatus === "ĐÃ DUYỆT"));
    } catch (error) {
      console.error(error);
    }
  };

  //get all templates
  const fetchTemplates = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}formTemplateVersion`
      );
      setTemplates(response.data.data);
    } catch (error) { }
  };

  const fetchPendingPacks = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}packageTemplate/getAllPackage`
      );
      setPacks(response.data.data.filter((pack: PackType) => pack.deleted === false && pack.processStatus === "CHỜ DUYỆT" && pack.itemPackageList.length > 0));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDeletedTemplatePack = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}packageTemplate/getAllPackage`
      );
      setPacks(response.data.data.filter((pack: PackType) => pack.deleted === true && pack.itemPackageList.length > 0));
    } catch (error) {
      console.error(error);
    }
  };

  //add a new partner
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BASE_API}packageTemplate/createPackageFormTemplate`,
        newPack,
        { headers: authHeader() }
      )

      .then((response) => {
        // setPartners((prevPartners) => [...prevPartners, response.data.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //search
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  // Filter partners based on search term
  const filteredPacks = packs.filter((packageName) =>
    packageName.packageName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //pagination
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const pages = Math.ceil(filteredPacks.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredPacks.slice(start, end);
  }, [page, filteredPacks]);

  return (
    <div className="w-full mt-5 ml-5 mr-5">
      <ToastContainer />
      <div className="grid grid-cols-2 border-b-2 pb-5">
        <Breadcrumbs color="danger" size="lg" className="text-3xl">
          <BreadcrumbItem>
            <p className="text-black font-bold text-3xl ">Quản lí dịch vụ</p>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <p className="text-[#FF0004] font-bold text-3xl">Gói biểu mẫu</p>
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
                        label="Tên gói"
                        value={packageName}
                        onChange={(e: any) => setPackageName(e.target.value)}
                      />
                      <Input
                        type="number"
                        label="Giá gói"
                        endContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">
                              Đồng
                            </span>
                          </div>
                        }
                        value={price !== undefined ? price.toString() : ""}
                        onChange={(e: any) => setPrice(Number(e.target.value))}
                      />
                      <Textarea
                        type="text"
                        label="Chi tiết"
                        value={description}
                        onChange={(e: any) => setDescription(e.target.value)}
                      />
                      <Select
                        placeholder="Chọn biểu mẫu"
                        selectionMode="multiple"
                        className=""
                        value={listItem.map((item) => item.itemId)}
                        onChange={(e: any) => handleSelectionChange(e)}
                      >
                        {templates.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.message}
                          </SelectItem>
                        ))}
                      </Select>
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
      <div className="flex flex-row gap-10 font-bold border-b-1 my-5">
        <div>
          <Button
            className={`bg-white ${tabs === 1 && "text-[#FF0004] border-b-2 border-[#FF0004]"
              }`}
            onClick={() => {
              setTabs(1), setPage(1);
            }}
            radius="none"
          >
            TẤT CẢ
          </Button>
        </div>
        <div>
          <Button
            className={`bg-white ${tabs === 2 && "text-[#FF0004] border-b-2 border-[#FF0004]"
              }`}
            onClick={() => {
              setTabs(2), setPage(1);
            }}
            radius="none"
          >
            CHỜ DUYỆT
          </Button>
        </div>
        <div>
          <Button
            className={`bg-white ${tabs === 3 &&
              "text-[#FF0004] border-b-[#FF0004] border-b-2 border-[#FF0004]"
              }`}
            radius="none"
            onClick={() => {
              setTabs(3), setPage(1);
            }}
          >
            KHÔNG SỬ DỤNG
          </Button>
        </div>
      </div>
      <Table
        aria-label="Example static collection table"
        bottomContent={
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
        }
      >
        <TableHeader className="">
          <TableColumn className=" bg-[#FF0004] text-white">
            Tên gói
          </TableColumn>
          <TableColumn className=" bg-[#FF0004] text-white">Giá</TableColumn>
          <TableColumn className=" bg-[#FF0004] text-white">
            Chi tiết
          </TableColumn>
          <TableColumn className="flex justify-center items-center bg-[#FF0004] text-white">
            Tương tác
          </TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((pack, index) => (
            <TableRow key={index}>
              <TableCell>{pack.packageName}</TableCell>
              <TableCell>{pack.price.toLocaleString()} VND</TableCell>
              <TableCell>{pack.description}</TableCell>

              <TableCell className="flex gap-2 items-center  justify-center ">
                <Button
                  className="bg-blue-600 text-white"
                  onPress={() => {
                    setSelectedPartner(pack);
                    onOpenUpdate();
                  }}
                >
                  Cập nhật
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* update modal */}
      <Modal isOpen={isOpenUpdate} onClose={onCloseUpdate}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Cập nhật gói dịch vụ
          </ModalHeader>
          <ModalBody></ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onCloseUpdate}>
              Đóng
            </Button>
            <Button
              color="primary"
              onPress={() => {
                // handleUpdateSubmit();
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

export default Pack;
