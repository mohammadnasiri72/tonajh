"use client";

import { store } from "@/redux/store";
import { createCache, StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider } from "antd";
import faIR from "antd/locale/fa_IR";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaChevronUp } from "react-icons/fa";
import { Provider } from "react-redux";
import LayoutWrapper from "./LayoutWrapper";
import Loader from "./loader";

function Layout({ children, categorys }) {
  const [cache] = useState(() => createCache());

  const pathname = usePathname();
  const showHeaderFooter =
    !pathname.includes("/login") &&
    !pathname.includes("/register") &&
    !pathname.includes("/admin") &&
    !pathname.includes("/forgot-password");

  // کامپوننت برای مدیریت داده‌های اولیه
  function InitialDataManager() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    if (!mounted)
      return (
        <>
          <Loader />
        </>
      );

    return null;
  }

  function ScrollToTopButton() {
    const [visible, setVisible] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const handleScroll = () => {
        const scrollTop = window.scrollY || window.pageYOffset;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const percent =
          docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
        setProgress(percent);
        setVisible(scrollTop > 300);
      };
      window.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleClick = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
      <div
        style={{
          position: "fixed",
          left: 4,
          zIndex: 1000,
          width: 36,
          height: 36,
          display: visible ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
          borderRadius: "50%",
          boxShadow: "0 2px 16px 2px rgba(0,0,0,0.22)",
          cursor: "pointer",
          transition: "box-shadow 0.2s",
        }}
        onClick={handleClick}
        aria-label="scroll to top"
        className="group bottom-44 sm:bottom-[32px]"
      >
        <div style={{ position: "absolute", width: 36, height: 36 }}>
          <CircularProgressbar
            value={progress}
            strokeWidth={7}
            styles={buildStyles({
              pathColor: "#0E7490",
              trailColor: "#f3f3f3",
              backgroundColor: "#fff",
            })}
          />
        </div>
        <FaChevronUp
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            margin: "auto",
            width: 15,
            height: 15,
            color: "#0E7490",
            zIndex: 2,
            transition: "color 0.2s",
          }}
          className="group-hover:text-[#0E7490]"
        />
      </div>
    );
  }

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
            <InitialDataManager />
            <ScrollToTopButton />
            <LayoutWrapper
              showHeaderFooter={showHeaderFooter}
              categorys={categorys}
            >
              {children}
            </LayoutWrapper>
          </ConfigProvider>
        </StyleProvider>
      </div>
    </Provider>
  );
}

export default Layout;
