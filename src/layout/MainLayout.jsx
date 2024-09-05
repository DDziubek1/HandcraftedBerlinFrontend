import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Listing from "../components/Listing";
export default function Layout() {
  return (
    <>
     <Navbar />
      <Outlet/>
     <Footer />
    </>
  );
}
