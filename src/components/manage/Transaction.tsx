import React, { useState } from "react";
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

import { TransactionType } from "@/constants/types/homeType";

type TransactionProps = {
  transactions: TransactionType[];
};

const Transaction: React.FC<TransactionProps> = ({ transactions }) => {
  const [searchTerm, setSearchTerm] = useState("");

  //search
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  // Filter tasks based on search term
  const filteredPartners = transactions.filter((transaction) =>
    transaction.email.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div>
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
            Tên công việc
          </TableColumn>
          <TableColumn className=" justify-center items-center bg-[#FF0004] text-white">
            Mô tả
          </TableColumn>
          <TableColumn className=" bg-[#FF0004] text-white">
            Ngày bắt đầu
          </TableColumn>
          <TableColumn className=" bg-[#FF0004] text-white">
            Tình trạng
          </TableColumn>
          <TableColumn className=" bg-[#FF0004] text-white">
            Trạng thái
          </TableColumn>
          <TableColumn className="flex justify-center items-center bg-[#FF0004] text-white">
            Tương tác
          </TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((transaction, index) => (
            <TableRow key={index}>
              <TableCell>{transaction.email}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>
                {
                  transaction.createAt
                    ? new Date(transaction.createAt).toLocaleDateString()
                    : "N/A" // Handle cases where dateOfBirth might not be available or is not a Date object
                }
              </TableCell>
              <TableCell>{transaction.status}</TableCell>
              <TableCell>
                <span style={{ color: transaction.status ? "red" : "green" }}>
                  {transaction.status ? "Không sử dụng" : "Đang hoạt động"}
                </span>
              </TableCell>

              {transaction.status === "" ? (
                <TableCell className="flex gap-2 items-center  justify-center ">
                  <Button
                    className="bg-blue-600 text-white"
                    // onPress={() => {
                    //   setSelectedTask(task);
                    //   onOpenUpdate();
                    // }}
                  >
                    Cập nhật
                  </Button>

                  <Button
                    className="bg-green-600 text-white"
                    // onClick={() => {
                    //   setSelectedTask(task);
                    //   onOpenTaskAssign();
                    // }}
                  >
                    Giao việc
                  </Button>

                  <Button
                    className="bg-[#FF0004] text-white"
                    // onClick={() => handleDelete(task.id)}
                  >
                    Xóa
                  </Button>
                </TableCell>
              ) : (
                <TableCell className="flex gap-2 items-center justify-center">
                  <Button
                    className="bg-blue-600 text-white"
                    // onClick={() => restoreDelete(task.id)}
                  >
                    Khôi phục
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Transaction;
