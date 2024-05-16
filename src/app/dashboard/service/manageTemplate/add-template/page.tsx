'use client';
import AddTemplate from '@/components/add-template';
import FileUpload from '@/components/file-upload';
import Loading from '@/components/loading';
import {
  FormTemplate,
  FormTemplateRequest,
} from '@/constants/types/FormTemplate';
import { SideNavItem } from '@/constants/types/homeType';
import axiosClient from '@/lib/axiosClient';
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/breadcrumbs';
import { Button, Input, Textarea } from '@nextui-org/react';
import { Select, SelectItem } from '@nextui-org/select';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';

export interface IAddTemplatePageProps {}

export default function Page(props: IAddTemplatePageProps) {
  // const router = useRouter();
  // const pathname = usePathname();
  // const [file, setFile] = React.useState<File | null>(null);
  // const [titleInputError, setTitleInputError] = React.useState<string>('');
  // const [formTypes, setFormTypes] = React.useState<FormType[]>([]);
  // const [isLoading, setIsLoading] = React.useState<boolean>(true);

  // React.useEffect(() => {
  //   async function fetchformTypes() {
  //     setIsLoading(true);
  //     const res = await axiosClient
  //       .get('/formType/getAllFormTypes')
  //       .catch((err) => console.log(err));
  //     if (res && res.status === 200) {
  //       setIsLoading(false);
  //       setFormTypes(res.data);
  //     }
  //   }
  //   fetchformTypes();
  // }, []);

  // const currentYear = new Date().getFullYear();
  // const range = (start: number, stop: number, step: number) =>
  //   Array.from(
  //     { length: (stop - start) / step + 1 },
  //     (_, i) => start + i * step
  //   );
  // const listYears = range(currentYear, 1980, -1);

  // function getPathnameOrder(pathname: string) {
  //   const parts = pathname.split('/').filter(Boolean); // filter out empty strings from the array

  //   const paths = [];
  //   let currentPath = '';

  //   for (let part of parts) {
  //     currentPath += '/' + part;
  //     paths.push(currentPath);
  //   }

  //   return paths;
  // }

  // function findSidebarItemByPath(
  //   path: string,
  //   items: SideNavItem[]
  // ): SideNavItem | undefined {
  //   for (let item of items) {
  //     if (item.path === path) {
  //       return item;
  //     }

  //     if (item.subMenu && item.subMenuItems) {
  //       // Add a check for item.subMenuItems
  //       const subItem = findSidebarItemByPath(path, item.subMenuItems);
  //       if (subItem) {
  //         return subItem;
  //       }
  //     }
  //   }

  //   return undefined;
  // }

  // //handle form submit
  // async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();

  //   const formData = new FormData(e.currentTarget);
  //   const formValues: { [key: string]: string } = {};

  //   formData.forEach((value, key) => {
  //     formValues[key] = value.toString();
  //   });

  //   // check if value is empty
  //   if (Object.values(formValues).some((value) => value === '')) {
  //     toast.warn('Vui lòng điền đầy đủ thông tin');
  //     return;
  //   }

  //   // Use the formValues object to access the form data
  //   const formTemplate: FormTemplateRequest = {
  //     formTypeId: parseInt(formValues.formTypeId),
  //     title: formValues.title,
  //     description: formValues.description,
  //   };
  //   const formTemplateId = await postFormTemplate(formTemplate);

  //   const formTemplateVersion: FormTemplateVersionReq = {
  //     message: formValues.description,
  //     price: parseInt(formValues.price),
  //     file: file as File,
  //     formTemplateId,
  //   };
  //   const res = await postFormTemplateVersion(formTemplateVersion);
  //   if (res) {
  //     router.push('/dashboard/service/manageTemplate');
  //   }
  // }

  // async function handleOnTitleInputFocusChanged(
  //   e: React.FocusEvent<Element, Element>
  // ) {
  //   const value = (e.target as HTMLInputElement).value;

  //   const res = await axiosClient.get(
  //     `/formTemplate/getFormTemplateByTitle?title=${value}`
  //   );
  //   if (res.status === 200) {
  //     const data = res.data;
  //     if (data.message !== 'Not found!!!') {
  //       setTitleInputError('Tên biểu mẫu đã tồn tại');
  //     } else {
  //       setTitleInputError('');
  //     }
  //   }
  // }

  // async function postFormTemplate(data: FormTemplateRequest) {
  //   // const res = await useApi({ method: 'POST', url: '/formTemplate/createFormTemplate', body: data });
  //   const res = await axiosClient.post(
  //     '/formTemplate/createFormTemplate',
  //     data
  //   );
  //   if (res.status === 200) {
  //     console.log(res.data);
  //     return res.data.formTemplateId;
  //   }
  //   // console.log(res);
  // }

  // async function postFormTemplateVersion(data: FormTemplateVersionReq) {
  //   const formData = new FormData();
  //   formData.append('message', data.message);
  //   formData.append('price', data.price.toString());
  //   formData.append('file', data.file);
  //   formData.append('formTemplateId', data.formTemplateId.toString());
  //   const res = await axiosClient.post('/formTemplateVersion', formData, {
  //     headers: { 'Content-Type': 'multipart/form-data' },
  //   });
  //   if (res.status === 200) {
  //     console.log(res.data);
  //     return res;
  //   }
  //   return null;
  // }

  return <AddTemplate />;
}
