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
import ManagerTemplatePage from '../../../../components/manage-template';

const Page = () => {
  return <ManagerTemplatePage />;
};

export default Page;
