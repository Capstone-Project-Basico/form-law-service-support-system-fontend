import { FormTemplate } from "@/constants/types/FormTemplate";
import React from "react";
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
import authHeader from "@/components/authHeader/AuthHeader";
import Image from "next/image";

type TemplateProps = {
  templates: FormTemplate[];
};

const Template: React.FC<TemplateProps> = ({ templates }) => {
  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
  } = useDisclosure();

  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-3 justify-center items-center mt-20 gap-10">
          {templates.map((template, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center bg-white border border-[#FF0004] radius w-[268px] rounded-md"
            >
              <div className="flex justify-end items-end w-full gap-1">
                <Button className="bg-red-200" onClick={() => onOpenUpdate()}>
                  <FontAwesomeIcon icon={faPen} className="text-[#FF0004]" />
                </Button>
                <Button className="bg-red-200">
                  <FontAwesomeIcon icon={faTrash} className="text-[#FF0004]" />
                </Button>
              </div>
              <Image src="/template.png" alt="" width={268} height={227} />
              <div>5.000Đ</div>
              <h2 className="font-semibold text-xl">{template?.title}</h2>
            </div>
          ))}
        </div>
      </div>
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

export default Template;
