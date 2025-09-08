"use client";

import { createCache, StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider } from "antd";
import faIR from "antd/locale/fa_IR";
import { usePathname } from "next/navigation";
import "react-circular-progressbar/dist/styles.css";
import { Provider } from "react-redux";
import { store } from "./../redux/store";
import LayoutWrapper from "./LayoutWrapper";
import { useState } from "react";

function Layout({ children , categorys}) {
  const [cache] = useState(() => createCache());

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
        <StyleProvider cache={cache}>
          <ConfigProvider direction="rtl" locale={faIR}>
            <LayoutWrapper showHeaderFooter={showHeaderFooter} categorys={categorys}>
              {children}
            </LayoutWrapper>
          </ConfigProvider>
        </StyleProvider>
      </div>
    </Provider>
  );
}

export default Layout;
