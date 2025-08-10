"use client";
import { Skeleton } from "@mui/material";
import { Divider } from "antd";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";

function Navbar() {
  const [showOverMenu, setShowOverMenu] = useState(false);
  const [menuData, setMenuData] = useState([]);
  const [overMenuHover, setOverMenuHover] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!showOverMenu) {
      setOverMenuHover({});
    }
  }, [showOverMenu]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:4000/api/products")
      .then((res) => {
        setMenuData(res.data);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="sm:px-10 px-2 my-2">
        <div className="flex items-center">
          <div className="flex items-center gap-1 py-1 px-2 hover:bg-slate-100 duration-300 relative group">
            <div className="flex items-center gap-1 cursor-pointer">

            <IoMdMenu />
            <span className="font-semibold text-lg">دسته بندی‌ها</span>
            </div>
            <div className="absolute top-full z-50 bg-white right-0 w-56 h-96 shadow-lg group-hover:opacity-100 opacity-0 group-hover:visible invisible duration-300 overflow-auto">
              <div className="w-full flex flex-col">
                {menuData.length > 0 &&
                  !loading &&
                  menuData.map((item) => {
                    return (
                      <Link
                        onMouseEnter={() => {
                          setShowOverMenu(true);
                          setOverMenuHover(item);
                        }}
                        onMouseLeave={() => {
                          setShowOverMenu(false);
                        }}
                        className="hover:bg-slate-100 p-2 duration-300 relative group/2"
                        href={"/"}
                        key={item.id}
                        style={{
                          backgroundColor:
                            item === overMenuHover ? "#f1f5f9" : "",
                        }}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-1.5">
                            {item?.img && (
                              <img
                                className="w-8 h-8"
                                src={item.img}
                                alt={item.title}
                              />
                            )}
                            {!item?.img && (
                              <img
                                className="w-8 h-8"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhCZe0e0hWp5eEvMfEsXrAJnl-AxE4IXDOAQ&s"
                                alt={item.title}
                              />
                            )}

                            <span
                              style={{
                                color: item === overMenuHover ? "#0E7490" : "",
                              }}
                              className="font-semibold group-hover/2:-translate-x-2 group-hover/2:text-cyan-700 duration-300"
                            >
                              {item.title}
                            </span>
                          </div>
                          <FaChevronLeft
                            style={{
                              rotate: item === overMenuHover ? "0deg" : "90deg",
                            }}
                            className="group-hover/2:rotate-0 duration-300 rotate-90"
                          />
                        </div>
                      </Link>
                    );
                  })}
                {loading && (
                  <div className="flex flex-col gap-2 mt-3 px-3.5">
                    {Array.from({ length: 12 }).map((e, i) => (
                      <Skeleton
                        key={i}
                        variant="text"
                        sx={{ fontSize: "2rem" }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            {/* showOverMenu */}
            <div
              onMouseEnter={() => {
                setShowOverMenu(true);
              }}
              onMouseLeave={() => {
                setShowOverMenu(false);
              }}
              className={`absolute bg-white bottom-0 z-50 right-0 w-[30rem] h-96 shadow-lg translate-y-full -translate-x-56 duration-300 ${
                showOverMenu ? "opacity-100" : "opacity-0"
              } ${showOverMenu ? "visible" : "invisible"}`}
            >
              {overMenuHover?.subMenu &&
                overMenuHover?.subMenu.length > 0 &&
                overMenuHover.subMenu.map((item) => (
                  <div key={item.id}>
                    <div className="border-b border-[#0002] p-2 flex">
                      <h2 className="text-lg font-bold cursor-pointer">
                        {item?.title}
                      </h2>
                    </div>
                    {item?.subMenu && item?.subMenu.length > 0 && (
                      <div className="flex items-center gap-2 p-2">
                        {item.subMenu.map((e) => (
                          <div key={e.id}>
                            <h3 className="font-semibold cursor-pointer">
                              {e.title}
                            </h3>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
