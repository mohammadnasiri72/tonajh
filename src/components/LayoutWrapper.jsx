import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";
import SubHeader from "./SubHeader";

function LayoutWrapper({ children, showHeaderFooter, categorys }) {
  if (!showHeaderFooter) {
    return <>{children}</>;
  }
  return (
    <>
      <SubHeader />
      <Header />
      <Navbar categorys={categorys} />
      {children}
      <Footer />
    </>
  );
}

export default LayoutWrapper;
