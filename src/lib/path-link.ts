import Role from '@/constants/types/enum/Role';

type Path = {
  title: string;
  path: string;
  role: Role[];
};

const paths: Path[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    role: [Role.Admin],
  },
  {
    title: 'Quản lí thông tin',
    path: '/dashboard/information',
    role: [Role.Admin],
  },
  {
    title: 'Liên hệ',
    path: '/dashboard/information/contact',
    role: [Role.Admin],
  },
  {
    title: 'Tuyển dụng',
    path: '/dashboard/information/recruitment',
    role: [Role.Admin],
  },
  {
    title: 'Đối tác',
    path: '/dashboard/information/partner',
    role: [Role.Admin],
  },
  {
    title: 'Quản lí dịch vụ',
    path: '/dashboard/service',
    role: [Role.Admin],
  },
  {
    title: 'Biểu mẫu',
    path: '/dashboard/service/manageTemplate',
    role: [Role.Admin],
  },
  {
    title: 'Gói dịch vụ',
    path: '/dashboard/service/pack',
    role: [Role.Admin],
  },
  {
    title: 'Quản lí người dùng',
    path: '/dashboard/user',
    role: [Role.Admin],
  },
  {
    title: 'Người dùng',
    path: '/dashboard/user',
    role: [Role.Admin],
  },
  {
    title: 'Luật sư',
    path: '/dashboard/user/lawyer',
    role: [Role.Admin],
  },
  {
    title: 'Quản lí bài viết',
    path: '/dashboard/post',
    role: [Role.Admin],
  },
  {
    title: 'Quản lí công việc',
    path: '/dashboard/task',
    role: [Role.Admin],
  },
  {
    title: 'Biểu mẫu',
    path: '/dashboard/template',
    role: [Role.Admin],
  },
  {
    title: 'Tạo mới',
    path: '/dashboard/template/add-template',
    role: [Role.Admin],
  },
  {
    title: 'Danh sách template',
    path: '/dashboard/template/list-template',
    role: [Role.Admin],
  },
];

const getPathsByLink = (link: string) => {
  return paths.filter((path) => path.path === link);
};

const getPathsByNames = (names: string[]) => {
  return paths.filter((path) => names.includes(path.title));
};

export { getPathsByLink, getPathsByNames };
export default paths;
