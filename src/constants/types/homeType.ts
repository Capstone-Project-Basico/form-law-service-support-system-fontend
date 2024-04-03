import { IconProp } from "@fortawesome/fontawesome-svg-core";

export type Template = {
  name?: string;
  url?: string;
  price: number;
  fileUrl: string;
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

export type Partner = {
  partnerId: number;
  name: string;
  avatar: string; // Assuming you have an image URL or similar
  link: string; // This could be a URL
  delete: boolean;
};

export type Contact = {
  contactId: number;
  fullName: string;
  email: string;
  phoneNum: string;
  career: string;
  city: string;
  businessTime: string;
  annualRevenue: string;
  juridical: String;
  status: boolean;
  delete: boolean;
};

export type Recruitment = {
  id: number;
  fullName: string;
  dateOfBirth: Date;
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
  processStatus: boolean;
  deleted: boolean;
};

export type User = {
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

export type Lawyer = {
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

export type Task = {
  id: number;
  taskName: string;
  description: string;
  startDate: Date;
  endDate: Date;
  email: string;
  status: boolean;
  delete: boolean;
};

export type CardTemplate = {
  itemDetail?: Template;
};
