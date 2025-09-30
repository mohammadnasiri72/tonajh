import { setCategorys } from "@/redux/slices/category";
import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";
import SubHeader from "./SubHeader";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function LayoutWrapper({ children, showHeaderFooter , categorys}) {

  const dispatch = useDispatch();

  useEffect(() => {
    if (categorys && categorys.length > 0) {
      dispatch(setCategorys(categorys));
    }
  }, [categorys, dispatch]);


  if (!showHeaderFooter) {
    return <>{children}</>;
  }
  return (
    <>
      <SubHeader />
      <Header />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default LayoutWrapper;
