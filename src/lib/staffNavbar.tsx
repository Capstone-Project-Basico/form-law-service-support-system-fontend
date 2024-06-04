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

export const staffNavItems: SideNavItem[] = [
  {
    title: "Trang chủ",
    path: "/dashboardStaff",
    icon: <FontAwesomeIcon icon={faHouse} className="w-7 h-7 text-[#FF0004]" />,
  },
  {
    title: "Quản lí thông tin",
    path: "/dashboardStaff/information",
    icon: (
      <FontAwesomeIcon icon={faCircleInfo} className="w-7 h-7 text-[#FF0004]" />
    ),
    subMenu: true,
    subMenuItems: [
      { title: "Liên hệ", path: "/dashboardStaff/information/contact" },
      { title: "Tuyển dụng", path: "/dashboardStaff/information/recruitment" },
      { title: "Đối tác", path: "/dashboardStaff/information/partner" },
    ],
  },
  {
    title: "Quản lí dịch vụ",
    path: "/dashboardStaff/service",
    icon: (
      <FontAwesomeIcon
        icon={faBarsStaggered}
        className="w-7 h-7 text-[#FF0004]"
      />
    ),
    subMenu: true,
    subMenuItems: [
      { title: "Biểu mẫu", path: "/dashboardStaff/service/manageTemplate" },
      { title: "Gói biểu mẫu", path: "/dashboardStaff/service/templatePack" },
      { title: "Dịch vụ tư vấn", path: "/dashboardStaff/service/consult" },
    ],
  },

  {
    title: "Quản lí bài viết",
    path: "/dashboardStaff/post",
    icon: <FontAwesomeIcon icon={faFile} className="w-7 h-7 text-[#FF0004]" />,
  },
  {
    title: "Quản lí công việc",
    path: "/dashboardStaff/task",
    icon: (
      <FontAwesomeIcon icon={faListCheck} className="w-7 h-7 text-[#FF0004]" />
    ),
  },
];
