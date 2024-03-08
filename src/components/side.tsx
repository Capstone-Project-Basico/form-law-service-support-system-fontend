import {
  faChevronRight,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";

const Side = () => {
  return (
    <div className="px-4 w-[292px]">
      <div className="flex flex-row border mb-10">
        <input
          type="text"
          placeholder="Tìm kiếm ..."
          className="px-4 py-2 bg-[#00000008] w-[262px]"
        />
        <Button radius="none" className="bg-[#FF0004] text-white">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="size-4" />
        </Button>
      </div>

      <div className="font-bold text-[17px] border-l-5 border-[#FF0004] pl-5 mb-5">
        CHUYÊN MỤC
      </div>
      <div className="mb-10">
        {/* 1 */}
        <div className="flex flex-row items-center py-3">
          <FontAwesomeIcon
            icon={faChevronRight}
            className="size-3 mx-1 text-[#FF0004]"
          />
          <p className="pl-[18px] hover:text-[#FF0004] cursor-pointer">
            Bài viết nghiên cứu trên báo chí
          </p>
        </div>
        <hr />
        {/* 2 */}
        <div className="flex flex-row items-center py-3">
          <FontAwesomeIcon
            icon={faChevronRight}
            className="size-3 mx-1 text-[#FF0004]"
          />
          <p className="pl-[18px] hover:text-[#FF0004] cursor-pointer">
            BASICO tuần luật
          </p>
        </div>
        <hr />

        {/* 3 */}
        <div className="flex flex-row items-center py-3">
          <FontAwesomeIcon
            icon={faChevronRight}
            className="size-3 mx-1 text-[#FF0004]"
          />
          <p className="pl-[18px] text-[#FF0004] cursor-pointer">
            Sách pháp lý nghiệp vụ
          </p>
        </div>
        <hr />

        {/* 4 */}
        <div className="flex flex-row items-center py-3">
          <FontAwesomeIcon
            icon={faChevronRight}
            className="size-3 mx-1 text-[#FF0004]"
          />
          <p className="pl-[18px] hover:text-[#FF0004] cursor-pointer">
            Tư liệu ảnh
          </p>
        </div>
        <hr />

        {/* 5 */}
        <div className="flex flex-row items-center py-3">
          <FontAwesomeIcon
            icon={faChevronRight}
            className="size-3 mx-1 text-[#FF0004]"
          />
          <p className="pl-[18px] hover:text-[#FF0004] cursor-pointer">
            Tư liệu film ảnh
          </p>
        </div>
        <hr />

        {/* 6 */}
        <div className="flex flex-row items-center py-3">
          <FontAwesomeIcon
            icon={faChevronRight}
            className="size-3 mx-1 text-[#FF0004]"
          />
          <p className="pl-[18px] hover:text-[#FF0004] cursor-pointer">
            Tư liệu video
          </p>
        </div>
      </div>

      {/* calender */}
      <div className="mb-10">
        <div className="font-bold text-[17px] border-l-5 border-[#FF0004] pl-5 mb-5">
          LỊCH
        </div>
        <div>THÁNG BA 2024</div>
      </div>

      {/* new post */}
      <div>
        <div className="font-bold text-[17px] border-l-5 border-[#FF0004] pl-5 mb-5">
          BÀI VIẾT MỚI
        </div>
        <div>Chuc mung nam moi</div>
      </div>
    </div>
  );
};

export default Side;
