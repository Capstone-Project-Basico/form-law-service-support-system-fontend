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
} from "@nextui-org/react";
import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { PackType } from "@/constants/types/homeType";
import authHeader from "@/components/authHeader/AuthHeader";

const Pack = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [tabs, setTabs] = useState(1);
  const [packs, setPacks] = useState<PackType[]>([]);

  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
  } = useDisclosure();

  //data
  const [packageName, setPackageName] = useState("");
  const [price, setPrice] = useState<Number | undefined>();
  let newPack = {
    packageName,
    price,
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPartner, setSelectedPartner] = useState<PackType | null>(null);

  useEffect(() => {
    switch (tabs) {
      case 1:
        fetchPacks();
        break;
      case 2:
        console.log("dang cho duyet ne");
        break;
      case 3:
        // fetchDeletedPartner();
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
      setPacks(response.data.data);
      // setPartners((prevPartners) => [...prevPartners, response.data.data]);
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
  const filteredPartners = packs.filter((packageName) =>
    packageName.packageName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //pagination
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const pages = Math.ceil(filteredPartners.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredPartners.slice(start, end);
  }, [page, filteredPartners]);

  return (
    <div className="w-full mt-5 ml-5 mr-5">
      <div className="grid grid-cols-2 border-b-2 pb-5">
        <Breadcrumbs color="danger" size="lg" className="text-3xl">
          <BreadcrumbItem>
            <p className="text-black font-bold text-3xl ">Quản lí thông tin</p>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <p className="text-[#FF0004] font-bold text-3xl">Gói dịch vụ</p>
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
                        onChange={(e) => setPackageName(e.target.value)}
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
                        onChange={(e) => setPrice(Number(e.target.value))}
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
      <div className="flex flex-row gap-10 font-bold border-b-1 my-5">
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
            Tên gói
          </TableColumn>
          <TableColumn className=" bg-[#FF0004] text-white">Giá</TableColumn>
          <TableColumn className=" bg-[#FF0004] text-white">
            Chi tiết
          </TableColumn>
          <TableColumn className=" bg-[#FF0004] text-white">
            Trạng thái
          </TableColumn>
          <TableColumn className="flex justify-center items-center bg-[#FF0004] text-white">
            Tương tác
          </TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((partner, index) => (
            <TableRow key={index}>
              <TableCell>{partner.packageName}</TableCell>
              <TableCell>{partner.price}</TableCell>
              <TableCell>{partner.description}</TableCell>
              <TableCell>
                <span style={{ color: partner.deleted ? "red" : "green" }}>
                  {partner.deleted ? "Không sử dụng" : "Đang hoạt động"}
                </span>
              </TableCell>
              {partner.deleted === false ? (
                <TableCell className="flex gap-2 items-center  justify-center ">
                  <Button
                    className="bg-blue-600 text-white"
                    onPress={() => {
                      setSelectedPartner(partner);
                      onOpenUpdate();
                    }}
                  >
                    Cập nhật
                  </Button>

                  <Button
                    className="bg-[#FF0004] text-white"
                    // onClick={() => handleDelete(partner.partnerId)}
                  >
                    Xóa
                  </Button>
                </TableCell>
              ) : (
                <TableCell className="flex items-center justify-center">
                  <Button
                    className="bg-blue-600 text-white"
                    // onClick={() => restoreDelete(partner.partnerId)}
                  >
                    Khôi phục
                  </Button>
                </TableCell>
              )}
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
          <ModalBody>
            {/* {selectedPartner && (
              <form onSubmit={handleUpdateSubmit}>
                <Input
                  type="text"
                  label="Name"
                  value={selectedPartner.name}
                  onChange={(e) =>
                    setSelectedPartner({
                      ...selectedPartner,
                      name: e.target.value,
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
                  label="Link"
                  value={selectedPartner.link}
                  onChange={(e) =>
                    setSelectedPartner({
                      ...selectedPartner,
                      link: e.target.value,
                    })
                  }
                />
              </form>
            )} */}
          </ModalBody>
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
