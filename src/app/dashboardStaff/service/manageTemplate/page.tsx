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
      const res = await axiosClient.post(
        `latestVersion/${id}/autoStandardization`,
        null,
        { responseType: 'blob' }
      );

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
        href={`${process.env.NEXT_PUBLIC_BASE_API}latestVersion/download/${latestVersion.id}`}
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

  // if (isLoading) return <Loading />;

  return (
    <div className="ml-5 mr-5 mt-5 w-full">
      {isLoading && (
        <Loading className="fixed left-0 top-0 z-50 h-full w-full bg-white bg-opacity-50" />
      )}
      {isEdit.isOpen && (
        <div className="fixed left-0 top-0 z-50 h-full w-full bg-white bg-opacity-50">
          <Modal
            isOpen={isEdit.isOpen}
            onClose={() => setIsEdit({ isOpen: true })}
            hideCloseButton
          >
            <ModalContent style={{ width: '50%', maxWidth: '500px' }}>
              <ModalHeader className="mb-5 flex flex-col gap-1 bg-[#FF0004] text-2xl font-bold text-white">
                Cập nhật file
              </ModalHeader>
              <ModalBody>
                <FileUpload file={file} setFile={setFile} className="" />
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={() => handleFileUpload()}
                  className="button-danger bg-[#FF0004] text-white"
                >
                  Cập nhật
                </Button>
                <Button
                  className="button-danger bg-[#FF0004] text-white"
                  onPress={() => setIsEdit({ isOpen: false })}
                >
                  Đóng
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      )}
      {/* update modal */}
      <form onSubmit={handleUpdate}>
        <Modal
          isOpen={isUpdate.isOpen}
          onClose={() => setIsUpdate({ isOpen: false })}
          hideCloseButton
        >
          <ModalContent style={{ width: '50%', maxWidth: '500px' }}>
            <ModalHeader className="mb-5 flex flex-col gap-1 bg-[#FF0004] text-2xl font-bold text-white">
              Chi tiết
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-10">
                <Input
                  name="title"
                  label="Tên biểu mẫu"
                  value={isUpdate.data?.title}
                />
                <Select
                  name="formTypeName"
                  label="Loại biểu mẫu"
                  defaultSelectedKeys={[formType[0]?.id]}
                  items={formType}
                >
                  {(formType) => (
                    <SelectItem key={formType.id}>
                      {formType.typeName}
                    </SelectItem>
                  )}
                </Select>
                <Input
                  name="description"
                  label="Miểu tả"
                  value={isUpdate.data?.description}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                className="button-danger bg-[#FF0004] text-white"
              >
                Cập nhật
              </Button>
              <Button
                className="button-danger bg-[#FF0004] text-white"
                onPress={() => setIsUpdate({ isOpen: false })}
              >
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
                  defaultSelectedKeys={isStatusUpdate.data?.latestVersion.status ? [isStatusUpdate.data.latestVersion.status] : undefined}
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
            <p className="text-3xl font-bold text-black ">Quản lí thông tin</p>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <p className="text-3xl font-bold text-[#FF0004]">Biểu mẫu</p>
          </BreadcrumbItem>
        </Breadcrumbs>

        <div className="flex justify-end">
          <Button
            className="flex justify-end bg-[#FF0004] text-white"
            radius="full"
            onClick={() =>
              router.push('/dashboardStaff/service/manageTemplate/add-template')
            }
          >
            Tạo mới
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>
      </div>

      <div className="flex flex-row gap-10 border-b-1 font-bold">
        <div>
          <Button
            className={`bg-white ${tabs === 1 && 'border-b-2 border-[#FF0004] text-[#FF0004]'}`}
            onClick={() => setTabs(1)}
            radius="none"
          >
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

      <div className="h-[40rem] w-full">
        <Table
          isHeaderSticky
          classNames={{
            base: ' max-h-[40rem] ',
            table: ' overflow-scroll',
            tbody: 'text-center',
          }}
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
          <TableHeader columns={columns} className="text-white">
            {(column) => (
              <TableColumn
                className="bg-primary text-center text-white"
                key={column.key}
              >
                {column.title}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            loadingContent={<Spinner label="Loading..." />}
            items={items}
          >
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
