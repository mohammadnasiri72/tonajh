"use client";

import { usePathname } from "next/navigation";
import "react-circular-progressbar/dist/styles.css";
import { Provider } from "react-redux";
import { store } from "./../redux/store";
import LayoutWrapper from "./LayoutWrapper";

function Layout({ children }) {

  const pathname = usePathname();
  const showHeaderFooter =
    !pathname.includes("/login") &&
    !pathname.includes("/register") &&
    !pathname.includes("/admin") &&
    !pathname.includes("/forgot-password");

  

  return (
    <Provider store={store}>
      <div
        style={{
          maxWidth: "2000px",
          margin: "auto",
        }}
      >
        <LayoutWrapper showHeaderFooter={showHeaderFooter}>
          {children}
        </LayoutWrapper>
      </div>
    </Provider>
  );
}

export default Layout;
