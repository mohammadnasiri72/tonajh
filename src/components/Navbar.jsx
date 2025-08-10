"use client";
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
  console.log(overMenuHover);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/products")
      .then((res) => {
        setMenuData(res.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      <div className="sm:px-10 px-2 my-2">
        <div className="flex items-center">
          <div className="flex items-center gap-1 cursor-pointer py-1 px-2 hover:bg-slate-100 duration-300 relative group">
            <IoMdMenu />
            <span className="font-semibold text-lg">دسته بندی‌ها</span>
            <div className="absolute bottom-0 z-50 bg-white right-0 w-56 h-96 shadow-lg translate-y-full group-hover:opacity-100 opacity-0 group-hover:visible invisible duration-300">
              <div className="w-full flex flex-col">
                {menuData.length > 0 &&
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
                        className="hover:bg-slate-100 p-2 duration-300 relative"
                        href={"/"}
                        key={item.id}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-1.5">
                            {item?.img && (
                              <img
                                className="w-14 h-14"
                                src={item.img}
                                alt={item.title}
                              />
                            )}
                            <span className="font-semibold">{item.title}</span>
                          </div>
                          <FaChevronLeft />
                        </div>
                      </Link>
                    );
                  })}
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
              className={`absolute bg-white bottom-0 z-50 right-0 w-56 h-96 shadow-lg translate-y-full -translate-x-full duration-300 ${
                showOverMenu ? "opacity-100" : "opacity-0"
              } ${showOverMenu ? "visible" : "invisible"}`}
            >
              {overMenuHover?.subMenu &&
                overMenuHover?.subMenu.length > 0 &&
                overMenuHover.subMenu.map((item) => (
                  <div key={item.id}>
                    <div className="border-b">
                      <h2 className="text-lg font-bold">{item?.title}</h2>
                    </div>
                    {item?.subMenu &&
                      item?.subMenu.length > 0 &&
                      item.subMenu.map((e) => (
                        <div key={e.id}>
                          <div className="flex justify-between">
                            <h3 className="font-semibold">{e.title}</h3>
                          </div>
                        </div>
                      ))}
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
