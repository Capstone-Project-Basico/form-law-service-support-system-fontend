import ProfileSidebar from "../../components/profileSidebar/ProfileSidebar";

type LayoutProps = {
  children: React.ReactNode; // Typing the children prop
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-custom-bg bg-cover">
      <div className="flex flex-row justify-center gap-10 pt-20 pb-[157px]">
        <ProfileSidebar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
