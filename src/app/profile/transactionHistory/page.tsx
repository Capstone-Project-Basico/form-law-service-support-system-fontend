"use client";

import authHeader from "@/components/authHeader/AuthHeader";
import { TransactionType, UserLocal } from "@/constants/types/homeType";
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
import axios from "axios";
import React, { useEffect, useState } from "react";

const TransactionHistory = () => {
  const [transactionHistory, setTransactionHistory] = useState<
    TransactionType[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getUserFromStorage = () => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
  };

  const user: UserLocal | null = getUserFromStorage();
  const userId = user?.data.data.userId;

  useEffect(() => {
    fetchTransaction();
  }, []);

  //get all items
  const fetchTransaction = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}transaction/getAllTransactionByUser/${userId}`,
        {
          headers: authHeader(),
        }
      );
      setTransactionHistory(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };


  const filteredItems = React.useMemo(() => {
    let filteredTransaction = [...transactionHistory];

    if (selectedDate) {
      filteredTransaction = filteredTransaction.filter((transaction) => {
        const transactionDate = new Date(transaction.createAt).setHours(
          0,
          0,
          0,
          0
        );
        const selectedDateTime = selectedDate.setHours(0, 0, 0, 0);
        return transactionDate === selectedDateTime;
      });
    }

    return filteredTransaction;
  }, [selectedDate]);

  //pagination
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 8;

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems]);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-end gap-3 items-end">
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
          </div>
        </div>
      </div>
    );
  }, []);

  return (
    <div className="w-[1350px]  p-5 bg-white rounded-xl shadow-lg">
      <h1 className="font-bold p-3 text-3xl">Lịch sử giao dịch của bạn</h1>
      <Table
        aria-label="Example static collection table"
        topContent={topContent}
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
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader className="">
          <TableColumn className=" bg-[#FF0004] text-white">
            Tên người thực hiện
          </TableColumn>
          <TableColumn className=" justify-center items-center bg-[#FF0004] text-white">
            Mô tả
          </TableColumn>
          <TableColumn className=" justify-center items-center bg-[#FF0004] text-white">
            Số tiền
          </TableColumn>
          <TableColumn className=" bg-[#FF0004] text-white">
            Ngày thực hiện giao dịch
          </TableColumn>
          <TableColumn className=" bg-[#FF0004] text-white">
            Tình trạng
          </TableColumn>
          <TableColumn className=" bg-[#FF0004] text-white">
            Loại giao dịch
          </TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((transaction, index) => (
            <TableRow key={index}>
              <TableCell>{transaction.email}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{transaction.amount.toLocaleString()} VND</TableCell>
              <TableCell>
                {transaction.createAt
                  ? new Date(transaction.createAt).toLocaleDateString()
                  : "N/A"}
              </TableCell>
              <TableCell>
                {transaction.status === "SUCCESS"
                  ? "Thành công"
                  : transaction.status === "PENDING"
                    ? "Đang chờ"
                    : transaction.status}
              </TableCell>

              <TableCell>
                {transaction.type === "BUY" ||
                  transaction.type === "BUY_FORM_TEMPLATE"
                  ? "MUA BIỂU MẪU"
                  : transaction.type === "BUY_PACKAGE"
                    ? "MUA GÓI"
                    : transaction.type}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionHistory;
