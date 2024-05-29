import HeaderComponent from "@/components/header";
import PostComponent from "@/components/post";

const page = () => {
  return (
    <>
      <HeaderComponent title="BASICO Law Firm" link="Dịch vụ" />
      <PostComponent cateName="Tư liệu video" />
    </>
  );
};

export default page;
