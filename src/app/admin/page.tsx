"use client";

import axios from "axios";
import { Chart } from "primereact/chart";
import { useEffect, useState } from "react";
import authHeader from "@/components/authHeader/AuthHeader";

const Page = () => {
  const [users, setUsers] = useState();
  const [templates, setTemplates] = useState();
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
    //   getAllUsers();
    //   getAllTemplates();
    // });

    const getAllValueOfChart = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_API}dashboard/getAllValueOfChart`,
          {
            headers: authHeader(), // Adding headers to your request
          }
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

  // const getAllUsers = () => {
  //   axios
  //     .get(`${process.env.NEXT_PUBLIC_BASE_API}user/getAllUsers`)
  //     .then((response) => {
  //       setUsers(response.data.data.length);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const getAllTemplates = () => {
  //   axios
  //     .get(
  //       `${process.env.NEXT_PUBLIC_BASE_API}formTemplate/getAllFormTemplates`
  //     )
  //     .then((response) => {
  //       setTemplates(response.data.data.length);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

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
            <p className="text-center mt-2 font-bold text-2xl">Doanh thu</p>
            <p className="text-center mt-2 font-semibold">
              {dashboards.totalRevenueOfMonth}
            </p>
          </div>
          <div className="w-1/4 h-full border border-gray-300 rounded-lg ml-2">
            <p className="text-center mt-2 font-bold text-2xl">Người dùng</p>
            <p className="flex justify-center items-center py-5 font-semibold ">
              <p className="text-center mt-2 font-semibold">
                {dashboards.totalUser}
              </p>
            </p>
          </div>
          <div className="w-1/4 h-full border border-gray-300 rounded-lg ml-2">
            <p className="text-center mt-2 font-bold text-2xl">Biểu mẫu luật</p>
            <p className="flex justify-center items-center py-5 font-semibold ">
              <p className="text-center mt-2 font-semibold">
                {dashboards.totalTemplate}
              </p>
            </p>
          </div>
          <div className="w-1/4 h-full border border-gray-300 rounded-lg ml-2">
            <p className="text-center mt-2 font-bold text-2xl">Lượt tải</p>
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
