"use client";

import HeaderComponent from "@/components/header";
import Side from "@/components/side";
import { Button } from "@nextui-org/react";
import { faCalendarDays, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { FormEvent, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ContactType } from "@/constants/types/homeType";
import Contacts from "@/components/manage/Contact";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Page = () => {
  //data
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [career, setCareer] = useState("");
  const [city, setCity] = useState("");
  const [businessTime, setBusinessTime] = useState("");
  const [annualRevenue, setAnnualRevenue] = useState("");
  const [juridical, setJuridical] = useState("");
  const [status, setStatus] = useState("");
  const [contact, setContact] = useState<ContactType[]>([]);

  const [selectedContact, setSelectedContact] = useState<ContactType | null>(
    null
  );

  let newContact = {
    fullName,
    email,
    phoneNum,
    career,
    city,
    businessTime,
    annualRevenue,
    juridical,
    status,
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BASE_API}contact/createNewContact`,
        newContact
      )

      .then((response) => {
        setContact((prevContacts) => [...prevContacts, response.data.data]);
        toast.success("Gửi thành công");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /// Initialize the step state to 1 to represent the first step in the process.
  const [step, setStep] = useState(1);

  // Handler for going to the next step.
  const goToNextStep = () => {
    setStep((prevStep) => prevStep + 1); // Safely increment the step value.
  };

  // Handler for going back to the previous step.
  const goBack = () => {
    setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep)); // Decrement the step value if it's greater than 1.
  };

  switch (step) {
    case 1:
      return (
        <div className="flex flex-col items-center justify-center pb-[100px]">
          <div className="">
            <div className="pt-20 pl-64 pb-5">
              <img
                src="/law.png"
                alt="Contact Image"
                className="w-50 h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-center  text-[#9dc02e] text-2xl  mb-2">
                Bắt đầu để nhận trợ giúp pháp lý cho doanh nghiệp của bạn.
              </h2>
              <p className="p-5 text-[#2c2c2c] text-center">
                Chỉ mất 2 phút cho việc yêu cầu.
              </p>
            </div>
          </div>
          {/* Action Button */}
          <button
            onClick={goToNextStep}
            className="h-12 w-36 bg-[#419641] hover:bg-green-700 text-white py-2 px-4 rounded-full"
          >
            BẮT ĐẦU
          </button>
        </div>
      );
    case 2:
      return (
        <div className="flex justify-center items-center min-h-screen">
          <form onSubmit={handleSubmit} className="space-y-8  pb-[50px]  ">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Họ tên của bạn ?
              </label>
              <input
                type="text"
                name="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="mt-1 block w-[400px] h-8 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Địa chỉ Email của bạn ?
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-[400px] h-8 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Số điện thoại nào chúng tôi có thể liện hệ với bạn?
              </label>
              <input
                type="text"
                value={phoneNum}
                onChange={(e) => setPhoneNum(e.target.value)}
                required
                className="mt-1 block w-[400px] h-8 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label
                htmlFor="career"
                className="block text-sm font-medium text-gray-700"
              >
                Doanh nghiệp bạn kinh doanh ngành gì ?
              </label>
              <select
                id="career"
                value={career}
                onChange={(e) => setCareer(e.target.value)}
                required
                className="mt-1 block w-[400px] h-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Chọn một lĩnh vực</option>
                <option value="Ngân hàng">1. Ngân hàng</option>
                <option value="Dịch vụ tài chính">2. Dịch vụ tài chính</option>
                <option value="Bảo hiểm">3. Bảo hiểm</option>
                <option value="Bất động sản">4. Bất động sản</option>
                <option value="Hàng và Dịch vụ công nghiệp">
                  5. Hàng và Dịch vụ công nghiệp
                </option>
                <option value="Xây dựng và Vật liệu">
                  6. Xây dựng và Vật liệu
                </option>
                <option value="Hàng tiêu dùng">7. Hàng tiêu dùng</option>
                <option value="Dịch vụ tiêu chí">8. Dịch vụ tiêu chí</option>
                <option value="Tiện ích cộng đồng">
                  9. Tiện ích cộng đồng
                </option>
                <option value="Dược phẩm và ý tế">10. Dược phẩm và ý tế</option>
                <option value="Dầu khí">11. Dầu khí</option>
                <option value="Nguyên vật liệu">12. Nguyên vật liệu</option>
                <option value="Công nghệ thông tin">
                  13. Công nghệ thông tin
                </option>
                <option value="Viễn thông">14. Viễn thông</option>
                <option value="Tư vấn">15. Tư vấn</option>
                <option value="Thương mại điện tử">
                  16. Thương mại điện tử
                </option>
                <option value="Giáo dục">17. Giáo dục</option>
                <option value="Khởi nghiệp">18. Khởi nghiệp</option>
                <option value="Ngành khác">19. Ngành khác</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                Doanh nghiệp của bạn hoạt động chính ở tỉnh thành nào?
              </label>
              <select
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="mt-1 block w-[400px] h-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 overflow-y-auto"
              >
                <option value="">Chọn tỉnh thành</option>
                <option value="Hà Nội">Hà Nội</option>
                <option value="TP Hồ Chí Minh">TP Hồ Chí Minh</option>
                <option value="An Giang">An Giang</option>
                <option value="Bà Rịa-Vũng Tàu">Bà Rịa-Vũng Tàu</option>
                <option value="Bắc Giang">Bắc Giang</option>
                <option value="Bắc Kạn">Bắc Kạn</option>
                <option value="Bạc Liêu">Bạc Liêu</option>
                <option value="Bắc Ninh">Bắc Ninh</option>
                <option value="Bến Tre">Bến Tre</option>
                <option value="Bình Định">Bình Định</option>
                <option value="Bình Dương">Bình Dương</option>
                <option value="Bình Phước">Bình Phước</option>
                <option value="Bình Thuận">Bình Thuận</option>
                <option value="Cà Mau">Cà Mau</option>
                <option value="Cao Bằng">Cao Bằng</option>
                <option value="Đắk Lắk">Đắk Lắk</option>
                <option value="Đắk Nông">Đắk Nông</option>
                <option value="Điện Biên">Điện Biên</option>
                <option value="Đồng Nai">Đồng Nai</option>
                <option value="Đồng Tháp">Đồng Tháp</option>
                <option value="Gia Lai">Gia Lai</option>
                <option value="Hà Giang">Hà Giang</option>
                <option value="Hà Nam">Hà Nam</option>
                <option value="Hà Tĩnh">Hà Tĩnh</option>
                <option value="Hải Dương">Hải Dương</option>
                <option value="Hải Phòng">Hải Phòng</option>
                <option value="Hậu Giang">Hậu Giang</option>
                <option value="Hòa Bình">Hòa Bình</option>
                <option value="Hưng Yên">Hưng Yên</option>
                <option value="Khánh Hòa">Khánh Hòa</option>
                <option value="Kiên Giang">Kiên Giang</option>
                <option value="Kon Tum">Kon Tum</option>
                <option value="Lai Châu">Lai Châu</option>
                <option value="Lâm Đồng">Lâm Đồng</option>
                <option value="Lạng Sơn">Lạng Sơn</option>
                <option value="Lào Cai">Lào Cai</option>
                <option value="Long An">Long An</option>
                <option value="Nam Định">Nam Định</option>
                <option value="Nghệ An">Nghệ An</option>
                <option value="Ninh Bình">Ninh Bình</option>
                <option value="Ninh Thuận">Ninh Thuận</option>
                <option value="Phú Thọ">Phú Thọ</option>
                <option value="Phú Yên">Phú Yên</option>
                <option value="Quảng Bình">Quảng Bình</option>
                <option value="Quảng Nam">Quảng Nam</option>
                <option value="Quảng Ngãi">Quảng Ngãi</option>
                <option value="Quảng Ninh">Quảng Ninh</option>
                <option value="Quảng Trị">Quảng Trị</option>
                <option value="Sóc Trăng">Sóc Trăng</option>
                <option value="Sơn La">Sơn La</option>
                <option value="Tây Ninh">Tây Ninh</option>
                <option value="Thái Bình">Thái Bình</option>
                <option value="Thái Nguyên">Thái Nguyên</option>
                <option value="Thanh Hóa">Thanh Hóa</option>
                <option value="Thừa Thiên Huế">Thừa Thiên Huế</option>
                <option value="Tiền Giang">Tiền Giang</option>
                <option value="Trà Vinh">Trà Vinh</option>
                <option value="Tuyên Quang">Tuyên Quang</option>
                <option value="Vĩnh Long">Vĩnh Long</option>
                <option value="Vĩnh Phúc">Vĩnh Phúc</option>
                <option value="Yên Bái">Yên Bái</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="businessTime"
                className="block text-sm font-medium text-gray-700"
              >
                Bạn đã kinh doanh được bao lâu?
              </label>
              <select
                id="businessTime"
                value={businessTime}
                onChange={(e) => setBusinessTime(e.target.value)}
                required
                className="mt-1 block w-[400px] h-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Lựa chọn</option>
                <option value="Sắp bắt đầu">Sắp bắt đầu</option>
                <option value="0 - 2 năm">0 - 2 năm</option>
                <option value="2 - 10 năm">2 - 10 năm</option>
                <option value="Hơn 10 năm">Hơn 10 năm</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="annualRevenue"
                className="block text-sm font-medium text-gray-700"
              >
                Doanh thu hàng năm của doanh nghiệp bạn là bao nhiêu?
              </label>
              <select
                id="annualRevenue"
                value={annualRevenue}
                onChange={(e) => setAnnualRevenue(e.target.value)}
                required
                className="mt-1 block w-[400px] h-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Lựa chọn</option>
                <option value="Dưới 5 tỷ">Dưới 5 tỷ</option>
                <option value="5 tỷ đến dưới 20 tỷ">5 tỷ đến dưới 20 tỷ</option>
                <option value="20 tỷ đến 200 tỷ">20 tỷ đến 200 tỷ</option>
                <option value="Trên 200 tỷ">Hơn 10 năm</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="juridical"
                className="block text-sm font-medium text-gray-700"
              >
                Doanh nghiệp của bạn cần những loại trợ giúp pháp lý nào?
              </label>
              <select
                id="juridical"
                value={juridical}
                onChange={(e) => setJuridical(e.target.value)}
                required
                className="mt-1 block w-[400px] h-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Chọn trợ giúp phù hợp</option>
                <option value="Dịch vụ luật sư nội bộ">
                  Dịch vụ luật sư nội bộ
                </option>
                <option value="Trang tụng và giải quyết tranh chấp">
                  Trang tụng và giải quyết tranh chấp
                </option>
                <option value="Tư vấn pháp lý">Tư vấn pháp lý</option>
                <option value="Đánh giá hợp đồng">Đánh giá hợp đồng</option>
                <option value="Soạn thảo hợp đồng">Soạn thảo hợp đồng</option>
                <option value="Các như cầu khác">Các như cầu khác</option>
              </select>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className=" mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-green-600 hover:bg-green-700"
              >
                Gửi
              </button>
            </div>
            <div>
              <button
                onClick={goBack}
                className="text-sm text-blue-600 hover:text-blue-700 mt-4"
              >
                ← Quay Lại
              </button>
            </div>
          </form>
        </div>
      );
    default:
      // A default case to handle an unknown step.
      return (
        <div>
          Unknown step. Please restart the process.
          {/* Button to reset to the first step */}
          <button onClick={() => setStep(1)}>Restart</button>
        </div>
      );
  }
};

export default Page;
