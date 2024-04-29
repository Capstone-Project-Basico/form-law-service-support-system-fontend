import Role from '@/constants/types/enum/Role';

type Path = {
  title: string;
  path: string;
  role: Role[];
  isPage?: boolean;
};

// const paths: Path[] = [
//   {
//     title: 'Dashboard',
//     path: '/dashboard',
//     role: [Role.Admin],
//   },
//   {
//     title: 'Quản lí thông tin',
//     path: '/dashboard/information',
//     role: [Role.Admin],
//   },
//   {
//     title: 'Liên hệ',
//     path: '/dashboard/information/contact',
//     role: [Role.Admin],
//   },
//   {
//     title: 'Tuyển dụng',
//     path: '/dashboard/information/recruitment',
//     role: [Role.Admin],
//   },
//   {
//     title: 'Đối tác',
//     path: '/dashboard/information/partner',
//     role: [Role.Admin],
//   },
//   {
//     title: 'Quản lí dịch vụ',
//     path: '/dashboard/service',
//     role: [Role.Admin],
//   },
//   {
//     title: 'Biểu mẫu',
//     path: '/dashboard/service/manageTemplate',
//     role: [Role.Admin],
//   },
//   {
//     title: 'Gói dịch vụ',
//     path: '/dashboard/service/pack',
//     role: [Role.Admin],
//   },
//   {
//     title: 'Quản lí người dùng',
//     path: '/dashboard/user',
//     role: [Role.Admin],
//   },
//   {
//     title: 'Người dùng',
//     path: '/dashboard/user',
//     role: [Role.Admin],
//   },
//   {
//     title: 'Luật sư',
//     path: '/dashboard/user/lawyer',
//     role: [Role.Admin],
//   },
//   {
//     title: 'Quản lí bài viết',
//     path: '/dashboard/post',
//     role: [Role.Admin],
//   },
//   {
//     title: 'Quản lí công việc',
//     path: '/dashboard/task',
//     role: [Role.Admin],
//   },
//   {
//     title: 'Biểu mẫu',
//     path: '/dashboard/template',
//     role: [Role.Admin],
//   },
//   {
//     title: 'Tạo mới',
//     path: '/dashboard/template/add-template',
//     role: [Role.Admin],
//   },
//   {
//     title: 'Danh sách template',
//     path: '/dashboard/template/list-template',
//     role: [Role.Admin],
//   },
// ];

// const getPathsByLink = (link: string) => {
//   return paths.filter((path) => path.path === link);
// };

// const getPathsByNames = (names: string[]) => {
//   return paths.filter((path) => names.includes(path.title));
// };

// export { getPathsByLink, getPathsByNames };
// export default paths;

const paths: { [key: string]: Path } = {
  dashBoard: {
    title: 'Dashboard',
    path: '/dashboard',
    role: [Role.Admin],
    isPage: true,
  },
  managerInfo: {
    title: 'Quản lí thông tin',
    path: '/dashboard/information',
    role: [Role.Admin],
  },
  contact: {
    title: 'Liên hệ',
    path: '/dashboard/information/contact',
    role: [Role.Admin],
    isPage: true,
  },
  recruitment: {
    title: 'Tuyển dụng',
    path: '/dashboard/information/recruitment',
    role: [Role.Admin],
    isPage: true,
  },
  partner: {
    title: 'Đối tác',
    path: '/dashboard/information/partner',
    role: [Role.Admin],
    isPage: true,
  },
  manageService: {
    title: 'Quản lí dịch vụ',
    path: '/dashboard/service',
    role: [Role.Admin],
  },
  manageTemplate: {
    title: 'Biểu mẫu',
    path: '/dashboard/service/manageTemplate',
    role: [Role.Admin],
    isPage: true,
  },

  packService: {
    title: 'Gói dịch vụ',
    path: '/dashboard/service/pack',
    role: [Role.Admin],
    isPage: true,
  },
  manageUser: {
    title: 'Quản lí người dùng',
    path: '/dashboard/user',
    role: [Role.Admin],
    isPage: true,
  },
  lawyer: {
    title: 'Luật sư',
    path: '/dashboard/user/lawyer',
    role: [Role.Admin],
    isPage: true,
  },
  managePost: {
    title: 'Quản lí bài viết',
    path: '/dashboard/post',
    role: [Role.Admin],
  },
  manageTask: {
    title: 'Quản lí công việc',
    path: '/dashboard/task',
    role: [Role.Admin],
  },
  template: {
    title: 'Biểu mẫu',
    path: '/dashboard/template',
    role: [Role.Admin],
  },
  addTemplate: {
    title: 'Tạo mới',
    path: '/dashboard/template/add-template',
    role: [Role.Admin],
    isPage: true,
  },
  useTemplate: {
    title: 'Sử dụng',
    path: '/use-template',
    role: [Role.User],
    isPage: true,
  },
};

const getPathByURL = (url: string) => {
  return Object.values(paths).find((path) => path.path === url);
};

const getPathByTitle = (title: string) => {
  return Object.values(paths).find((path) => path.title === title);
};

const getPathsByRole = (role: Role) => {
  return Object.values(paths).filter((path) => path.role.includes(role));
};

export { getPathByURL, getPathByTitle, getPathsByRole };
export default paths;
