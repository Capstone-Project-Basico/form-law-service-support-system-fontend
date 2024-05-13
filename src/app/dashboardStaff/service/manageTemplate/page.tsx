'use client';

import AddTemplate from '@/sections/AddTemplate';
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
  Pagination,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Chip,
  Select,
  SelectItem,
} from '@nextui-org/react';
import axios from 'axios';
import React, { FormEvent, Key, useCallback, useEffect, useState } from 'react';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { FormTemplate } from '@/constants/types/FormTemplate';
import authHeader from '@/components/authHeader/AuthHeader';
import Image from 'next/image';
import Template from '@/components/manage/Template';
import { useRouter } from 'next/navigation';
import axiosClient from '@/lib/axiosClient';
import { ArrowDownTrayIcon, EllipsisVerticalIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import Loading from '@/components/loading';
import FileUpload from '@/components/file-upload';

const statusColorMap: any = {
  ACTIVE: 'success',
  INACTIVE: 'danger',
  UNSTANDARDIZED: 'danger',
  STANDARDIZED: 'success',
  DELETED: 'danger',
  PENDING: 'warning',
};

const cellValueMap: { [key: string]: string } = {
  ACTIVE: 'Hoạt động',
  INACTIVE: 'Ngưng hoạt động',
  UNSTANDARDIZED: 'Chưa chuẩn hóa',
  STANDARDIZED: 'Chuẩn hóa',
  DELETED: 'Đã xóa',
  PENDING: 'Chờ duyệt',
};

const Page = () => {
  const router = useRouter();
  const [tabs, setTabs] = useState(1);
  const [formTemplate, setFormTemplate] = useState<FormTemplate[]>([]);
  const [formTemplateVersions, setFormTemplateVersions] = useState<FormTemplateVersion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState<{ isOpen: boolean; id?: number | null }>({ isOpen: false, id: null });
  const [isUpdate, setIsUpdate] = useState<{ isOpen: boolean; data?: FormTemplate | null }>({ isOpen: false });
  const [isStatusUpdate, setIsStatusUpdate] = useState<{ isOpen: boolean; data?: FormTemplate | null }>({ isOpen: false });
  const [file, setFile] = useState<File | null>(null);
  const [formType, setFormType] = useState<FormType[]>([]);

  const getData = async () => {
    //form type
    const formTypeRes = await axiosClient.get('formType/getAllFormTypes');
    if (formTypeRes.data?.status === false) return;
    setFormType(formTypeRes.data);

    // Fetch data
    const formTemplateRes = await axiosClient.get('formTemplate/getAllFormTemplates');
    if (formTemplateRes.data?.status === false) return;
    const promises = formTemplateRes.data.map(async (item: FormTemplate) => {
      try {
        const formTemplateVersionRes = await axiosClient.get(`/formTemplateVersion/last/formTemplate/${item.formTemplateId}`);
        if (!formTemplateVersionRes.data?.id) return;
        const formTemplateVersion = formTemplateVersionRes.data;

        // if status DELETED remove
        if (formTemplateVersion.status === 'DELETED') return null;

        // Add the formTemplateVersion to the formTemplate
        return { ...item, formTemplateVersion };
      } catch (error: any) {
        if (error.response.status === 400) {
          // remove item from formTemplate
          return null;
        }
      }
    });

    const formTemplatesWithVersions = (await Promise.all(promises)).filter(Boolean);

    // Sort the data
    formTemplatesWithVersions.sort((a, b) => b.formTemplateId - a.formTemplateId);
    setFormTemplate(formTemplatesWithVersions);
    // Now you can use formTemplatesWithVersions
  };

  const autoStandardizationTemplate = async (id: number, fileName: string) => {
    try {
      setIsLoading(true);
      const res = await axiosClient.post(`formTemplateVersion/${id}/autoStandardization`, null, { responseType: 'blob' });

      const file = new Blob([res.data]);
      const url = URL.createObjectURL(file);

      const a = document.createElement('a');
      a.href = url;
      document.body.appendChild(a);

      a.download = fileName + '.docx';
      a.click();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleFileUpload = async () => {
    if (!file) return;
    if (!isEdit.id) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setIsLoading(true);
      const res = await axiosClient.patch(`formTemplateVersion/${isEdit.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data?.status === false) return;

      //set status is pending
      const resUpdateStatus = await axiosClient.put(`formTemplateVersion/status/${isEdit.id}?status=PENDING`);

      getData();
      setIsLoading(false);
      setIsEdit({ isOpen: false });
      setFile(null);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsEdit({ isOpen: false });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setIsLoading(true);
      const res = await axiosClient.delete(`formTemplateVersion/${id}`);
      if (res.data?.status === false) return;
      getData();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    if (!isUpdate.data?.formTemplateVersion?.id) return;
    try {
      setIsLoading(true);
      const res = await axiosClient.patch(`formTemplateVersion/${isUpdate.data.formTemplateVersion.id}`, data);
      if (res.data?.status === false) return;
      getData();
      setIsLoading(false);
      setIsUpdate({ isOpen: false });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsUpdate({ isOpen: false });
    }
  };

  const handleUpdateStatus = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    if (!isStatusUpdate.data?.formTemplateVersion?.id) return;
    try {
      setIsLoading(true);
      const res = await axiosClient.put(`formTemplateVersion/status/${isStatusUpdate.data.formTemplateVersion.id}?status=${data.status}`);
      if (res.data?.status === false) return;
      getData();
      setIsLoading(false);
      setIsStatusUpdate({ isOpen: false });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsStatusUpdate({ isOpen: false });
    }
  };

  useEffect(() => {
    // switch (tabs) {
    //   case 1:
    //     fetchTemplates();
    //     break;
    //   case 2:
    //   default:
    //     fetchTemplates();
    // }

    getData();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên biểu mẫu',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Tình trạng',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Tải xuống',
      key: 'download',
    },
    {
      title: 'Hành động',
      key: 'action',
    },
  ];

  const renderCell = useCallback((item: FormTemplate, columnKey: Key) => {
    if (!item.formTemplateVersion || !item.formTemplateVersion?.id) return null;

    const { formTemplateVersion } = item;

    const renderId = () => <div className="w-full text-center">{item.formTemplateId}</div>;
    const renderName = () => <div className="w-full text-left">{item.title}</div>;
    const renderDownload = () => (
      <a href={`${process.env.NEXT_PUBLIC_BASE_API}formTemplateVersion/download/${formTemplateVersion.id}`}>
        <ArrowDownTrayIcon className="mx-auto w-4 h-4" />
      </a>
    );
    const renderStatus = () => (
      <Chip className="capitalize" color={statusColorMap[formTemplateVersion.status]} size="sm" variant="flat">
        {cellValueMap[formTemplateVersion.status]}
      </Chip>
    );
    const renderPrice = () => (
      <div className="text-right">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(formTemplateVersion.price)}</div>
    );

    const renderAction = () => {
      const menuItems = [
        {
          title: 'Chỉnh sửa',
          onClick: () => setIsUpdate({ isOpen: true, data: item }),
        },
        {
          title: 'Chuẩn hóa',
          onClick: () => formTemplateVersion && autoStandardizationTemplate(formTemplateVersion.id, 'text'),
          notDisplayStatus: ['ACTIVE', 'STANDARDIZED', 'DELETED'],
        },
        {
          title: 'Chỉnh sửa file',
          onClick: () => setIsEdit({ isOpen: true, id: formTemplateVersion?.id }),
          notDisplayStatus: ['ACTIVE', 'STANDARDIZED', 'DELETED'],
        },
        {
          title: 'Cập nhật trạng thái',
          onClick: () => setIsStatusUpdate({ isOpen: true, data: item }),
        },
        {
          title: 'Xóa',
          onClick: () => {
            handleDelete(formTemplateVersion.id);
          },
          color: 'danger',
          notDisplayStatus: ['DELETED'],
        },
      ];

      const filteredMenuItems = menuItems.filter((menu) => menu.notDisplayStatus?.includes(formTemplateVersion?.status ?? '') !== true);

      return (
        <div className="relative flex justify-end mx-6 items-center gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light">
                <EllipsisVerticalIcon className="" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              {filteredMenuItems.map((menu, index) => (
                <DropdownItem className={menu.color && 'bg-red-500'} key={index} onClick={menu.onClick}>
                  {menu.title}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      );
    };

    const renderFunctions: { [key: string]: () => JSX.Element } = {
      id: renderId,
      name: renderName,
      download: renderDownload,
      status: renderStatus,
      action: renderAction,
      price: renderPrice,
    };

    return renderFunctions[String(columnKey)]?.();
  }, []);

  //pagination
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 8;

  const pages = Math.ceil(formTemplate.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return formTemplate.slice(start, end);
  }, [page, formTemplate]);

  // if (isLoading) return <Loading />;

  return (
    <div className="w-full mt-5 ml-5 mr-5">
      {isLoading && <Loading className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 z-50" />}
      {isEdit.isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 z-50">
          <Modal isOpen={isEdit.isOpen} onClose={() => setIsEdit({ isOpen: true })} hideCloseButton>
            <ModalContent style={{ width: '50%', maxWidth: '500px' }}>
              <ModalHeader className="flex flex-col gap-1 text-white text-2xl font-bold bg-[#FF0004] mb-5">Cập nhật file</ModalHeader>
              <ModalBody>
                <FileUpload file={file} setFile={setFile} className="" />
              </ModalBody>
              <ModalFooter>
                <Button onClick={() => handleFileUpload()} className="button-danger bg-[#FF0004] text-white">
                  Cập nhật
                </Button>
                <Button className="button-danger bg-[#FF0004] text-white" onPress={() => setIsEdit({ isOpen: false })}>
                  Đóng
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      )}
      {/* update modal */}
      <form onSubmit={handleUpdate}>
        <Modal isOpen={isUpdate.isOpen} onClose={() => setIsUpdate({ isOpen: false })} hideCloseButton>
          <ModalContent style={{ width: '50%', maxWidth: '500px' }}>
            <ModalHeader className="flex flex-col gap-1 text-white text-2xl font-bold bg-[#FF0004] mb-5">Chi tiết</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-10">
                <Input name="title" label="Tên biểu mẫu" value={isUpdate.data?.title} />
                <Select name="formTypeName" label="Loại biểu mẫu" defaultSelectedKeys={[formType[0]?.id]} items={formType}>
                  {(formType) => <SelectItem key={formType.id}>{formType.typeName}</SelectItem>}
                </Select>
                <Input name="description" label="Miểu tả" value={isUpdate.data?.description} />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" className="button-danger bg-[#FF0004] text-white">
                Cập nhật
              </Button>
              <Button className="button-danger bg-[#FF0004] text-white" onPress={() => setIsUpdate({ isOpen: false })}>
                Đóng
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </form>

      {/* update status modal */}
      {/* <Modal isOpen={isStatusUpdate.isOpen} onClose={() => setIsStatusUpdate({ isOpen: false })} hideCloseButton>
        <ModalContent style={{ width: '50%', maxWidth: '500px' }}>
          <ModalHeader className="flex flex-col gap-1 text-white text-2xl font-bold bg-[#FF0004] mb-5">Chi tiết</ModalHeader>
          <ModalBody>
            <form onSubmit={handleUpdateStatus}>
              <div className="flex flex-col gap-10">
                <Select
                  name="status"
                  defaultSelectedKeys={isStatusUpdate.data?.formTemplateVersion.status ? [isStatusUpdate.data.formTemplateVersion.status] : undefined}
                  variant="bordered"
                  label="Loại biểu mẫu"
                >
                  <SelectItem key={'ACTIVE'}>ACTIVE</SelectItem>
                  <SelectItem key={'INACTIVE'}>INACTIVE</SelectItem>
                  <SelectItem key={'UNSTANDARDIZED'}>UNSTANDARDIZED</SelectItem>
                  <SelectItem key={'STANDARDIZED'}>STANDARDIZED</SelectItem>
                  <SelectItem key={'DELETED'}>DELETED</SelectItem>
                </Select>
              </div>
              <div className="p-6 flex justify-end gap-4">
                <Button type="submit" className="button-danger bg-[#FF0004] text-white">
                  Cập nhật
                </Button>
                <Button className="button-danger bg-[#FF0004] text-white" onPress={() => setIsStatusUpdate({ isOpen: false })}>
                  Đóng
                </Button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal> */}

      <div className=" grid grid-cols-2 pb-5">
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
            className="flex justify-end bg-[#FF0004] text-white"
            radius="full"
            onClick={() => router.push('/dashboardStaff/service/manageTemplate/add-template')}
          >
            Tạo mới
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>
      </div>

      <div className="flex flex-row gap-10 font-bold border-b-1 ">
        <div>
          <Button className={`bg-white ${tabs === 1 && 'text-[#FF0004] border-b-2 border-[#FF0004]'}`} onClick={() => setTabs(1)} radius="none">
            TẤT CẢ
          </Button>
        </div>
        {/* <div>
          <Button className="bg-white" onClick={() => setTabs(2)} radius="none">
            CHỜ DUYỆT
          </Button>
        </div>
        <div>
          <Button
            className={`bg-white ${tabs === 3 && 'text-[#FF0004] border-b-[#FF0004] border-b-2 border-[#FF0004]'}`}
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
            base: ' max-h-[40rem] ',
            table: ' overflow-scroll',
            tbody: 'text-center',
          }}
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                showControls
                classNames={{
                  wrapper: 'gap-0 overflow-visible h-8 ',
                  item: 'w-8 h-8 text-small rounded-none bg-transparent',
                  cursor: 'bg-gradient-to-b shadow-lg from-default-500 to-default-800 dark:from-default-300 dark:to-default-100 text-white font-bold',
                }}
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
        >
          <TableHeader columns={columns} className="text-white">
            {(column) => (
              <TableColumn className="bg-primary text-white text-center" key={column.key}>
                {column.title}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody loadingContent={<Spinner label="Loading..." />} items={items}>
            {(item) => (
              <TableRow key={item.formTemplateId}>
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
