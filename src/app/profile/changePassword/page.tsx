import { Button, Input } from "@nextui-org/react";
import React from "react";

const ChangePassword = () => {
  return (
    <div className="w-[1350px] h-[600px] bg-white rounded-2xl">
      <div className="ml-10 mt-7">
        <h2 className="text-xl font-bold mb-7">Thay đổi mật khẩu đăng nhập</h2>
        <h2>Email</h2>
        <div className="flex justify-center items-center w-[883px] mb-4">
          <Input
            className=""
            disabled
            type="text"
            variant="faded"
            // defaultValue={userProfile?.userName ?? ""}
            // onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <h2>Mật khẩu hiện tại</h2>
        <div className="flex justify-center items-center w-[883px] mb-4">
          <Input
            type="text"
            variant="bordered"
            // defaultValue={userProfile?.userName ?? ""}
            // onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <h2>Mật khẩu mới</h2>
        <div className="flex justify-center items-center w-[883px] mb-4">
          <Input
            className=""
            variant="bordered"
            // defaultValue={userProfile?.userName ?? ""}
            // onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <ul style={{ listStyleType: "unset" }} className="ml-5 mb-7">
          <li>Mật khẩu từ 6 đến 25 kí tự</li>
          <li>Bao gồm chữ hoa, chữ thường và kí hiệu số</li>
        </ul>

        <h2>Nhập lại mật khẩu mới</h2>
        <div className="flex justify-center items-center w-[883px] mb-4">
          <Input
            className=""
            type="text"
            variant="bordered"
            // defaultValue={userProfile?.userName ?? ""}
            // onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <Button className="bg-[#FF0004] text-white mt-7">Lưu</Button>
      </div>
    </div>
  );
};

export default ChangePassword;
