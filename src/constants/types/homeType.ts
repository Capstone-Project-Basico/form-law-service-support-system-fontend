import { IconProp } from "@fortawesome/fontawesome-svg-core";

export type Template = {
  title?: string;
  id: number;
  url?: string;
  price: number;
  fileUrl: string;
  message: string;
  formTypeName: string;
  formTypeId: number;
};

export type FormType = {
  id: number;
  typeName: string;
};

export type InputValues = {
  [key: string]: string;
};

export type Item = {
  icon?: IconProp; // Now strictly an IconProp
  imagePath?: string; // Separately handle image paths
  alt: string;
  title: string;
  subtitle: string;
};

export type Header = {
  title: string;
  subTitle?: string;
  link: string;
};

export type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  subMenu?: boolean;
  subMenuItems?: SideNavItem[];
};

export type ProfileSidebarItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
};

export type PartnerType = {
  partnerId: number;
  name: string;
  avatar: string; // Assuming you have an image URL or similar
  link: string; // This could be a URL
  processStatus: string;
  delete: boolean;
};

export type ContactType = {
  contactId: number;
  fullName: string;
  email: string;
  phoneNum: string;
  career: string;
  city: string;
  businessTime: string;
  annualRevenue: string;
  juridical: String;
  status: string;
  delete: boolean;
};

export type RecruitmentType = {
  id: number;
  fullName: string;
  dateOfBirth: Date | null;
  homeTown: string;
  gender: string;
  maritalStatus: string;
  email: string;
  phoneNum: string;
  position: string;
  exp: string;
  field: string;
  graduate: string;
  target: string;
  workPlace: string;
  id_number: string;
  processStatus: string;
  deleted: boolean;
};

export type PostType = {
  title: string;
  content: string;
  userName: string;
  cateName: string;
  deleted: boolean;
  cateId: string;
  userId: string;
  postId: number;
  processStatus: string;
};

export type PostCategory = {
  cateId: number;
  cateName: string;
  delete: boolean;
};

export type Category = {
  cateId: number;
  cateName: string;
  delete: boolean;
};

export type UserType = {
  userId: number;
  userName: string;
  password: string;
  avatar: string;
  url: string;
  introduce: string;
  position: string;
  email: string;
  phoneNumber: number;
  roleName: string;
  status: number;
};

export type WalletType = {
  walletId: string;
  balance: number;
  updateAt: Date;
  userId: number;
  email: string;
};

export type LawyerType = {
  userId: number;
  userName: string;
  email: string;
  phoneNumber: string;
  url: string;
  introduce: string;
  position: string;
  avatar: string;
  roleName: string;
  status: number;
};

export type TaskType = {
  id: number;
  taskName: string;
  description: string;
  startDate: any; // startDate can be a Date object or null
  endDate: any;
  email: string;
  processStatus: string;
  status: number;
  deleted: boolean;
};

export type TaskAssignmentType = {
  id: number;
  taskName: string;
  email: string;
  assignDate: Date;
  dueDate: Date;
  startDate: Date;
  endDate: Date;
  status: string;
  deleted: boolean;
};

export type TransactionType = {
  transactionId: string;
  description: string;
  amount: number;
  createAt: Date;
  status: string;
  type: string;
  walletId: string;
  email: string;
  deleted: boolean;
};

export type OrderType = {
  orderId: string;
  email: string;
  cart: [];
  orderStatus: string;
  dateCreated: Date;
  transactionId: Date;
  deleted: boolean;
};
export type CardTemplate = {
  itemDetail?: Template;
};

export type PackType = {
  packageId: string;
  packageName: string;
  description: string;
  dateCreated: Date | null;
  price: number;
  itemPackageList: [];
  deleted: boolean;
};

export interface UserLocal {
  data: {
    data: {
      userId: string;
      roleName: string;
    };
  };
}
