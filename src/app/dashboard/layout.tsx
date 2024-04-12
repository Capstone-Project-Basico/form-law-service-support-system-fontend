'use client';

import { useEffect } from 'react';
import Navbar from '../../components/dashboardNavbar/navbar';
import Sidebar from '../../components/dashboardSidebar/sidebar';
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/breadcrumbs';
import 'react-toastify/dist/ReactToastify.css';
import { usePathname, useRouter } from 'next/navigation';
import { UserLocal } from '@/constants/types/homeType';
import { getPathByURL } from '@/lib/path-link';
import Link from 'next/link';
// export const dynamic = "force-dynamic";

type LayoutProps = {
  children: React.ReactNode; // Typing the children prop
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  function getPathnameOrder(pathname: string) {
    const parts = pathname.split('/').filter(Boolean); // filter out empty strings from the array

    const paths = [];
    let currentPath = '';

    for (let part of parts) {
      currentPath += '/' + part;
      paths.push(currentPath);
    }

    return paths;
  }

  // const userString = localStorage.getItem("user");
  // if (!userString) {
  //   console.log("No user found");
  //   // router.push("/");
  //   return;
  // }

  // const user = JSON.parse(userString);
  // const userRole = user?.data.data.roleName;
  const getUserFromStorage = () => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    }
  };

  const user: UserLocal | null = getUserFromStorage();
  const userRole = user?.data.data.roleName;

  // Check if the user role is not admin

  useEffect(() => {
    if (userRole !== 'ROLE_ADMIN') {
      // Redirect non-admin users to the home page or login page
      router.push('/');
    }
  }, [userRole]);

  if (userRole !== 'ROLE_ADMIN') {
    return null;
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-cow">
        <Navbar />
      </div>
      <div className="flex flex-cow">
        <Sidebar />
        {/* <div className="w-full h-auto pt-4 px-6 flex flex-col">
          <Breadcrumbs
            itemClasses={{
              item: 'text-3xl font-semibold hover:cursor-default hover:opacity-100',
            }}
            size="lg"
          >
            {getPathnameOrder(pathname).map((path, index) => {
              const item = getPathByURL(path);
              if (!item) return null;
              return (
                <BreadcrumbItem color={pathname === item.path ? 'primary' : 'foreground'} key={index}>
                  {item.isPage ? <Link href={item?.path || '/'}>{item?.title}</Link> : <span>{item?.title}</span>}
                </BreadcrumbItem>
              );
            })}
          </Breadcrumbs>
          <div className="w-full h-full p-5">{children}</div>
        </div> */}
        {children}
      </div>
    </div>
  );
};

export default Layout;
