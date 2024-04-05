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
      title: 'Version Number',
      dataIndex: 'versionNumber',
      key: 'versionNumber',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
    // {
    //   title: 'File Url',
    //   dataIndex: 'fileUrl',
    //   key: 'fileUrl',
    // },
    {
      title: 'download',
      key: 'download',
    },
    {
      title: 'use',
      key: 'use',
    },
  ];

  const renderCell = useCallback((item: FormTemplateVersion, columnKey: Key) => {
    switch (columnKey) {
      case 'download':
        return <a href={process.env.NEXT_PUBLIC_BASE_API + 'formTemplateVersion/download/' + item.id}>Download</a>;
      case 'use':
        return <Link href={`/dashboard/template/use-template/${item.id}`}>Use</Link>;
      default:
        return getKeyValue(item, columnKey);
    }
  }, []);

  const getFile = async (id: number) => {
    // fetch file
    const res = await axiosClient.get('formTemplateVersion/download/' + id, { responseType: 'blob' });
    const file = new Blob([res.data]);

    const form = new FormData();
    form.append('file', file);

    const htmlRes = await axiosClient.post('https://demo-converter-to-html.onrender.com/api/documents/convert', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const html = htmlRes.data;
    console.log(html);
  };

  useEffect(() => {
    getFile(33);
  }, []);

  return (
    <div className="w-full h-[40rem]">
      <Table
        isHeaderSticky
        classNames={{
          base: ' max-h-[40rem] ',
          table: 'min-h-[420px] overflow-scroll',
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
