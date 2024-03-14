"use client";

import { Input } from "@nextui-org/react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const Page = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className="text-black ml-10">
      <div className="font-bold text-[17px] border-l-5 border-[#FF0004] pl-5 mb-5">
        <div className="text-2xl">Làm việc với các luật sư xuất sắc</div>
        <div className="text-3xl">CÔNG TY LUẬT BASICO CHÀO MỪNG BẠN</div>
      </div>

      <div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input type="email" label="Email" placeholder="Enter your email" />
        </div>
        <Input
          label="Password"
          variant="bordered"
          placeholder="Enter your password"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <FontAwesomeIcon
                  icon={faEye}
                  className="text-2xl text-default-400 pointer-events-none"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  className="text-2xl text-default-400 pointer-events-none"
                />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className="max-w-xs"
        />
      </div>
    </div>
  );
};

export default Page;
