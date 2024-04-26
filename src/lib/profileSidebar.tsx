import { ProfileSidebarItem, SideNavItem } from "@/constants/types/homeType";
import {
  faHouse,
  faCircleInfo,
  faListCheck,
  faUserGroup,
  faFile,
  faBarsStaggered,
  faAddressCard,
  faLock,
  faWallet,
  faFileSignature,
  faHeadset,
  faClockRotateLeft,
  faBasketShopping,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const profileSidebar: ProfileSidebarItem[] = [
  {
    title: "Cài đặt thông tin cá nhân",
    path: "/profile",
    icon: (
      <FontAwesomeIcon
        icon={faAddressCard}
        className="w-7 h-7 text-[#FF0004]"
      />
    ),
  },
  {
    title: "Đổi mật khẩu",
    path: "/profile/changePassword",
    icon: <FontAwesomeIcon icon={faLock} className="w-7 h-7 text-[#FF0004]" />,
  },
  {
    title: "Ví của bạn",
    path: "/profile/wallet",
    icon: (
      <FontAwesomeIcon icon={faWallet} className="w-7 h-7 text-[#FF0004]" />
    ),
  },

  {
    title: "Quản lí biểu mẫu",
    path: "/profile/manageTemplate",
    icon: (
      <FontAwesomeIcon
        icon={faFileSignature}
        className="w-7 h-7 text-[#FF0004]"
      />
    ),
  },
  {
    title: "Gói dịch vụ",
    path: "/profile/servicePack",
    icon: (
      <FontAwesomeIcon icon={faHeadset} className="w-7 h-7 text-[#FF0004]" />
    ),
  },
  {
    title: "Lịch sử giao dịch",
    path: "/profile/transactionHistory",
    icon: (
      <FontAwesomeIcon
        icon={faClockRotateLeft}
        className="w-7 h-7 text-[#FF0004]"
      />
    ),
  },
  {
    title: "Lịch sử mua hàng",
    path: "/profile/orderHistory",
    icon: (
      <FontAwesomeIcon
        icon={faBasketShopping}
        className="w-7 h-7 text-[#FF0004]"
      />
    ),
  },
];
