import { IconProp } from "@fortawesome/fontawesome-svg-core";

export type Template = {
  name?: string;
  url?: string;
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

export type Partner = {
  partnerId: number;
  name: string;
  avatar: string; // Assuming you have an image URL or similar
  link: string; // This could be a URL
  delete: boolean;
};
