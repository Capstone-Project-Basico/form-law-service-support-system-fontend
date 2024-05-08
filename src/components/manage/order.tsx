"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Selection,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

import { OrderType } from "@/constants/types/homeType";
import { statusTransaction } from "@/lib/status";

type OrderProps = {
  orders: OrderType[];
  tabs: number;
};

const Order: React.FC<OrderProps> = ({ orders, tabs }) => {
  const [searchTerm, setSearchTerm] = useState("");

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
  useEffect(() => {
    setPage(1);
  }, [tabs]);
  const rowsPerPage = 8;

  const pages = Math.ceil(filteredOrders.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredOrders.slice(start, end);
  }, [page, filteredOrders]);

  return (
    <div>
      <div className="my-10 flex flex-row">
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
          <TableColumn className="flex justify-center items-center bg-[#FF0004] text-white">
            Tương tác
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
              {order.deleted === false ? (
                <TableCell className="flex gap-2 items-center  justify-center ">
                  <Button
                    className="bg-[#FF0004] text-white "
                    // onClick={() => handleDelete(contact.contactId)}
                  >
                    Xóa
                  </Button>

                  {/* <Button
                    className="bg-green-600 text-white"
                    onClick={() => {
                      setSelectedContact(contact);
                      onOpen();
                    }}
                  >
                    Chi tiết
                  </Button> */}
                </TableCell>
              ) : (
                <TableCell className="flex gap-2 items-center justify-center">
                  <Button
                    className="bg-blue-600 text-white"
                    // onClick={() => restoreDelete(contact.contactId)}
                  >
                    Khôi phục
                  </Button>

                  {/* <Button
                    className="bg-green-600 text-white"
                    onClick={() => {
                      setSelectedContact(contact);
                      onOpen();
                    }}
                  >
                    Chi tiết
                  </Button> */}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Order;
