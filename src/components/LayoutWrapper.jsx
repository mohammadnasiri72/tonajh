import Header from "./Header";
import Navbar from "./Navbar";
import SubHeader from "./SubHeader";

function LayoutWrapper({ children, showHeaderFooter , categorys }) {
  
  if (!showHeaderFooter) {
    return <>{children}</>;
  }
  return (
    <>
      <SubHeader />
      <Header />
      <Navbar categorys={categorys}/>
      {children}
    </>
  );
}

export default LayoutWrapper;
