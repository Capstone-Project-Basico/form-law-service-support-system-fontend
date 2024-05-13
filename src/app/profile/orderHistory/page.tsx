"use client";

import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";
import React, { useState, useEffect } from "react";
import axios from "axios";
import authHeader from "@/components/authHeader/AuthHeader";
import Order from "@/components/manage/order";
import {
  Button,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { OrderType, UserLocal } from "@/constants/types/homeType";

const Page = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const getUserFromStorage = () => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
  };

  const user: UserLocal | null = getUserFromStorage();
  const userId = user?.data.data.userId;

  useEffect(() => {
    fetchOrders();
  });

  //get all items
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}/order/getAllCheckOutFormTemplateDetailByUser/${userId}`,
        {
          headers: authHeader(),
        }
      );
      setOrders(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  //search
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  // Filter tasks based on search term
  const filteredOrders = orders.filter((order) =>
    order.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //pagination
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 8;

  const pages = Math.ceil(filteredOrders.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredOrders.slice(start, end);
  }, [page, filteredOrders]);

  return (
    <div className="w-[1350px]  p-5 bg-white rounded-xl shadow-lg">
      <h1 className="font-bold p-3 text-3xl">Lịch sử mua hàng của bạn</h1>
      <div className="m-10">
        <div className="flex flex-row mb-10">
          <Input
            classNames={{
              base: "w-full sm:max-w-[10rem] h-10",
              mainWrapper: "h-full w-96",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20 ",
            }}
            placeholder="Từ khóa tìm kiếm .."
            size="sm"
            type="search"
            radius="none"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <Table
          aria-label="Example static collection table"
          topContentPlacement="outside"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                showControls
                classNames={{
                  wrapper: "gap-0 overflow-visible h-8 ",
                  item: "w-8 h-8 text-small rounded-none bg-transparent",
                  cursor:
                    "bg-gradient-to-b shadow-lg from-default-500 to-default-800 dark:from-default-300 dark:to-default-100 text-white font-bold",
                }}
                page={page}
                total={pages}
                onChange={(page: any) => setPage(page)}
              />
            </div>
          }
        >
          <TableHeader className="">
            <TableColumn className=" bg-[#FF0004] text-white">
              Tên người thực hiện
            </TableColumn>
            <TableColumn className=" bg-[#FF0004] text-white">
              Ngày thực hiện giao dịch
            </TableColumn>
            <TableColumn className=" bg-[#FF0004] text-white">
              Tình trạng
            </TableColumn>
          </TableHeader>
          <TableBody>
            {items.map((order, index) => (
              <TableRow key={index}>
                <TableCell>{order.email}</TableCell>
                <TableCell>
                  {order.dateCreated
                    ? new Date(order.dateCreated).toLocaleDateString()
                    : "N/A"}
                </TableCell>
                <TableCell>
                  {order.orderStatus === "SUCCESS"
                    ? "Thành công"
                    : order.orderStatus === "PENDING"
                    ? "Đang chờ"
                    : order.orderStatus}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
