"use client";

import axios from "axios";
import { Chart } from "primereact/chart";
import AddTemplate from "@/sections/AddTemplate";
import { useEffect, useState } from "react";

const Page = () => {
  const [dashboards, setDashboardData] = useState({
    totalAllTask: 0,
    totalTemplate: 0,
    totalUser: 0,
    totalTransaction: 0,
    totalTaskNotAssign: 0,
    totalTaskAssigned: 0,
    totalTaskDone: 0,
    totalRevenueOfMonth: 0,
  });

  useEffect(() => {
    const getAllValueOfChart = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_API}dashboard/getAllValueOfChart`
        );
        if (response.data.status) {
          setDashboardData(response.data.data);
        } else {
          console.error(
            "Failed to fetch dashboard data:",
            response.data.message
          );
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    getAllValueOfChart();
  }, []);

  // Example data for a Bar Chart
  const barChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Doanh thu nằm 2024",
        data: [3, 2, 4.5, 3.5, 3],
        backgroundColor: [
          "#f59e0b", // Orange
          "#f97316", // Light Orange
          "#ec4899", // Pink
          "#a855f7", // Purple
          "#ef4444", // Red
        ],
      },
    ],
  };

  // Example data for a Pie Chart
  const pieChartData = {
    labels: ["Tất cả", "Đã bàn giao", "Chưa bàn giao", "Hoàn thành"],
    datasets: [
      {
        label: "Nhiêm vụ",
        data: [
          dashboards.totalAllTask,
          dashboards.totalTaskAssigned,
          dashboards.totalTaskNotAssign,
          dashboards.totalTaskDone,
        ],
        backgroundColor: ["#36A2EB", "#FFCE56", "#FF9F40", "#a855f7"],
      },
    ],
  };

  // Options could be shared or individual for each chart type
  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full">
      <div className="py-5">
        <div className="flex w-full h-[150px] justify-around items-center">
          <div className="w-1/4 h-full border border-gray-300 rounded-lg ml-2">
            <p className="text-center mt-2">Doanh thu</p>
          </div>
          <div className="w-1/4 h-full border border-gray-300 rounded-lg ml-2">
            <p className="text-center mt-2">Người dùng</p>
          </div>
          <div className="w-1/4 h-full border border-gray-300 rounded-lg ml-2">
            <p className="text-center mt-2">Biểu mẫu luật</p>
          </div>
          <div className="w-1/4 h-full border border-gray-300 rounded-lg ml-2">
            <p className="text-center mt-2">Lượt tải</p>
          </div>
        </div>
      </div>
      <div className="flex w-full h-[610px] justify-around items-center p-8">
        <div className="w-3/5 h-full   border border-gray-300 rounded-lg pt-16 pl-2 pr-2">
          <Chart
            key="barChart"
            type="bar"
            data={barChartData}
            options={chartOptions}
          />
        </div>

        <div className="w-2/5 h-full justify-center items-center  border border-gray-300 rounded-lg ml-8 pt-28">
          {/* <div>Nhiệm vụ</div> */}
          <Chart
            key="pieChart"
            type="pie"
            data={pieChartData}
            options={{ maintainAspectRatio: false }}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
