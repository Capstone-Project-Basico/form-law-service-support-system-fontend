"use client";

import authHeader from "@/components/authHeader/AuthHeader";
import { TransactionType, UserLocal } from "@/constants/types/homeType";
import {
  Button,
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
  });

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

  //search
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  // Filter transactions based on search term
  const filteredPartners = transactionHistory.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //pagination
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 8;

  const pages = Math.ceil(filteredPartners.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredPartners.slice(start, end);
  }, [page, filteredPartners]);

  return (
    <div className="w-[1350px] bg-white rounded-2xl">
      <h1 className="font-bold p-3 text-3xl">Lịch sử giao dịch của bạn</h1>
      <Table
        aria-label="Example static collection table"
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
