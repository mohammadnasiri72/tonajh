import Header from "./Header";
import SubHeader from "./SubHeader";

function LayoutWrapper({ children, showHeaderFooter }) {
  if (!showHeaderFooter) {
    return <>{children}</>;
  }
  return (
    <>
      <SubHeader />
      <Header />
      {children}
    </>
  );
}

export default LayoutWrapper;
