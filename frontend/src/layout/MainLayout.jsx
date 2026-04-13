import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ApiLibras from "../components/common/ApiLibras";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { useLocation } from "react-router-dom";

export default function MainLayout() {
  const location = useLocation();
  const hideRoutes = ["/login=0","/login=1","/login=2", "/cadastro=0", "/cadastro=1", "/cadastro=2"];
  const hideFooter = hideRoutes.includes(location.pathname);
    
  return (
    <>
      <ApiLibras />
      <ToastContainer />
      <Navbar />
      <Outlet />
      {!hideFooter && <Footer />}
    </>
  )
}
