"use client";

import HeaderComponent from "@/components/header";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GoogleMaps } from "@/components/ui/GoogleMaps";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";
import { ToastContainer, toast } from "react-toastify";
import { RecruitmentType } from "@/constants/types/homeType";
import Recruitments from "@/components/manage/Recruitment";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
const Page = () => {
  //data
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [id_number, setIdNumber] = useState("");
  const [homeTown, setHomeTown] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [position, setPosition] = useState("");
  const [exp, setExp] = useState("");
  const [field, setField] = useState("");
  const [graduate, setGraduate] = useState("");
  const [target, setTarget] = useState("");
  const [workPlace, setWorkPlace] = useState("");
  const [processStatus, setprocessStatus] = useState("");
  const [recruitment, setRecruitment] = useState<RecruitmentType[]>([]);

  const [selectedRecruitment, setSelectedRecruitment] =
    useState<RecruitmentType | null>(null);

  let newRecruitment = {
    fullName,
    dateOfBirth,
    id_number,
    homeTown,
    maritalStatus,
    gender,
    email,
    phoneNum,
    position,
    exp,
    field,
    graduate,
    target,
    workPlace,
    processStatus,
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_BASE_API}recruitmentForm/createNewRecruitmentForm`,
          newRecruitment
        )

        .then((response) => {
          setFullName("");
          setDateOfBirth(null);
          setIdNumber("");
          setHomeTown("");
          setMaritalStatus("");
          setGender("");
          setEmail("");
          setPhoneNum("");
          toast.success("Gửi thông tin thành công");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.log(error);
    }

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

  // Giao diện website của tuyển dụng
  switch (step) {
    case 1:
      return (
        <div className="bg-white py-10 pt-32 pb-[436px] ">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            {/* Left side */}
            <div className="flex flex-col items-center space-y-5">
              <h1 className="text-3xl font-bold text-gray-800">
                THAM GIA ỨNG TUYỂN
              </h1>
              <button
                onClick={goToNextStep}
                className="bg-[#419641] text-white px-6 py-3 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50"
              >
                NHẤN VÀO ĐÂY
              </button>
            </div>

            {/* Right side */}
            <div className="space-y-3 bg-white p-4 ">
              <div className="text-center pb-">
                <h2 className="text-3xl pb-3 font-semibold text-gray-800">
                  <strong>
                    BA<span className="text-[#ff0000]">S</span>I
                    <span className="text-[#ff0000]">CO </span>
                  </strong>{" "}
                  tìm kiếm nhân sự
                </h2>
              </div>
              <div className="pl-4 pr-10 py-2 rounded-full bg-gray-100 shadow-inner">
                <div className="flex items-center space-x-2">
                  <span className="text-red-500">✔</span>
                  <p className="text-gray-800">
                    01 Khát vọng trở thành luật sư giỏi
                  </p>
                </div>
              </div>
              <div className="pl-4 pr-10 py-2 rounded-full bg-gray-100 shadow-inner">
                <div className="flex items-center space-x-2">
                  <span className="text-red-500">✔</span>
                  <p className="text-gray-800 text-3">
                    02 Hiểu, tin tưởng và muốn góp sức chinh phục các mục tiêu
                    của BASICO
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 2:
      return (
        // JSX for step 2...
        <div className="flex max-w-6xl mx-auto my-10 pt-16 overflow-hidden pb-[200px]">
          {/* Left side with the red background */}
          <div className="flex-1 text-white ">
            <div className=" bg-[#e25a60] p-10 text-center">
              <p className=" font-bold mb-4">
                CẢM ƠN BẠN ĐÃ QUYẾT ĐỊNH THAM GIA ỨNG TUYỂN TRỰC TUYẾN TẠI
                BASICO.
              </p>
              <p className="font-bold mb-4">
                VUI LÒNG CUNG CẤP MỘT SỐ THÔNG TIN ĐỂ BASICO CÓ SỰ XÉT TUYỂN PHÙ
                HỢP VỚI NHU CẦU ỨNG TUYỂN CỦA BẠN.
              </p>
              {/* Include any form elements here */}
            </div>
            <div className="pt-10 pl-32">
              <button
                onClick={goToNextStep}
                className="bg-[#419641] text-white px-6 py-3 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50"
              >
                NHẤN VÀO ĐÂY ĐỂ THAM GIA
              </button>
            </div>
            <div className="pt-5">
              <button
                onClick={goBack}
                className="text-sm text-blue-600 hover:text-blue-700 mt-4"
              >
                ← Quay Lại
              </button>
            </div>
          </div>

          {/* Right side with the recruitment image */}
          <div className="w-1/2">
            <div className="">
              <img
                src="/tuyen-dung.jpg"
                alt="Recruitment Image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      );

    case 3:
      return (
        <div className="flex justify-center items-center min-h-screen">
          <ToastContainer />
          <form onSubmit={handleSubmit} className="space-y-8  pb-[50px]  ">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Họ tên (*)
              </label>
              <input
                type="text"
                name="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Họ tên"
                required
                className="mt-1 block w-[400px] h-8 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label
                htmlFor="dob"
                className=" block text-sm font-medium text-gray-700"
              >
                Ngày sinh
              </label>
              <input
                type="date"
                value={
                  dateOfBirth ? dateOfBirth.toISOString().substring(0, 10) : ""
                }
                onChange={(e) => setDateOfBirth(new Date(e.target.value))}
                className="form-input block w-full h-8 py-2 text-base font-normal
           text-gray-700 bg-white bg-clip-padding border border-gray-300  rounded transition 
           ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                CMND, CCCD hoặc giấy tờ khác tương đương (*)
              </label>
              <input
                type="text"
                value={id_number}
                onChange={(e) => setIdNumber(e.target.value)}
                placeholder="CMND, CCCD"
                required
                className="mt-1 block w-[400px] h-8 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Quê quán (*)
              </label>
              <input
                type="text"
                value={homeTown}
                onChange={(e) => setHomeTown(e.target.value)}
                placeholder="Quê quán"
                required
                className="mt-1 block w-[400px] h-8 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Giới tính (*)
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                className="mt-1 block w-[400px] h-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Vui lòng chọn</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Tình trạng hôn nhân (*)
              </label>
              <select
                id="maritalStatus"
                value={maritalStatus}
                onChange={(e) => setMaritalStatus(e.target.value)}
                required
                className="mt-1 block w-[400px] h-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Chọn tình trạng hôn nhân</option>
                <option value="Đang trong thời kỳ hôn nhân">
                  Đang trong thời kỳ hôn nhân
                </option>
                <option value="Độc thân">Độc thân</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Số điện thoại (*)
              </label>
              <input
                type="text"
                value={phoneNum}
                onChange={(e) => setPhoneNum(e.target.value)}
                placeholder="SĐT"
                required
                className="mt-1 block w-[400px] h-8 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email (*)
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                required
                className="mt-1 block w-[400px] h-8 border border-gray-300 rounded-md shadow-sm"
              />
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
