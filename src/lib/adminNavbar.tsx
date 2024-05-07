import { SideNavItem } from "@/constants/types/homeType";
import {
  faHouse,
  faCircleInfo,
  faListCheck,
  faUserGroup,
  faFile,
  faBarsStaggered,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const adminNavItems: SideNavItem[] = [
  {
    title: "Trang chủ",
    path: "/admin",
    icon: <FontAwesomeIcon icon={faHouse} className="w-7 h-7 text-[#FF0004]" />,
  },
];
