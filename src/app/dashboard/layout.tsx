import Navbar from "./dashboardNavbar/navbar";
import Sidebar from "./dashboardSidebar/sidebar";
// import styles from "./dashboard.module.css";
type LayoutProps = {
  children: React.ReactNode; // Typing the children prop
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col">
      <div className="">
        <Navbar />
      </div>
      <div className="flex flex-cow">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
