import Navbar from '../../components/dashboardNavbar/navbar';
import Sidebar from '../../components/dashboardSidebar/sidebar';

// import "react-toastify/dist/ReactToastify.css";

type LayoutProps = {
  children: React.ReactNode; // Typing the children prop
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-cow">
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
