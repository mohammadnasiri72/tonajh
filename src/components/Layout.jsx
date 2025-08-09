"use client";

import "react-circular-progressbar/dist/styles.css";
import { Provider } from "react-redux";
import { store } from "./../redux/store";
import { usePathname } from "next/navigation";
import SubHeader from "./SubHeader";
import LayoutWrapper from "./LayoutWrapper";

function Layout({ children }) {
  const pathname = usePathname();
  const showHeaderFooter =
    !pathname.includes("/login") &&
    !pathname.includes("/register") &&
    !pathname.includes("/forgot-password");

  return (
    <Provider store={store}>
      <div
        style={{
          maxWidth: "2000px",
          margin: "auto",
          overflow: "hidden",
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
