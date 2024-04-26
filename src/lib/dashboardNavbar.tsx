import { SideNavItem } from "@/constants/types/homeType";
import {
  faHouse,
  faCircleInfo,
  faListCheck,
  faUserGroup,
  faFile,
  faBarsStaggered,
  faCartShopping,
  faBasketShopping,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const sideNavItems: SideNavItem[] = [
  {
    title: "Trang chủ",
    path: "/dashboard",
    icon: <FontAwesomeIcon icon={faHouse} className="w-7 h-7 text-[#FF0004]" />,
  },
  {
    title: "Quản lí thông tin",
    path: "/dashboard/information",
    icon: (
      <FontAwesomeIcon icon={faCircleInfo} className="w-7 h-7 text-[#FF0004]" />
    ),
    subMenu: true,
    subMenuItems: [
      { title: "Liên hệ", path: "/dashboard/information/contact" },
      { title: "Tuyển dụng", path: "/dashboard/information/recruitment" },
      { title: "Đối tác", path: "/dashboard/information/partner" },
    ],
  },
  {
    title: "Quản lí dịch vụ",
    path: "/dashboard/service",
    icon: (
      <FontAwesomeIcon
        icon={faBarsStaggered}
        className="w-7 h-7 text-[#FF0004]"
      />
    ),
    subMenu: true,
    subMenuItems: [
      { title: "Biểu mẫu", path: "/dashboard/service/manageTemplate" },
      { title: "Gói dịch vụ", path: "/dashboard/service/pack" },
    ],
  },

  {
    title: "Quản lí người dùng",
    path: "/dashboard/user",
    icon: (
      <FontAwesomeIcon icon={faUserGroup} className="w-7 h-7 text-[#FF0004]" />
    ),
    subMenu: true,
    subMenuItems: [
      { title: "Người dùng", path: "/dashboard/user" },
      { title: "Luật sư", path: "/dashboard/user/lawyer" },
    ],
  },
  {
    title: "Quản lí bài viết",
    path: "/dashboard/post",
    icon: <FontAwesomeIcon icon={faFile} className="w-7 h-7 text-[#FF0004]" />,
  },
  {
    title: "Quản lí công việc",
    path: "/dashboard/task",
    icon: (
      <FontAwesomeIcon icon={faListCheck} className="w-7 h-7 text-[#FF0004]" />
    ),
  },
  {
    title: "Quản lí giao dịch",
    path: "/dashboard/transaction",
    icon: (
      <FontAwesomeIcon
        icon={faCartShopping}
        className="w-7 h-7 text-[#FF0004]"
      />
    ),
  },
  {
    title: "Quản lí đơn hàng",
    path: "/dashboard/order",
    icon: (
      <FontAwesomeIcon
        icon={faBasketShopping}
        className="w-7 h-7 text-[#FF0004]"
      />
    ),
  },
];
