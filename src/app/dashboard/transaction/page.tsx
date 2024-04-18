"use client";

import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";
import React, { useState, useEffect } from "react";
import axios from "axios";
import authHeader from "@/components/authHeader/AuthHeader";
import Transaction from "@/components/manage/Transaction";

const Page = () => {
  const [transactions, setTransaction] = useState([]);

  useEffect(() => {
    fetchTransactions();
  });
  //get all items
  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}transaction/getAllTransactions`,
        {
          headers: authHeader(),
        }
      );
      setTransaction(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full mt-5 ml-5 mr-5">
      <div className="grid grid-cols-2 mb-10">
        <Breadcrumbs color="danger" size="lg" className="text-3xl">
          <BreadcrumbItem>
            <p className="text-black font-bold text-3xl ">Quản lí giao dịch</p>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <p className="text-[#FF0004] font-bold text-3xl">Giao dịch</p>
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>

      <Transaction transactions={transactions} />
    </div>
  );
};

export default Page;
