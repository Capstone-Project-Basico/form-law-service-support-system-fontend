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
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';

const Page = () => {
  const router = useRouter();
  const [tabs, setTabs] = useState(1);
  const [formTemplateVersions, setFormTemplateVersions] = React.useState<FormTemplateVersion[]>([]);

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
      const res = await axiosClient.get('formTemplateVersion');
      if (res.data.status === true) setFormTemplateVersions(res.data);
    };
    getData();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Version',
      dataIndex: 'versionNumber',
      key: 'versionNumber',
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
      title: 'Thông báo',
      dataIndex: 'message',
      key: 'message',
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

  const renderCell = useCallback((item: FormTemplateVersion, columnKey: Key) => {
    switch (columnKey) {
      case 'download':
        return (
          <a href={process.env.NEXT_PUBLIC_BASE_API + 'formTemplateVersion/download/' + item.id}>
            <ArrowDownTrayIcon className="mx-auto w-4 h-4" />
          </a>
        );
      case 'status':
        return item.status === 'STANDARDIZED' ? (
          <span className="text-green-500">Chuẩn hóa</span>
        ) : (
          <span className="text-red-500">Chưa chuẩn hóa</span>
        );
      case 'message':
        return <div className="w-full text-left">{getKeyValue(item, columnKey)}</div>;
      case 'action':
        if (item.status === 'UNSTANDARDIZED') return <Link href={'/dashboard/service/manageTemplate/standardization/' + item.id}>Chuẩn hóa</Link>;
      default:
        return getKeyValue(item, columnKey);
    }
  }, []);

  //pagination
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 8;

  const pages = Math.ceil(formTemplateVersions.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return formTemplateVersions.slice(start, end);
  }, [page, formTemplateVersions]);

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
            onClick={() => router.push('/dashboard/template/add-template')}
          >
            <FontAwesomeIcon icon={faPlus} />
            Tạo mới
          </Button>
        </div>
      </div>

      <div className="flex flex-row gap-10 font-bold border-b-1 ">
        <div>
          <Button className={`bg-white ${tabs === 1 && 'text-[#FF0004] border-b-2 border-[#FF0004]'}`} onClick={() => setTabs(1)} radius="none">
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
            className={`bg-white ${tabs === 3 && 'text-[#FF0004] border-b-[#FF0004] border-b-2 border-[#FF0004]'}`}
            radius="none"
            onClick={() => setTabs(3)}
          >
            KHÔNG SỬ DỤNG
          </Button>
        </div>
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
