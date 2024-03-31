import { Input } from "@nextui-org/react";
import React from "react";

const ChangePassword = () => {
  return (
    <div className="w-[950px] bg-white">
      <h2>Thay đổi mật khẩu đăng nhập</h2>
      <div className="ml-10 mt-7">
        <h2>Email</h2>
        <div className="flex justify-center items-center w-[883px] mb-4">
          <Input
            className=""
            disabled
            type="text"
            variant="bordered"
            // defaultValue={userProfile?.userName ?? ""}
            // onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="flex justify-center items-center w-[883px] mb-4">
          <Input className="" type="text" variant="faded" />
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
