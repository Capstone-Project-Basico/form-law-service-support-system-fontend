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
import {
  ArrowDownTrayIcon,
  EllipsisVerticalIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/solid';
import Loading from '@/components/loading';
import FileUpload from '@/components/file-upload';
import { ToastContainer } from 'react-toastify';
import ManagerTemplatePage from '@/components/manage-template';

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
  const [latestVersions, setlatestVersions] = useState<FormTemplateVersion[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState<{
    isOpen: boolean;
    id?: number | null;
  }>({ isOpen: false, id: null });
  const [isUpdate, setIsUpdate] = useState<{
    isOpen: boolean;
    data?: FormTemplate | null;
  }>({ isOpen: false });
  const [isStatusUpdate, setIsStatusUpdate] = useState<{
    isOpen: boolean;
    data?: FormTemplate | null;
  }>({ isOpen: false });
  const [file, setFile] = useState<File | null>(null);
  const [formType, setFormType] = useState<FormType[]>([]);

  const getData = async () => {
    //form type
    const formTypeRes = await axiosClient.get('formType/getAllFormTypes');
    if (formTypeRes.data?.status === false) return;
    setFormType(formTypeRes.data);

    // Fetch data
    const formTemplateRes = await axiosClient.get('formTemplate');
    if (formTemplateRes.data?.status === false) return;

    let formTemplatesWithVersions: FormTemplate[] = formTemplateRes.data;

    if (!formTemplatesWithVersions) return;

    //remove form template without version
    formTemplatesWithVersions = formTemplatesWithVersions.filter(
      (formTemplate) => formTemplate.latestVersion
    );

    formTemplatesWithVersions.sort((a, b) => {
      //check undefined
      if (!a.latestVersion || !b.latestVersion) {
        return 0;
      }
      if (!a.formTemplateId || !b.formTemplateId) {
        return 0;
      }

      if (a.latestVersion.status === b.latestVersion.status) {
        // If 'status' is equal, sort by 'id'
        return a.formTemplateId - b.formTemplateId;
      }
      // Otherwise, sort by 'status' (assuming 'status' is a string)
      // if status = active -> sort to the top
      if (a.latestVersion.status === 'ACTIVE') return -1;
      if (b.latestVersion.status === 'ACTIVE') return 1;
      // if status = deleted -> sort to the bottom
      if (a.latestVersion.status === 'DELETED') return 1;
      if (b.latestVersion.status === 'DELETED') return -1;
      // if status = pending -> sort to the top
      if (a.latestVersion.status === 'PENDING') return -1;
      if (b.latestVersion.status === 'PENDING') return 1;
      // if status = inactive -> sort to the bottom
      if (a.latestVersion.status === 'INACTIVE') return 1;
      if (b.latestVersion.status === 'INACTIVE') return -1;
      // if status = unstandardized -> sort to the bottom
      if (a.latestVersion.status === 'UNSTANDARDIZED') return 1;
      if (b.latestVersion.status === 'UNSTANDARDIZED') return -1;
      // if status = standardized -> sort to the top
      if (a.latestVersion.status === 'STANDARDIZED') return -1;
      if (b.latestVersion.status === 'STANDARDIZED') return 1;

      return 0;
    });

    setFormTemplate(formTemplatesWithVersions);
    // Now you can use formTemplatesWithVersions
  };

  const autoStandardizationTemplate = async (id: number, fileName: string) => {
    try {
      setIsLoading(true);
      const res = await axiosClient.post(`${id}/autoStandardization`, null, {
        responseType: 'blob',
      });

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
      const res = await axiosClient.patch(
        `latestVersion/${isEdit.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (res.data?.status === false) return;

      //set status is pending
      const resUpdateStatus = await axiosClient.put(
        `latestVersion/status/${isEdit.id}?status=PENDING`
      );

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
      const res = await axiosClient.delete(`latestVersion/${id}`);
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
    if (!isUpdate.data?.latestVersion?.id) return;
    try {
      setIsLoading(true);
      const res = await axiosClient.patch(
        `latestVersion/${isUpdate.data.latestVersion.id}`,
        data
      );
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
    if (!isStatusUpdate.data?.latestVersion?.id) return;
    try {
      setIsLoading(true);
      const res = await axiosClient.put(
        `latestVersion/status/${isStatusUpdate.data.latestVersion.id}?status=${data.status}`
      );
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
    if (!item.latestVersion || !item.latestVersion?.id) return null;

    const { latestVersion } = item;

    const renderId = () => (
      <div className="w-full text-center">{item.formTemplateId}</div>
    );
    const renderName = () => (
      <div className="w-full text-center">{item.title}</div>
    );
    const renderDownload = () => (
      <a
        href={`${process.env.NEXT_PUBLIC_BASE_API}formTemplateVersion/download/${latestVersion.id}`}
      >
        <ArrowDownTrayIcon className="mx-auto h-4 w-4" />
      </a>
    );
    const renderStatus = () => (
      <Chip
        className="capitalize"
        color={statusColorMap[latestVersion.status]}
        size="sm"
        variant="flat"
      >
        {cellValueMap[latestVersion.status]}
      </Chip>
    );
    const renderPrice = () => (
      <div className="mx-auto w-20 text-right">
        {new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }).format(latestVersion.price)}
      </div>
    );

    const renderAction = () => {
      const menuItems = [
        {
          title: 'Chỉnh sửa',
          onClick: () => setIsUpdate({ isOpen: true, data: item }),
        },
        {
          title: 'Chuẩn hóa',
          onClick: () =>
            latestVersion &&
            autoStandardizationTemplate(
              latestVersion.id,
              'Update_' + item.title
            ),
          notDisplayStatus: ['ACTIVE', 'STANDARDIZED', 'DELETED'],
        },
        {
          title: 'Chỉnh sửa file',
          onClick: () =>
            setIsEdit({
              isOpen: true,
              id: latestVersion?.id,
            }),
          notDisplayStatus: ['ACTIVE', 'STANDARDIZED', 'DELETED'],
        },
      ];

      const filteredMenuItems = menuItems.filter(
        (menu) =>
          menu.notDisplayStatus?.includes(latestVersion?.status ?? '') !== true
      );

      return (
        <div className="relative mx-6 flex items-center justify-end gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light">
                <EllipsisVerticalIcon className="" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              {filteredMenuItems.map((menu, index) => (
                <DropdownItem key={index} onClick={menu.onClick}>
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

  return <ManagerTemplatePage />;
};

export default Page;
