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
import { statusOrder, statusTransaction } from "@/lib/status";

type OrderProps = {
  orders: OrderType[];
  tabs: number;
};

const Order: React.FC<OrderProps> = ({ orders, tabs }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [filterValue, setFilterValue] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    console.log("Selected Date has been updated:", selectedDate);
    // setSelectedDate(e.target.value ? new Date(e.target.value) : null);
  }, [selectedDate]);

  //filter by status
  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...orders];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.email?.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusTransaction.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.orderStatus)
      );
    }

    if (selectedDate) {
      filteredUsers = filteredUsers.filter((order) => {
        const transactionDate = new Date(order.dateCreated).setHours(
          0,
          0,
          0,
          0
        );
        const selectedDateTime = selectedDate.setHours(0, 0, 0, 0);
        return transactionDate === selectedDateTime;
      });
    }

    return filteredUsers;
  }, [orders, filterValue, statusFilter, selectedDate]);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  //pagination
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems]);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Tìm địa chỉ email"
            // startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />

          <div className="flex gap-3 h-full">
            <Input
              type="date"
              label="Lọc theo ngày"
              // value={
              //   selectedDate ? selectedDate.toISOString().substring(0, 10) : ""
              // }
              onChange={(e: any) =>
                setSelectedDate(
                  e.target.value ? new Date(e.target.value) : null
                )
              }
              className="w-52"
            />

            <Dropdown>
              <DropdownTrigger className="hidden sm:flex h-14">
                <Button
                  //   endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Lọc theo tình trạng
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOrder.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {status.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, statusFilter]);

  return (
    <div>
      <Table
        aria-label="Example static collection table"
        topContent={topContent}
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
            số tiền
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
              <TableCell className="font-bold">{order.email}</TableCell>
              <TableCell className="">{order.cart[0].price} VND</TableCell>
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
  );
};

export default Order;
