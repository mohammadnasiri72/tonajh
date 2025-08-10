import Header from "./Header";
import Navbar from "./Navbar";
import SubHeader from "./SubHeader";

function LayoutWrapper({ children, showHeaderFooter }) {
  if (!showHeaderFooter) {
    return <>{children}</>;
  }
  return (
    <>
      <SubHeader />
      <Header />
      <Navbar />
      {children}
    </>
  );
}

export default LayoutWrapper;
