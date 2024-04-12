import React from "react";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center my-[215px]">
      <FontAwesomeIcon
        icon={faTriangleExclamation}
        className="size-40 text-[#FF0004]"
      />
      <h1 className="text-8xl text-[#FF0004] font-semibold">
        404 KHÔNG TÌM THẤY
      </h1>
      <p className="text-[18px] font-semibold mt-10">
        File này có thể đã bị di chuyển hoặc xóa, bạn kiểm tra lại đã viết đúng
      </p>
    </div>
  );
};

export default NotFound;
