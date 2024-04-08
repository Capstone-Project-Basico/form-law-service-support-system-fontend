'use client';

import axiosClient from '@/lib/axiosClient';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Spinner } from '@nextui-org/react';
import Link from 'next/link';
import React, { Key, useCallback, useEffect } from 'react';

type Props = {};

const Page = (props: Props) => {
  const [formTemplateVersions, setFormTemplateVersions] = React.useState<FormTemplateVersion[]>([]);

  useEffect(() => {
    // Add your code here
    const getData = async () => {
      // Fetch data
      const res = await axiosClient.get('formTemplateVersion');
      setFormTemplateVersions(res.data);
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
    // {
    //   title: 'File Url',
    //   dataIndex: 'fileUrl',
    //   key: 'fileUrl',
    // },
    {
      title: 'Tải xuống',
      key: 'download',
    },
    {
      title: 'Sử dụng',
      key: 'use',
    },
  ];

  const renderCell = useCallback((item: FormTemplateVersion, columnKey: Key) => {
    switch (columnKey) {
      case 'download':
        return <a href={process.env.NEXT_PUBLIC_BASE_API + 'formTemplateVersion/download/' + item.id}>Tải xuống</a>;
      case 'use':
        return <Link href={`/dashboard/template/use-template/${item.id}`}>Sử dụng</Link>;
      case 'status':
        return item.status === 'STANDARDIZED' ? (
          <span className="text-green-500">Chuẩn hóa</span>
        ) : (
          <span className="text-red-500">Chưa chuẩn hóa</span>
        );
      default:
        return getKeyValue(item, columnKey);
    }
  }, []);

  return (
    <div className="w-full h-[40rem]">
      <Table
        isHeaderSticky
        classNames={{
          base: ' max-h-[40rem] ',
          table: ' overflow-scroll',
        }}
      >
        <TableHeader columns={columns} className="text-white">
          {(column) => (
            <TableColumn className="bg-primary text-white" key={column.key}>
              {column.title}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody loadingContent={<Spinner label="Loading..." />} items={formTemplateVersions}>
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
  );
};

export default Page;
