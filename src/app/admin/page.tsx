"use client";

import axios from "axios";
import { Chart } from "primereact/chart";
import { useEffect, useState } from "react";
import authHeader from "@/components/authHeader/AuthHeader";

const Page = () => {
  const [dashboards, setDashboardData] = useState({
    revenueDashBoardResponse: {
      totalRevenueOfCurrentMonth: 0,
      totalRevenueOfYear: 0,
      totalRevenueOfJanuary: 0,
      totalRevenueOfFeb: 0,
      totalRevenueOfMarch: 0,
      totalRevenueOfApril: 0,
      totalRevenueOfMay: 0,
      totalRevenueOfJune: 0,
      totalRevenueOfJuly: 0,
      totalRevenueOfAugust: 0,
      totalRevenueOfSeptember: 0,
      totalRevenueOfOctober: 0,
      totalRevenueOfNovember: 0,
      totalRevenueOfDecember: 0,
    },
    taskDashBoardResponse: {
      totalTask: 0,
      totalDeletedTask: 0,
      totalDoneTask: 0,
      currentTask: 0,
      notAssignedTask: 0,
    },
    userDashBoardResponse: {
      totalUser: 0,
      totalDeletedUser: 0,
      totalStaff: 0,
      totalLawyer: 0,
      totalManager: 0,
      totalCustomer: 0,
    },
    contactDashBoardResponse: {
      totalContact: 0,
      totalDeletedContact: 0,
      totalDoneContact: 0,
      totalToDoContact: 0,
    },
    recruitmentDashBoardResponse: {
      totalRecruitment: 0,
      totalDeletedRecruitment: 0,
      totalDoneRecruitment: 0,
      totalToDoRecruitment: 0,
    },
  
  partnerDashboardResponse: {
    totalPartner: 0,
    totalDeletedPartner: 0,
    totalPendingPartner: 0,
    totalApprovedPartner: 0,
  },
  formTemplateDashBoardResponse: {
    totalFormTemplate: 0,
    totalActiveFormTemplate: 0,
    totalDeletedFormTemplate: 0
  },
});
  useEffect(() => {
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

  const barChartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Doanh thu nằm 2024",
        data: [
          dashboards.revenueDashBoardResponse.totalRevenueOfJanuary,
          dashboards.revenueDashBoardResponse.totalRevenueOfFeb,
          dashboards.revenueDashBoardResponse.totalRevenueOfMarch,
          dashboards.revenueDashBoardResponse.totalRevenueOfApril,
          dashboards.revenueDashBoardResponse.totalRevenueOfMay, // Assuming May
          dashboards.revenueDashBoardResponse.totalRevenueOfJune,
          dashboards.revenueDashBoardResponse.totalRevenueOfJuly,
          dashboards.revenueDashBoardResponse.totalRevenueOfAugust,
          dashboards.revenueDashBoardResponse.totalRevenueOfSeptember,
          dashboards.revenueDashBoardResponse.totalRevenueOfOctober,
          dashboards.revenueDashBoardResponse.totalRevenueOfNovember,
          dashboards.revenueDashBoardResponse.totalRevenueOfDecember,
        ],
        backgroundColor: "#33CCFF",
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

  // Example data for a Pie Chart Task
  const pieChartTask = {
    labels: ["Tất cả", "Đã bàn giao", "Chưa bàn giao", "Hoàn thành"],
    datasets: [
      {
        label: "Nhiêm vụ",
        data: [
          dashboards.taskDashBoardResponse.totalTask,
          dashboards.taskDashBoardResponse.currentTask,
          dashboards.taskDashBoardResponse.notAssignedTask,
          dashboards.taskDashBoardResponse.totalDoneTask,
        ],
        backgroundColor: ["#36A2EB", "#FFCE56", "#FF0000", "#00FF00"],
      },
    ],
  };

  
  // Example data for a Pie Chart Contact
  const pieChartContact = {
    labels: ["Tất cả", "Đã giải quyết", "Chưa giải quyết"],
    datasets: [
      {
        label: "Nhiêm vụ",
        data: [
          dashboards.contactDashBoardResponse.totalContact,
          dashboards.contactDashBoardResponse.totalDoneContact,
          dashboards.contactDashBoardResponse.totalToDoContact,
         
        ],
        backgroundColor: ["#36A2EB", "#00FF00", "#FFCE56"],
      },
    ],
  };

  // Example data for a Pie Chart Recruitement
  const pieChartRecruitement = {
    labels: ["Tất cả", "Đã giải quyết", "Chưa giải quyết"],
    datasets: [
      {
        label: "Nhiêm vụ",
        data: [
          dashboards.recruitmentDashBoardResponse.totalRecruitment,
          dashboards.recruitmentDashBoardResponse.totalDoneRecruitment,
          dashboards.recruitmentDashBoardResponse.totalToDoRecruitment,
         
        ],
        backgroundColor: ["#36A2EB", "#00FF00", "#FFCE56"],
      },
    ],
  };

  // Example data for a Pie Chart Partner
  const pieChartPartner = {
    labels: ["Tất cả", "Sử dụng", "Chờ duyệt", "Không sử dụng"],
    datasets: [
      {
        label: "Nhiêm vụ",
        data: [
          dashboards.partnerDashboardResponse.totalPartner,
          dashboards.partnerDashboardResponse.totalApprovedPartner,
          dashboards.partnerDashboardResponse.totalPendingPartner,
          dashboards.partnerDashboardResponse.totalDeletedPartner,
         
        ],
        backgroundColor: ["#36A2EB", "#00FF00", "#FFCE56","#FF0000"],
      },
    ],
  };

  
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "decimal",
      maximumFractionDigits: 0,
    })
      .format(num)
      .replace(/,/g, ".");
  };

  return (
    // tầng 1
    <div className="w-full">
      <div className="py-5">
        <div className="flex w-full h-[150px] justify-around items-center">
          <div className="w-1/3 h-full border border-gray-300 rounded-lg ml-2">
            <p className="text-center mt-2 font-bold text-2xl">Doanh thu</p>
            <p className="text-center mt-8 text-3xl ">
              {formatNumber(dashboards.revenueDashBoardResponse.totalRevenueOfYear)} VNĐ
            </p>
            
          </div>
          <div className="w-1/3 h-full border border-gray-300 rounded-lg ml-2">
            <p className="text-center mt-2 font-bold text-2xl">Người dùng</p>
            <p className="flex justify-center items-center py-5 font-semibold ">
              <p className="text-center  text-3xl">
                {dashboards.userDashBoardResponse.totalUser -1 }
              </p>
              
            </p>
            
            <div className="flex ">
            <p className="w-1/4 text-center ">Quản lý: {dashboards.userDashBoardResponse.totalManager}</p>
            <p className="w-1/4 text-center  ">Nhân viên: {dashboards.userDashBoardResponse.totalStaff}</p>
            <p className="w-1/4 text-center  ">Luật sư: {dashboards.userDashBoardResponse.totalLawyer}</p>
            <p className=" w-[200px] text-center ">Khách hàng: {dashboards.userDashBoardResponse.totalCustomer}</p>
            </div>
           
           
          </div>
          <div className="w-1/3 h-full border border-gray-300 rounded-lg ml-2">
            <p className="text-center mt-2 font-bold text-2xl">Biểu mẫu luật</p>
            <p className="flex justify-center items-center py-5 font-semibold ">
              <p className="text-center mt-2 text-3xl">
                {dashboards.formTemplateDashBoardResponse.totalFormTemplate}
              </p>
            </p>
          </div>
          {/* <div className="w-1/4 h-full border border-gray-300 rounded-lg ml-2">
            <p className="text-center mt-2 font-bold text-2xl">Lượt tải</p>
          </div> */}
        </div>
      </div>
      {/* tầng 2 */}
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
          <p className="text-center font-bold mb-8">Bảng thống kê công việc</p>
          <Chart
            key="pieChart"
            type="pie"
            data={pieChartTask}
            options={{ maintainAspectRatio: false }}
          />
        </div>
      </div>
      {/* tầng 3 */}
      <div className="flex w-full h-[610px] justify-around items-center p-8">

      <div className="w-1/3 h-full justify-center items-center  border border-gray-300 rounded-lg ml-8 pt-28">
          <p className="text-center font-bold mb-8">Bảng thống kê thông tin liên hệ</p>
          <Chart
            key="pieChart"
            type="pie"
            data={pieChartContact}
            options={{ maintainAspectRatio: false }}
          />
        </div>
        <div className="w-1/3 h-full justify-center items-center  border border-gray-300 rounded-lg ml-8 pt-28">
          <p className="text-center font-bold mb-8">Bảng thống kê thông tin tuyển dụng</p>
          <Chart
            key="pieChart"
            type="pie"
            data={pieChartRecruitement}
            options={{ maintainAspectRatio: false }}
          />
        </div>
        <div className="w-1/3 h-full justify-center items-center  border border-gray-300 rounded-lg ml-8 pt-28">
          <p className="text-center font-bold mb-8">Bảng thống kê đối tác</p>
          <Chart
            key="pieChart"
            type="pie"
            data={pieChartPartner}
            options={{ maintainAspectRatio: false }}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
