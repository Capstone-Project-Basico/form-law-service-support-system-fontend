'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
  useDisclosure,
} from '@nextui-org/react';
import axios from 'axios';
import { FormType } from '@/constants/types/homeType';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import authHeader from '@/components/authHeader/AuthHeader';

const Page = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
  } = useDisclosure();
  const [tabs, setTabs] = useState(1);
  const [formTypes, setFormTypes] = useState<FormType[]>([]);
  const [selectedFormType, setSelectedFormType] = useState<FormType>();
  //data
  const [typeName, setTypeName] = useState('');
  const newFormType = {
    typeName,
  };

  useEffect(() => {
    switch (tabs) {
      case 1:
        fetchTypes();
        break;
      case 2:
        // fetchDeleteTypes();
        break;
      default:
        fetchTypes();
        break;
    }
  }, [tabs]);

  const fetchTypes = () => {
    try {
      axios
        .get(`${process.env.NEXT_PUBLIC_BASE_API}formType/getAllFormTypes`)
        .then((response) => {
          setFormTypes(response.data.data);
        })
        .catch((error) => {});
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDeleteTypes = () => {
    try {
      axios
        .get(`${process.env.NEXT_PUBLIC_BASE_API}formType/getAllFormTypes`)
        .then((response) => {
          setFormTypes(response.data.data);
        })
        .catch((error) => {});
    } catch (error) {
      console.log(error);
    }
  };

  //pagination
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const pages = Math.ceil(formTypes.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return formTypes.slice(start, end);
  }, [page, formTypes]);

  const handleSubmit = async (e: FormEvent, onClose: () => void) => {
    e.preventDefault();
    if (typeName.length < 1) {
      toast.error('Không được bỏ trống tên');
      return;
    }
    try {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_BASE_API}formType/createFormType`,
          newFormType,
          {
            headers: authHeader(),
          }
        )
        .then((response) => {
          toast.success('Tạo loại biểu mẫu mới thành công');
          onClose();
          fetchTypes();
        });
    } catch (error) {
      toast.error('Tạo mới loại!');
      console.log(error);
    }
  };

  const handleUpdateSubmit = (e: FormEvent, onClose: () => void) => {
    e.preventDefault();

    if (!selectedFormType || selectedFormType.typeName.length < 1) {
      toast.error('Không được bỏ trống tên');
      return;
    }
    try {
      axios
        .put(
          `${process.env.NEXT_PUBLIC_BASE_API}formType/updateFormType/${selectedFormType?.id}`,
          selectedFormType,
          { headers: authHeader() }
        )
        .then(() => {
          toast.success('Cập nhật thành công');
          fetchTypes();
          onClose();
        })
        .catch(() => {
          toast.error('Cập nhật thất bại');
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id: number) => {
    try {
      axios
        .delete(
          `${process.env.NEXT_PUBLIC_BASE_API}formType/deleteFormType/${id}`
        )
        .then(() => {
          toast.success('Xóa thành công');
          fetchTypes();
        })
        .catch(() => {
          toast.error('Xóa thất bại');
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ml-5 mr-5 mt-5 w-full">
      <ToastContainer />
      <div className="grid grid-cols-2 border-b-2 pb-5">
        <Breadcrumbs color="danger" size="lg" className="text-3xl">
          <BreadcrumbItem>
            <p className="text-3xl font-bold text-black ">Quản lí dịch vụ</p>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <p className="text-3xl font-bold text-[#FF0004]">Loại biểu mẫu</p>
          </BreadcrumbItem>
        </Breadcrumbs>

        <div className="flex justify-end">
          <Button
            className="flex w-[100px] justify-end bg-[#FF0004] text-white"
            radius="full"
            onPress={onOpen}
          >
            <FontAwesomeIcon icon={faPlus} />
            Tạo mới
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton>
            <ModalContent>
              {(onClose) => (
                <>
                  <form onSubmit={(e) => handleSubmit(e, onClose)}>
                    <ModalHeader className="mb-5 flex flex-col gap-1 bg-[#FF0004] text-2xl font-bold text-white">
                      Thêm thể loại cho biểu mẫu
                    </ModalHeader>
                    <ModalBody>
                      <Input
                        type="text"
                        isRequired
                        label="Tên loại biểu mẫu"
                        value={typeName}
                        onChange={(e) => setTypeName(e.target.value)}
                      />
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Đóng
                      </Button>
                      <Button color="primary" type="submit">
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
      <Table
        aria-label="Example static collection table"
        bottomContent={
          pages > 1 && (
            <div className="flex w-full justify-center">
              <Pagination
                showControls
                classNames={{
                  wrapper: 'gap-0 overflow-visible h-8 ',
                  item: 'w-8 h-8 text-small rounded-none bg-transparent',
                  cursor:
                    'bg-gradient-to-b shadow-lg from-default-500 to-default-800 dark:from-default-300 dark:to-default-100 text-white font-bold',
                }}
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          )
        }
      >
        <TableHeader className="">
          <TableColumn className=" bg-[#FF0004] text-white">
            Tên loại biểu mẫu
          </TableColumn>
          {/* <TableColumn className=" bg-[#FF0004] text-white">
                        Chi tiết
                    </TableColumn> */}
          <TableColumn className="flex items-center justify-center bg-[#FF0004] text-white">
            Tương tác
          </TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((type, index) => (
            <TableRow key={index}>
              <TableCell>{type.typeName}</TableCell>
              {/* <TableCell className='italic'>Hiện tại đang phát triển</TableCell> */}

              <TableCell className="flex items-center justify-center  gap-2 ">
                <Button
                  className="bg-blue-600 text-white"
                  onPress={() => {
                    setSelectedFormType(type);
                    onOpenUpdate();
                  }}
                >
                  Cập nhật
                </Button>

                {/* <Button
                  className="bg-[#FF0004] text-white"
                  onClick={() => handleDelete(type.id)}
                >
                  Xóa
                </Button> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* modal update  */}
      <Modal isOpen={isOpenUpdate} onOpenChange={onCloseUpdate} hideCloseButton>
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={(e) => handleUpdateSubmit(e, onClose)}>
                <ModalHeader className="mb-5 flex flex-col gap-1 bg-[#FF0004] text-2xl font-bold text-white">
                  Cập nhật thể loại cho biểu mẫu
                </ModalHeader>
                <ModalBody>
                  {selectedFormType && (
                    <Input
                      type="text"
                      isRequired
                      label="Tên loại biểu mẫu"
                      value={selectedFormType.typeName}
                      onChange={(e) =>
                        setSelectedFormType({
                          ...selectedFormType,
                          typeName: e.target.value,
                        })
                      }
                    />
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Đóng
                  </Button>
                  <Button color="primary" type="submit">
                    Cập nhật
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Page;
