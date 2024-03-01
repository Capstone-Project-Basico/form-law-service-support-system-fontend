import { Button } from "@nextui-org/react";
import Image from "next/image";

const Contact = () => {
  return (
    <div className="flex lg:flex-row sm:flex-col justify-center bg-white p-16 ">
      <div className="p-4">
        <Image alt="" src="/lienhe.jpg" width={555} height={379} />
      </div>
      <div className="text-black p-4" style={{ width: "555px" }}>
        <h2>Làm việc với luật sư xuất sắc</h2>
        <h1>CÔNG TY LUẬT BASICO CHÀO MỪNG BẠN</h1>
        <p>
          Với các luật sư và đội ngũ chuyên gia pháp lý rất giỏi, cùng nền tảng
          kinh nghiệm kiến thức đa dạng, phong phú, chúng tôi sẽ giúp được nhu
          cầu pháp lý hiện nay của bạn.
        </p>
        <div className="flex-row">
          <p>Kinh nghiệm phong phú</p>
          <p>Kiến thức chuyên sâu</p>
          <p>Giải pháp thực chất</p>
        </div>
        <Button>LIÊN HỆ</Button>
      </div>
    </div>
  );
};

export default Contact;
