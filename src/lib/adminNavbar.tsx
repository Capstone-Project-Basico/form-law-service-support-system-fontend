import { SideNavItem } from "@/constants/types/homeType";
import {
  faHouse,
  faCircleInfo,
  faListCheck,
  faUserGroup,
  faFile,
  faBarsStaggered,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const adminNavItems: SideNavItem[] = [
  {
    title: "Trang chủ",
    path: "/admin",
    icon: <FontAwesomeIcon icon={faHouse} className="w-7 h-7 text-[#FF0004]" />,
  },
  {
    title: "Cài đặt hệ thống",
    path: "/dashboard/setting",
    icon: (
      <FontAwesomeIcon icon={faSliders} className="w-7 h-7 text-[#FF0004]" />
    ),
  },
];
