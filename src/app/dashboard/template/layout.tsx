'use client';

import { SideNavItem } from '@/constants/types/homeType';
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/breadcrumbs';
import { usePathname } from 'next/navigation';
import { sideNavItems } from '@/lib/dashboardNavbar';
import React from 'react';
import Link from 'next/link';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const pathname = usePathname();

  function findSidebarItemByPath(path: string, items: SideNavItem[]): SideNavItem | undefined {
    for (let item of items) {
      if (item.path === path) {
        return item;
      }

      if (item.subMenu && item.subMenuItems) {
        // Add a check for item.subMenuItems
        const subItem = findSidebarItemByPath(path, item.subMenuItems);
        if (subItem) {
          return subItem;
        }
      }
    }

    return undefined;
  }

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

  return (
    <div className="w-full h-auto pt-4 px-6 flex flex-col">
      <Breadcrumbs>
        {getPathnameOrder(pathname).map((path, index) => {
          const item = findSidebarItemByPath(path, sideNavItems);
          return (
            <BreadcrumbItem key={index}>
              <Link className="text-xl font-semibold" href={item?.path || '/'}>
                {item?.title}
              </Link>
            </BreadcrumbItem>
          );
        })}
      </Breadcrumbs>
      <div className="w-full h-full p-5">{children}</div>
    </div>
  );
};

export default Layout;
