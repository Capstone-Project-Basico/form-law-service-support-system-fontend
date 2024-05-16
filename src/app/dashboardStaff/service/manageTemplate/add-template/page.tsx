'use client';
import AddTemplate from '@/components/add-template';
import FileUpload from '@/components/file-upload';
import Loading from '@/components/loading';
import { FormTemplate } from '@/constants/types/FormTemplate';
import { SideNavItem } from '@/constants/types/homeType';
import axiosClient from '@/lib/axiosClient';
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/breadcrumbs';
import { Button, Input, Textarea } from '@nextui-org/react';
import { Select, SelectItem } from '@nextui-org/select';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';

export interface IAddTemplatePageProps {}

export default function Page(props: IAddTemplatePageProps) {

  return <AddTemplate />;
}
