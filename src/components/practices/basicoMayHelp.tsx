import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BasicoMayHelp = () => {
  const items = [
    { text: "Ngân hàng và tài chính" },
    { text: "Thị trường vốn" },
    { text: "Bảo hiểm" },
    { text: "Tư vấn chiến lược và Tái cấu trúc DN" },
    { text: "Đào tạo pháp lý cho doanh nghiệp" },
    { text: "Tư vấn M&A" },
  ];

  const items2 = [
    { text: "Tranh tụng và Giải quyết tranh chấp" },
    { text: "Sở hữu trí tuệ" },
    { text: "Tư vấn bất động sản" },
    { text: "Lao động" },
    { text: "Thuế" },
    { text: "CNTT & Truyền thông" },
  ];
  return (
    <div className="px-15 mt-11 mb-6">
      <h1 className="flex justify-center text-3xl font-bold mb-9">
        <strong>
          &nbsp;BA<span className="text-[#ff0000]">S</span>I
          <span className="text-[#ff0000]">CO&nbsp;</span>
        </strong>
        có thể giúp bạn
      </h1>
      <div className="grid grid-cols-2 justify-center items-center bg-[#f1f1f1f1] p-11">
        <ul style={{ listStyleType: "" }}>
          {items.map((item, index) => (
            <li key={index} className="flex flex-row mb-3 hover:text-[#FF0004]">
              <FontAwesomeIcon
                icon={faFileAlt}
                className="size-4 text-[#FF0004] mr-2"
              />
              {item.text}
            </li>
          ))}
        </ul>
        {/* 2 */}
        <ul className="px-8">
          {items2.map((item, index) => (
            <li
              key={index}
              className="flex flex-row mb-3 px-4 hover:text-[#FF0004]"
            >
              <FontAwesomeIcon
                icon={faFileAlt}
                className="size-4 text-[#FF0004] mr-2"
              />
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BasicoMayHelp;
