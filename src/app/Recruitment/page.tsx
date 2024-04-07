"use client";

import HeaderComponent from "@/components/header";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GoogleMaps } from "@/components/ui/GoogleMaps";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";
import { ToastContainer, toast } from "react-toastify";
import { useState } from 'react';
const page = () => {
 
  /// Initialize the step state to 1 to represent the first step in the process.
  const [step, setStep] = useState(1);

  // Handler for going to the next step.
  const goToNextStep = () => {
    setStep(prevStep => prevStep + 1); // Safely increment the step value.
  };

  // Handler for going back to the previous step.
  const goBack = () => {
    setStep(prevStep => (prevStep > 1 ? prevStep - 1 : prevStep)); // Decrement the step value if it's greater than 1.
  };

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
                02 Hiểu, tin tưởng và muốn góp sức chinh phục các mục tiêu của
                BASICO
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
          <div  className=" bg-[#e25a60] p-10 text-center">
          <p className=" font-bold mb-4">CẢM ƠN BẠN ĐÃ QUYẾT ĐỊNH THAM GIA ỨNG TUYỂN TRỰC TUYẾN TẠI BASICO.</p>
          <p className="font-bold mb-4">VUI LÒNG CUNG CẤP MỘT SỐ THÔNG TIN ĐỂ BASICO CÓ SỰ XÉT TUYỂN PHÙ HỢP VỚI NHU CẦU ỨNG TUYỂN CỦA BẠN.</p>
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
          className="text-sm text-blue-600 hover:text-blue-700 mt-4">
          ← Quay Lại
        </button>
        </div>
        </div>
  
        {/* Right side with the recruitment image */}
        <div className="w-1/2">
            <div className="">
                <img src="/tuyen-dung.jpg" 
                alt="Recruitment Image" 
                className="w-full h-full object-cover"/>
          </div>
        </div>
       
      </div>
      );
  case 3:
      // Step 3 content
      // ...and so on for further steps.

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

export default page;