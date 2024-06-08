'use client';

import axios from 'axios';
import { Chart } from 'primereact/chart';
import { useEffect, useState } from 'react';
import authHeader from '@/components/authHeader/AuthHeader';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Button } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';
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
      totalDeletedFormTemplate: 0,
    },
    formTemplateVersionDashboardResponse: {
      totalFormTemplateVersion: 0,
      totalActiveFormTemplateVersion: 0,
      unStandardFormTemplateVersion: 0,
      totalInActiveFormTemplateVersion: 0,
      totalDeletedFormTemplateVerSion: 0,
      totalPendingFormTemplateVersion: 0,
    },
    postDashBoardResponse: {
      totalPost: 0,
      totalActivePost: 0,
      totalDeletedPost: 0,
      totalPendingPost: 0,
    },
    orderDashBoardResponse: {
      totalOrder: 0,
      totalBuyServiceOrder: 0,
      totalBuyFormTemplateOrder: 0,
      totalBuyPackageRequestServiceOrder: 0,
      totalBuyPackageFormTemplateOrder: 0,
      totalCheckedOutOrder: 0,
      totalPendingOrder: 0,
    },
  });
  const [loading, setLoading] = useState(true);

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
            'Failed to fetch dashboard data:',
            response.data.message
          );
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
      setLoading(false);
    };

    getAllValueOfChart();
  }, []);
  if (loading) {
    return (
      <div className="ml-[700px] flex h-screen flex-col items-center justify-center">
        <img src="/giphy.gif" alt="Loading" className="w-56" />
        <div className="mt-5 text-3xl font-medium">Đang tải...</div>
      </div>
    );
  }
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet([
      {
        title: 'Tổng doanh thu',
        value: dashboards.revenueDashBoardResponse.totalRevenueOfYear,
      },
      {
        title: 'Tổng số người dùng',
        value: dashboards.userDashBoardResponse.totalUser,
      },
      {
        title: '-Quản lý',
        value: dashboards.userDashBoardResponse.totalManager,
      },
      {
        title: '-Nhân viên',
        value: dashboards.userDashBoardResponse.totalStaff,
      },
      {
        title: '-Luật sư',
        value: dashboards.userDashBoardResponse.totalLawyer,
      },
      {
        title: '-Khách hàng',
        value: dashboards.userDashBoardResponse.totalCustomer,
      },
      {
        title: 'Tổng số biểu mẫu luật',
        value: dashboards.formTemplateDashBoardResponse.totalFormTemplate,
      },
      {
        title: '-Biểu mẫu luật đang hoạt động,',
        value: dashboards.formTemplateDashBoardResponse.totalActiveFormTemplate,
      },
      {
        title: '-Biểu mẫu luật ngừng hoạt động,',
        value:
          dashboards.formTemplateDashBoardResponse.totalDeletedFormTemplate,
      },
      {
        title: 'Tổng số biểu mẫu luật',
        value: dashboards.formTemplateDashBoardResponse.totalFormTemplate,
      },
      {
        title: 'Tổng số doanh thu trong 1 năm',
        value: dashboards.revenueDashBoardResponse.totalRevenueOfYear,
      },
      {
        title: 'Tổng số doanh thu trong 1 tháng',
        value: dashboards.revenueDashBoardResponse.totalRevenueOfCurrentMonth,
      },
      {
        title: '-Tổng số doanh thu tháng 1',
        value: dashboards.revenueDashBoardResponse.totalRevenueOfJanuary,
      },
      {
        title: '-Tổng số doanh thu tháng 2',
        value: dashboards.revenueDashBoardResponse.totalRevenueOfFeb,
      },
      {
        title: '-Tổng số doanh thu tháng 3',
        value: dashboards.revenueDashBoardResponse.totalRevenueOfMarch,
      },
      {
        title: '-Tổng số doanh thu tháng 4',
        value: dashboards.revenueDashBoardResponse.totalRevenueOfApril,
      },
      {
        title: '-Tổng số doanh thu tháng 5',
        value: dashboards.revenueDashBoardResponse.totalRevenueOfMay,
      },
      {
        title: '-Tổng số doanh thu tháng 6',
        value: dashboards.revenueDashBoardResponse.totalRevenueOfJune,
      },
      {
        title: '-Tổng số doanh thu tháng 7',
        value: dashboards.revenueDashBoardResponse.totalRevenueOfJuly,
      },
      {
        title: '-Tổng số doanh thu tháng 8',
        value: dashboards.revenueDashBoardResponse.totalRevenueOfAugust,
      },
      {
        title: '-Tổng số doanh thu tháng 9',
        value: dashboards.revenueDashBoardResponse.totalRevenueOfSeptember,
      },
      {
        title: '-Tổng số doanh thu tháng 10',
        value: dashboards.revenueDashBoardResponse.totalRevenueOfOctober,
      },
      {
        title: '-Tổng số doanh thu tháng 11',
        value: dashboards.revenueDashBoardResponse.totalRevenueOfNovember,
      },
      {
        title: '-Tổng số doanh thu tháng 12',
        value: dashboards.revenueDashBoardResponse.totalRevenueOfDecember,
      },
      {
        title: 'Tổng số mua biểu mẫu luật ',
        value: dashboards.orderDashBoardResponse.totalBuyFormTemplateOrder,
      },
      {
        title: 'Tổng số mua gói dịch vụ tư vấn ',
        value:
          dashboards.orderDashBoardResponse.totalBuyPackageRequestServiceOrder,
      },
      {
        title: 'Tổng số mua gói dịch vụ biểu mẫu ',
        value:
          dashboards.orderDashBoardResponse.totalBuyPackageFormTemplateOrder,
      },
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'DashboardData');
    const exportFileName = 'DashboardData.xlsx';
    XLSX.writeFile(wb, exportFileName);
  };
  const barChartData = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        label: 'Doanh thu nằm 2024',
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
        backgroundColor: '#33CCFF',
      },
    ],
  };

  const barCharOrder = {
    labels: ['Biểu mẫu luật', 'Gói dịch vụ tư vấn', 'Gói dịch vụ biểu mẫu'],
    datasets: [
      {
        label: 'Thống kê mua hàng',
        data: [
          dashboards.orderDashBoardResponse.totalBuyFormTemplateOrder,
          dashboards.orderDashBoardResponse.totalBuyPackageRequestServiceOrder,
          dashboards.orderDashBoardResponse.totalBuyPackageFormTemplateOrder,
        ],
        backgroundColor: ['#36A2EB', '#FFCE56', '#FF0000'],
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
    labels: ['Tất cả', 'Đã bàn giao', 'Chưa bàn giao', 'Hoàn thành'],
    datasets: [
      {
        label: 'Nhiêm vụ',
        data: [
          dashboards.taskDashBoardResponse.totalTask,
          dashboards.taskDashBoardResponse.currentTask,
          dashboards.taskDashBoardResponse.notAssignedTask,
          dashboards.taskDashBoardResponse.totalDoneTask,
        ],
        backgroundColor: ['#36A2EB', '#FFCE56', '#FF0000', '#00FF00'],
      },
    ],
  };

  // Example data for a Pie Chart Contact
  const pieChartContact = {
    labels: ['Tất cả', 'Đã giải quyết', 'Chưa giải quyết', 'Spam'],
    datasets: [
      {
        label: 'Nhiêm vụ',
        data: [
          dashboards.contactDashBoardResponse.totalContact,
          dashboards.contactDashBoardResponse.totalDoneContact,
          dashboards.contactDashBoardResponse.totalToDoContact,
          dashboards.contactDashBoardResponse.totalDeletedContact,
        ],
        backgroundColor: ['#36A2EB', '#00FF00', '#FFCE56', '#FF0000'],
      },
    ],
  };

  // Example data for a Pie Chart Recruitement
  const pieChartRecruitement = {
    labels: ['Tất cả', 'Đã giải quyết', 'Chưa giải quyết', ' Spam'],
    datasets: [
      {
        label: 'Nhiêm vụ',
        data: [
          dashboards.recruitmentDashBoardResponse.totalRecruitment,
          dashboards.recruitmentDashBoardResponse.totalDoneRecruitment,
          dashboards.recruitmentDashBoardResponse.totalToDoRecruitment,
          dashboards.recruitmentDashBoardResponse.totalDeletedRecruitment,
        ],
        backgroundColor: ['#36A2EB', '#00FF00', '#FFCE56', '#FF0000'],
      },
    ],
  };

  // Example data for a Pie Chart Partner
  const pieChartPartner = {
    labels: ['Tất cả', 'Sử dụng', 'Chờ duyệt', 'Không sử dụng'],
    datasets: [
      {
        label: 'Nhiêm vụ',
        data: [
          dashboards.partnerDashboardResponse.totalPartner,
          dashboards.partnerDashboardResponse.totalApprovedPartner,
          dashboards.partnerDashboardResponse.totalPendingPartner,
          dashboards.partnerDashboardResponse.totalDeletedPartner,
        ],
        backgroundColor: ['#36A2EB', '#00FF00', '#FFCE56', '#FF0000'],
      },
    ],
  };

  // Example data for a Pie Chart post
  const pieChartPost = {
    labels: ['Tất cả', 'Sử dụng', 'Chờ duyệt', 'Không sử dụng'],
    datasets: [
      {
        label: 'Nhiêm vụ',
        data: [
          dashboards.postDashBoardResponse.totalPost,
          dashboards.postDashBoardResponse.totalActivePost,
          dashboards.postDashBoardResponse.totalPendingPost,
          dashboards.postDashBoardResponse.totalDeletedPost,
        ],
        backgroundColor: ['#36A2EB', '#00FF00', '#FFCE56', '#FF0000'],
      },
    ],
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'decimal',
      maximumFractionDigits: 0,
    })
      .format(num)
      .replace(/,/g, '.');
  };

  //export file
  const exportFileUser = () => {
    try {
      // axios.get(`${process.env.NEXT_PUBLIC_BASE_API}user/export-to-excel`)
      axios
        .get(`${process.env.NEXT_PUBLIC_BASE_API}user/export-to-excel`, {
          method: 'GET',
          responseType: 'blob', // important
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');

          link.href = url;
          link.setAttribute('download', `user${Date.now()}.xlsx`);

          document.body.appendChild(link);
          link.click();

          link.remove();
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const exportFileTransaction = () => {
    try {
      // axios.get(`${process.env.NEXT_PUBLIC_BASE_API}user/export-to-excel`)
      axios
        .get(`${process.env.NEXT_PUBLIC_BASE_API}transaction/export-to-excel`, {
          method: 'GET',
          responseType: 'blob', // important
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');

          link.href = url;
          link.setAttribute('download', `transaction${Date.now()}.xlsx`);

          document.body.appendChild(link);
          link.click();

          link.remove();
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    // tầng 1
    <div className="w-full">
      <div className="flex gap-5 px-5 pt-5">
        <Button
          className="mb-3 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
          onClick={exportToExcel}
        >
          Xuất Excel
        </Button>
        <Button
          className="mb-3 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={exportFileTransaction}
        >
          Xuất Excel giao dịch
        </Button>
        <Button
          className="mb-3 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          onClick={exportFileUser}
        >
          Xuất Excel người dùng
        </Button>
      </div>
      <div className="py-5">
        <div className="flex h-[150px] w-full items-center justify-around">
          <div className="ml-2 h-full w-1/3 rounded-lg border border-gray-300">
            <p className="mt-2 text-center text-2xl font-bold">Doanh thu</p>
            <p className="mt-8 text-center text-3xl ">
              {formatNumber(
                dashboards.revenueDashBoardResponse.totalRevenueOfYear
              )}{' '}
              VNĐ
            </p>
          </div>
          <div className="ml-2 h-full w-1/3 rounded-lg border border-gray-300">
            <p className="mt-2 text-center text-2xl font-bold">Người dùng </p>
            <p className="flex items-center justify-center py-5 font-semibold ">
              <p className="text-center  text-3xl">
                {dashboards.userDashBoardResponse.totalUser -
                  1 -
                  dashboards.userDashBoardResponse.totalDeletedUser}
              </p>
            </p>
            <div className="flex ">
              <p className="w-1/4 text-center ">
                Quản lý: {dashboards.userDashBoardResponse.totalManager}
              </p>
              <p className="w-1/4 text-center  ">
                Nhân viên: {dashboards.userDashBoardResponse.totalStaff}
              </p>
              <p className="w-1/4 text-center  ">
                Luật sư: {dashboards.userDashBoardResponse.totalLawyer}
              </p>
              <p className=" w-[200px] text-center ">
                Khách hàng: {dashboards.userDashBoardResponse.totalCustomer}
              </p>
            </div>
          </div>
          <div className="ml-2 h-full w-1/3 rounded-lg border border-gray-300">
            <p className="mt-2 text-center text-2xl font-bold">Biểu mẫu luật</p>
            <p className="flex items-center justify-center py-5 font-semibold ">
              <p className="text-center text-3xl">
                {dashboards.formTemplateVersionDashboardResponse
                  .totalFormTemplateVersion -
                  dashboards.formTemplateVersionDashboardResponse
                    .totalDeletedFormTemplateVerSion -
                  dashboards.formTemplateVersionDashboardResponse
                    .unStandardFormTemplateVersion}
              </p>
            </p>
            <div className="flex ">
              <p className="w-1/2 text-center ">
                Hoạt động:{' '}
                {
                  dashboards.formTemplateVersionDashboardResponse
                    .totalActiveFormTemplateVersion
                }
              </p>
              <p className="w-1/2 text-center ">
                Đang chờ duyệt:{' '}
                {
                  dashboards.formTemplateVersionDashboardResponse
                    .totalPendingFormTemplateVersion
                }
              </p>
              <p className=" w-1/2 text-center ">
                Không sử dụng:{' '}
                {
                  dashboards.formTemplateVersionDashboardResponse
                    .totalInActiveFormTemplateVersion
                }
              </p>
            </div>
          </div>
          {/* <div className="w-1/4 h-full border border-gray-300 rounded-lg ml-2">
            <p className="text-center mt-2 font-bold text-2xl">Lượt tải</p>
          </div> */}
        </div>
      </div>
      {/* tầng 2 */}
      <div className="flex h-[610px] w-full items-center justify-around p-8">
        <div className="h-full w-3/5   rounded-lg border border-gray-300 pl-2 pr-2 pt-16">
          <Chart
            key="barChart"
            type="bar"
            data={barChartData}
            options={chartOptions}
          />
        </div>

        <div className="ml-8 h-full w-2/5 items-center  justify-center rounded-lg border border-gray-300 pt-28">
          <p className="mb-8 text-center font-bold">Bảng thống kê công việc</p>
          <Chart
            key="pieChart"
            type="pie"
            data={pieChartTask}
            options={{ maintainAspectRatio: false }}
          />
        </div>
      </div>
      {/* tầng 3 */}
      <div className="flex h-[610px] w-full items-center justify-around p-8">
        <div className="ml-8 h-full w-1/3 items-center  justify-center rounded-lg border border-gray-300 pt-28">
          <p className="mb-8 text-center font-bold">
            Bảng thống kê thông tin liên hệ
          </p>
          <Chart
            key="pieChart"
            type="pie"
            data={pieChartContact}
            options={{ maintainAspectRatio: false }}
          />
        </div>
        <div className="ml-8 h-full w-1/3 items-center  justify-center rounded-lg border border-gray-300 pt-28">
          <p className="mb-8 text-center font-bold">
            Bảng thống kê thông tin tuyển dụng
          </p>
          <Chart
            key="pieChart"
            type="pie"
            data={pieChartRecruitement}
            options={{ maintainAspectRatio: false }}
          />
        </div>
        <div className="ml-8 h-full w-1/3 items-center  justify-center rounded-lg border border-gray-300 pt-28">
          <p className="mb-8 text-center font-bold">Bảng thống kê đối tác</p>
          <Chart
            key="pieChart"
            type="pie"
            data={pieChartPartner}
            options={{ maintainAspectRatio: false }}
          />
        </div>
      </div>

      {/* tầng 4 */}
      <div className="flex h-[610px] w-full items-center justify-around p-8">
        <div className="h-full w-2/5 items-center justify-center  rounded-lg border border-gray-300 pl-2 pr-2 pt-16">
          <p className="mb-8 text-center font-bold">Bảng thống kê bài viết</p>
          <Chart
            key="pieChart"
            type="pie"
            data={pieChartPost}
            options={{ maintainAspectRatio: false }}
          />
        </div>
        <div className="ml-8 h-full   w-3/5 rounded-lg border border-gray-300 pt-28 ">
          <Chart
            key="barChart"
            type="bar"
            data={barCharOrder}
            options={chartOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
