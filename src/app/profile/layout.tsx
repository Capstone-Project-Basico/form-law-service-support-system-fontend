import ProfileSiderbar from "../../components/profileSidebar/ProfileSidebar";

type LayoutProps = {
  children: React.ReactNode; // Typing the children prop
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-[#F2F2F2]">
      <div className="flex flex-row justify-center gap-10 pt-20 pb-20">
        <ProfileSiderbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
