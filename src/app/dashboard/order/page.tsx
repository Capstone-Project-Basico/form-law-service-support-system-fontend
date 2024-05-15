"use client";

import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";
import React, { useState, useEffect } from "react";
import axios from "axios";
import authHeader from "@/components/authHeader/AuthHeader";
import Order from "@/components/manage/order";
import { Button } from "@nextui-org/react";

const Page = () => {
  const [orders, setOrders] = useState([]);
  const [tabs, setTabs] = useState(1);

  useEffect(() => {
    switch (tabs) {
      case 1:
        fetchOrders();
        break;
      default:
        fetchOrders();
        break;
    }
  }, [tabs]);

  //get all items
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}order/getAllOrder`,
        {
          headers: authHeader(),
        }
      );
      setOrders(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full mt-5 ml-5 mr-5">
      <div className="grid grid-cols-2 mb-10">
        <Breadcrumbs color="danger" size="lg" className="text-3xl">
          <BreadcrumbItem>
            <p className="text-black font-bold text-3xl ">Quản lí đơn hàng</p>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <p className="text-[#FF0004] font-bold text-3xl">Đơn hàng</p>
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>

      
      <Order orders={orders} tabs={tabs} />
    </div>
  );
};

export default Page;
